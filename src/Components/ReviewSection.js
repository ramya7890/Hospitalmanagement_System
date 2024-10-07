// ReviewSection.js
import React from 'react';
import { motion } from 'framer-motion';
import './ReviewSection.css'; // Import the CSS file for styles

const reviews = [
  { id: 1, name: 'John D.', content: 'Excellent care and friendly staff!', rating: 5 },
  { id: 2, name: 'Sarah M.', content: 'Very professional and efficient service.', rating: 4 },
  { id: 3, name: 'Mike R.', content: 'State-of-the-art facilities and knowledgeable doctors.', rating: 5 },
  { id: 4, name: 'Sarah M.', content: 'Very professional and efficient service.', rating: 4 },
];

const ReviewSection = () => {
  return (
    <section className="review-section mb-16">
      <h2 className="review-title text-3xl font-bold mb-8 text-center text-primary">Patient Reviews</h2>
      <div className="review-grid grid md:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="review-card bg-white rounded-lg shadow-lg p-6"
          >
            <div className="review-rating flex items-center mb-4">
              <div className="text-yellow-400 mr-2">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
              <span className="text-gray-600">{review.rating}/5</span>
            </div>
            <p className="review-content text-gray-700 mb-4">{review.content}</p>
            <p className="review-author text-gray-600 font-semibold">- {review.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
