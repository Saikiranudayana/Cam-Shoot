import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.navContainer}>
                <Link href="/" className={styles.logo}>
                    CAM<span>SHOOT</span>
                </Link>

                <nav className={styles.navLinks}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/about" className={styles.navLink}>About</Link>
                    <Link href="/services" className={styles.navLink}>Services</Link>
                    <Link href="/portfolio" className={styles.navLink}>Portfolio</Link>
                    <Link href="/contact" className={styles.navLink}>Contact</Link>
                </nav>

                <div className={styles.actions}>
                    <Link href="/contact" className="btn btn-gold" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                        Book Now
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
