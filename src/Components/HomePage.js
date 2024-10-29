import React from 'react';
import { motion } from 'framer-motion';
import DoctorCard from './DoctorCard';
import ReviewSection from './ReviewSection';
import AchievementsSection from './AchievementsSection';
import './HomePage.css';

const HomePage = () => {
  const doctors = [
    { id: 1, name: 'Dr. Prashanth', specialty: 'Cardiologist', image: '/Doctor1.jpg' },
    { id: 2, name: 'Dr. Jan', specialty: 'Dermatologist', image: '/Doctor2.jpg' },
    { id: 3, name: 'Dr. Charu', specialty: 'Pediatrician', image: '/Doctor3.jpg' },
    { id: 4, name: 'Dr. Santhosh', specialty: 'Neurologist', image: '/Doctor4.jpg' },
    { id: 5, name: 'Dr. Santhosh', specialty: 'Neurologist', image: '/Doctor4.jpg' },
  ];

  return (
    <div className="homepage-container">
      <section className="homepage-section homepage-welcome-section">
        <div className="homepage-welcome-grid">
          <motion.div
            className="welcome-image-container"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <img src="Doctor1.jpg" alt="Doctor Team" className="welcome-image shadow-lg" />
          </motion.div>
          <motion.div
            className="welcome-content"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="welcome-title">Welcome to MediCare</h2>
            <p className="welcome-description">
              At MediCare, we strive to redefine healthcare excellence. Our dedicated team of professionals
              and cutting-edge facilities ensure that every patient receives compassionate, personalized care.
              We believe that healthcare is more than just treatment—it's a partnership for a healthier life.
              From routine checkups to specialized treatments, MediCare is here for you every step of the way,
              making sure you get the best possible care with empathy and expertise. Your health, our commitment.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="welcome-button"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section className="homepage-section homepage-doctors-section">
        <h2 className="section-title text-center">Our Doctors</h2>
        <div className="doctor-cards-grid">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      <section className="homepage-section homepage-infrastructure-section">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title text-center">Our Infrastructure</h2>
          <img src="/Hos.jpg" alt="Hospital Infrastructure" className="infrastructure-image shadow-lg" />
        </motion.div>
      </section>
      
      <ReviewSection />
      <AchievementsSection />
    </div>
  );
};

export default HomePage;