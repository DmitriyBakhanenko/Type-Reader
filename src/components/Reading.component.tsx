import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import {
  errorTracking,
  progressTracking,
  saveProgress,
} from '../redux/progress/progress.actions';
import {
  selectCurrentErrors,
  selectCurrentProgress,
  selectCustomText,
} from '../redux/progress/progress.selectors';
import { ErrorsObject, Time, TimeObj } from './interfaces';
import './Reading.style.scss';
import { Timer } from './Timer';

const Reading: React.FC = () => {
  const [timer, setTimer] = useState<Timer | null>(null);
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

  const keyFilter = ['Alt', 'Control', 'Shift', 'Tab', 'Meta', 'CapsLock'];

  const getFinalResults = (): { time: TimeObj; wpm: number } => {
    if (!timer || !textTypedRef.current)
      return { time: { min: 0, sec: 0, mls: 0 }, wpm: 0 };
    const finalTime = timer.getResult();
    const wordCount: number = textTypedRef.current.innerText.split(' ').length;
    const wpm: number =
      finalTime.sec >= 60
        ? Math.floor((wordCount * 60) / (finalTime.sec + finalTime.min * 60))
        : 0;

    return {
      time: finalTime,
      wpm: wpm,
    };
  };

  const handleKeyDown = (e: any) => {
    e.preventDefault();
    if (e.key === 'Escape') {
      if (timer) timer.stopTimer();
      dispatch(saveProgress(getFinalResults()));
      return history.push('/');
    }
    if (!keyFilter.includes(e.key)) setInput(e.key);
  };

  const saveProgressAndExit = useRef(() => {
    if (timer) timer.stopTimer();
    dispatch(saveProgress(getFinalResults()));
    history.push('/');
  });

  useEffect(() => {
    if (text.length === progress) saveProgressAndExit.current();
  }, [progress, text.length]);

  //useEffect(() => {
  //if (startTime) return;
  //dispatch(progressTimeStart(Date.now()));
  //}, [startTime, dispatch]);

  useEffect(() => {
    if (!input || !charRef.current) return;
    let txtChar: any = charRef.current.className;
    if (timer && !timer.time.startTime) timer.startTimer();
    if (txtChar === input) {
      setCharColor('black');
      setProgress(progress + 1);
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
    setInput('');
  }, [input, progress, errorsObject, dispatch]);

  useEffect(() => {
    if (lastProgress) setProgress(lastProgress);
  }, []);

  useEffect(() => {
    if (!timer) setTimer(new Timer());
  }, []);

  useEffect(() => {
    if (customText) setText(customText);
  }, [customText]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const textManipulations = (text: string, progress: number) => {
    const currentChar = text.slice(progress, progress + 1);
    const textBefor = text.slice(0, progress);
    const textAfter = text.slice(progress + 1, text.length);

    return (
      <React.Fragment>
        <span ref={textTypedRef}>{textBefor}</span>
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
