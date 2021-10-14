import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  errorTracking,
  progressTimeStart,
  progressTracking,
  saveProgress,
} from '../redux/progress/progress.actions';
import {
  selectCurrentErrors,
  selectCurrentProgress,
  selectCustomText,
  selectStartTime,
} from '../redux/progress/progress.selectors';
import './Reading.style.scss';

const Reading = () => {
  const [progress, setProgress] = useState(0);
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
  const errors = useSelector(selectCurrentErrors);
  const startTime = useSelector(selectStartTime);

  const keyFilter = ['Alt', 'Control', 'Shift', 'Tab', 'Meta', 'CapsLock'];

  const getFinalResults = () => {
    const finalTime = (Date.now() - startTime) / 1000;
    console.log(`startTime: ${startTime}`);
    console.log(finalTime);
    const wordCount = textBeforRef.current?.className?.split(' ').length;
    const wpm = finalTime >= 60 ? Math.floor((wordCount * 60) / finalTime) : 0;

    return {
      time: finalTime,
      wpm: wpm,
    };
  };

  const handleKeyDown = (e: any) => {
    e.preventDefault();
    if (e.key === 'Escape') {
      console.error(`ESCAPE: ${startTime}`);
      dispatch(saveProgress(getFinalResults()));
      return history.push('/');
    }
    if (!keyFilter.includes(e.key)) {
      setInput(e.key);
    }
  };

  useEffect(() => {
    if (!input) return;
    let txtChar: any = charRef.current.className;
    if (!startTime) {
      console.error('START TIME INSIDE IF');
      dispatch(progressTimeStart(Date.now()));
    }
    if (text.length === progress + 1) {
      dispatch(saveProgress(getFinalResults()));
      history.push('/');
    }
    if (txtChar === input) {
      setCharColor('black');
      setProgress(progress + 1);
      setInput('');
      dispatch(progressTracking(progress));
    } else {
      setCharColor('red');
      txtChar =
        charRef.current.className === ' ' ? 'Space' : charRef.current.className;
      const newObj = { ...errors, [txtChar]: errors[txtChar] + 1 || 1 };
      dispatch(errorTracking(newObj));
    }
  }, [input, progress]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    if (lastProgress) setProgress(lastProgress);
    if (customText) setText(customText);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    console.log(`SDSDSDSDSDSDSd ${startTime}`);
  }, [startTime]);

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
