import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './Login.style.scss';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenUsr, setHiddenUsr] = useState(true);
  const [hiddenPwd, setHiddenPwd] = useState(true);
  const [shifr, setShifr] = useState('');

  const cursorEvent: any = useRef();
  const refUsrContainer: any = useRef();
  const refPwdContainer: any = useRef();
  const refUsrInput: any = useRef();
  const refPwdInput: any = useRef();

  // *** focuses first input on component did mount
  useEffect(() => {
    refUsrInput.current?.focus();
  }, []);

  // *** sets focus and blinking on input click event
  const handleClick = (e: any) => {
    //console.log(refUsrContainer.current);
    //console.log(e.target);
    //console.log(refPwdInput.current);
    if (e.target === refUsrContainer.current) {
      refUsrInput.current?.focus();
      setHiddenUsr(!hiddenUsr);
      setHiddenPwd(true);
    } else {
      refPwdInput.current?.focus();
      setHiddenPwd(!hiddenPwd);
      setHiddenUsr(true);
    }
  };

  // *** turns password to a shifr
  useEffect(() => {
    setShifr('*'.repeat(password.length));
  }, [password]);

  // *** sets blinking cursor to the first input
  useEffect(() => {
    if (document.activeElement === ReactDOM.findDOMNode(refUsrInput.current)) {
      cursorEvent.current = setInterval(() => setHiddenUsr(!hiddenUsr), 500);
    }
    return () => {
      clearInterval(cursorEvent.current);
    };
  });

  // *** sets blinking cursor to the second input
  useEffect(() => {
    if (document.activeElement === ReactDOM.findDOMNode(refPwdInput.current)) {
      cursorEvent.current = setInterval(() => setHiddenPwd(!hiddenPwd), 500);
    }
    return () => {
      clearInterval(cursorEvent.current);
    };
  });

  return (
    <div className="login container">
      <h1 className="header">
        <span className="sign">{'_> '}</span>Welcome.
      </h1>
      <p className="info">
        This application was designed to teach you the touch typing, while you
        enjoy reading your favorite book. The project is non-commercial and open
        source. For the further information please visit{' '}
        <a
          className="source-link"
          href="https://github.com/devCote/Type-Reader"
        >
          github source-code
        </a>
        . Application keeps your privacy and does not share with other 3rd
        parties. Enjoy your time!
      </p>
      <form className="form">
        <div
          ref={refUsrContainer}
          onClick={(e) => handleClick(e)}
          className="cmd1"
        >
          <div className="span">{'User >  '}</div>
          <span className="span1">{user}</span>
          <div
            className="cursor1"
            style={
              hiddenUsr ? { visibility: 'hidden' } : { visibility: 'visible' }
            }
          ></div>
          <input
            required
            autoComplete="off"
            minLength={4}
            ref={refUsrInput}
            className="input1"
            type="text"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
        </div>
        <div
          ref={refPwdContainer}
          onClick={(e) => handleClick(e)}
          className="cmd2"
        >
          <div className="span">{'Password >  '}</div>
          <span className="span2">{shifr}</span>
          <div
            style={
              hiddenPwd ? { visibility: 'hidden' } : { visibility: 'visible' }
            }
            className="cursor2"
          ></div>
          <input
            required
            autoComplete="off"
            ref={refPwdInput}
            minLength={8}
            type="text"
            className="input2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="button">
          <button className="login">login</button>
          <Link to={'/create'}>
            <button className="create">new user</button>
          </Link>
        </div>
        <div className="button2">
          <button className="google">google</button>
          <button className="facebook">facebook</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
