"use client";
import Link from 'next/link';
import { useBooking } from '@/context/BookingContext';
import styles from './Header.module.css';

const Header = () => {
    const { openBooking } = useBooking();

    return (
        <header className={styles.header}>
            <div className={styles.navContainer}>
                <Link href="/" className={styles.logo}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/logo-final.jpg" alt="CamShoot" style={{ height: '50px' }} />
                </Link>

                <nav className={styles.navLinks}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/about" className={styles.navLink}>About</Link>
                    <Link href="/services" className={styles.navLink}>Services</Link>
                    <Link href="/portfolio" className={styles.navLink}>Portfolio</Link>
                    <button onClick={openBooking} className={styles.navLink} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                        Contact
                    </button>
                </nav>

                <div className={styles.actions}>
                    <button onClick={openBooking} className="btn btn-gold" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                        Book Now
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
