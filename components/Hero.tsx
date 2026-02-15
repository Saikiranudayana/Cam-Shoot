"use client";
import Link from 'next/link';
import { useBooking } from '@/context/BookingContext';
import styles from './Hero.module.css';

const Hero = () => {
    const { openBooking } = useBooking();

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
        <section className={styles.hero}>


            <div className={styles.content}>
                <h1 className={styles.title}>
                    We Shoot the Moment,<br />
                    <span className="text-gold">We Deliver the Emotion.</span>
                </h1>

                <p className={styles.subtitle}>
                    Professional cinematography and photography for events, weddings, and brands.
                </p>

                <div className={styles.buttons}>
                    <button onClick={() => openBooking()} className="btn btn-gold">
                        Book a Shoot
                    </button>

                    <Link href="/partner" className="btn btn-outline" style={{ color: 'var(--color-gold)', borderColor: 'var(--color-gold)', marginLeft: '10px' }}>
                        Become a Partner
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
