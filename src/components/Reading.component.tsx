/*
 * 1. create component Reading
 * 2. load text to the DOM
 * 3. text char iteration initial text opacity 0.5
 * 4. check if window.keydown === textRef.char then pass color green or color red
 * 5. save progress to redux store and sync with the server
 * 6. check progress from server before load and start from previous char
 */
import React, { useEffect, useRef, useState } from 'react';
import './Reading.style.scss';

const Reading = () => {
  const [progress, setProgress] = useState(0);
  const [input, setInput] = useState('');
  const [charColor, setCharColor] = useState('black');
  const [text, setText] = useState(
    "As with many techniques in JavaScript, it's mainly a matter of taste when deciding which one to use. However, be aware of the speed impacts of the string-to-array conversion as well as the compatibility issues of the bracket notation. I advise you to pick the most readable technique and only care for speed optimization if you have a performance problem and to solve compatibility issues through transpiling."
  );

  const charRef: any = useRef();

  const keyFilter = [
    'Alt',
    'Control',
    'Shift',
    'Escape',
    'Tab',
    'Meta',
    'CapsLock',
  ];

  const handleKeyDown = (e: any) => {
    if (!keyFilter.includes(e.key)) {
      setInput(e.key);
    }
  };

  useEffect(() => {
    if (!input) return;
    if (charRef.current.className === input) {
      setCharColor('black');
      setProgress(progress + 1);
      setInput('');
    } else {
      setCharColor('red');
    }
  }, [input, progress]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, []);

  const textManipulations = (text: string, progress: number) => {
    const currentChar = text.slice(progress, progress + 1);
    const textBefor = text.slice(0, progress);
    const textAfter = text.slice(progress + 1, text.length);

    return (
      <React.Fragment>
        <span>{textBefor}</span>
        <span
          ref={charRef}
          className={currentChar}
          style={{ color: `${charColor}`, background: '#20C20E' }}
        >
          {currentChar}
        </span>
        <span style={{ opacity: 0.5 }}>{textAfter}</span>
      </React.Fragment>
    );
  };
  return (
    <div className="text-container">
      <p className="text">
        {textManipulations(text, progress)}
        <span style={{ color: 'red', opacity: 1 }}>DD</span>
      </p>
    </div>
  );
};

export default Reading;
