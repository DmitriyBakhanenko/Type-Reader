import { ReactElement } from 'react'
import {
  customTextAddAction,
  fetchRandomFactStart,
  progressRefresh,
} from '../../redux/progress/progress.actions';
import {
  stringFilter,
} from '../helper.methods';
import { ObjectShowPercent } from '../interfaces';

export const pasteFromClipboard = (dispatch: any) => {
  dispatch(progressRefresh());
  navigator.clipboard
    .readText()
    .then((text) => dispatch(customTextAddAction(stringFilter(text))));
};

export const fetchRandomFacts = (dispatch: any) => {
  dispatch(progressRefresh());
  dispatch(fetchRandomFactStart());
};

export const renderStatistics = (objShowPercent: ObjectShowPercent) => {
  const renderArr: ReactElement<HTMLTableRowElement>[] = [];
  for (let [key, value] of Object.entries(objShowPercent)) {
    renderArr.push(
      <tr key={key}>
        <td> {key} </td>
        <td> {value} </td>
      </tr>
    );
  }
  return renderArr;
};

