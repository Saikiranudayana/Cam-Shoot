import styles from './Services.module.css';

const services = [
    {
        title: "Event Shoots",
        description: "Capture the energy and emotion of your special events with our dynamic coverage.",
        icon: "🎉"
    },
    {
        title: "Wedding Shoots",
        description: "Timeless cinematic storytelling for your big day. Relive every moment.",
        icon: "💍"
    },
    {
        title: "Corporate Shoots",
        description: "Professional coverage for conferences, brand launches, and corporate films.",
        icon: "🏢"
    },
    {
        title: "Personal Branding",
        description: "Elevate your personal brand with high-quality photo and video content.",
        icon: "👤"
    },
    {
        title: "Social Media Content",
        description: "Engaging short-form content designed to go viral on Instagram and TikTok.",
        icon: "📱"
    }
];

const Services = () => {
    return (
        <section className={styles.services} id="services">
            <div className="container">
                <h2 className={styles.title}>
                    Our <span className="text-gold">Services</span>
                </h2>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.icon}>{service.icon}</div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDesc}>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
