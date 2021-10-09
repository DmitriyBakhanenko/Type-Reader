import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutStart } from '../redux/user/user.actions';
import './Menu.style.scss';

const Menu = () => {
  const dispatch = useDispatch();

  return (
    <div className="menu-container">
      <div style={{ color: 'red' }}>Menu</div>
      <Link to="/reading">
        <button>Start Reading</button>
      </Link>
      <button onClick={() => dispatch(signOutStart())}>logoff</button>
    </div>
  );
};

export default Menu;
