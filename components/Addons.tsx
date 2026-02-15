"use client";
import styles from './Addons.module.css';

const Addons = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className={styles.card}>
                        <div className={styles.headerContainer}>
                            <h3 className={styles.header}>ADD ON's</h3>
                        </div>
                        <div className={styles.cardBody}>
                            <div className={styles.row}>
                                <span className={styles.itemName}>Drone Shoot</span>
                                <span className={styles.price}>₹1,999/-</span>
                            </div>
                            <div className={styles.row}>
                                <span className={styles.itemName}>Extra Hour</span>
                                <span className={styles.price}>₹1,999/- Per Hour</span>
                            </div>
                            <div className={styles.row}>
                                <span className={styles.itemName}>Extra Video</span>
                                <span className={styles.price}>₹2,999/-</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Addons;
