import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutStart } from '../redux/user/user.actions';
import CustomButton from '../components/custom-button.component';
import './Menu.style.scss';
import MenuProgress from '../components/MenuComponents/MenuProgress';
import { fetchRandomFacts, pasteFromClipboard } from '../components/MenuComponents/MenuService'

const Menu: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="menu-container">
      <MenuProgress />
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
