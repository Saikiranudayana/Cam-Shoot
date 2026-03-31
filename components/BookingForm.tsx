"use client";
import styles from './BookingForm.module.css';
import { useBooking } from '@/context/BookingContext';

const BookingForm = () => {
    const { openBooking } = useBooking();

    return (
        <section className={styles.booking} id="contact">
            <div className="container">
                <div className={styles.twoCol}>
                    {/* LEFT SIDE - FOUNDER PHOTO */}
                    <div className={styles.founderSection}>
                        <div className={styles.founderPhotoContainer}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/assets/Camshoot Founder.jpg"
                                alt="Founder"
                                className={styles.founderPhoto}
                            />
                        </div>
                        <div className={styles.founderInfo}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/assets/Camshhot original.jpeg" alt="CamShoot logo" className={styles.founderLogo} />
                            <p className={styles.founderTitle}>FOUNDER & CEO</p>
                            <p className={styles.founderValue}>Mahesh</p>
                        </div>
                    </div>

                    {/* RIGHT SIDE - CONTACT & INFO */}
                    <div className={styles.rightSection}>
                        {/* HEADING SECTION */}
                        <div className={styles.headingSection}>
                            <h2 className={styles.sectionHeading}>
                                Let's Create <span className="text-gold">Magic</span>
                            </h2>
                            <p className={styles.sectionDescription}>
                                Ready to capture your special moments? Click the button below to start your booking process. We can't wait to work with you!
                            </p>
                        </div>

                        {/* CONTACT INFORMATION */}
                        <div className={styles.infoCard}>
                            <h3 className={styles.cardTitle}>Contact Information</h3>

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

                        {/* FOLLOW US */}
                        <div className={styles.infoCard}>
                            <h3 className={styles.cardTitle}>Follow Us</h3>
                            <div className={styles.socialIcons}>
                                <a href="https://www.instagram.com/cam__shoot" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink} aria-label="Instagram">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </a>
                                <a href="https://www.facebook.com/people/CAM-SHOOT/61588472138922/?rdid=O1U0Nhd9Y6IbDRp7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1G46UPCKa1%2F%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink} aria-label="Facebook">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 0 1 2-2h3z"></path>
                                    </svg>
                                </a>
                                <a href="https://www.youtube.com/@CAMSHOOT-o6x" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink} aria-label="YouTube">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                        <polyline points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polyline>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* LEADERSHIP TEAM */}
                        <div className={styles.infoCard}>
                            <h3 className={styles.cardTitle}>Leadership Team</h3>
                            <div className={styles.leadershipContainer}>
                                <div className={styles.leadershipPhotoWrapper}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/assets/Camshoot Founder.jpg"
                                        alt="Leader"
                                        className={styles.leadershipPhoto}
                                    />
                                </div>
                                <div className={styles.leadershipInfo}>
                                    <h4 className={styles.leadershipName}></h4>
                                    <p className={styles.leadershipTitle}></p>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <button onClick={() => openBooking()} className="btn btn-gold" style={{width: '100%'}}>
                                Start Booking
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingForm;
