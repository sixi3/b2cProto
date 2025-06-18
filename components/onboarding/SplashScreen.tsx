import React from 'react';
import { motion } from 'framer-motion';
import RadialWaves from './RadialWaves';

const SplashScreen = () => {
  // All images are 120x120px with no blur or depth effects.
  const splashImages = [
    { src: '/splash_images/bank.png', position: { top: '16%', left: '-10%' }, rotation: 5, delay: 0.1 },
    { src: '/splash_images/box.png', position: { top: '35%', left: '-12%' }, rotation: 15, delay: 0 },
    { src: '/splash_images/person.png', position: { top: '20%', right: '35%' }, rotation: 20, delay: 0.2 },
    { src: '/splash_images/briefcase.png', position: { bottom: '10%', left: '35%' }, rotation: 5, delay: 0.3 },
    { src: '/splash_images/calculator.png', position: { top: '30%', right: '-4%' }, rotation: -8, delay: 0.4 },
    { src: '/splash_images/phone.png', position: { top: '50%', left: '50%' }, rotation: -20, delay: 0.5 },
    { src: '/splash_images/credit-card.png', position: { top: '12%', right: '-5%', transform: 'translate(-50%, -50%)' }, rotation: 15, delay: 0.25 },
    { src: '/splash_images/megaphone.png', position: { bottom: '25%', left: '2%' }, rotation: -20, delay: 0.6 },
    { src: '/splash_images/envelope.png', position: { bottom: '5%', left: '-8%' }, rotation: 15, delay: 0.8 },
    { src: '/splash_images/id-badge.png', position: { top: '-3%', right: '30%' }, rotation: 20, delay: 0.7 },
    { src: '/splash_images/delivery-person.png', position: { bottom: '2%', right: '-5%' }, rotation: -5, delay: 0.5 },
    { src: '/splash_images/microphone.png', position: { top: '65%', right: '2%' }, rotation: 15, delay: 0.9 },
    { src: '/splash_images/airplane.png', position: { bottom: '-5%', left: '20%' }, rotation: -10, delay: 1.0 },
    { src: '/splash_images/food_del.png', position: { top: '2%', left: '-5%' }, rotation: -10, delay: 1.0 }
  ];

  // Animation variant now takes both delay and rotation as custom props.
  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotate: 0,
      y: 0,
    },
    visible: ([delay, rotation, floatPhase, floatDuration]: [number, number, number, number]) => ({
      opacity: 1,
      scale: 1,
      rotate: rotation,
      y: [0, -3, 0, 3, 0],
      transition: {
        delay,
        type: "spring",
        stiffness: 150,
        damping: 20,
        rotate: { delay, type: 'spring', stiffness: 150, damping: 20 },
        scale: { delay, type: 'spring', stiffness: 150, damping: 20 },
        opacity: { delay },
        y: {
          delay: delay + 0.7, // start floating after entrance
          duration: floatDuration,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        },
      },
      transitionEnd: {
        y: 0
      }
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Device Frame */}
      <div className="device-frame">
        <div className="device-screen">
          <div className="relative w-full h-full" style={{ backgroundColor: '#FEFEFE' }}>
            <RadialWaves />

            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-6 text-black text-sm font-medium z-10">
              <span>9:41</span>
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1 items-baseline">
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                  <div className="w-1 h-2 bg-black rounded-full"></div>
                  <div className="w-1 h-3 bg-black rounded-full"></div>
                  <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Splash Images */}
            {splashImages.map((image, index) => {
              // Each image gets a unique floating phase and duration for natural effect
              const floatPhase = (index * Math.PI) / splashImages.length;
              const floatDuration = 2.5 + (index % 4) * 0.3; // 2.5s to 3.4s
              return (
                <motion.img
                  key={index}
                  src={image.src}
                  alt={`Splash icon ${index + 1}`}
                  className="absolute select-none pointer-events-none z-10"
                  style={{
                    ...image.position,
                    width: '120px',
                    height: '120px',
                    objectFit: 'contain'
                  }}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  custom={[image.delay, image.rotation, floatPhase, floatDuration]}
                />
              );
            })}

            {/* Content placeholder */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="text-center"
              >
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen; 