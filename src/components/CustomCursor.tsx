import { useState, useEffect, useRef } from 'react';
import { throttle } from '../lib/utils';
import { useSettings } from '../contexts/SettingsContext';

const INTERACTIVE_SELECTORS = [
  'button',
  'a',
  '.interactive',
];

const isInteractive = (el: HTMLElement | null): boolean => {
  if (!el) return false;
  if (
    INTERACTIVE_SELECTORS.some(sel => el.matches(sel)) ||
    el.closest('button') ||
    el.closest('a') ||
    el.closest('.interactive')
  ) {
    return true;
  }
  return false;
};

const isTextInput = (el: HTMLElement | null): boolean => {
  if (!el) return false;
  return (
    el.tagName === 'INPUT' ||
    el.tagName === 'TEXTAREA' ||
    el.getAttribute('contenteditable') === 'true'
  );
};

const playTone = (freq: number, duration: number, vol = 0.08) => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.value = vol;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.01);
      osc.stop(ctx.currentTime + 0.02);
      ctx.close();
    }, duration * 1000);
  } catch {}
};

const CustomCursor = () => {
  const { settings } = useSettings();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorSize, setCursorSize] = useState(16);
  const [powerUp, setPowerUp] = useState(true);
  const prevHoverRef = useRef(false);
  const prevInteractiveEl = useRef<HTMLElement | null>(null);
  const audioPlayingRef = useRef(false);

  // Enable/disable devtool for audio debugging
  // Set this to true to enable devtool logs
  const devtool = false; // Change to true to enable

  // Power-up animation on mount
  useEffect(() => {
    setCursorSize(0);
    setTimeout(() => {
      setCursorSize(16);
      setPowerUp(false);
    }, 300);
  }, []);

  // Set trail position to always match main cursor position (no trailing)
  useEffect(() => {
    setTrailPosition(position);
  }, [position]);

  // Track mouse position and interaction states
  useEffect(() => {
    let animationFrameId: number;
    const updateCursorPosition = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        // Show cursor when mouse moves
        if (!isVisible) setIsVisible(true);
        const target = e.target as HTMLElement;
        if (isTextInput(target)) {
          setIsVisible(false);
          return;
        }
        const hovering = isInteractive(target);
        setIsHovering(hovering);
        // Play audio feedback only if enabled
        if (settings.audioEnabled) {
          // Remove playTone for click events, only play on hover
          if (hovering && !prevHoverRef.current) {
            setTimeout(() => playTone(700, 0.05), 3);
          }
          if (!hovering && prevHoverRef.current) {
            setTimeout(() => playTone(600, 0.02), 3);
          }
          // Detect moving between different interactive elements
          if (hovering && target !== prevInteractiveEl.current) {
            setTimeout(() => playTone(600, 0.02), 3);
            prevInteractiveEl.current = target;
          }
        }
        prevHoverRef.current = hovering;
      });
    };
    const throttledMove = throttle(updateCursorPosition, 10);
    document.addEventListener('mousemove', throttledMove);
    return () => {
      document.removeEventListener('mousemove', throttledMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, settings.audioEnabled]);

  // Click/hover state logic and audio
  useEffect(() => {
    const handleMouseDown = () => {
      setIsClicking(true);
      if (settings.audioEnabled && !audioPlayingRef.current) {
        audioPlayingRef.current = true;
        if (devtool) console.log('[CustomCursor] Playing click audio');
        const audio = document.createElement('audio');
        audio.preload = 'auto';
        if (audio.canPlayType('audio/webm')) {
          audio.src = '/audio/granted.webm';
        } else {
          audio.src = '/audio/granted.wav';
        }
        audio.onended = () => {
          if (devtool) console.log('[CustomCursor] Audio ended');
          audioPlayingRef.current = false;
        };
        audio.onpause = () => {
          if (devtool) console.log('[CustomCursor] Audio paused');
          audioPlayingRef.current = false;
        };
        audio.onerror = () => {
          if (devtool) console.log('[CustomCursor] Audio error');
          audioPlayingRef.current = false;
        };
        audio.play().catch(() => {
          if (devtool) console.log('[CustomCursor] Audio play error');
          audioPlayingRef.current = false;
        });
      }
    };
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [settings.audioEnabled]);

  // Hide on touch devices
  useEffect(() => {
    const isTouchDevice = () =>
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice()) {
      setIsVisible(false);
    }
  }, []);

  if (typeof window === 'undefined' || !isVisible) return null;

  // Cursor sizes and transitions
  const baseSize = 16;
  const hoverSize = 24;
  const clickSize = 12;
  let size = cursorSize;
  if (isClicking) size = clickSize;
  else if (isHovering) size = hoverSize;
  else size = baseSize;

  // Power-up animation
  const powerUpStyle = powerUp
    ? {
        transform: 'scale(0)',
        opacity: 0,
        transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1), opacity 300ms cubic-bezier(0.16,1,0.3,1)',
        boxShadow: '0 0 30px 10px #fff, 0 0 60px 20px #FF9900',
      }
    : {};

  // Main cursor style
  const mainCursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: '#fff',
    opacity: 1,
    borderRadius: '50%',
    boxShadow:
      '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,165,0,0.3)' +
      (isHovering ? ', 0 0 32px 8px #FF9900' : ''),
    transform:
      (isClicking
        ? 'scale(0.8)'
        : isHovering
        ? 'scale(1.2)'
        : 'scale(1)') +
      (powerUp ? ' rotate(0deg)' : ''),
    transition:
      (isClicking
        ? 'transform 100ms cubic-bezier(0.16,1,0.3,1), width 100ms, height 100ms, opacity 100ms'
        : isHovering
        ? 'transform 200ms cubic-bezier(0.16,1,0.3,1), width 200ms, height 200ms, opacity 200ms'
        : 'transform 200ms cubic-bezier(0.16,1,0.3,1), width 200ms, height 200ms, opacity 200ms'),
    zIndex: 9999,
    mixBlendMode: 'difference' as React.CSSProperties['mixBlendMode'],
    position: 'fixed' as const,
    pointerEvents: 'none' as const,
    ...powerUpStyle,
  };

  // Trail style (thin ring)
  const trailStyle = {
    left: `${trailPosition.x - 9}px`, // Offset left by 9px (was 10px, so 1px more to the right)
    top: `${trailPosition.y - 8}px`,
    width: `${size + 16}px`,
    height: `${size + 16}px`,
    backgroundColor: 'transparent',
    border: '2px solid rgba(0,212,255,0.85)',
    borderRadius: '50%',
    filter: 'drop-shadow(0 0 8px #00d4ff88)',
    opacity: 1,
    zIndex: 9998,
    mixBlendMode: 'difference' as React.CSSProperties['mixBlendMode'],
    position: 'fixed' as const,
    pointerEvents: 'none' as const,
    transition:
      'width 200ms cubic-bezier(0.16,1,0.3,1), height 200ms cubic-bezier(0.16,1,0.3,1), left 60ms linear, top 60ms linear',
    boxSizing: 'border-box' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <>
      {/* Cursor trail */}
      <div
        className="cursor-trail fixed pointer-events-none z-40 rounded-full"
        style={trailStyle}
      ></div>
      {/* Main cursor */}
      <div
        className="main-cursor fixed pointer-events-none z-50 rounded-full bg-white transition-all"
        style={mainCursorStyle}
      ></div>
      {/* Global style */}
      <style>{`
        body { cursor: none !important; }
        a, button, .interactive { cursor: none !important; }
        input, textarea { cursor: text !important; }
      `}</style>
    </>
  );
};

export default CustomCursor;
