import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutStart } from '../redux/user/user.actions';
import CustomButton from '../components/custom-button.component';
import './Menu.style.scss';
//import MenuProgress from '../components/MenuComponents/MenuProgress';
import { fetchRandomFacts, pasteFromClipboard } from '../components/MenuComponents/MenuService'
import { selectCurrentUser } from '../redux/user/user.selectors';
import Chart from '../components/Chart';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  return (
    <div className="menu-container">
      {user && <h1 className='welcome-message'>Hello {user.displayName}</h1>}
      <Chart />
      {/*<MenuProgress />*/}
      <Link to="/reading">
        <CustomButton
          onClick={() => fetchRandomFacts(dispatch)}>Random Cat Facts
        </CustomButton>
        <CustomButton
          onClick={() => pasteFromClipboard(dispatch)}>Paste Text From Clipboard
        </CustomButton>
      </Link>
      <Link to="/">
        <CustomButton disabled>Statistics</CustomButton>
      </Link>
      <CustomButton onClick={() => dispatch(signOutStart())}>Log Off</CustomButton>
    </div>
  );
};

export default Menu;
