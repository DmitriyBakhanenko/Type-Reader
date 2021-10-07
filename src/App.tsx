import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login.component';
import Create from './components/Create.component';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import { useEffect, useRef } from 'react';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const fetchRef = useRef(() => {
    dispatch(checkUserSession());
  });

  useEffect(() => fetchRef.current(), []);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path={'/'}
          render={() => (currentUser ? <Redirect to="/menu" /> : <Login />)}
        />
        <Route exact path={'/create'} component={Create} />
      </Switch>
    </div>
  );
}

export default App;
