import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
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
import { ErrorsObject } from './interfaces';
import './Reading.style.scss';

const Reading: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [charColor, setCharColor] = useState<string>('black');
  const [text, setText] = useState<string>(
    "Test: As with many techniques in JavaScript, it's mainly a matter of taste when deciding which one to use."
  );
  const history = useHistory<History>();
  const dispatch = useDispatch<Dispatch>();

  const charRef = useRef<HTMLSpanElement | null>(null);
  const textTypedRef = useRef<HTMLParagraphElement | null>(null);
  const lastProgress: number = useSelector(selectCurrentProgress);
  const customText: string = useSelector(selectCustomText);
  const errorsObject: ErrorsObject = useSelector(selectCurrentErrors);
  const startTime: number = useSelector(selectStartTime);

  const keyFilter = ['Alt', 'Control', 'Shift', 'Tab', 'Meta', 'CapsLock'];

  const getFinalResults = (): { time: number; wpm: number } => {
    const finalTime = (Date.now() - startTime) / 1000;
    if (!textTypedRef.current) return { time: 0, wpm: 0 };
    const wordCount: number = textTypedRef.current.className.split(' ').length;
    const wpm: number =
      finalTime >= 60 ? Math.floor((wordCount * 60) / finalTime) : 0;

    return {
      time: finalTime,
      wpm: wpm,
    };
  };

  const handleKeyDown = (e: any) => {
    e.preventDefault();
    if (e.key === 'Escape') {
      dispatch(saveProgress(getFinalResults()));
      return history.push('/');
    }
    if (keyFilter.includes(e.key)) return;
    setInput(e.key);
  };

  const saveProgressAndExit = useRef(() => {
    dispatch(saveProgress(getFinalResults()));
    history.push('/');
  });

  useEffect(() => {
    if (text.length === progress + 1) saveProgressAndExit.current();
  }, [progress, text.length]);

  useEffect(() => {
    if (startTime) return;
    dispatch(progressTimeStart(Date.now()));
  }, [startTime, dispatch]);

  useEffect(() => {
    if (!input || !charRef.current) return;
    let txtChar: any = charRef.current.className;
    if (txtChar === input) {
      setCharColor('black');
      setProgress(progress + 1);
      setInput('');
      dispatch(progressTracking(progress));
    } else {
      setCharColor('red');
      txtChar =
        charRef.current.className === ' ' ? 'Space' : charRef.current.className;
      const newObj = {
        ...errorsObject,
        [txtChar]: errorsObject[txtChar] + 1 || 1,
      };
      dispatch(errorTracking(newObj));
    }
  }, [input, progress, dispatch, errorsObject]);

  useEffect(() => {
    if (lastProgress) setProgress(lastProgress);
  }, [lastProgress]);

  useEffect(() => {
    if (customText) setText(customText);
  }, [customText]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const textManipulations = (text: string, progress: number) => {
    const currentChar = text.slice(progress, progress + 1);
    const textBefor = text.slice(0, progress);
    const textAfter = text.slice(progress + 1, text.length);

    return (
      <React.Fragment>
        <span ref={textTypedRef} className={textBefor}>
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
