export interface ErrorsObject {
  [U: string]: number;
}

export interface ObjectShowPercent {
  [U: string]: string;
}

export interface UserObject {
  displayName: string;
}

export interface Poet {
  title: string;
  name: string;
}

export interface User {
  currentUser: null | UserObject;
  error: null | string;
  isLoading: boolean;
}

export interface Progress {
  progress: number;
  error: null | string;
  isLoading: boolean;
  customText: string;
  time: { mls: number; sec: number; min: number };
  errors: ErrorsObject;
  wpm: number;
  poet: Poet;
  startTime: number;
}

export type TimeObj = {
  min: number;
  sec: number;
  mls: number;
};

export type Time = {
  startTime: TimeObj;
  endTime: TimeObj;
  result: TimeObj;
};

export interface TimerInt {
  time: Time;
  getTime: (arg0: Date) => TimeObj;
  startTimer: () => void;
  stopTimer: () => void;
  getResult: () => TimeObj;
}
