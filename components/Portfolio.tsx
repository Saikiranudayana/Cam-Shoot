import styles from './Portfolio.module.css';

const portfolioItems = [
    { id: 1, title: "Grand Wedding", category: "Wedding", image: "/assets/camshoot-1.jpeg" },
    { id: 2, title: "Corporate Event", category: "Corporate", image: "/assets/Camshoot.jpeg" }, // reusing existing images
    { id: 3, title: "Fashion Shoot", category: "Personal", image: "/assets/camshoot-1.jpeg" },
    { id: 4, title: "Product Launch", category: "Corporate", image: "/assets/Camshoot.jpeg" },
    { id: 5, title: "Birthday Bash", category: "Event", image: "/assets/camshoot-1.jpeg" },
    { id: 6, title: "Music Video", category: "Video", image: "/assets/Camshoot.jpeg" },
];

const Portfolio = () => {
    return (
        <section className={styles.portfolio} id="portfolio">
            <div className="container">
                <h2 className={styles.title}>
                    Latest <span className="text-gold">Work</span>
                </h2>

                <div className={styles.grid}>
                    {portfolioItems.map((item) => (
                        <div key={item.id} className={styles.item}>
                            {/* Using img tag for now to avoid Next.js Image configuration complexity with external urls if any, 
                   but here we use local assets so Next Image is better, but simple img ensures it works without width/height strictness 
                   unless we use fill prop */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.image} alt={item.title} className={styles.image} />
                            <div className={styles.overlay}>
                                <h3 className={styles.itemTitle}>{item.title}</h3>
                                <span className={styles.itemCategory}>{item.category}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex-center" style={{ marginTop: '40px' }}>
                    <a href="/portfolio" className="btn btn-outline">View All Projects</a>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
