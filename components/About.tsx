import styles from './About.module.css';

const About = () => {
    return (
        <section className={styles.about} id="about">
            <div className="container">
                <h2 className={styles.title}>
                    About <span className="text-gold">CamShoot</span>
                </h2>

                <p className={styles.description}>
                    At CamShoot, we don't just record video; we <span className={styles.highlight}>craft cinematic experiences</span>.
                    Founded with a passion for storytelling, our professional cinematography crew specializes in capturing the essence of your most important moments.
                    From weddings to corporate events, we bring a creative eye and technical excellence to every project, ensuring your memories are preserved in stunning detail.
                </p>

                <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                        <h3>5+</h3>
                        <p>Years Experience</p>
                    </div>
                    <div className={styles.statItem}>
                        <h3>200+</h3>
                        <p>Projects Delivered</p>
                    </div>
                    <div className={styles.statItem}>
                        <h3>100%</h3>
                        <p>Client Satisfaction</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
