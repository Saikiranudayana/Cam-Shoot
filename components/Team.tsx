'use client';

import { useState } from 'react';
import styles from './Team.module.css';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const Team = () => {
  const founder: TeamMember = {
    name: 'Mahi',
    role: 'Founder & CEO',
    image: '/assets/mahi.jpg.jpeg',
  };

  const leadershipTeam: TeamMember[] = [
    { name: 'Shashi', role: 'Leadership', image: '/assets/Shashi.jpg.jpeg' },
    { name: 'Sri Hari', role: 'Leadership', image: '/assets/Sri hari.jpg.jpeg' },
    { name: 'Chandar', role: 'Leadership', image: '/assets/chandar.jpg.jpeg' },
    { name: 'Jumbo', role: 'Leadership', image: '/assets/jumbo.jpg.jpeg' },
    { name: 'Srinivas', role: 'Leadership', image: '/assets/srinivas.jpg.jpeg' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % leadershipTeam.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + leadershipTeam.length) % leadershipTeam.length);
  };

  const currentMember = leadershipTeam[currentIndex];

  return (
    <section className={styles.team}>
      <div className="container">
        <h2 className={styles.title}>
          Our <span className="text-gold">Team</span>
        </h2>

        <div className={styles.teamContent}>
          {/* Founder Section */}
          <div className={styles.founderSection}>
            <div className={styles.founderCard}>
              <div className={styles.founderImage}>
                <img src={founder.image} alt={founder.name} />
                <div className={styles.founderBadge}>✕</div>
              </div>
              <div className={styles.founderInfo}>
                <h3 className={styles.companyName}>CamShoot</h3>
                <p className={styles.founderRole}>{founder.role}</p>
                <p className={styles.founderName}>{founder.name}</p>
              </div>
            </div>
          </div>

          {/* Leadership Team Section */}
          <div className={styles.leadershipSection}>
            <h3 className={styles.leadershipTitle}>Leadership Team</h3>

            <div className={styles.leadershipCarousel}>
              <button
                className={styles.carouselButton}
                onClick={handlePrev}
                aria-label="Previous member"
              >
                ‹
              </button>

              <div className={styles.memberCard}>
                <div className={styles.memberImage}>
                  <img src={currentMember.image} alt={currentMember.name} />
                  <div className={styles.memberBadge}>✕</div>
                </div>
                <div className={styles.memberInfo}>
                  <h4 className={styles.memberName}>{currentMember.name}</h4>
                  <p className={styles.memberRole}>{currentMember.role}</p>
                </div>
              </div>

              <button
                className={styles.carouselButton}
                onClick={handleNext}
                aria-label="Next member"
              >
                ›
              </button>
            </div>

            {/* Dots Indicator */}
            <div className={styles.dotsContainer}>
              {leadershipTeam.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to member ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
