import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";
import "./About.css";

const About = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [animatedStats, setAnimatedStats] = useState({
    hackathons: 0,
    participants: 0,
    projects: 0,
    partners: 0,
  });

  // Animate numbers on component mount
  useEffect(() => {
    const finalStats = {
      hackathons: 50,
      participants: 1000,
      projects: 200,
      partners: 50,
    };

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        hackathons: Math.floor(finalStats.hackathons * progress),
        participants: Math.floor(finalStats.participants * progress),
        projects: Math.floor(finalStats.projects * progress),
        partners: Math.floor(finalStats.partners * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(finalStats);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`about-page ${isDarkMode ? "dark-theme" : "light-theme"}`}>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">About Techinfluence</h1>
          <p className="about-subtitle">
            Empowering the next generation of tech innovators through
            hackathons, community building, and educational content.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section mission-section">
        <div className="container">
          <div className="section-content">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-description">
              At Techinfluence, we believe in the power of technology to solve
              real-world problems and create positive change. Our mission is to
              provide a platform where passionate developers, designers, and
              innovators can come together to learn, create, and inspire each
              other through collaborative projects and competitive hackathons.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-section features-section">
        <div className="container">
          <h2 className="section-title">What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Organized Hackathons</h3>
              <p className="feature-description">
                Participate in exciting hackathons with themes ranging from AI
                and blockchain to sustainability and social impact. Build
                innovative solutions with like-minded individuals.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.7071C21.7033 16.0601 20.9889 15.6137 20.2 15.441M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 18.9972 6.11683 18.9972 7.005C18.9972 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Community Building</h3>
              <p className="feature-description">
                Connect with developers, designers, entrepreneurs, and tech
                enthusiasts from around the world. Build lasting professional
                relationships and mentorship opportunities.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.7 6.3C15.9 7.5 15.9 9.5 14.7 10.7L10.7 14.7C9.5 15.9 7.5 15.9 6.3 14.7C5.1 13.5 5.1 11.5 6.3 10.3L10.3 6.3C11.5 5.1 13.5 5.1 14.7 6.3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 21L16 13M15 8L17 6M18 10L20 8M12 3L14 1M6 9L4 7M3 14L1 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Educational Content</h3>
              <p className="feature-description">
                Access high-quality tutorials, workshops, and educational videos
                covering the latest technologies, programming languages, and
                development frameworks.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Recognition & Rewards</h3>
              <p className="feature-description">
                Showcase your skills and win exciting prizes. Build your
                portfolio with real projects and gain recognition in the tech
                community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="about-section stats-section">
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{animatedStats.hackathons}+</div>
              <div className="stat-label">Hackathons Organized</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{animatedStats.participants}+</div>
              <div className="stat-label">Participants</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{animatedStats.projects}+</div>
              <div className="stat-label">Projects Created</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{animatedStats.partners}+</div>
              <div className="stat-label">Partner Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3 className="value-title">Innovation</h3>
              <p className="value-description">
                We encourage creative thinking and innovative solutions to
                tackle complex challenges in technology and society.
              </p>
            </div>
            <div className="value-item">
              <h3 className="value-title">Collaboration</h3>
              <p className="value-description">
                We believe in the power of teamwork and collective intelligence
                to achieve extraordinary results.
              </p>
            </div>
            <div className="value-item">
              <h3 className="value-title">Inclusivity</h3>
              <p className="value-description">
                We welcome participants from all backgrounds, experience levels,
                and perspectives to create a diverse community.
              </p>
            </div>
            <div className="value-item">
              <h3 className="value-title">Learning</h3>
              <p className="value-description">
                We foster continuous learning and skill development through
                hands-on experience and knowledge sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section team-section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p className="section-description">
            Meet the passionate individuals behind Techinfluence who work
            tirelessly to create amazing experiences for our community.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="member-name">Alex Johnson</h4>
              <p className="member-role">Founder & CEO</p>
              <p className="member-description">
                Passionate about technology and community building with 10+
                years of experience in organizing tech events.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="member-name">Sarah Chen</h4>
              <p className="member-role">Technical Director</p>
              <p className="member-description">
                Full-stack developer and mentor who loves helping others learn
                and grow in their technical journey.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="member-name">Michael Rodriguez</h4>
              <p className="member-role">Community Manager</p>
              <p className="member-description">
                Dedicated to building strong relationships and fostering
                collaboration within our growing community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="about-section contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-description">
            Have questions or want to get involved? We&apos;d love to hear from
            you!
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="22,6 12,13 2,6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>contact@techinfluence.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="contact-details">
                <h4>Location</h4>
                <p>BZAWADA, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
