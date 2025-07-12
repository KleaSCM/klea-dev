"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/**
 * Touch Gestures Component
 * 
 * Handles mobile touch interactions including:
 * - Swipe navigation for mobile menu
 * - Pinch to zoom on images
 * - Touch feedback animations
 * - Haptic-like visual feedback
 * 
 * @component
 * @returns {JSX.Element} Touch gestures wrapper
 */
interface TouchGesturesProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  enablePinchZoom?: boolean;
  className?: string;
}

const TouchGestures = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  onSwipeUp, 
  onSwipeDown,
  enablePinchZoom = false,
  className = ""
}: TouchGesturesProps) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isPinching, setIsPinching] = useState(false);
  const [scale, setScale] = useState(1);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const motionScale = useMotionValue(1);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });

    // Handle pinch to zoom
    if (enablePinchZoom && e.touches.length === 2) {
      setIsPinching(true);
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      const newScale = Math.max(0.5, Math.min(3, distance / 200));
      setScale(newScale);
      motionScale.set(newScale);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX);

    if (isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    }

    if (isVerticalSwipe && Math.abs(distanceY) > minSwipeDistance) {
      if (distanceY > 0) {
        onSwipeUp?.();
      } else {
        onSwipeDown?.();
      }
    }

    // Reset pinch state
    if (isPinching) {
      setIsPinching(false);
      setScale(1);
      motionScale.set(1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Add haptic-like visual feedback
  const addHapticFeedback = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = 'scale(0.98)';
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transform = 'scale(1)';
        }
      }, 100);
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          onSwipeRight?.();
          addHapticFeedback();
          break;
        case 'ArrowRight':
          onSwipeLeft?.();
          addHapticFeedback();
          break;
        case 'ArrowUp':
          onSwipeDown?.();
          addHapticFeedback();
          break;
        case 'ArrowDown':
          onSwipeUp?.();
          addHapticFeedback();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  return (
    <motion.div
      ref={containerRef}
      className={`touch-gestures ${className}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        scale: enablePinchZoom ? motionScale : 1,
        x: motionX,
        y: motionY,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default TouchGestures; 