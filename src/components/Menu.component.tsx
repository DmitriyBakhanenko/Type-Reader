import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  customTextAddAction,
  fetchPoemStart,
  progressRefresh,
} from '../redux/progress/progress.actions';
import {
  selectCurrentErrors,
  selectProgress,
} from '../redux/progress/progress.selectors';
import { signOutStart } from '../redux/user/user.actions';
import { selectCurrentUser } from '../redux/user/user.selectors';
import CustomButton from './custom-button.component';
import {
  sortAndShowPercent,
  countAllMistakes,
  stringFilter,
} from './helper.methods';
import {
  ErrorsObject,
  ObjectShowPercent,
  Progress,
  UserObject,
} from './interfaces';
import './Menu.style.scss';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const user: UserObject = useSelector(selectCurrentUser);
  const errorsObject: ErrorsObject = useSelector(selectCurrentErrors);
  const progress: Progress = useSelector(selectProgress);
  const [message, setMessage] = useState<string>('');
  const [objShowPercent, setObjShowPercent] = useState<ObjectShowPercent>({});

  const pasteFromClopboard = () => {
    dispatch(progressRefresh());
    navigator.clipboard
      .readText()
      .then((text) => dispatch(customTextAddAction(stringFilter(text))));
    console.log('sdsdsdsd');
    setMessage('Your text has been loaded');
  };

  useEffect(() => {
    if (!user.displayName) return;
    setMessage(`Hello ${user.displayName}`);
  }, [user.displayName]);

  useEffect(() => {
    if (!Object.entries(progress.poet).length) return;
    setMessage(`${progress.poet.name} - "${progress.poet.title}"`);
  }, [progress.poet]);

  useEffect(() => {
    if (!progress.time.mls) return;
    setMessage('');
    const countedErrors: number = countAllMistakes(errorsObject);
    setObjShowPercent(sortAndShowPercent(errorsObject, countedErrors));
  }, [errorsObject, progress.time]);

  const renderStatistics = () => {
    const renderArr: ReactElement<HTMLTableRowElement>[] = [];
    for (let [key, value] of Object.entries(objShowPercent)) {
      renderArr.push(
        <tr key={key}>
          <td className="">{key}</td>
          <td className="">{value}</td>
        </tr>
      );
    }
    return renderArr;
  };

  const fetchPoem = () => {
    dispatch(progressRefresh());
    dispatch(fetchPoemStart());
    setMessage('random poem loaded');
  };

  return (
    <div className="menu-container">
      {progress.time.mls ? (
        <div className="stats-container">
          {progress.wpm ? (
            <p
              style={{ textAlign: 'center', color: 'red', marginBottom: '5px' }}
            >
              Words per minute: {progress.wpm}
            </p>
          ) : null}
          <p
            style={{ textAlign: 'center', color: 'green', marginBottom: '5px' }}
          >
            Time {progress.time.min} min : {progress.time.sec} sec :{' '}
            {progress.time.mls} mls
          </p>
          {Object.entries(errorsObject).length > 0 ? (
            <table>
              <tbody>
                <tr>
                  <th>Button</th>
                  <th>Mistakes</th>
                </tr>
                {renderStatistics()}
              </tbody>
            </table>
          ) : (
            <p
              style={{
                marginBottom: '5px',
                color: 'white',
                opacity: 0.7,
                textAlign: 'center',
              }}
            >
              No mistakes
            </p>
          )}
        </div>
      ) : null}
      {message ? <p className="welcome-message">{message}</p> : null}
      <Link to="/reading">
        <CustomButton>Start</CustomButton>
      </Link>
      <CustomButton onClick={pasteFromClopboard}>
        Paste From Clipboard
      </CustomButton>
      <CustomButton onClick={fetchPoem}>Random Poem</CustomButton>
      <Link to="/">
        <CustomButton disabled>Statistics</CustomButton>
      </Link>
      <CustomButton onClick={() => dispatch(signOutStart())}>
        Log Off
      </CustomButton>
    </div>
  );
};

export default Menu;
