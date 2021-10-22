import { Time } from './interfaces';

export class Timer {
  time = {
    startTime: { min: 0, sec: 0, mls: 0 },
    endTime: { min: 0, sec: 0, mls: 0 },
    result: { min: 0, sec: 0, mls: 0 },
  };

  getTime(time: Date) {
    const mls = time.getMilliseconds();
    const sec = time.getSeconds();
    const min = time.getMinutes();
    return { min, sec, mls };
  }

  startTimer() {
    const startTime = new Date();
    this.time.startTime = this.getTime(startTime);
  }

  stopTimer() {
    const endTime = new Date();
    this.time.endTime = this.getTime(endTime);
  }

  getResult() {
    this.time.result.mls = this.time.endTime.mls - this.time.startTime.mls;
    this.time.result.sec = this.time.endTime.sec - this.time.startTime.sec;
    this.time.result.min = this.time.endTime.min - this.time.startTime.min;
    return this.time.result;
  }
}
