"use client";
import React from 'react';
import { useBooking } from '@/context/BookingContext';
import styles from './Packages.module.css';

// SVG Icons matching the reference style (Outline, Orange Theme)
const VideoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
);

const ClockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const EditIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const FlashIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
);

const CameraIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
    </svg>
);

const StarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const ReelIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
        <line x1="17" y1="17" x2="22" y2="17" />
    </svg>
);


const PACKAGES = [
    {
        id: 'pro',
        name: 'PRO',
        price: 4999,
        dronePrice: null,
        isPopular: false,
        buttonColor: 'black',
        features: [
            { text: '1 Reel - 45s to 1 Min', icon: <ReelIcon /> },
            { text: '4K Quality', icon: <StarIcon /> },
            { text: 'Up to 2 Hr Shoot', icon: <ClockIcon /> },
            { text: 'Edited within 1.5 Hr', icon: <EditIcon /> },
            { text: 'No RAW Data', icon: <CameraIcon /> },
        ]
    },
    {
        id: 'pro_plus',
        name: 'PRO+',
        price: 8999,
        dronePrice: 3499,
        isPopular: true,
        buttonColor: 'orange',
        features: [
            { text: '2 Reels - 45s to 1 Min', icon: <ReelIcon /> },
            { text: '4K Quality', icon: <StarIcon /> },
            { text: 'Up to 3.5 Hr Shoot', icon: <ClockIcon /> },
            { text: 'Quick Same-Day Delivery', icon: <FlashIcon /> },
            { text: 'Raw data included', icon: <CameraIcon /> },
        ]
    },
    {
        id: 'pro_max',
        name: 'PRO MAX',
        price: 13999,
        dronePrice: 3999,
        isPopular: true,
        buttonColor: 'orange',
        features: [
            { text: '3 Reels - 45s to 1 Min', icon: <ReelIcon /> },
            { text: '4K Quality', icon: <StarIcon /> },
            { text: 'Up to 5 Hr Shoot', icon: <ClockIcon /> },
            { text: 'Fast Same-Day Delivery', icon: <FlashIcon /> },
            { text: 'Raw data included', icon: <CameraIcon /> },
        ]
    }
];

const Packages = () => {
    const { openBooking } = useBooking();

    return (
        <section className={styles.packages} id="packages">
            <div className="container">
                <div className={styles.headerContainer}>
                    {/* Updated Title */}
                    <h2 className={styles.title}>
                        CRAFT YOUR <span className="text-gold">MEMORIES</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Professional photography and videography packages designed for every need and budget
                    </p>
                </div>

                <div className={styles.grid}>
                    {PACKAGES.map((pkg, index) => (
                        <div key={index} className={`${styles.card} ${pkg.isPopular ? styles.popularCard : ''}`}>
                            {pkg.isPopular && (
                                <div className={styles.popularBadge}>
                                    <span>☆ POPULAR</span>
                                </div>
                            )}

                            {/* Header Button-like */}
                            <div className={`${styles.cardHeader} ${pkg.buttonColor === 'black' ? styles.headerBlack : styles.headerOrange}`}>
                                {pkg.name}
                            </div>

                            {/* Features */}
                            <div className={styles.cardBody}>
                                <ul className={styles.features}>
                                    {pkg.features.map((feature, i) => (
                                        <li key={i}>
                                            <span className={styles.icon}>{feature.icon}</span>
                                            {feature.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Drone Add-on Info */}
                            {pkg.dronePrice && (
                                <div className={styles.droneInfo}>
                                    Drone (₹{pkg.dronePrice.toLocaleString('en-IN')})
                                </div>
                            )}

                            {/* Price */}
                            <div className={styles.priceContainer}>
                                <div className={styles.price}>
                                    ₹{pkg.price.toLocaleString('en-IN')}/-
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className={styles.actionContainer}>
                                <button
                                    onClick={() => openBooking(pkg.id)}
                                    className={`${styles.chooseBtn} ${pkg.buttonColor === 'black' ? styles.btnBlack : styles.btnOrange}`}
                                >
                                    Choose Package
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* WEDDING PACKAGES + ADD-ONS SIDE BY SIDE */}
                <div className={styles.bottomRow}>
                    {/* WEDDING PACKAGES - LEFT */}
                    <div className={styles.weddingCard}>
                        <div className={styles.weddingHeader}>WEDDING PACKAGES</div>
                        <p className={styles.weddingDesc}>
                            We capture your entire wedding with our exclusive photo & video packages.
                        </p>
                        <p className={styles.weddingCta}>
                            💌 For package details, get in touch with us today!
                        </p>
                        <h4 className={styles.weddingContactTitle}>Contact</h4>
                        <div className={styles.weddingContactList}>
                            <div className={styles.weddingContactRow}>
                                <span className={styles.weddingContactLabel}>Instagram</span>
                                <a href="https://www.instagram.com/cam__shoot" target="_blank" rel="noopener noreferrer" className={styles.weddingContactValue}>@cam__shoot</a>
                            </div>
                            <div className={styles.weddingContactRow}>
                                <span className={styles.weddingContactLabel}>WhatsApp</span>
                                <a href="https://wa.me/917207007017" target="_blank" rel="noopener noreferrer" className={styles.weddingContactValue}>+91 72070 07017</a>
                            </div>
                            <div className={styles.weddingContactRow}>
                                <span className={styles.weddingContactLabel}>Mail</span>
                                <a href="mailto:camshoot3313@gmail.com" className={styles.weddingContactValue}>camshoot3313@gmail.com</a>
                            </div>
                        </div>
                    </div>

                    {/* ADD-ONS - RIGHT */}
                    <div className={styles.addonsCard}>
                        <div className={styles.addonsHeader}>ADD ON&apos;S</div>
                        <div className={styles.addonsBody}>
                            <div className={styles.addonsRow}>
                                <span className={styles.addonsName}>Drone Shoot</span>
                                <span className={styles.addonsPrice}>₹3,499 - ₹3,999/-</span>
                            </div>
                            <div className={styles.addonsRow}>
                                <span className={styles.addonsName}>Extra Video</span>
                                <span className={styles.addonsPrice}>₹1,499/-</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Packages;
