import React from 'react';
import CTAButton from './CTAButton';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Hero = () => {
  return (
    <div>
      <Navbar />
      <section className="py-16 md:py-24 bg-gradient-to-br from-white via-green-50 to-white">
        <motion.div
          className="flex flex-col items-center text-center px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="relative mb-12" variants={itemVariants}>
            <div className="absolute inset-0 bg-gradient-radial from-green-400/20 to-transparent rounded-full blur-xl"></div>

            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-md"
              whileHover={{ scale: 1.1, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Fresh vegetables and fruits"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight text-gray-900"
            variants={itemVariants}
          >
            Your personal chef <span className="text-green-500">&</span> nutritionist
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-10 md:mb-12 max-w-2xl"
            variants={itemVariants}
          >
            Transform your eating habits.
          </motion.p>

          <motion.div variants={itemVariants}>
            <CTAButton />
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
            variants={itemVariants}
          >
            <BenefitCard
              title="Personalized Plans"
              description="Custom meal plans based on your preferences and nutritional needs."
            />
            <BenefitCard
              title="Time-Saving"
              description="Quick recipes and grocery lists to streamline your meal prep."
            />
            <BenefitCard
              title="Healthier Choices"
              description="Nutritionist-approved recipes for balanced eating."
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

const BenefitCard = ({ title, description }) => (
  <motion.div
    className="bg-white/20 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:bg-white/30 transition-shadow duration-300"
    variants={itemVariants}
  >
    <h3 className="text-lg font-semibold mb-2 text-green-600">{title}</h3>
    <p className="text-gray-700 text-sm">{description}</p>
  </motion.div>
);

export default Hero;
