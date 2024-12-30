import React from 'react';
import '../styles/LearnMore.css';
import { Link } from 'react-router-dom';

const LearnMore = () => {
  return (
    <div className="learn-more-page">
      <h1>Why Nutritional Supplements Are Essential</h1>
      
      <p>
        Proper nutrition is the foundation of a healthy lifestyle. However, achieving the ideal balance of nutrients through diet alone can be challenging for athletes, bodybuilders, or anyone leading a busy life. Nutritional supplements like creatine, whey protein, and amino acids play a crucial role in optimizing health and performance.
      </p>

      <section className="supplement-section">
        <h2>1. Creatine</h2>
        <p>
          Creatine is one of the most researched and effective supplements available. It's naturally found in your muscles and helps produce energy during high-intensity exercise. Supplementing with creatine can:
        </p>
        <ul>
          <li>Improve strength and muscle mass</li>
          <li>Enhance exercise performance</li>
          <li>Support faster recovery</li>
        </ul>
        <p>
          <strong>Who should take it?</strong> Athletes, bodybuilders, and anyone looking to improve strength and endurance can benefit from creatine.
        </p>
      </section>

      <section className="supplement-section">
        <h2>2. Whey Protein</h2>
        <p>
          Whey protein is a fast-digesting protein derived from milk. It is rich in essential amino acids and is particularly effective at promoting muscle growth and recovery. Benefits include:
        </p>
        <ul>
          <li>Increased muscle protein synthesis</li>
          <li>Enhanced recovery after workouts</li>
          <li>Convenience for meeting daily protein needs</li>
        </ul>
        <p>
          <strong>Who should take it?</strong> Anyone who struggles to meet their daily protein intake or wants to boost post-workout recovery.
        </p>
      </section>

      <section className="supplement-section">
        <h2>3. Amino Acids</h2>
        <p>
          Amino acids are the building blocks of protein, and they play vital roles in muscle repair, energy production, and overall health. Branched-Chain Amino Acids (BCAAs), in particular, are essential for:
        </p>
        <ul>
          <li>Reducing muscle soreness</li>
          <li>Improving exercise performance</li>
          <li>Preventing muscle breakdown</li>
        </ul>
        <p>
          <strong>Who should take it?</strong> Individuals engaging in intense physical activity or those on calorie-restricted diets.
        </p>
      </section>

      <section className="cta-section">
        <h2>Ready to Elevate Your Fitness?</h2>
        <p>
          Explore our range of high-quality nutritional supplements tailored to meet your fitness goals. Start your journey to better health today!
        </p>
        <Link to="/products"><button className="shop-now-button">Shop Now</button></Link>
      </section>
    </div>
  );
};

export default LearnMore;
