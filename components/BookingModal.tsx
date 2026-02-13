"use client";
import React, { useState, useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';
import styles from './BookingModal.module.css';

// --- Constants & Types ---

type PackageId = 'pro' | 'pro_plus' | 'pro_max';

interface Package {
    id: PackageId;
    name: string;
    price: number;
    features: string[];
}

const PACKAGES: Package[] = [
    {
        id: 'pro',
        name: 'PRO',
        price: 4999,
        features: [
            '1 Reel (45 sec – 1 min)',
            '4K Quality',
            'Up to 1.5 Hr Shoot',
            'Edited within 1.5 Hr',
            'No RAW Data',
        ]
    },
    {
        id: 'pro_plus',
        name: 'PRO+',
        price: 8999,
        features: [
            '2 Reels (45 sec – 1 min)',
            '4K Quality',
            'Up to 2.5 Hr Shoot',
            'Quick Same-Day Delivery',
            'No RAW Data',
        ]
    },
    {
        id: 'pro_max',
        name: 'PRO MAX',
        price: 13999,
        features: [
            '3 Reels (45 sec – 1 min)',
            '4K Quality',
            'Up to 3.5 Hr Shoot',
            'Fast Same-Day Delivery',
            'No RAW Data',
        ]
    }
];

interface Addon {
    id: string;
    name: string;
    getPrice: (pkgId: PackageId) => number;
}

const ADDONS: Addon[] = [
    {
        id: 'drone',
        name: 'Drone Shoot',
        getPrice: (pkgId) => {
            switch (pkgId) {
                case 'pro': return 1999;
                case 'pro_plus': return 2499;
                case 'pro_max': return 2999;
                default: return 1999;
            }
        }
    },
    {
        id: 'extra_hour',
        name: 'Extra Hour',
        getPrice: () => 1999
    },
    {
        id: 'extra_video',
        name: 'Extra Video',
        getPrice: () => 2999
    }
];

// --- Component ---

const BookingModal = () => {
    const { isBookingOpen, closeBooking } = useBooking();
    const [step, setStep] = useState(1);

    // Form State
    const [selectedPackage, setSelectedPackage] = useState<PackageId>('pro');
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const [eventDetails, setEventDetails] = useState({
        date: '',
        time: '',
        type: 'Wedding',
        customType: '',
        location: '',
        city: '',
        specialReq: ''
    });

    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Reset step when closed
    useEffect(() => {
        if (!isBookingOpen) {
            // Optional: reset form or just keep it? Let's keep it for UX in case accidental close.
            // But maybe reset step to 1.
            const timer = setTimeout(() => setStep(1), 300);
            return () => clearTimeout(timer);
        }
    }, [isBookingOpen]);

    if (!isBookingOpen) return null;

    // --- Calculations ---

    const currentPackage = PACKAGES.find(p => p.id === selectedPackage) || PACKAGES[0];

    const calculateAddonPrice = (addonId: string) => {
        const addon = ADDONS.find(a => a.id === addonId);
        return addon ? addon.getPrice(selectedPackage) : 0;
    };

    const addonsTotal = selectedAddons.reduce((sum, id) => sum + calculateAddonPrice(id), 0);
    const totalAmount = currentPackage.price + addonsTotal;
    const advanceAmount = totalAmount * 0.5;
    const remainingAmount = totalAmount - advanceAmount;

    // --- Handlers ---

    const validateStep = () => {
        if (step === 3) {
            if (!userDetails.firstName || !userDetails.lastName || !userDetails.email || !userDetails.phone) {
                alert('Please fill in all personal details.');
                return false;
            }
            if (!userDetails.email.includes('@')) {
                alert('Please enter a valid email address.');
                return false;
            }
            if (!eventDetails.date || !eventDetails.time || !eventDetails.location) {
                alert('Please fill in all event details.');
                return false;
            }
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep()) {
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => setStep(prev => prev - 1);

    const toggleAddon = (id: string) => {
        setSelectedAddons(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handlePayment = async () => {
        if (!agreedToTerms) return;

        try {
            // Load Razorpay script
            const { loadRazorpayScript } = await import('@/utils/loadRazorpay');
            const loaded = await loadRazorpayScript();

            if (!loaded) {
                alert('Failed to load payment gateway. Please try again.');
                return;
            }

            // Create Razorpay order
            const orderResponse = await fetch('/api/razorpay/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: advanceAmount })
            });

            const orderData = await orderResponse.json();

            if (!orderData.success) {
                alert('Failed to create order. Please try again.');
                return;
            }

            // Razorpay checkout options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'CamShoot',
                description: `${currentPackage.name} Package - Advance Payment`,
                order_id: orderData.orderId,
                handler: async function (response: any) {
                    // Payment success - verify and save
                    try {
                        // Verify payment
                        const verifyResponse = await fetch('/api/razorpay/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const verifyData = await verifyResponse.json();

                        if (verifyData.verified) {
                            // Save order to Google Sheets
                            await fetch('/api/save-order', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    orderId: orderData.customOrderId,
                                    packageName: currentPackage.name,
                                    packagePrice: currentPackage.price,
                                    addons: selectedAddons,
                                    totalAmount,
                                    advancePaid: advanceAmount,
                                    userDetails,
                                    eventDetails,
                                    paymentId: response.razorpay_payment_id,
                                    paymentStatus: 'Success'
                                })
                            });

                            // Redirect to success page with order details
                            const successUrl = new URL('/success', window.location.origin);
                            successUrl.searchParams.set('orderId', orderData.customOrderId);
                            successUrl.searchParams.set('paymentId', response.razorpay_payment_id);
                            successUrl.searchParams.set('customerName', `${userDetails.firstName} ${userDetails.lastName}`);
                            successUrl.searchParams.set('email', userDetails.email);
                            successUrl.searchParams.set('phone', userDetails.phone);
                            successUrl.searchParams.set('packageName', currentPackage.name);
                            successUrl.searchParams.set('addons', selectedAddons.join(','));
                            successUrl.searchParams.set('totalAmount', totalAmount.toString());
                            successUrl.searchParams.set('advancePaid', advanceAmount.toString());
                            successUrl.searchParams.set('eventDate', eventDetails.date);
                            successUrl.searchParams.set('eventLocation', `${eventDetails.location}, ${eventDetails.city}`);

                            closeBooking();
                            setStep(1); // Reset

                            // Redirect to success page
                            window.location.href = successUrl.toString();
                        } else {
                            alert('Payment verification failed. Please contact support.');
                        }
                    } catch (error) {
                        console.error('Error saving order:', error);
                        alert('Payment successful but failed to save order. Please contact support with your payment ID.');
                    }
                },
                prefill: {
                    name: `${userDetails.firstName} ${userDetails.lastName}`,
                    email: userDetails.email,
                    contact: userDetails.phone
                },
                theme: {
                    color: '#D4AF37' // Gold color matching your theme
                },
                modal: {
                    ondismiss: function () {
                        console.log('Payment modal closed');
                    }
                }
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
        }
    };

    // --- Renders ---

    return (
        <div className={styles.overlay} onClick={(e) => {
            if (e.target === e.currentTarget) closeBooking();
        }}>
            <div className={styles.modal}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        {step === 1 && 'Select Package'}
                        {step === 2 && 'Add-ons'}
                        {step === 3 && 'Your Details'}
                        {step === 4 && 'Summary & Pay'}
                    </h2>
                    <button className={styles.closeButton} onClick={closeBooking}>×</button>
                </div>

                {/* Progress Bar (Simple Dots) */}
                <div style={{ display: 'flex', gap: '4px', padding: '0 20px', marginTop: '10px' }}>
                    {[1, 2, 3, 4].map(s => (
                        <div key={s} style={{
                            flex: 1,
                            height: '4px',
                            background: s <= step ? 'var(--color-gold)' : '#eee',
                            borderRadius: '2px',
                            transition: 'background 0.3s'
                        }} />
                    ))}
                </div>

                <div className={styles.content}>
                    {/* Step 1: Packages */}
                    {step === 1 && (
                        <div className={styles.packageGrid}>
                            {PACKAGES.map(pkg => {
                                const isSelected = selectedPackage === pkg.id;
                                const dronePrice = ADDONS.find(a => a.id === 'drone')?.getPrice(pkg.id) || 0;
                                const isDroneActive = isSelected && selectedAddons.includes('drone');

                                return (
                                    <div
                                        key={pkg.id}
                                        className={`${styles.pkgCard} ${isSelected ? styles.pkgCardSelected : ''}`}
                                        onClick={() => {
                                            if (!isSelected) {
                                                setSelectedPackage(pkg.id);
                                                // When switching packages, maybe we should keep drone if it was selected?
                                                // Or reset it? Let's keep it simple: just select package.
                                            }
                                        }}
                                    >
                                        <div className={styles.pkgHeader}>
                                            <h3 className={styles.pkgName}>{pkg.name}</h3>
                                        </div>

                                        <div className={styles.pkgBody}>
                                            <ul className={styles.pkgFeatures}>
                                                {pkg.features.map((f, i) => {
                                                    let icon = '⚡';
                                                    if (f.toLowerCase().includes('reel')) icon = '🎥';
                                                    if (f.toLowerCase().includes('4k')) icon = '✨';
                                                    if (f.toLowerCase().includes('shoot')) icon = '🕒';
                                                    if (f.toLowerCase().includes('edit') || f.toLowerCase().includes('delivery')) icon = '🎬';
                                                    if (f.toLowerCase().includes('raw')) icon = '🚫';
                                                    return (
                                                        <li key={i}><span className={styles.pkgIcon}>{icon}</span> {f}</li>
                                                    );
                                                })}
                                            </ul>
                                        </div>

                                        <div className={styles.pkgPriceBar}>
                                            ₹{pkg.price.toLocaleString('en-IN')} /-
                                        </div>

                                        <div
                                            className={styles.pkgDrone}
                                            style={{ backgroundColor: isDroneActive ? '#F4D06F' : '#FFF2CC', cursor: 'pointer' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!isSelected) setSelectedPackage(pkg.id);
                                                toggleAddon('drone');
                                            }}
                                        >
                                            <div className={styles.droneLabel}>
                                                <span>🚁 Include Drone Shoot</span>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAddons.includes('drone') && isSelected}
                                                    readOnly
                                                    style={{ transform: 'scale(1.5)', accentColor: '#000', marginLeft: '8px' }}
                                                />
                                            </div>
                                            <span className={styles.dronePrice}>₹{dronePrice.toLocaleString('en-IN')} /-</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Step 2: Add-ons */}
                    {step === 2 && (
                        <div className={styles.grid}>
                            <p style={{ marginBottom: '10px', fontSize: '0.95rem' }}>Enhance your selected <strong>{currentPackage.name}</strong> package.</p>
                            {ADDONS.filter(a => a.id !== 'drone').map(addon => {
                                const price = addon.getPrice(selectedPackage);
                                const isSelected = selectedAddons.includes(addon.id);
                                return (
                                    <div
                                        key={addon.id}
                                        className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
                                        onClick={() => toggleAddon(addon.id)}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                readOnly
                                                style={{ accentColor: 'var(--color-gold)', width: '18px', height: '18px' }}
                                            />
                                            <span style={{ fontWeight: '600' }}>{addon.name}</span>
                                        </div>
                                        <span style={{ fontWeight: 'bold' }}>+ ₹{price.toLocaleString('en-IN')}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Step 3: Details */}
                    {step === 3 && (
                        <div className={styles.grid}>
                            <h3 style={{ fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '5px', marginTop: '5px' }}>Personal Info</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>First Name *</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        value={userDetails.firstName}
                                        onChange={e => setUserDetails({ ...userDetails, firstName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Last Name *</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        value={userDetails.lastName}
                                        onChange={e => setUserDetails({ ...userDetails, lastName: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email *</label>
                                <input
                                    type="email"
                                    className={styles.input}
                                    value={userDetails.email}
                                    onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Phone *</label>
                                <input
                                    type="tel"
                                    className={styles.input}
                                    placeholder="+91"
                                    value={userDetails.phone}
                                    onChange={e => setUserDetails({ ...userDetails, phone: e.target.value })}
                                    required
                                />
                            </div>

                            <h3 style={{ fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '5px', marginTop: '15px' }}>Event Details</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Date *</label>
                                    <input
                                        type="date"
                                        className={styles.input}
                                        value={eventDetails.date}
                                        onChange={e => setEventDetails({ ...eventDetails, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Time *</label>
                                    <input
                                        type="time"
                                        className={styles.input}
                                        value={eventDetails.time}
                                        onChange={e => setEventDetails({ ...eventDetails, time: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Event Type *</label>
                                <select
                                    className={styles.select}
                                    value={eventDetails.type}
                                    onChange={e => setEventDetails({ ...eventDetails, type: e.target.value })}
                                >
                                    <option>Wedding</option>
                                    <option>Engagement</option>
                                    <option>Birthday</option>
                                    <option>Corporate Event</option>
                                    <option>Baby Shower</option>
                                    <option>Portrait Session</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            {eventDetails.type === 'Other' && (
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Specify Event Type</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        value={eventDetails.customType}
                                        onChange={e => setEventDetails({ ...eventDetails, customType: e.target.value })}
                                    />
                                </div>
                            )}
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Location (Venue, City) *</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={eventDetails.location}
                                    onChange={e => setEventDetails({ ...eventDetails, location: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Special Requirements</label>
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Any specific requests?"
                                    value={eventDetails.specialReq}
                                    onChange={e => setEventDetails({ ...eventDetails, specialReq: e.target.value })}
                                    rows={3}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 4: Summary & Payment */}
                    {step === 4 && (
                        <div className={styles.grid}>
                            <div style={{ backgroundColor: '#fafafa', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
                                <h3 style={{ marginBottom: '15px', fontSize: '1.1rem' }}>Booking Summary</h3>
                                <div className={styles.summaryItem}>
                                    <span><strong>{currentPackage.name}</strong> Package</span>
                                    <span>₹{currentPackage.price.toLocaleString('en-IN')}</span>
                                </div>
                                {selectedAddons.map(id => {
                                    const addon = ADDONS.find(a => a.id === id);
                                    if (!addon) return null;
                                    return (
                                        <div key={id} className={styles.summaryItem}>
                                            <span style={{ color: '#555' }}>+ {addon.name}</span>
                                            <span>₹{addon.getPrice(selectedPackage).toLocaleString('en-IN')}</span>
                                        </div>
                                    );
                                })}
                                <div className={styles.total}>
                                    <span>Total Amount</span>
                                    <span className="text-gold">₹{totalAmount.toLocaleString('en-IN')}</span>
                                </div>
                                <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#555', display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #ddd', paddingTop: '10px' }}>
                                    <span>Advance (50%) to Pay Now:</span>
                                    <span style={{ fontWeight: 'bold', color: 'var(--color-black)' }}>₹{advanceAmount.toLocaleString('en-IN')}</span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px', textAlign: 'right' }}>
                                    Remaining ₹{remainingAmount.toLocaleString('en-IN')} payable on event day.
                                </div>
                            </div>

                            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '10px' }}>
                                <h4>Terms & Conditions</h4>
                                <ul style={{ paddingLeft: '20px', marginTop: '5px', marginBottom: '15px' }}>
                                    <li>50% advance payment required to confirm booking.</li>
                                    <li>Travel expenses are borne by the client.</li>
                                    <li>Cancellation policy applies (see website).</li>
                                    <li>No RAW data provided (as per package).</li>
                                    <li>Mandatory logo placement on final output.</li>
                                </ul>
                                <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={agreedToTerms}
                                        onChange={e => setAgreedToTerms(e.target.checked)}
                                        style={{ marginTop: '3px', accentColor: 'var(--color-gold)' }}
                                    />
                                    <span>I agree to the terms and conditions</span>
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    {step > 1 ? (
                        <button
                            className="btn btn-outline"
                            style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                            onClick={handleBack}
                        >
                            Back
                        </button>
                    ) : (
                        <div></div>
                    )}

                    {step < 4 ? (
                        <button
                            className="btn btn-gold"
                            style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                            onClick={handleNext}
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            className="btn btn-gold"
                            style={{ padding: '10px 20px', fontSize: '0.9rem', opacity: agreedToTerms ? 1 : 0.5, cursor: agreedToTerms ? 'pointer' : 'not-allowed' }}
                            onClick={handlePayment}
                            disabled={!agreedToTerms}
                        >
                            Pay ₹{advanceAmount.toLocaleString('en-IN')} & Confirm
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
