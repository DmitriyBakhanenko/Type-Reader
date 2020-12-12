import React, { useRef } from 'react';
import './Login.style.scss';

const Login = () => {
  return (
    <div className='login container'>
      <h1 className='header'>
        <span className='sign'>{'_> '}</span>Welcome.
      </h1>
      <p className='info'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
        dolores quis, officia in suscipit placeat dolor doloribus ipsam,
        recusandae reiciendis sed amet consequuntur consequatur voluptates velit
        tempora, laudantium nisi? Veritatis.
      </p>
      <form className='form'>
        <div id='cmd1'>
          <span id='span1'>{'User: '}</span>
          <div id='cursor1'></div>
        </div>
        <input id='input1' type='text' />
        <div className='button'>
          <button className='login'>login</button>
          <button className='create'>create</button>
        </div>
        <div className='button2'>
          <button className='google'>google</button>
          <button className='facebook'>facebook</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

const res: any = () => (
  <>
    <input
      required
      placeholder='enter your email'
      type='email'
      className='login'
    />
    <input
      required
      minLength={8}
      placeholder='enter your password'
      type='password'
      className='password'
    />
  </>
);
