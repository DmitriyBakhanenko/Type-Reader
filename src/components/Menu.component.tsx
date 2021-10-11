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
import './Menu.style.scss';

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const errors = useSelector(selectCurrentErrors);
  const progress = useSelector(selectProgress);
  const [message, setMessage] = useState(`Hello ${user.displayName}`);
  const [err, setErr] = useState({});

  /* eslint-disable */
  const paste = () => {
    dispatch(progressRefresh());
    navigator.clipboard.readText().then((text) =>
      dispatch(
        customTextAddAction(
          text
            .replace(/[\n\r]+/g, ' ')
            .replace(/[\…]+/g, ':')
            .replace(/[\“\”]+/g, '"')
            .replace(/[\’]+/g, "'")
            .replace(/\s+/g, ' ')
        )
      )
    );
    setMessage('Your text has been loaded');
  };

  /* eslint-enable */
  const getTime = (sec: number) => {
    const date = new Date(0);
    date.setSeconds(sec); // specify value for SECONDS here
    const timeString = date.toISOString().substr(11, 8);
    return timeString;
  };

  useEffect(() => {
    if (Object.entries(progress.poet).length)
      setMessage(`${progress.poet.name} - "${progress.poet.title}"`);
    if (progress.time === 0) return;
    setMessage('');
    setErr(errors);
    const errorsAll: any = Object.values(errors).reduce(
      (prev: any, value: any) => {
        return prev + value;
      },
      0
    );
    const sortedArr = [];
    for (let value in errors) {
      sortedArr.push([value, errors[value]]);
    }
    sortedArr.length = 10;
    sortedArr.sort(function (a, b) {
      return b[1] - a[1];
    });
    const sortedErrors: any = {};
    sortedArr.forEach(function (item) {
      sortedErrors[item[0]] = item[1];
    });
    const newObj: any = {};
    for (let [key, value] of Object.entries(sortedErrors)) {
      const val: any = value;
      Object.assign(newObj, {
        [key]: Math.floor((val / errorsAll) * 100).toString() + '%',
      });
    }
    setErr(newObj);
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
      <CustomButton onClick={paste}>Paste From Clipboard</CustomButton>
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
