import { useCallback } from 'react';

export const useHaptics = () => {
  const triggerHaptic = useCallback((pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  return { triggerHaptic };
}; 