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


            </div>
        </section>
    );
};

export default About;
