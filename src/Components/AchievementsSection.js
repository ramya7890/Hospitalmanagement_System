import React from 'react';
import { motion } from 'framer-motion';
import './AchievementsSection.css'; 

const achievements = [
  { id: 1, title: 'Best Hospital Award', year: '2022' },
  { id: 2, title: 'Excellence in Patient Care', year: '2021' },
  { id: 3, title: 'Innovation in Healthcare', year: '2020' },
  { id: 4, title: 'Innovation in Healthcare', year: '2019' },
];

const AchievementsSection = () => {
  return (
    <section className="achievements-section mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">Our Achievements</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="achievement-card bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
            <p className="text-gray-600">{achievement.year}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AchievementsSection;
