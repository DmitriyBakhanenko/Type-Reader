import { useEffect, useState } from 'react';
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
  convertSortedToPercent,
  countAllMistakes,
  getTime,
  stringFilter,
} from './helper.methods';
import { errorsObject, Progres, UserObject } from './interfaces';
import './Menu.style.scss';

const Menu = () => {
  const dispatch = useDispatch();
  const user: UserObject = useSelector(selectCurrentUser);
  const errors: errorsObject = useSelector(selectCurrentErrors);
  const progress: Progres = useSelector(selectProgress);
  const [message, setMessage] = useState<string>('');
  const [err, setErr] = useState({});

  const pasteFromClopboard = () => {
    dispatch(progressRefresh());
    navigator.clipboard
      .readText()
      .then((text) => dispatch(customTextAddAction(stringFilter(text))));
    setMessage('Your text has been loaded');
  };

  useEffect(() => {
    if (user.displayName) setMessage(`Hello ${user.displayName}`);
  }, [user.displayName]);

  useEffect(() => {
    if (Object.entries(progress.poet).length)
      setMessage(`${progress.poet.name} - "${progress.poet.title}"`);
    if (progress.time === 0) return;
    setMessage('');
    setErr(errors);
    const errorsAll: number = countAllMistakes(errors);
    setErr(convertSortedToPercent(errors, errorsAll));
  }, [errors, progress.time, progress.customText, progress.poet]);

  const renderStatistics = () => {
    const renderArr: any = [];
    for (let [key, value] of Object.entries(err)) {
      const val: any = value;
      renderArr.push(
        <tr key={key}>
          <td className="">{key}</td>
          <td className="">{val}</td>
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
      {progress.time ? (
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
            time: {getTime(Math.floor(progress.time))}
          </p>
          {Object.entries(errors).length > 0 ? (
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
