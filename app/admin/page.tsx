"use client";
import { useEffect, useState } from 'react';

export default function AdminPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/bookings')
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading bookings...</div>;

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '30px', borderBottom: '2px solid var(--color-gold)', display: 'inline-block', paddingBottom: '10px' }}>
                Booking Management
            </h1>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', backgroundColor: '#f9fafb', color: '#6b7280', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                            <th style={{ padding: '15px' }}>Booking ID</th>
                            <th style={{ padding: '15px' }}>Date Submitted</th>
                            <th style={{ padding: '15px' }}>Client Info</th>
                            <th style={{ padding: '15px' }}>Event Details</th>
                            <th style={{ padding: '15px' }}>Package & Addons</th>
                            <th style={{ padding: '15px' }}>Payment</th>
                            <th style={{ padding: '15px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                    No bookings found yet.
                                </td>
                            </tr>
                        ) : (
                            bookings.map((booking: any) => (
                                <tr key={booking.id} style={{ borderBottom: '1px solid #e5e7eb', fontSize: '0.95rem' }}>
                                    <td style={{ padding: '15px', fontFamily: 'monospace' }}>#{booking.id.slice(-6)}</td>
                                    <td style={{ padding: '15px' }}>
                                        {new Date(booking.createdAt).toLocaleDateString()}
                                        <br />
                                        <small style={{ color: '#888' }}>{new Date(booking.createdAt).toLocaleTimeString()}</small>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <strong>{booking.userDetails?.firstName} {booking.userDetails?.lastName}</strong>
                                        <div style={{ fontSize: '0.85rem', color: '#555', marginTop: '4px' }}>
                                            {booking.userDetails?.email}<br />
                                            {booking.userDetails?.phone}
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ fontWeight: '600', color: 'var(--color-gold-dark)' }}>{booking.eventDetails?.type}</span> ({booking.eventDetails?.customType || ''})<br />
                                        <span style={{ fontSize: '0.85rem' }}>📅 {booking.eventDetails?.date} | 🕒 {booking.eventDetails?.time}</span><br />
                                        <span style={{ fontSize: '0.85rem' }}>📍 {booking.eventDetails?.location}</span>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ fontWeight: 'bold' }}>{booking.packageName}</div>
                                        {booking.addons && booking.addons.length > 0 && (
                                            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>
                                                + {booking.addons.join(', ')}
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ fontWeight: 'bold' }}>₹{booking.totalAmount?.toLocaleString('en-IN')}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'green' }}>Paid: ₹{booking.advanceAmount?.toLocaleString('en-IN')}</div>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            backgroundColor: booking.status === 'Confirmed' ? '#d1fae5' : '#fee2e2',
                                            color: booking.status === 'Confirmed' ? '#065f46' : '#991b1b',
                                            textTransform: 'uppercase'
                                        }}>
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
