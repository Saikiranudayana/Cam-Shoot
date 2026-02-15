"use client";
import styles from './BookingForm.module.css';
import { useBooking } from '@/context/BookingContext';

const BookingForm = () => {
    const { openBooking } = useBooking();

    return (
        <section className={styles.booking} id="contact">
            <div className="container">
                <div className={styles.twoCol}>
                    <div className={styles.info}>
                        <h2 className={styles.infoTitle}>
                            Let's Create <span className="text-gold">Magic</span>
                        </h2>
                        <p className={styles.infoText}>
                            Ready to capture your special moments? Click the button below to start your booking process. We can't wait to work with you!
                        </p>

                        <div className={styles.contactDetails}>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', color: '#333' }}>Contact Information</h3>

                            <div className={styles.contactItem}>
                                <div className={styles.iconCircle}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <div className={styles.contactText}>
                                    <span className={styles.contactLabel}>Phone</span>
                                    <span className={styles.contactValue}>+91 72070 07017</span>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={styles.iconCircle}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <div className={styles.contactText}>
                                    <span className={styles.contactLabel}>Email</span>
                                    <span className={styles.contactValue}>camshoot3313@gmail.com</span>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={styles.iconCircle}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </div>
                                <div className={styles.contactText}>
                                    <span className={styles.contactLabel}>Location</span>
                                    <span className={styles.contactValue}>Hyderabad, India</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.followUs}>
                            <h3 className={styles.followUsTitle}>Follow Us</h3>
                            <div className={styles.socialIcons}>
                                <a href="https://www.instagram.com/cam__shoot" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink} aria-label="Instagram">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <button onClick={() => openBooking()} className="btn btn-gold">
                                Start Booking
                            </button>
                        </div>
                    </div>

                    <div className={styles.formContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', backgroundImage: 'url(/assets/Camshoot.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '16px' }}>
                        {/* You could put an image or a simple card here */}
                        <div style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
                            <h3>Professional Shoots</h3>
                            <p>Weddings • Events • Portraits</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingForm;
