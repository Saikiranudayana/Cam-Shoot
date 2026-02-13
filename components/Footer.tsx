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
                            <img src="/assets/logo.png" alt="CamShoot" style={{ height: '70px', marginBottom: '16px', borderRadius: '8px' }} />
                        </Link>
                        <p className={styles.text}>
                            Capturing moments, creating stories. We are a professional cinematography team dedicated to preserving your memories.
                        </p>
                        <div className={styles.socials}>
                            <a href="#" className={styles.socialIcon}>IN</a>
                            <a href="#" className={styles.socialIcon}>FB</a>
                            <a href="#" className={styles.socialIcon}>YT</a>
                        </div>
                    </div>

                    <div className={styles.col}>
                        <h3 className={styles.colTitle}>Quick Links</h3>
                        <ul className={styles.links}>
                            <li><button onClick={() => scrollToSection('home')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', font: 'inherit' }}>Home</button></li>
                            <li><button onClick={() => scrollToSection('about')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', font: 'inherit' }}>About Us</button></li>
                            <li><button onClick={() => scrollToSection('services')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', font: 'inherit' }}>Services</button></li>
                            <li><button onClick={() => scrollToSection('portfolio')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', font: 'inherit' }}>Portfolio</button></li>
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
                            <li>+91 99999 99999</li>
                            <li>canmshota@gmail.com</li>
                            <li>Hyderabad, India</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} CamShoot. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
