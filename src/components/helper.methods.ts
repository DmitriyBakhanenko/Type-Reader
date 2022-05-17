import { ErrorsObject, ObjectShowPercent } from './interfaces';

export const stringFilter = (str: string) =>
  str
    .replace(/[\n\r]+/g, ' ')
    .replace(/[\…]+/g, '...')
    .replace(/[\“\”]+/g, '"')
    .replace(/[\’]+/g, "'")
    .replace(/[\—]+/g, '-');
//.replace(/\s+/g, ' ');

export const getTime = (sec: number) => {
  const date = new Date(0);
  date.setSeconds(sec);
  const timeString = date.toISOString().substr(11, 8);
  return timeString;
};

export const countAllMistakes = (errorsObject: ErrorsObject) =>
  Object.values(errorsObject).reduce((prev: number, value: number) => {
    return prev + value;
  }, 0);

const sortErrorsObject = (errorsObject: ErrorsObject): ErrorsObject => {
  const sortedArr: [U: string, U: number][] = [];
  for (let value in errorsObject) {
    sortedArr.push([value, errorsObject[value]]);
  }
  sortedArr.length = 10;
  sortedArr.sort(function (a, b) {
    return b[1] - a[1];
  });
  const sortedObject: ErrorsObject = {};
  sortedArr.forEach(function (item) {
    sortedObject[item[0]] = item[1];
  });
  return sortedObject;
};

export const sortAndShowPercent = (
  object: ErrorsObject,
  errorsAll: number
): ObjectShowPercent => {
  const newObj: ObjectShowPercent = {};
  for (let [key, value] of Object.entries(sortErrorsObject(object))) {
    Object.assign(newObj, {
      [key]: Math.floor((value / errorsAll) * 100).toString() + '%',
    });
  }
  return newObj;
};
