/*
 * done 1. create component Reading
 * done 2. load text to the DOM
 * done 3. text char iteration initial text opacity 0.5
 * done 4. check if window.keydown === textRef.char then pass color green or color red
 * 5. save progress to redux store and sync with the server
 * 6. check progress from server before load and start from previous char
 */
/* eslint-disable */

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  progressRefresh,
  progressTracking,
} from '../redux/progress/progress.actions';
import { selectCurrentProgress } from '../redux/progress/progress.selectors';
import './Reading.style.scss';

const Reading = () => {
  const [progress, setProgress] = useState(0);
  const [input, setInput] = useState('');
  const [charColor, setCharColor] = useState('black');
  const [text, setText] = useState(
    "As with many techniques in JavaScript, it's mainly a matter of taste when deciding which one to use."
  );

  const charRef: any = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const lastProgress = useSelector(selectCurrentProgress);

  const keyFilter = ['Alt', 'Control', 'Shift', 'Tab', 'Meta', 'CapsLock'];

  const handleKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      return history.push('/');
    }
    if (!keyFilter.includes(e.key)) {
      setInput(e.key);
    }
  };

  useEffect(() => {
    if (!input) return;
    if (text.length === progress) {
      dispatch(progressRefresh());
      history.push('/');
    }
    if (charRef.current.className === input) {
      setCharColor('black');
      setProgress(progress + 1);
      setInput('');
      dispatch(progressTracking(progress));
    } else {
      setCharColor('red');
    }
  }, [input, progress]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    if (lastProgress) setProgress(lastProgress);
    return () => document.removeEventListener('keydown', handleKeyDown);
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
      <p className="text">{textManipulations(text, progress)}</p>
    </div>
  );
};

export default Reading;
