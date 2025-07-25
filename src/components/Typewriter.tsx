import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number; // ms per character
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
  delay?: number; // delay before starting
  loop?: boolean; // loop the animation
  onComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 40,
  className,
  showCursor = true,
  cursorChar = '|',
  delay = 0,
  loop = false,
  onComplete
}) => {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setIsComplete(false);

    const startTyping = () => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed((prev) => prev + text[i]);
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();

          if (loop) {
            setTimeout(() => {
              setDisplayed('');
              setIsComplete(false);
              startTyping();
            }, 2000);
          }
        }
      }, speed);
      return interval;
    };

    const timer = setTimeout(startTyping, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay, loop, onComplete]);

  return (
    <span className={className} aria-label={text}>
      {displayed}
      {showCursor && (
        <span className={`inline-block w-2 ${isComplete && !loop ? 'animate-pulse' : 'animate-pulse'}`}>
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default Typewriter; 