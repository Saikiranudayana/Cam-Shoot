"use client";
import styles from './WhyChooseUs.module.css';

const QualityIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 54 L22 62 L22 46 A22 22 0 0 1 10 24 A22 22 0 0 1 54 24 A22 22 0 0 1 42 46 L42 62 L32 54" />
        <circle cx="32" cy="24" r="16" />
        <path d="M26 28 H22 V20 H26 L28 16 C28 16 30 14 32 16 C34 18 34 22 34 22 H40 V28 H26" strokeWidth="2" />
    </svg>
);

const FastDeliveryIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 10 L50 32 L35 32 L40 54 L14 32 L28 32 Z" fill="currentColor" />
    </svg>
);

const EquipmentIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="20" y="16" width="24" height="16" rx="2" />
        <circle cx="32" cy="24" r="5" />
        <rect x="44" y="18" width="6" height="4" />
        <path d="M16 24 C12 24 10 28 10 32 V40 H14" />
        <path d="M48 24 C52 24 54 28 54 32 V40 H50" />
        <path d="M32 32 V54" />
        <rect x="28" y="54" width="8" height="8" rx="1" />
        <path d="M14 40 H50" />
    </svg>
);

const PriceIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="24" />
        <path d="M32 16 V48" />
        <path d="M24 24 H38 C42 24 42 32 38 32 H24" />
        <path d="M24 32 H40 C44 32 44 40 40 40 H24" />
    </svg>
);

const WhyChooseUs = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>
                        WHY CHOOSE <span className={styles.highlight}>CAMSHOOT?</span>
                    </h2>
                    <p className={styles.subtitle}>
                        We specialize in delivering high-quality photography and videography services that turn your moments into cinematic memories.
                    </p>

                    <div className={styles.features}>
                        <div className={styles.featureItem}>
                            <div className={styles.iconWrapper}>
                                <PriceIcon />
                            </div>
                            <div className={styles.featureContent}>
                                <h3>AFFORDABLE PRICING</h3>
                                <p>Premium quality cinematography at prices that fit every budget. No hidden costs.</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.iconWrapper}>
                                <EquipmentIcon />
                            </div>
                            <div className={styles.featureContent}>
                                <h3>HIGH-END EQUIPMENT</h3>
                                <p>We use 4K cinematic cameras, gimbals, drones & professional lighting for the best output.</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.iconWrapper}>
                                <FastDeliveryIcon />
                            </div>
                            <div className={styles.featureContent}>
                                <h3>SAME DAY DELIVERY</h3>
                                <p>Get your edited reels and highlights delivered on the same day. Fast turnaround guaranteed.</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.iconWrapper}>
                                <QualityIcon />
                            </div>
                            <div className={styles.featureContent}>
                                <h3>BEST QUALITY OUTPUT</h3>
                                <p>We combine artistic vision with cinematic storytelling to deliver premium, polished content.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.imageContainer}>
                    <div className={styles.imageFrame}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/assets/Camshoot.jpeg"
                            alt="CamShoot Team"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
