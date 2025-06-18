# Todo App Onboarding - Splash Screen Specification

## Overview
The splash screen now uses 14 business/commerce icons, each with a descriptive filename, all sized 120x120px, with no blur or depth effects. Each image animates in with a unique rotation using Framer Motion, and all positions have been updated for a clean, non-overlapping layout. The code is simplified for easy maintenance.

## Key Implementation Updates (as of latest changes)

- **All images renamed** to descriptive names (e.g., `bank.png`, `box.png`, `person.png`, etc.) for clarity and maintainability.
- **All images included** (now 14, including `food_del.png`).
- **Uniform size:** Every image is 120x120px.
- **No blur or depth:** All images are sharp and on the same visual plane.
- **Rotation handled by Framer Motion:** Each image animates from 0 to its specified rotation value.
- **No overlap:** Images are positioned to avoid overlap and are clipped by the phone frame if they spill outside.
- **Simplified code:** The animation logic and image configuration are now much easier to read and update.
- **Image positions updated:** All positions have been tweaked for a more balanced, visually pleasing layout, inspired by the Figma reference.
- **New image added:** `food_del.png` is now part of the splash sequence.

## Current Image List

- bank.png
- box.png
- person.png
- briefcase.png
- calculator.png
- phone.png
- credit-card.png
- megaphone.png
- envelope.png
- id-badge.png
- delivery-person.png
- microphone.png
- airplane.png
- food_del.png

## Animation & Layout
- All images animate in with a spring effect, scaling from 0.5 to 1 and rotating to their specified angle.
- All images are absolutely positioned and sized 120x120px.
- No blur, no opacity layering, no depth.
- All images are clipped by the device frame.

## Code Simplification
- The `splashImages` array now only contains `src`, `position`, `rotation`, and `delay`.
- The animation variant is a single Framer Motion object that takes both delay and rotation as custom props.
- No more blur, opacity, or layer logic.

## Next Steps
- Add onboarding content (logo, title, CTA) as needed.
- Further tweak positions or add/remove images as design evolves.

---

**The splash screen is now clean, modern, and easy to maintain, with all business icons included and animating as intended.**

## Visual Design Requirements

### Background
- **Base**: Subtle white background (#FEFEFE or #FDFDFD)
- **Texture**: Optional very light noise/grain for warmth
- **Gradient**: Minimal, almost imperceptible gradient from pure white to very light gray

### Layout Structure
```
┌─────────────────────────┐
│  [Image 1 - bg blur]    │ ← Background layer, blurred
│    [Image 2 - mid]      │ ← Mid layer, slight blur
│                         │
│      [Image 3 - fg]     │ ← Foreground, sharp
│                         │
│  [Image 4 - corner]     │ ← Corner accent
│                         │
│                         │
│   [More images...]      │ ← Additional depth layers
│                         │
└─────────────────────────┘
```

### Image System

#### Image Sources
- **Folder**: `splash_images/` directory
- **Format**: PNG/JPG with transparency support
- **Optimization**: WebP with fallbacks for better performance

#### Depth Layers & Positioning

**Layer 1 - Background (Furthest)**
- **Position**: Top-left or top-right corner
- **Size**: Large (200-300px)
- **Blur**: Heavy blur (8-12px)
- **Opacity**: 0.3-0.5
- **Animation**: Slow scale + fade in (0ms start)

**Layer 2 - Mid Background**
- **Position**: Opposite corner from Layer 1
- **Size**: Medium (150-200px)
- **Blur**: Medium blur (4-6px)
- **Opacity**: 0.5-0.7
- **Animation**: Scale + fade in (200ms delay)

**Layer 3 - Foreground**
- **Position**: Center or off-center focal point
- **Size**: Medium-large (180-250px)
- **Blur**: No blur (sharp)
- **Opacity**: 0.8-1.0
- **Animation**: Pop in with bounce (400ms delay)

**Layer 4 - Accent**
- **Position**: Bottom corner or edge
- **Size**: Small-medium (100-150px)
- **Blur**: Light blur (2-3px)
- **Opacity**: 0.4-0.6
- **Animation**: Slide in from edge (600ms delay)

**Layer 5+ - Additional Elements**
- **Position**: Fill empty spaces strategically
- **Size**: Varied (80-120px)
- **Blur**: Varied (0-4px)
- **Opacity**: 0.3-0.7
- **Animation**: Staggered entrance (800ms+ delays)

## Animation Sequence

### Timeline (Total: ~1.5 seconds)
```
0ms     → Background layer (Layer 1) starts scaling + fading in
200ms   → Mid background (Layer 2) scales + fades in
400ms   → Foreground image (Layer 3) pops in with bounce
600ms   → Corner accent (Layer 4) slides in from edge
800ms+  → Additional elements stagger in
```

### Detailed Animation Specs

#### 1. Background Layer Animation (0ms start)
```typescript
const backgroundImageVariants = {
  hidden: { 
    scale: 1.2, 
    opacity: 0,
    filter: "blur(12px)"
  },
  visible: { 
    scale: 1, 
    opacity: 0.4,
    filter: "blur(10px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}
```

#### 2. Mid Layer Animation (200ms delay)
```typescript
const midImageVariants = {
  hidden: { 
    scale: 0.8, 
    opacity: 0,
    filter: "blur(8px)"
  },
  visible: { 
    scale: 1, 
    opacity: 0.6,
    filter: "blur(5px)",
    transition: {
      delay: 0.2,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}
```

#### 3. Foreground Image Animation (400ms delay)
```typescript
const foregroundImageVariants = {
  hidden: { 
    scale: 0, 
    opacity: 0,
    filter: "blur(0px)"
  },
  visible: { 
    scale: 1, 
    opacity: 0.9,
    filter: "blur(0px)",
    transition: {
      delay: 0.4,
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
}
```

#### 4. Accent Image Animation (600ms delay)
```typescript
const accentImageVariants = {
  hidden: { 
    x: 50, 
    opacity: 0,
    filter: "blur(4px)"
  },
  visible: { 
    x: 0, 
    opacity: 0.5,
    filter: "blur(2px)",
    transition: {
      delay: 0.6,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}
```

## Haptic Feedback Integration

### Haptic Events
- **Logo animation complete**: Light tap (10ms)
- **Button press**: Medium tap (20ms)
- **Button release**: Light tap (10ms)
- **Screen transition**: Success pattern [10, 50, 10]

### Implementation
```typescript
const useHaptics = () => {
  const triggerHaptic = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  return { triggerHaptic };
};
```

## Component Implementation

### File Structure
```
components/onboarding/
├── SplashScreen.tsx
├── AnimatedLogo.tsx
├── TypewriterText.tsx
└── OnboardingButton.tsx
```

### Core Component (SplashScreen.tsx)
```typescript
import { motion } from 'framer-motion';
import { useHaptics } from '../../hooks/useHaptics';

const SplashScreen = () => {
  const { triggerHaptic } = useHaptics();

  // Image configuration for splash_images folder
  const splashImages = [
    {
      src: '/splash_images/image1.png',
      layer: 'background',
      position: { top: '10%', right: '15%' },
      size: '280px',
      blur: '10px',
      opacity: 0.4,
      delay: 0
    },
    {
      src: '/splash_images/image2.png', 
      layer: 'mid',
      position: { top: '15%', left: '10%' },
      size: '180px',
      blur: '5px',
      opacity: 0.6,
      delay: 0.2
    },
    {
      src: '/splash_images/image3.png',
      layer: 'foreground', 
      position: { top: '40%', left: '50%', transform: 'translate(-50%, -50%)' },
      size: '220px',
      blur: '0px',
      opacity: 0.9,
      delay: 0.4
    },
    {
      src: '/splash_images/image4.png',
      layer: 'accent',
      position: { bottom: '20%', right: '8%' },
      size: '140px', 
      blur: '2px',
      opacity: 0.5,
      delay: 0.6
    }
  ];

  const getImageVariants = (image) => ({
    hidden: {
      scale: image.layer === 'background' ? 1.2 : 0.8,
      opacity: 0,
      filter: `blur(${parseInt(image.blur) + 2}px)`,
      x: image.layer === 'accent' ? 50 : 0
    },
    visible: {
      scale: 1,
      opacity: image.opacity,
      filter: `blur(${image.blur})`,
      x: 0,
      transition: {
        delay: image.delay,
        duration: image.layer === 'foreground' ? 0.6 : 0.8,
        type: image.layer === 'foreground' ? 'spring' : 'tween',
        stiffness: image.layer === 'foreground' ? 300 : undefined,
        damping: image.layer === 'foreground' ? 25 : undefined,
        ease: image.layer !== 'foreground' ? [0.25, 0.46, 0.45, 0.94] : undefined
      }
    }
  });

  return (
    <motion.div 
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: '#FEFEFE' }}
      initial="hidden"
      animate="visible"
      onAnimationComplete={() => triggerHaptic(10)} // Light haptic when animation completes
    >
      {/* Splash Images with Depth */}
      {splashImages.map((image, index) => (
        <motion.img
          key={index}
          src={image.src}
          alt={`Splash element ${index + 1}`}
          className="absolute select-none pointer-events-none"
          style={{
            ...image.position,
            width: image.size,
            height: image.size,
            objectFit: 'contain'
          }}
          variants={getImageVariants(image)}
          onLoad={() => console.log(`Image ${index + 1} loaded`)}
        />
      ))}

      {/* Content will be added in next iteration */}
    </motion.div>
  );
};
```

## Responsive Considerations

### Mobile Optimizations
- Reduce logo size to 100px on small screens
- Adjust typography scale (28px title, 16px subtitle)
- Increase button touch target to 52px height
- Add more generous padding (24px instead of 16px)

### Tablet Adjustments
- Maintain desktop sizing but center content better
- Consider landscape orientation layouts
- Ensure touch targets remain accessible

## Performance Optimizations

### Animation Performance
```typescript
// Add to global CSS
.logo-container {
  will-change: transform;
  transform: translateZ(0); /* Force hardware acceleration */
}

// Cleanup will-change after animation
useEffect(() => {
  const timer = setTimeout(() => {
    document.querySelector('.logo-container')?.style.removeProperty('will-change');
  }, 1200);
  
  return () => clearTimeout(timer);
}, []);
```

### Image Optimization
- Use SVG for logo (scalable, small file size)
- Implement lazy loading for any background images
- Preload next screen assets during splash animation

## Accessibility Features

### Screen Reader Support
```typescript
<motion.div 
  role="main"
  aria-label="Welcome screen"
  className="..."
>
  <motion.h1 
    aria-live="polite"
    className="..."
  >
    Welcome to Todo
  </motion.h1>
  
  <motion.p 
    aria-live="polite"
    className="..."
  >
    Organize your life, one task at a time
  </motion.p>
</motion.div>
```

### Reduced Motion Support
```typescript
const prefersReducedMotion = useReducedMotion();

const logoVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: prefersReducedMotion ? 0.1 : 0.6,
      type: prefersReducedMotion ? "tween" : "spring"
    }
  }
}
```

### Keyboard Navigation
- Ensure all interactive elements are focusable
- Add visible focus indicators
- Support Enter/Space key activation

## Testing Checklist

### Animation Testing
- [ ] Logo scales and rotates smoothly
- [ ] Title fades in at correct timing
- [ ] Typewriter effect works character by character
- [ ] Button slides up with bounce
- [ ] Secondary link fades in last
- [ ] No animation jank or stuttering

### Interaction Testing
- [ ] Button press triggers haptic feedback
- [ ] Button has proper press states
- [ ] Navigation works correctly
- [ ] Reduced motion preferences respected

### Device Testing
- [ ] iPhone (various sizes)
- [ ] Android devices
- [ ] iPad/tablets
- [ ] Desktop browsers
- [ ] Various screen densities

## Implementation Status ✅

### Completed:
1. ✅ **Core SplashScreen component** - Implemented with all 10 business icons
2. ✅ **Project setup** - Next.js, TypeScript, Tailwind CSS, Framer Motion
3. ✅ **Haptic feedback hook** - Web Vibration API integration
4. ✅ **Device frame styling** - iPhone mockup with responsive design
5. ✅ **Image configuration** - All 10 images positioned with depth layers
6. ✅ **Animation system** - Staggered entrance with blur, scale, and rotation
7. ✅ **Development server** - Running and ready for preview

### Ready for Preview! 🎉

**Local development server is running at:** `http://localhost:3000`

**What you'll see:**
- iPhone device frame on desktop (393px × 852px)
- Subtle white background (#FEFEFE)
- 10 business icons animating in with depth effects:
  - Package/delivery box (background, blurred)
  - Bank building (background, blurred)
  - Person with cap (mid-layer)
  - Sales briefcase (mid-layer)
  - Calculator/POS (foreground, sharp)
  - Phone (background, blurred)
  - Credit card (foreground, sharp)
  - Megaphone (accent layer)
  - ID badge (mid-layer)
  - Delivery person (foreground, sharp)
- Smooth staggered animations over 1.5 seconds
- Haptic feedback when animations complete
- Status bar with time (9:41) and battery indicator

### Next Steps:
8. **Add content overlay** - Logo, title, CTA button (awaiting your direction)
9. **Implement accessibility features**
10. **Cross-device testing**
11. **Connect to next onboarding screen**

**The foundation is ready! Visit `localhost:3000` to see your animated splash screen in action.** 🚀 