"use client";
import styles from './BookingForm.module.css';
import { useBooking } from '@/context/BookingContext';

const BookingForm = () => {
    const { openBooking } = useBooking();

    return (
        <section className={styles.booking} id="contact">
            <div className="container">
                <div className={styles.twoCol}>
                    <div className={styles.info}>
                        <h2 className={styles.infoTitle}>
                            Let's Create <span className="text-gold">Magic</span>
                        </h2>
                        <p className={styles.infoText}>
                            Ready to capture your special moments? Click the button below to start your booking process. We can't wait to work with you!
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

                        <div style={{ marginTop: '30px' }}>
                            <button onClick={openBooking} className="btn btn-gold">
                                Start Booking
                            </button>
                        </div>
                    </div>

                    <div className={styles.formContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', backgroundImage: 'url(/assets/Camshoot.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '16px' }}>
                        {/* You could put an image or a simple card here */}
                        <div style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
                            <h3>Professional Shoots</h3>
                            <p>Weddings • Events • Portraits</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingForm;
