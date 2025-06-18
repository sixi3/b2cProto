import React from 'react';
import { motion } from 'framer-motion';

const waveVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: (i: number) => ({
    opacity: [0, 0.1, 0],
    scale: 5,
    transition: {
      delay: i * 1.2, // Stagger each wave's start time
      duration: 4,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 1, 
    },
  }),
};

const RadialWaves = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-transparent border border-[#00b140] rounded-full"
          style={{ width: '100px', height: '100px' }}
          variants={waveVariants}
          initial="initial"
          animate="animate"
          custom={i}
        />
      ))}
    </div>
  );
};

export default RadialWaves; 