import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number; // ms per character
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 40, className }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className} aria-label={text}>
      {displayed}
      <span className="inline-block w-2 animate-pulse">|</span>
    </span>
  );
};

export default Typewriter; 