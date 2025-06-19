import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import logoIntro from '../../public/splash_images/logo-intro.json';
import RadialWaves from './RadialWaves';
import GradientBackground from './GradientBackground';

const SplashScreen = () => {
  const [isGathering, setIsGathering] = useState(false);
  const [showSpamCall, setShowSpamCall] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [showTextAnimation, setShowTextAnimation] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [cycleComplete, setCycleComplete] = useState(false);
  const [showIntroducing, setShowIntroducing] = useState(false);
  const [shrinkIntroducing, setShrinkIntroducing] = useState(false);
  const [showLottie, setShowLottie] = useState(false);

  const rotatingWords = [
    "SPAM",
    "SCAMS",
    "ADs",
  ];

  useEffect(() => {
    // Spam phone appears first
    const showSpamTimer = setTimeout(() => {
      setShowSpamCall(true);
    }, 200);

    // Shortly after, other icons appear
    const showIconsTimer = setTimeout(() => {
      setShowIcons(true);
    }, 700); // 500ms after spam phone starts appearing

    // After 3s of everything being on screen, icons start gathering
    const gatherTimer = setTimeout(() => {
      setIsGathering(true);
    }, 3700); // 700ms (icons appear) + 3000ms (wait)

    // Once gathering is complete, spam phone disappears
    // Gathering takes max_delay (1.0) + duration (0.7) = 1.7s
    const hideSpamTimer = setTimeout(() => {
      setShowSpamCall(false);
    }, 5400); // 3700ms (gather start) + 1700ms (gather duration)

    const showTextTimer = setTimeout(() => {
      setShowTextAnimation(true);
    }, 5600); // A moment after the spam phone disappears

    return () => {
      clearTimeout(showSpamTimer);
      clearTimeout(showIconsTimer);
      clearTimeout(gatherTimer);
      clearTimeout(hideSpamTimer);
      clearTimeout(showTextTimer);
    };
  }, []);

  useEffect(() => {
    if (showTextAnimation) {
      let wordCount = 0;
      const interval = setInterval(() => {
        setWordIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % rotatingWords.length;
          wordCount++;
          
          // Check if we've shown all words once
          if (wordCount === rotatingWords.length) {
            clearInterval(interval);
            setTimeout(() => {
              setCycleComplete(true);
            }, 50); // Wait a second after last word
          }
          return nextIndex;
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [showTextAnimation, rotatingWords.length]);

  useEffect(() => {
    if (cycleComplete) {
      // Show INTRODUCING after words cycle completes
      setTimeout(() => {
        setShowIntroducing(true);
      }, 500);

      // Start shrinking animation after INTRODUCING appears
      setTimeout(() => {
        setShrinkIntroducing(true);
      }, 2000);

      // Show Lottie animation after INTRODUCING shrinks
      setTimeout(() => {
        setShowLottie(true);
      }, 2600); // 2000 (shrink start) + 600 (shrink duration)
    }
  }, [cycleComplete]);

  // All images are 120x120px with no blur or depth effects.
  const splashImages = [
    { src: '/splash_images/bank.png', position: { top: '16%', left: '-10%' }, rotation: 5, delay: 0.1 },
    { src: '/splash_images/box.png', position: { top: '35%', left: '-12%' }, rotation: 15, delay: 0 },
    { src: '/splash_images/person.png', position: { top: '20%', right: '35%' }, rotation: 20, delay: 0.2 },
    { src: '/splash_images/briefcase.png', position: { bottom: '10%', left: '35%' }, rotation: 5, delay: 0.3 },
    { src: '/splash_images/calculator.png', position: { top: '30%', right: '-4%' }, rotation: -8, delay: 0.4 },
    { src: '/splash_images/phone.png', position: { top: '52%', left: '65%' }, rotation: -20, delay: 0.5 },
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
      x: 0,
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
    }),
    center: (delay: number) => ({
      top: '50%',
      left: '50%',
      x: '-50%',
      y: '-50%',
      scale: 0,
      rotate: 0,
      opacity: 0,
      transition: {
        delay,
        duration: 0.7,
        ease: 'easeInOut'
      }
    }),
  };

  const spamCallVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      x: '-50%',
      y: '-50%',
      transition: { duration: 0.5 }
    },
    visible: {
      opacity: 1,
      x: '-50%',
      y: '-50%',
      scale: [1, 1.05, 1], // Pulsing effect
      transition: {
        opacity: { duration: 0.5, ease: 'easeIn' },
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      x: '-50%',
      y: '-50%',
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Device Frame */}
      <div className="device-frame">
        <div className="device-screen">
          <div className="relative w-full h-full">
            <GradientBackground />
            {/* <RadialWaves /> */}

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
                  animate={isGathering ? "center" : showIcons ? "visible" : "hidden"}
                  custom={isGathering ? image.delay : [image.delay, image.rotation, floatPhase, floatDuration]}
                />
              );
            })}

            <AnimatePresence>
              {showSpamCall && (
                <motion.img
                  src="/splash_images/spam_phone.png"
                  alt="Spam call phone"
                  className="absolute select-none pointer-events-none z-20"
                  style={{
                    width: '250px',
                    height: '250px',
                    objectFit: 'contain',
                    top: '50%',
                    left: '50%',
                  }}
                  variants={spamCallVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
              )}
            </AnimatePresence>

            {/* Content placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
              <AnimatePresence>
                {showTextAnimation && !cycleComplete && (
                  <motion.div
                    className="text-center text-base font-light text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div>Never again waste your time with </motion.div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={wordIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="text-[#baff29] font-bold text-4xl mt-4"
                      >
                        {rotatingWords[wordIndex]}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showIntroducing && (
                  <motion.div
                    className="text-white font-md absolute"
                    initial={{ opacity: 0, scale: 0.5, fontSize: '32px' }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      fontSize: shrinkIntroducing ? '12px' : '32px',
                      y: shrinkIntroducing ? -48 : 0
                    }}
                    transition={{
                      duration: 0.6,
                      ease: 'easeInOut',
                      fontSize: { delay: 0.2 },
                      y: { delay: 0.2 }
                    }}
                  >
                    INTRODUCING
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showLottie && (
                  <motion.div
                    className="absolute"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Lottie
                      animationData={logoIntro}
                      loop={false}
                      style={{ width: 500, height: 500 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen; 