import React from 'react';
import Login from './components/Login.component';

function App() {
  return (
    <div
      className='App'
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Login />
    </div>
  );
}

export default App;
