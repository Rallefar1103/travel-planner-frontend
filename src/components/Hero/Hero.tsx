import React from "react";
import HeroImage from "../../assets/hero-image.jpg"; // Replace with your actual image path
import "./Hero.css";

interface HeroProps {
  onGetStartedClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStartedClick }) => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${HeroImage})` }}>
      <div className="hero-text-box">
        <h1>City Travel Planner</h1>
        <div className="button-group">
          <button onClick={onGetStartedClick}>Get Started</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
