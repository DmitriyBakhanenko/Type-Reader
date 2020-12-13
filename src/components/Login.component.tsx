import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './Login.style.scss';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  const [shifr, setShifr] = useState('');

  const cursorEvent: any = useRef();
  const refCmd: any = useRef();
  const refCmd2: any = useRef();
  const refInput1: any = useRef();
  const refInput2: any = useRef();

  // *** focuses first input on component did mount
  useEffect(() => {
    refInput1.current?.focus();
  }, []);

  // *** sets focus and blinking on input click event
  const handleClick = (e: any) => {
    if (e.target === refCmd.current) {
      refInput1.current?.focus();
      setHidden(!hidden);
      setHidden2(true);
    } else {
      refInput2.current?.focus();
      setHidden2(!hidden2);
      setHidden(true);
    }
  };

  // *** turns password to a shifr
  useEffect(() => {
    setShifr('*'.repeat(password.length));
  }, [password]);

  // *** sets blinking cursor to the first input
  useEffect(() => {
    if (document.activeElement === ReactDOM.findDOMNode(refInput1.current))
      cursorEvent.current = setInterval(() => setHidden(!hidden), 500);
    return () => {
      clearInterval(cursorEvent.current);
    };
  });

  // *** sets blinking cursor to the second input
  useEffect(() => {
    if (document.activeElement === ReactDOM.findDOMNode(refInput2.current))
      cursorEvent.current = setInterval(() => setHidden2(!hidden2), 500);
    return () => {
      clearInterval(cursorEvent.current);
    };
  });

  return (
    <div className='login container'>
      <h1 className='header'>
        <span className='sign'>{'_> '}</span>Welcome.
      </h1>
      <p className='info'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
        dolores quis, officia in suscipit placeat dolor doloribus ipsam,
        recusandae reiciendis sed amet consequuntur consequatur voluptates velit
      </p>
      <form className='form'>
        <div ref={refCmd} onClick={(e) => handleClick(e)} id='cmd1'>
          <div id='span'>{'User >  '}</div>
          <span id='span1'>{user}</span>
          <div
            id='cursor1'
            style={
              hidden ? { visibility: 'hidden' } : { visibility: 'visible' }
            }
          ></div>
          <input
            required
            autoComplete='off'
            minLength={4}
            ref={refInput1}
            id='input1'
            type='text'
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
        </div>
        <div ref={refCmd2} onClick={(e) => handleClick(e)} id='cmd2'>
          <div id='span'>{'Password >  '}</div>
          <span id='span2'>{shifr}</span>
          <div
            style={
              hidden2 ? { visibility: 'hidden' } : { visibility: 'visible' }
            }
            id='cursor2'
          ></div>
          <input
            required
            autoComplete='off'
            ref={refInput2}
            minLength={8}
            type='text'
            id='input2'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
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
