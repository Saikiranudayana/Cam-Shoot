"use client";
import styles from './WhyChooseUs.module.css';

// --- Icons ---

const QualityIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Badge Ribbon */}
        <path d="M32 54 L22 62 L22 46 A22 22 0 0 1 10 24 A22 22 0 0 1 54 24 A22 22 0 0 1 42 46 L42 62 L32 54" />
        <circle cx="32" cy="24" r="16" />
        {/* Thumbs Up (Simplified) */}
        <path d="M26 28 H22 V20 H26 L28 16 C28 16 30 14 32 16 C34 18 34 22 34 22 H40 V28 H26" strokeWidth="2" />
    </svg>
);

const FastDeliveryIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <text x="32" y="28" textAnchor="middle" fill="currentColor" fontFamily="Arial, sans-serif" fontWeight="bold" fontStyle="italic" fontSize="18" stroke="none">FAST</text>
        <text x="32" y="44" textAnchor="middle" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="10" letterSpacing="1" stroke="none">DELIVERY</text>
        {/* Swoosh lines */}
        <path d="M10 32 Q 32 20 54 32" strokeWidth="2" />
        <path d="M6 36 Q 32 22 58 36" strokeWidth="1.5" opacity="0.6" />
    </svg>
);

const EquipmentIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Camera */}
        <rect x="20" y="16" width="24" height="16" rx="2" />
        <circle cx="32" cy="24" r="5" />
        <rect x="44" y="18" width="6" height="4" />
        {/* Gimbal Structure */}
        <path d="M16 24 C12 24 10 28 10 32 V40 H14" />
        <path d="M48 24 C52 24 54 28 54 32 V40 H50" />
        <path d="M32 32 V54" />
        <rect x="28" y="54" width="8" height="8" rx="1" />
        {/* Stabilizer Arm */}
        <path d="M14 40 H50" />
    </svg>
);

const WhyChooseUs = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>
                        WHAT MAKES <span className="text-gold">CAMSHOOT</span> DIFFERENT?
                    </h2>
                    <p className={styles.text}>
                        We combine artistic vision, cinematic storytelling, and professional editing to turn your moments into lasting memories. With high-quality production and affordable packages, CamShoot delivers excellence without compromise.
                    </p>

                    <div className={styles.features}>
                        <div className={styles.featureItem}>
                            <div className={styles.iconWrapper}>
                                <QualityIcon />
                            </div>
                            <div className={styles.featureContent}>
                                <h3>BEST QUALITY</h3>
                                <p>We Deliver The Premium Quality Output</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.iconWrapper}>
                                <FastDeliveryIcon />
                            </div>
                            <div className={styles.featureContent}>
                                <h3>SAME DAY DELIVERY</h3>
                                <p>You Will Get Fast & Same Day Delivery</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.iconWrapper}>
                                <EquipmentIcon />
                            </div>
                            <div className={styles.featureContent}>
                                <h3>HIGH-END EQUIPMENT</h3>
                                <p>We Have 4k Cinematic Equipment For Best Quality</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.imageContainer}>
                    <div className={styles.imageFrame}>
                        {/* Placeholder for the image from the design. 
                            Ideally, we should use a real image here. 
                            Using a colored block or placeholder for now. */}
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
