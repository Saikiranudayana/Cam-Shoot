"use client";
import { useState } from 'react';
import styles from './PartnerForm.module.css';

const PartnerForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        whatsapp: '',
        email: '',
        portfolio: '', // Instagram/Drive
        location: '',
        experience: '', // Have you shot/edited reels before?
        ownKit: '', // Do you have own kit?
        hasLaptop: '', // For instant edits
        hasVehicle: '', // For travel
        reason: '' // Why choose CamShoot?
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('/api/partners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({
                    fullName: '', gender: '', whatsapp: '', email: '', portfolio: '',
                    location: '', experience: '', ownKit: '', hasLaptop: '', hasVehicle: '', reason: ''
                });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className={styles.successMessage}>
                <h2>Application Submitted! 🎉</h2>
                <p>Thank you for your interest in partnering with CamShoot. We will review your details and get back to you soon.</p>
                <button onClick={() => setStatus('idle')} className="btn btn-gold">Submit Another</button>
            </div>
        );
    }

    return (
        <section className={styles.container}>
            <h1 className={styles.title}>BECOME A PARTNER</h1>
            <p className={styles.subtitle}>Join our creative network of cinematographers and editors.</p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <label>Full Name *</label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>

                <div className={styles.group}>
                    <label>Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className={styles.group}>
                    <label>WhatsApp Number *</label>
                    <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required placeholder="+91" />
                </div>

                <div className={styles.group}>
                    <label>Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className={styles.group}>
                    <label>Portfolio / Instagram / Drive Link *</label>
                    <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} required placeholder="https://..." />
                </div>

                <div className={styles.group}>
                    <label>Your Current Location *</label>
                    <input name="location" value={formData.location} onChange={handleChange} required />
                </div>

                <div className={styles.group}>
                    <label>Have You Shot or Edit Reels Before? *</label>
                    <select name="experience" value={formData.experience} onChange={handleChange} required>
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className={styles.group}>
                    <label>Do You Have Own Kit? *</label>
                    <select name="ownKit" value={formData.ownKit} onChange={handleChange} required>
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Partial">Partial</option>
                    </select>
                </div>

                <div className={styles.group}>
                    <label>Do You Have Laptop For Instant Reel Edits? *</label>
                    <select name="hasLaptop" value={formData.hasLaptop} onChange={handleChange} required>
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className={styles.group}>
                    <label>Do You Have Vehicle For Travel? *</label>
                    <select name="hasVehicle" value={formData.hasVehicle} onChange={handleChange} required>
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className={styles.group}>
                    <label>Any Reason For Choosing CAMSHOOT! *</label>
                    <textarea name="reason" value={formData.reason} onChange={handleChange} required rows={3}></textarea>
                </div>

                <button type="submit" className={`btn btn-gold ${styles.submitBtn}`} disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Submitting...' : 'Apply Now'}
                </button>

                {status === 'error' && <p className={styles.error}>Something went wrong. Please try again.</p>}
            </form>
        </section>
    );
};

export default PartnerForm;
