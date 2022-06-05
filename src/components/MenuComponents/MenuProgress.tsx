//import { useEffect, useState, useRef } from 'react';
//import { useSelector } from "react-redux";
//import { selectCurrentErrors, selectProgress } from "../../redux/progress/progress.selectors";
//import { ErrorsObject, Progress, ObjectShowPercent } from "../interfaces";
//import {
//sortAndShowPercent,
//countAllMistakes,
//} from '../helper.methods';

//import "./MenuProgress.style.scss"
//import 'chart.js/auto';
//import { renderStatistics } from './MenuService';
//import { Chart } from '../Chart';


const MenuProgress = () => {

  //const progress: Progress = useSelector(selectProgress);
  //const errorsObject: ErrorsObject = useSelector(selectCurrentErrors);
  //const [objShowPercent, setObjShowPercent] = useState<ObjectShowPercent>({});

  //useEffect(() => {
  //if (!progress.time) return;
  //const countedErrors: number = countAllMistakes(errorsObject);
  //setObjShowPercent(sortAndShowPercent(errorsObject, countedErrors));
  //}, [errorsObject, progress.time]);

  return null
  //if (!!progress.time) return <Chart />

  //return (
  //<div>
  //{progress.time && (
  //<div className="stats-container">
  //{progress.wpm && <p className='ptag'>Words per minute: {progress.wpm}</p>}
  //<p className='ptag'>Time {progress.time}</p>
  //{Object.entries(errorsObject).length > 0
  //?
  //<table>
  //<tbody>
  //<tr>
  //<th>Buttons</th>
  //<th>Mistakes</th>
  //</tr>
  //{renderStatistics(objShowPercent)}
  //</tbody>
  //</table>
  //:
  //<p className='ptag'>No mistakes</p>
  //}
  //</div>)}
  //</div>
  //)
}

export default MenuProgress
