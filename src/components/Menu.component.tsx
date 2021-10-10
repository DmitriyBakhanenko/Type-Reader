import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  customTextAddAction,
  progressRefresh,
} from '../redux/progress/progress.actions';
import { signOutStart } from '../redux/user/user.actions';
import { selectCurrentUser } from '../redux/user/user.selectors';
import CustomButton from './custom-button.component';
import './Menu.style.scss';

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [message, setMessage] = useState(`Hello ${user.displayName}`);

  const paste = () => {
    navigator.clipboard
      .readText()
      .then((text) =>
        dispatch(customTextAddAction(text.replace(/[\n\r]+/g, ' ')))
      );
    dispatch(progressRefresh());
    setMessage('Your text has been loaded');
  };

  return (
    <div className="menu-container">
      <p className="welcome-message">{message}</p>
      <Link to="/reading">
        <CustomButton>Start</CustomButton>
      </Link>
      <CustomButton onClick={paste}>Paste From Clipboard</CustomButton>
      <Link to="/statistics">
        <CustomButton>Statistics</CustomButton>
      </Link>
      <CustomButton onClick={() => dispatch(signOutStart())}>
        Log Off
      </CustomButton>
    </div>
  );
};

export default Menu;
