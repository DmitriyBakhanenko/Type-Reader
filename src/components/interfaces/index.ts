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

export interface Progres {
  progress: number;
  error: null | string;
  isLoading: boolean;
  customText: string;
  time: number;
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

export interface Timer {
  time: Time;
  getTime: (arg0: Date) => Date;
  startTime: () => void;
  endTime: () => void;
  getResult: () => Timer;
}
