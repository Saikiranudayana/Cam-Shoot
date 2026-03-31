"use client";
import React, { useState, useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';
import styles from './BookingModal.module.css';

// --- Icons (Matching Packages.tsx) ---

// SVG Icons matching the reference style (Outline, Orange Theme)
const VideoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
);

const ClockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const EditIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const CameraIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
    </svg>
);

const StarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

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
            '4K Quality',
            'Up to 2 Hr Shoot',
            'Edited within 1.5 Hr',
            'No RAW Data',
        ]
    },
    {
        id: 'pro_plus',
        name: 'PRO+',
        price: 8999,
        features: [
            '4K Quality',
            'Up to 3.5 Hr Shoot',
            'Quick Same-Day Delivery',
            'Raw data included',
        ]
    },
    {
        id: 'pro_max',
        name: 'PRO MAX',
        price: 13999,
        features: [
            '4K Quality',
            'Up to 5 Hr Shoot',
            'Fast Same-Day Delivery',
            'Raw data included',
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
        getPrice: () => 1499
    }
];

// --- Component ---

const BookingModal = () => {
    const { isBookingOpen, closeBooking, preSelectedPackage } = useBooking();

    const [selectedPackage, setSelectedPackage] = useState<PackageId>('pro');
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });
    const [packageDropdownOpen, setPackageDropdownOpen] = useState(false);
    const packageRef = React.useRef<HTMLDivElement | null>(null);

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

    const resetForm = () => {
        setSelectedPackage('pro');
        setSelectedAddons([]);
        setUserDetails({ firstName: '', lastName: '', email: '', phone: '' });
        setEventDetails({ date: '', time: '', type: 'Wedding', customType: '', location: '', city: '', specialReq: '' });
        setAgreedToTerms(false);
        setPackageDropdownOpen(false);
    };

    useEffect(() => {
        if (isBookingOpen) {
            if (preSelectedPackage) {
                const exists = PACKAGES.find(p => p.id === preSelectedPackage);
                if (exists) {
                    setSelectedPackage(preSelectedPackage as PackageId);
                }
            }

            const handleClickOutside = (event: MouseEvent) => {
                if (packageRef.current && !packageRef.current.contains(event.target as Node)) {
                    setPackageDropdownOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        } else {
            const timer = setTimeout(() => resetForm(), 200);
            return () => clearTimeout(timer);
        }
    }, [isBookingOpen, preSelectedPackage]);

    if (!isBookingOpen) return null;

    const currentPackage = PACKAGES.find(p => p.id === selectedPackage) || PACKAGES[0];

    const calculateAddonPrice = (addonId: string) => {
        const addon = ADDONS.find(a => a.id === addonId);
        return addon ? addon.getPrice(selectedPackage) : 0;
    };

    const addonsTotal = selectedAddons.reduce((sum, id) => sum + calculateAddonPrice(id), 0);
    const totalAmount = currentPackage.price + addonsTotal;
    const advanceAmount = totalAmount * 0.5;
    const remainingAmount = totalAmount - advanceAmount;

    const validateBooking = () => {
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

        if (!agreedToTerms) {
            alert('Please agree to the terms and conditions to continue.');
            return false;
        }

        return true;
    };

    const toggleAddon = (id: string) => {
        setSelectedAddons(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handlePayment = async () => {
        if (!validateBooking()) return;

        try {
            const { loadRazorpayScript } = await import('@/utils/loadRazorpay');
            const loaded = await loadRazorpayScript();

            if (!loaded) {
                alert('Failed to load payment gateway. Please try again.');
                return;
            }

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

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'CamShoot',
                description: `${currentPackage.name} Package - Advance Payment`,
                order_id: orderData.orderId,
                handler: async function (response: any) {
                    try {
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
                            resetForm();

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
                    color: '#D4AF37'
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

    return (
        <div className={styles.overlay} onClick={(e) => {
            if (e.target === e.currentTarget) closeBooking();
        }}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Book Your Shoot</h2>
                    <button className={styles.closeButton} onClick={closeBooking}>×</button>
                </div>

                <div className={styles.content}>
                    <div className={styles.formLayout}>
                        <div className={styles.formSection}>
                            <div className={styles.section}>
                                <div className={styles.sectionHeader}>
                                    <h3 className={styles.sectionTitle}>Selected Package</h3>
                                </div>

                                <label className={styles.label}>Choose your package</label>
                                <div className={styles.customSelect} ref={packageRef}>
                                    <button
                                        type="button"
                                        className={styles.customSelectButton}
                                        onClick={() => setPackageDropdownOpen(prev => !prev)}
                                    >
                                        <span>
                                            {PACKAGES.find(p => p.id === selectedPackage)?.name} - ₹{PACKAGES.find(p => p.id === selectedPackage)?.price.toLocaleString('en-IN')}
                                        </span>
                                        <span className={styles.customSelectIcon} aria-hidden="true">▾</span>
                                    </button>

                                    {packageDropdownOpen && (
                                        <ul className={styles.customSelectList} role="listbox">
                                            {PACKAGES.map(pkg => (
                                                <li
                                                    key={pkg.id}
                                                    role="option"
                                                    aria-selected={pkg.id === selectedPackage}
                                                    className={`${styles.customSelectOption} ${pkg.id === selectedPackage ? styles.customSelectOptionSelected : ''}`}
                                                    onClick={() => {
                                                        setSelectedPackage(pkg.id);
                                                        setPackageDropdownOpen(false);
                                                    }}
                                                >
                                                    {pkg.name} - ₹{pkg.price.toLocaleString('en-IN')}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <ul className={styles.packageFeatures}>
                                    {currentPackage.features.map((feature, idx) => {
                                        let icon = <StarIcon />;
                                        const text = feature.toLowerCase();
                                        if (text.includes('reel')) icon = <VideoIcon />;
                                        else if (text.includes('4k')) icon = <StarIcon />;
                                        else if (text.includes('shoot')) icon = <ClockIcon />;
                                        else if (text.includes('edit') || text.includes('delivery')) icon = <EditIcon />;
                                        else if (text.includes('raw')) icon = <CameraIcon />;

                                        return (
                                            <li key={idx} className={styles.featureItem}>
                                                <span className={styles.featureIcon}>{icon}</span>
                                                {feature}
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className={styles.addonsSection}>
                                    <h4 className={styles.addonsTitle}>Add-ons (Optional)</h4>
                                    <div className={styles.addonsList}>
                                        {ADDONS.map(addon => {
                                            const price = addon.getPrice(selectedPackage);
                                            const isSelected = selectedAddons.includes(addon.id);
                                            return (
                                                <label key={addon.id} className={`${styles.addonItem} ${isSelected ? styles.addonSelected : ''}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        readOnly
                                                        onClick={() => toggleAddon(addon.id)}
                                                        className={styles.addonCheckbox}
                                                    />
                                                    <span className={styles.addonLabel}>{addon.name}</span>
                                                    <span className={styles.addonPrice}>+₹{price.toLocaleString('en-IN')}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.section}>
                                <div className={styles.sectionHeader}>
                                    <h3 className={styles.sectionTitle}>Your Details</h3>
                                </div>

                                <div className={styles.row2}>
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
                            </div>

                            <div className={styles.section}>
                                <div className={styles.sectionHeader}>
                                    <h3 className={styles.sectionTitle}>Event Details</h3>
                                </div>

                                <div className={styles.row2}>
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

                            <div className={styles.section}>
                                <div className={styles.sectionHeader}>
                                    <h3 className={styles.sectionTitle}>Terms & Conditions</h3>
                                </div>
                                <div className={styles.termsCard}>
                                    <ul className={styles.termsList}>
                                        <li>50% advance payment required to confirm booking.</li>
                                        <li>Travel expenses are borne by the client.</li>
                                        <li>Cancellation policy applies (see website).</li>
                                        {currentPackage.id === 'pro' ? (
                                            <li>No RAW data provided (as per package).</li>
                                        ) : (
                                            <li>Raw data included (as per package).</li>
                                        )}
                                        <li>Mandatory logo placement on final output.</li>
                                    </ul>
                                    <label className={styles.termsCheckboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={agreedToTerms}
                                            onChange={e => setAgreedToTerms(e.target.checked)}
                                            className={styles.termsCheckbox}
                                        />
                                        I agree to the terms and conditions
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={styles.summarySection}>
                            <div className={styles.summaryCard}>
                                <h3 className={styles.summaryTitle}>Payment Summary</h3>
                                <div className={styles.summaryRow}>
                                    <span>{currentPackage.name} Package</span>
                                    <span>₹{currentPackage.price.toLocaleString('en-IN')}</span>
                                </div>
                                {selectedAddons.map(id => {
                                    const addon = ADDONS.find(a => a.id === id);
                                    if (!addon) return null;
                                    return (
                                        <div key={id} className={styles.summaryRow}>
                                            <span style={{ color: '#555' }}>+ {addon.name}</span>
                                            <span>₹{addon.getPrice(selectedPackage).toLocaleString('en-IN')}</span>
                                        </div>
                                    );
                                })}
                                <div className={styles.summaryTotal}>
                                    <span>Total Amount</span>
                                    <span className={styles.totalAmount}>₹{totalAmount.toLocaleString('en-IN')}</span>
                                </div>
                                <div className={styles.summaryNote}>
                                    <div>
                                        <span className={styles.summaryLabel}>Pay Now (50% Advance)</span>
                                        <span className={styles.summaryValue}>₹{advanceAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className={styles.summarySubtext}>
                                        * Remaining ₹{remainingAmount.toLocaleString('en-IN')} to be paid on event day.
                                    </div>
                                </div>
                                <button
                                    className={styles.paymentAction}
                                    onClick={handlePayment}
                                    disabled={!agreedToTerms}
                                >
                                    Pay ₹{advanceAmount.toLocaleString('en-IN')} & Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
