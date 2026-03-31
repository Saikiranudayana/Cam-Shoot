"use client";
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.col}>
                        <Link href="/" className={styles.logo} onClick={() => scrollToSection('home')}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/assets/Camshhot original.jpeg" alt="CamShoot" style={{ height: '70px', marginBottom: '16px', borderRadius: '8px' }} />
                        </Link>
                        <p className={styles.text}>
                            Capturing moments, creating stories. We are a professional cinematography team dedicated to preserving your memories.
                        </p>
                        <div className={styles.socials}>
                            <a href="https://www.instagram.com/cam__shoot" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/people/CAM-SHOOT/61588472138922/?rdid=O1U0Nhd9Y6IbDRp7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1G46UPCKa1%2F%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 0 1 2-2h3z"></path>
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/@CAMSHOOT-o6x" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="YouTube">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className={styles.col}>
                        <h3 className={styles.colTitle}>Quick Links</h3>
                        <ul className={styles.links}>
                            <li><button onClick={() => scrollToSection('home')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', font: 'inherit' }}>Home</button></li>
                            <li><button onClick={() => scrollToSection('about')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', font: 'inherit' }}>About Us</button></li>
                            <li><button onClick={() => scrollToSection('services')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', font: 'inherit' }}>Services</button></li>
                            <li><button onClick={() => scrollToSection('contact')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', font: 'inherit' }}>Booking</button></li>
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h3 className={styles.colTitle}>Services</h3>
                        <ul className={styles.links}>
                            <li><button onClick={() => scrollToSection('services')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', font: 'inherit' }}>Wedding Films</button></li>
                            <li><button onClick={() => scrollToSection('services')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', font: 'inherit' }}>Corporate Events</button></li>
                            <li><button onClick={() => scrollToSection('services')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', font: 'inherit' }}>Music Videos</button></li>
                            <li><button onClick={() => scrollToSection('services')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', font: 'inherit' }}>Commercials</button></li>
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h3 className={styles.colTitle}>Contact</h3>
                        <ul className={styles.links}>
                            <li>+91 72070 07017</li>
                            <li>camshoot3313@gmail.com</li>
                            <li>Hyderabad, India</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} CamShoot. All rights reserved.</p>
                    <p style={{ marginTop: '8px', fontSize: '0.9em', opacity: 0.8 }}>
                        Designed And Developed By <a href="https://www.linkedin.com/in/saikiranudayana/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#fa8112', fontWeight: 'bold' }}>Sai Kiran Udayana</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
