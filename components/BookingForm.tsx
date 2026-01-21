"use client";
import styles from './BookingForm.module.css';

const BookingForm = () => {
    return (
        <section className={styles.booking} id="contact">
            <div className="container">
                <div className={styles.twoCol}>
                    <div className={styles.info}>
                        <h2 className={styles.infoTitle}>
                            Let's Create <span className="text-gold">Magic</span>
                        </h2>
                        <p className={styles.infoText}>
                            Ready to capture your special moments? Fill out the form to book your session or get a quote. We'd love to hear from you.
                        </p>

                        <div className={styles.contactDetails}>
                            <div>
                                <span className={styles.contactIcon}>📞</span>
                                <span>+91 99999 99999</span>
                            </div>
                            <div>
                                <span className={styles.contactIcon}>📧</span>
                                <span>canmshota@gmail.com</span>
                            </div>
                            <div>
                                <span className={styles.contactIcon}>📍</span>
                                <span>Hyderabad, India</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formContainer}>
                        <h3 className={styles.formTitle}>Book a Shoot</h3>
                        <form>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Full Name</label>
                                <input type="text" className={styles.input} placeholder="John Doe" required />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email Address</label>
                                <input type="email" className={styles.input} placeholder="john@example.com" required />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Phone Number</label>
                                <input type="tel" className={styles.input} placeholder="+91 99999 99999" required />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Event Type</label>
                                <select className={styles.select}>
                                    <option>Wedding Photography</option>
                                    <option>Corporate Event</option>
                                    <option>Personal Branding</option>
                                    <option>Music Video</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Event Date</label>
                                <input type="date" className={styles.input} />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Message</label>
                                <textarea className={styles.textarea} placeholder="Tell us more about your requirements..."></textarea>
                            </div>

                            <button type="button" className="btn btn-gold" style={{ width: '100%' }}>
                                Proceed to Pay Advance (Rs. 1000)
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingForm;
