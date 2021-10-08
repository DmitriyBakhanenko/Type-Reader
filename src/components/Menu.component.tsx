import { useDispatch } from 'react-redux';
import { signOutStart } from '../redux/user/user.actions';
import './Menu.style.scss';
import Reading from './Reading.component';

const Menu = () => {
  const dispatch = useDispatch();

  return (
    <div className="menu-container">
      <div style={{ color: 'red' }}>Menu</div>
      <button>Start Reading</button>
      <button onClick={() => dispatch(signOutStart())}>logoff</button>
    </div>
  );
};

export default Menu;
