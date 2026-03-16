"use client";

import { useBooking } from '@/context/BookingContext';
import styles from './BookTab.module.css';

const BookTab = () => {
  const { openBooking } = useBooking();

  return (
    <div className={styles.tab}>
      <button className={styles.button} onClick={() => openBooking()}>
        <span className={styles.label}>Book Now</span>
        <span className={styles.subtext}>Quick booking</span>
      </button>
    </div>
  );
};

export default BookTab;
