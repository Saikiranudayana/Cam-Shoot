"use client";
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './success.module.css';

interface OrderDetails {
    orderId: string;
    paymentId: string;
    customerName: string;
    email: string;
    phone: string;
    packageName: string;
    addons: string[];
    totalAmount: number;
    advancePaid: number;
    eventDate: string;
    eventLocation: string;
}

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    useEffect(() => {
        // Get order details from URL params
        const orderId = searchParams.get('orderId');
        const paymentId = searchParams.get('paymentId');
        const customerName = searchParams.get('customerName');
        const email = searchParams.get('email');
        const phone = searchParams.get('phone');
        const packageName = searchParams.get('packageName');
        const addons = searchParams.get('addons');
        const totalAmount = searchParams.get('totalAmount');
        const advancePaid = searchParams.get('advancePaid');
        const eventDate = searchParams.get('eventDate');
        const eventLocation = searchParams.get('eventLocation');

        if (orderId && paymentId) {
            setOrderDetails({
                orderId,
                paymentId,
                customerName: customerName || '',
                email: email || '',
                phone: phone || '',
                packageName: packageName || '',
                addons: addons ? addons.split(',') : [],
                totalAmount: parseFloat(totalAmount || '0'),
                advancePaid: parseFloat(advancePaid || '0'),
                eventDate: eventDate || '',
                eventLocation: eventLocation || '',
            });
        }
    }, [searchParams]);

    const generatePDF = async () => {
        if (!orderDetails) return;

        setIsGeneratingPDF(true);

        try {
            const { jsPDF } = await import('jspdf');
            require('jspdf-autotable');

            const doc = new jsPDF();

            // Header with logo and company details
            doc.setFillColor(212, 175, 55); // Gold color
            doc.rect(0, 0, 210, 40, 'F');

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(28);
            doc.setFont('helvetica', 'bold');
            doc.text('CAMSHOOT', 105, 20, { align: 'center' });

            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text('Professional Cinematography & Photography', 105, 28, { align: 'center' });
            doc.text('Hyderabad, India', 105, 34, { align: 'center' });

            // Payment confirmation title
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text('Payment Confirmation', 105, 55, { align: 'center' });

            // Success icon (green checkmark)
            doc.setDrawColor(46, 204, 113);
            doc.setFillColor(46, 204, 113);
            doc.circle(105, 70, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.text('✓', 105, 73, { align: 'center' });

            // Order details
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');

            let yPos = 90;

            // Order ID and Payment ID boxes
            doc.setFillColor(240, 240, 240);
            doc.rect(20, yPos, 170, 20, 'F');
            doc.setFont('helvetica', 'bold');
            doc.text('Order ID:', 25, yPos + 7);
            doc.setFont('helvetica', 'normal');
            doc.text(orderDetails.orderId, 25, yPos + 14);

            doc.setFont('helvetica', 'bold');
            doc.text('Payment ID:', 110, yPos + 7);
            doc.setFont('helvetica', 'normal');
            doc.text(orderDetails.paymentId, 110, yPos + 14);

            yPos += 30;

            // Customer details
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.text('Customer Details', 20, yPos);
            yPos += 8;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text(`Name: ${orderDetails.customerName}`, 25, yPos);
            yPos += 6;
            doc.text(`Email: ${orderDetails.email}`, 25, yPos);
            yPos += 6;
            doc.text(`Phone: ${orderDetails.phone}`, 25, yPos);
            yPos += 12;

            // Package details
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.text('Booking Details', 20, yPos);
            yPos += 8;

            const tableData = [
                ['Package', orderDetails.packageName, `₹${orderDetails.totalAmount.toLocaleString('en-IN')}`],
            ];

            if (orderDetails.addons.length > 0) {
                orderDetails.addons.forEach(addon => {
                    tableData.push(['Add-on', addon, '-']);
                });
            }

            (doc as any).autoTable({
                startY: yPos,
                head: [['Item', 'Description', 'Amount']],
                body: tableData,
                theme: 'striped',
                headStyles: { fillColor: [212, 175, 55], textColor: [255, 255, 255] },
                styles: { fontSize: 11 },
                margin: { left: 20, right: 20 },
            });

            yPos = (doc as any).lastAutoTable.finalY + 10;

            // Payment summary
            doc.setFillColor(240, 240, 240);
            doc.rect(20, yPos, 170, 30, 'F');

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.text('Total Amount:', 25, yPos + 8);
            doc.text(`₹${orderDetails.totalAmount.toLocaleString('en-IN')}`, 165, yPos + 8, { align: 'right' });

            doc.setTextColor(46, 204, 113);
            doc.text('Advance Paid (50%):', 25, yPos + 16);
            doc.text(`₹${orderDetails.advancePaid.toLocaleString('en-IN')}`, 165, yPos + 16, { align: 'right' });

            doc.setTextColor(220, 53, 69);
            doc.text('Remaining Balance:', 25, yPos + 24);
            doc.text(`₹${(orderDetails.totalAmount - orderDetails.advancePaid).toLocaleString('en-IN')}`, 165, yPos + 24, { align: 'right' });

            yPos += 40;

            // Event details
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.text('Event Details', 20, yPos);
            yPos += 8;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text(`Date: ${orderDetails.eventDate}`, 25, yPos);
            yPos += 6;
            doc.text(`Location: ${orderDetails.eventLocation}`, 25, yPos);
            yPos += 15;

            // Footer
            doc.setTextColor(100, 100, 100);
            doc.setFontSize(10);
            doc.text('Thank you for choosing CamShoot!', 105, yPos, { align: 'center' });
            yPos += 5;
            doc.text('We look forward to capturing your special moments.', 105, yPos, { align: 'center' });
            yPos += 10;
            doc.text('For any queries, contact us at: canmshota@gmail.com | +91 99999 99999', 105, yPos, { align: 'center' });

            // Generate timestamp
            const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            doc.setFontSize(8);
            doc.text(`Generated on: ${timestamp}`, 105, 285, { align: 'center' });

            // Save PDF
            doc.save(`CamShoot-Invoice-${orderDetails.orderId}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    if (!orderDetails) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Loading order details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.successCard}>
                {/* Success Icon */}
                <div className={styles.iconWrapper}>
                    <div className={styles.successIcon}>
                        <svg viewBox="0 0 52 52" className={styles.checkmark}>
                            <circle cx="26" cy="26" r="25" fill="none" className={styles.checkmarkCircle} />
                            <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" className={styles.checkmarkCheck} />
                        </svg>
                    </div>
                </div>

                {/* Success Message */}
                <h1 className={styles.title}>Payment Successful!</h1>
                <p className={styles.subtitle}>Your booking has been confirmed</p>

                {/* Order Details */}
                <div className={styles.orderDetails}>
                    <div className={styles.detailRow}>
                        <span className={styles.label}>Order ID:</span>
                        <span className={styles.value}>{orderDetails.orderId}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.label}>Payment ID:</span>
                        <span className={styles.value}>{orderDetails.paymentId}</span>
                    </div>
                </div>

                {/* Package Info */}
                <div className={styles.packageInfo}>
                    <h3>Booking Summary</h3>
                    <div className={styles.packageDetails}>
                        <div className={styles.packageRow}>
                            <span>Package:</span>
                            <strong>{orderDetails.packageName}</strong>
                        </div>
                        {orderDetails.addons.length > 0 && (
                            <div className={styles.packageRow}>
                                <span>Add-ons:</span>
                                <strong>{orderDetails.addons.join(', ')}</strong>
                            </div>
                        )}
                        <div className={styles.packageRow}>
                            <span>Total Amount:</span>
                            <strong>₹{orderDetails.totalAmount.toLocaleString('en-IN')}</strong>
                        </div>
                        <div className={styles.packageRow + ' ' + styles.highlight}>
                            <span>Advance Paid:</span>
                            <strong className={styles.amountPaid}>₹{orderDetails.advancePaid.toLocaleString('en-IN')}</strong>
                        </div>
                        <div className={styles.packageRow}>
                            <span>Remaining Balance:</span>
                            <strong className={styles.amountDue}>₹{(orderDetails.totalAmount - orderDetails.advancePaid).toLocaleString('en-IN')}</strong>
                        </div>
                    </div>
                </div>

                {/* Event Details */}
                <div className={styles.eventInfo}>
                    <h3>Event Details</h3>
                    <div className={styles.eventDetails}>
                        <div className={styles.eventRow}>
                            <svg className={styles.eventIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>{orderDetails.eventDate}</span>
                        </div>
                        <div className={styles.eventRow}>
                            <svg className={styles.eventIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>{orderDetails.eventLocation}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.actions}>
                    <button
                        onClick={generatePDF}
                        className={styles.btnPrimary}
                        disabled={isGeneratingPDF}
                    >
                        {isGeneratingPDF ? (
                            <>
                                <div className={styles.btnSpinner}></div>
                                Generating PDF...
                            </>
                        ) : (
                            <>
                                <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Download Invoice (PDF)
                            </>
                        )}
                    </button>
                    <button onClick={() => router.push('/')} className={styles.btnSecondary}>
                        Back to Home
                    </button>
                </div>

                {/* Confirmation Message */}
                <div className={styles.confirmationNote}>
                    <p>📱 For any queries, contact us at +91 99999 99999</p>
                    <p>💾 Your order has been saved and tracked with Order ID: <strong>{orderDetails.orderId}</strong></p>
                </div>
            </div>
        </div>
    );
}
