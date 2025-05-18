import React from 'react';
import CTAButton from './CTAButton';
import Navbar from '../components/Navbar';

const Hero = () => {
  return (
    <div>
    <Navbar/>
    <section className="py-16 md:py-24">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-8 md:mb-12">
          <div className="absolute inset-0 bg-gradient-radial from-green-500/20 to-transparent rounded-full blur-xl"></div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-xl">
            <img 
              src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Fresh vegetables and fruits in a bowl" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight animate-fade-in">
          Your personal chef <span className="text-green-500">&</span> nutritionist
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-10 md:mb-12 max-w-2xl animate-fade-in-delayed">
          Transform your eating habits.
        </p>
        
        <CTAButton />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
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
        </div>
      </div>
    </section>
    </div>
  );
};

const BenefitCard = ({ title, description }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-lg font-semibold mb-2 text-green-400">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

export default Hero;