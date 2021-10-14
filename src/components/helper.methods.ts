import { errorsObject, ObjectToPercent } from './interfaces';

export const stringFilter = (str: string) =>
  str
    .replace(/[\n\r]+/g, ' ')
    .replace(/[…]+/g, ':')
    .replace(/[“”]+/g, '"')
    .replace(/[’]+/g, "'")
    .replace(/\s+/g, ' ');

export const getTime = (sec: number) => {
  const date = new Date(0);
  date.setSeconds(sec);
  const timeString = date.toISOString().substr(11, 8);
  return timeString;
};

export const countAllMistakes = (errors: errorsObject) =>
  Object.values(errors).reduce((prev: number, value: number) => {
    return prev + value;
  }, 0);

const sortObject = (object: errorsObject): errorsObject => {
  const sortedArr: [U: string, U: number][] = [];
  for (let value in object) {
    sortedArr.push([value, object[value]]);
  }
  sortedArr.length = 10;
  sortedArr.sort(function (a, b) {
    return b[1] - a[1];
  });
  const sortedObject: errorsObject = {};
  sortedArr.forEach(function (item) {
    sortedObject[item[0]] = item[1];
  });
  return sortedObject;
};

export const convertSortedToPercent = (
  object: errorsObject,
  errorsAll: number
): ObjectToPercent => {
  const newObj: ObjectToPercent = {};
  for (let [key, value] of Object.entries(sortObject(object))) {
    const val: any = value;
    Object.assign(newObj, {
      [key]: Math.floor((val / errorsAll) * 100).toString() + '%',
    });
  }
  return newObj;
};
