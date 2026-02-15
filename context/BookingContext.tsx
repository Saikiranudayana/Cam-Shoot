"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingContextType {
    isBookingOpen: boolean;
    openBooking: (packageId?: string) => void;
    closeBooking: () => void;
    preSelectedPackage: string | null;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [preSelectedPackage, setPreSelectedPackage] = useState<string | null>(null);

    const openBooking = (packageId?: string) => {
        if (packageId) setPreSelectedPackage(packageId);
        setIsBookingOpen(true);
    };

    const closeBooking = () => {
        setIsBookingOpen(false);
        // We can clear preSelectedPackage after a delay or keep it. 
        // Clearing it ensures next open without args defaults to 'pro' if that's logic, 
        // but let's just leave it or clear it.
        setTimeout(() => setPreSelectedPackage(null), 500);
    };

    return (
        <BookingContext.Provider value={{ isBookingOpen, openBooking, closeBooking, preSelectedPackage }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
