import React from 'react';
// import './about.css'; // Import CSS for styling
import '../style/about.css'

const About = () => {
  return (
    <div className="about">
      <h1>About Us</h1>
      <p className="tagline">Cultivating Innovation in Agriculture</p>

      <div className="about-content">
        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            At AgriTech Solutions, our mission is to empower farmers and gardeners with cutting-edge technology and data-driven insights to optimize crop health, improve yields, and promote sustainable farming practices.
          </p>
        </section>

        <section className="vision">
          <h2>Our Vision</h2>
          <p>
            We envision a world where agriculture is efficient, eco-friendly, and accessible to everyone. By leveraging technology, we aim to bridge the gap between traditional farming and modern innovation.
          </p>
        </section>

        <section className="values">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Sustainability:</strong> We prioritize eco-friendly solutions to protect the environment.</li>
            <li><strong>Innovation:</strong> We constantly innovate to bring the best tools and practices to our users.</li>
            <li><strong>Empowerment:</strong> We empower farmers with knowledge and resources to succeed.</li>
            <li><strong>Community:</strong> We believe in building a strong, supportive farming community.</li>
          </ul>
        </section>

        <section className="team">
          <h2>Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <h3>Hitesh Bhosale</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <h3>Hitesh Bhosale</h3>
              <p>Head of Agriculture</p>
            </div>
            <div className="team-member">
              <h3>Hitesh Bhosale</h3>
              <p>Lead Developer</p>
            </div>
          </div>
        </section>

        <section className="achievements">
          <h2>Our Achievements</h2>
          <ul>
            <li>Over 10,000 farmers using our platform.</li>
            <li>Recognized as "Best AgriTech Startup 2023" by GreenTech Awards.</li>
            <li>Reduced water usage by 30% for our users through smart irrigation solutions.</li>
          </ul>
        </section>

        <section className="call-to-action">
          <h2>Join Us in Revolutionizing Agriculture</h2>
          <p>
            Whether you're a farmer, gardener, or just passionate about sustainable agriculture, we invite you to join our community and be part of the change.
          </p>
          <button className="cta-button">Get Started</button>
        </section>
      </div>
    </div>
  );
};

export default About;