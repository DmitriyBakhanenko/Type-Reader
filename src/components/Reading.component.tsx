/* eslint-disable */

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  progressRefresh,
  progressTracking,
  saveProgress,
} from '../redux/progress/progress.actions';
import {
  selectCurrentProgress,
  selectCustomText,
} from '../redux/progress/progress.selectors';
import './Reading.style.scss';

const Reading = () => {
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [input, setInput] = useState('');
  const [charColor, setCharColor] = useState('black');
  const [text, setText] = useState(
    "As with many techniques in JavaScript, it's mainly a matter of taste when deciding which one to use."
  );

  const charRef: any = useRef();
  const textBeforRef: any = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const lastProgress = useSelector(selectCurrentProgress);
  const customText = useSelector(selectCustomText);

  const keyFilter = ['Alt', 'Control', 'Shift', 'Tab', 'Meta', 'CapsLock'];
  const errMap: any = new Map();

  const getFinalResults = () => {
    const finalTime = (Date.now() - startTime) / 1000;
    const wordCount = textBeforRef.current?.className?.split(' ').length;
    const wpm = finalTime >= 60 ? (wordCount * 60) / finalTime : null;

    let errorsAll: any = 0;
    errMap.forEach((_key: any, value: any) => (errorsAll = errorsAll + value));

    for (let [key, value] of errMap) {
      errMap.set(key, (value / errorsAll) * 100);
    }

    return {
      time: finalTime,
      wpm: wpm,
      errors: errMap,
    };
  };

  const handleKeyDown = (e: any) => {
    e.preventDefault();
    if (e.key === 'Escape') {
      dispatch(saveProgress(getFinalResults()));
      return history.push('/');
    }
    if (!keyFilter.includes(e.key)) {
      setInput(e.key);
    }
  };

  const setTimer = () => {
    if (startTime) return;
    setStartTime(Date.now());
  };

  useEffect(() => {
    if (!input) return;
    const txtChar = charRef.current.className;
    setTimer();

    if (text.length === progress + 1) {
      dispatch(saveProgress(getFinalResults()));
      dispatch(progressRefresh());
      history.push('/');
    }
    if (txtChar === input) {
      setCharColor('black');
      setProgress(progress + 1);
      setInput('');
      dispatch(progressTracking(progress));
    } else {
      setCharColor('red');
      const prev = errMap.get(txtChar) || 1;
      errMap.set(txtChar, prev + 1);
      console.log(errMap.get(txtChar));
    }
  }, [input, progress]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    if (lastProgress) setProgress(lastProgress);
    if (customText) setText(customText);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const textManipulations = (text: string, progress: number) => {
    const currentChar = text.slice(progress, progress + 1);
    const textBefor = text.slice(0, progress);
    const textAfter = text.slice(progress + 1, text.length);

    return (
      <React.Fragment>
        <span ref={textBeforRef} className={textBefor}>
          {textBefor}
        </span>
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
