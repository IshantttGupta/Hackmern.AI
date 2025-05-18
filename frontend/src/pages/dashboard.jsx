import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, BrainCircuit, CheckCircle, Users, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';


const Button = ({ as: Component = 'button', href, className, children, ...props }) => {
  if (Component === 'a' && href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const LandingPage = () => {
    const containerClassName = [
        'flex flex-col min-h-screen bg-gradient-to-br from-white via-green-50 to-white',
        'overflow-hidden' // Prevent scrollbars during animation
    ].join(' ');

    const mainContentClassName = [
        'flex-grow flex items-center justify-center p-4 sm:p-8',
        'container mx-auto'
    ].join(' ');

      const taglineClassName = [
        'text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-800',
        'tracking-tight leading-tight',
        'bg-gradient-to-r from-green-600 to-green-800 text-transparent bg-clip-text' // Gradient text
    ].join(' ');

    const descriptionClassName = [
        'text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto',
        'bg-white/80 backdrop-blur-sm rounded-xl py-3 px-4 sm:px-6', // Added background
        'shadow-md border border-white/10'
    ].join(' ');

    const getStartedButtonClassName = [
        'bg-green-600 text-white font-semibold px-8 py-3 rounded-full',
        'hover:bg-green-700 text-xl transition-colors duration-300',
        'shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500/50'
    ].join(' ');

    const keyFeaturesTitleClassName = [
        'text-3xl sm:text-4xl font-bold text-green-700 mb-4',
        'tracking-tight'
    ].join(' ');

     const featureItemClassName = [
        'bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-md border border-white/10',
        'transition-all duration-300 hover:shadow-lg hover:scale-[1.02]',
        'flex flex-col items-center gap-4 text-center'
    ].join(' ');

    return (
        <div
            className={containerClassName}
        >
            <Navbar/>

            <motion.main
                className={mainContentClassName}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="text-center space-y-6 sm:space-y-8">
                    <motion.h1
                        className={taglineClassName}
                        variants={itemVariants}
                    >
                        Your Personalized AI Diet Plan
                    </motion.h1>

                    <motion.p
                        className={descriptionClassName}
                        variants={itemVariants}
                    >
                        Unlock your full potential with a diet plan tailored to your unique needs.
                        Powered by advanced AI, NutriAI provides personalized nutrition guidance
                        to help you achieve your health and fitness goals.
                    </motion.p>

                    <motion.div variants={itemVariants}>
                        <Button
                            as="a"
                            href="/auth" 
                            className={getStartedButtonClassName}
                        >
                            Get Started <BrainCircuit className="ml-2 w-6 h-6" />
                        </Button>
                    </motion.div>
                </div>
            </motion.main>

            <section className="py-16 sm:py-20 bg-white/20 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.div
                        className="text-center mb-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className={keyFeaturesTitleClassName}>
                            Key Features
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover how NutriAI can revolutionize your diet and help you live a healthier life.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className={featureItemClassName}
                            variants={itemVariants}
                        >
                            <CheckCircle className="w-10 h-10 text-green-500" />
                            <h3 className="text-xl font-semibold text-gray-900">Personalized Plans</h3>
                            <p className="text-gray-700">
                                Get a diet plan tailored to your specific needs, preferences, and goals.
                            </p>
                        </motion.div>

                        <motion.div
                           className={featureItemClassName}
                            variants={itemVariants}
                        >
                            <BrainCircuit className="w-10 h-10 text-green-500" />
                            <h3 className="text-xl font-semibold text-gray-900">AI-Powered Recommendations</h3>
                            <p className="text-gray-700">
                                Our AI analyzes your data to provide the most effective and sustainable diet recommendations.
                            </p>
                        </motion.div>

                        <motion.div
                            className={featureItemClassName}
                            variants={itemVariants}
                        >
                            <BookOpen className="w-10 h-10 text-green-500" />
                            <h3 className="text-xl font-semibold text-gray-900">Expert-Backed Information</h3>
                            <p className="text-gray-700">
                                Access a wealth of knowledge and resources curated by nutrition experts.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;

