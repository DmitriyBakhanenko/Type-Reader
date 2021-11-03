export class Timer {
  time = {
    startTime: { min: 0, sec: 0, mls: 0 },
    endTime: { min: 0, sec: 0, mls: 0 },
    result: '',
    forWPM: { min: 0, sec: 0, mls: 0 },
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
    this.resultTimer();
  }

  resultTimer() {
    let minRes = this.time.endTime.min - this.time.startTime.min;
    let secRes = this.time.endTime.sec - this.time.startTime.sec;
    let mlsRes = this.time.endTime.mls - this.time.startTime.mls;

    if (secRes < 0) {
      secRes = 60 - Math.abs(secRes);
      minRes -= 1;
    }
    if (mlsRes < 0) {
      mlsRes = 1000 - Math.abs(mlsRes);
      secRes -= 1;
    }

    this.time.forWPM = { min: minRes, sec: secRes, mls: mlsRes };

    if (this.time.startTime.min !== this.time.endTime.min) {
      this.time.result = `${minRes} min : ${secRes} sec : ${mlsRes} mls`;
    } else if (this.time.startTime.sec !== this.time.endTime.sec) {
      this.time.result = `${secRes} sec : ${mlsRes} ms`;
    } else {
      this.time.result = `${mlsRes} mls`;
    }
  }
}
