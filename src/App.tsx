import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login.component';
import Create from './components/Create.component';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={'/'} component={Login} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/create'} component={Create} />
      </Switch>
    </div>
  );
}

export default App;
