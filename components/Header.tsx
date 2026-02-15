"use client";
import Link from 'next/link';
import { useBooking } from '@/context/BookingContext';
import styles from './Header.module.css';

const Header = () => {
    const { openBooking } = useBooking();

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80; // Height of fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.navContainer}>
                <Link href="/" className={styles.logo} onClick={() => scrollToSection('home')}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/logo.png" alt="CamShoot" style={{ height: '60px', borderRadius: '8px' }} />
                </Link>

                <nav className={styles.navLinks}>
                    <button onClick={() => scrollToSection('home')} className={styles.navLink} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>Home</button>
                    <button onClick={() => scrollToSection('about')} className={styles.navLink} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>About</button>
                    <button onClick={() => scrollToSection('services')} className={styles.navLink} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>Services</button>
                    <button onClick={() => scrollToSection('portfolio')} className={styles.navLink} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>Portfolio</button>
                    <button onClick={() => scrollToSection('contact')} className={styles.navLink} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>
                        Contact
                    </button>
                </nav>

                <div className={styles.actions}>
                    <button onClick={() => openBooking()} className="btn btn-gold" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                        Book Now
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
