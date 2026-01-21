import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.col}>
                        <h3 className={`${styles.colTitle} ${styles.logo}`}>
                            CAM<span>SHOOT</span>
                        </h3>
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
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/services">Services</Link></li>
                            <li><Link href="/portfolio">Portfolio</Link></li>
                            <li><Link href="/contact">Booking</Link></li>
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h3 className={styles.colTitle}>Services</h3>
                        <ul className={styles.links}>
                            <li><Link href="/services">Wedding Films</Link></li>
                            <li><Link href="/services">Corporate Events</Link></li>
                            <li><Link href="/services">Music Videos</Link></li>
                            <li><Link href="/services">Commercials</Link></li>
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h3 className={styles.colTitle}>Contact</h3>
                        <ul className={styles.links}>
                            <li>+91 98765 43210</li>
                            <li>hello@camshoot.com</li>
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
