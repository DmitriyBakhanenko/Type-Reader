import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import {
  errorTracking,
  progressTracking,
  saveProgress,
  progressRefresh,
  fetchRandomFactStart
} from '../redux/progress/progress.actions';
import {
  selectCurrentErrors,
  selectCurrentProgress,
  selectCustomText,
} from '../redux/progress/progress.selectors';
import { defaultText } from '../components/helper.methods';
import { ErrorsObject, TimerInterface } from '../components/interfaces';
import './Reading.style.scss';
import { Timer } from '../components/Timer';

const Reading: React.FC = () => {
  const [timer] = useState<TimerInterface>(new Timer());
  const [progress, setProgress] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [charColor, setCharColor] = useState<string>('black');
  const [text, setText] = useState<string>(defaultText);
  const history = useHistory<History>();
  const dispatch = useDispatch<Dispatch>();
  const charRef = useRef<HTMLSpanElement | null>(null);
  const textTypedRef = useRef<HTMLParagraphElement | null>(null);
  const lastProgress: number = useSelector(selectCurrentProgress);
  const customText: string = useSelector(selectCustomText);
  const errorsObject: ErrorsObject = useSelector(selectCurrentErrors);

  const keyFilter = ['Alt', 'Control', 'Shift', 'Tab', 'Meta', 'CapsLock'];

  const getFinalResults = (): { time: string; wpm: number } => {
    if (!timer || !textTypedRef.current) return { time: '', wpm: 0 };
    timer.resultTimer();
    const wordCount: number = textTypedRef.current.innerText.split(' ').length;
    const finalTime = timer.time.forWPM;
    const wpm: number =
      finalTime.sec !== 0 || finalTime.min !== 0
        ? Math.floor((wordCount * 60) / (finalTime.sec + finalTime.min * 60))
        : 0;
    return {
      time: timer.time.result,
      wpm,
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

  // Fetch next random page
  useEffect(() => {
    if (text.length !== progress) return
    dispatch(fetchRandomFactStart());
    setProgress(0)
    dispatch(progressRefresh())
  }, [progress, text.length]);

  useEffect(() => {
    if (!input || !charRef.current) return;
    let txtChar: any = charRef.current.className;
    if (timer && !timer.time.startTime.mls) {
      timer.startTimer();
    }
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
