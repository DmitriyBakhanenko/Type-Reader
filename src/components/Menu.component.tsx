import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutStart } from '../redux/user/user.actions';
import { selectCurrentUser } from '../redux/user/user.selectors';
import CustomButton from './custom-button.component';
import './Menu.style.scss';

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  return (
    <div className="menu-container">
      <p className="welcome-message">Hello {user.displayName}</p>
      <Link to="/reading">
        <CustomButton>Start</CustomButton>
      </Link>
      <CustomButton>Upload Text/Book/etc</CustomButton>
      <CustomButton>Paste From Clipboard</CustomButton>
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
