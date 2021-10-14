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
