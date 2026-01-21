import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            {/* Background Image - Placeholder until we set correct path */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/assets/Camshoot.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0
                }}
            />

            <div className={styles.overlay} />

            <div className={styles.content}>
                <h1 className={styles.title}>
                    Capturing Moments.<br />
                    <span className="text-gold">Creating Stories.</span>
                </h1>

                <p className={styles.subtitle}>
                    Professional cinematography and photography for events, weddings, and brands.
                </p>

                <div className={styles.buttons}>
                    <Link href="/contact" className="btn btn-gold">
                        Book a Shoot
                    </Link>
                    <Link href="/portfolio" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
                        View Portfolio
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
