import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  emailSignInStart,
  googleSignInStart,
} from '../redux/user/user.actions';
import './Login.style.scss';
import { userAuthificationLoaded } from '../redux/user/user.selectors';
import Spinner from './spinner.component';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hiddenEmail, setHiddenEmail] = useState<boolean>(true);
  const [hiddenPwd, setHiddenPwd] = useState<boolean>(true);
  const [shifr, setShifr] = useState<string>('');

  const cursorEvent: any = useRef();
  const refEmailContainer = useRef<HTMLDivElement | null>(null);
  const refPwdContainer = useRef<HTMLInputElement | null>(null);
  const refEmailInput = useRef<HTMLInputElement | null>(null);
  const refPwdInput = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();
  const isLoading: boolean = useSelector(userAuthificationLoaded);

  // *** focuses first input on component did mount
  useEffect(() => {
    if (refEmailInput.current) refEmailInput.current.focus();
  }, []);

  // *** sets focus and blinking on input click event
  const handleClick = (e: any) => {
    if (e.target === refEmailContainer.current) {
      if (refEmailInput.current) refEmailInput.current.focus();
      setHiddenEmail(!hiddenEmail);
      setHiddenPwd(true);
    } else {
      if (refPwdInput.current) refPwdInput.current.focus();
      setHiddenPwd(!hiddenPwd);
      setHiddenEmail(true);
    }
  };

  // *** turns password to a shifr
  useEffect(() => {
    setShifr('*'.repeat(password.length));
  }, [password]);

  // *** sets blinking cursor to the first input
  useEffect(() => {
    if (
      document.activeElement === ReactDOM.findDOMNode(refEmailInput.current)
    ) {
      cursorEvent.current = setInterval(
        () => setHiddenEmail(!hiddenEmail),
        500
      );
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

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (email || password) {
      const userCredentials = { email, password };
      dispatch(emailSignInStart(userCredentials));
    }
  };

  const googleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(googleSignInStart());
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="login container">
          <h1 className="header">
            <span className="sign">{'_> '}</span>Welcome.
          </h1>
          <p className="info">
            This application was designed to teach you the touch typing, while
            you enjoy reading your favorite book. The project is non-commercial
            and open source. For the further information please visit{' '}
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
              ref={refEmailContainer}
              onClick={(e) => handleClick(e)}
              className="cmd1"
            >
              <div className="span">{'Email >  '}</div>
              <span className="span1">{email}</span>
              <div
                className="cursor1"
                style={
                  hiddenEmail
                    ? { visibility: 'hidden' }
                    : { visibility: 'visible' }
                }
              ></div>
              <input
                required
                autoComplete="off"
                minLength={4}
                ref={refEmailInput}
                className="input1"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
                  hiddenPwd
                    ? { visibility: 'hidden' }
                    : { visibility: 'visible' }
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
              <Link to="/" className="menu-link">
                <button type="submit" onClick={handleSubmit} className="login">
                  login
                </button>
              </Link>
              <Link to="/create" className="create-link">
                <button>new user</button>
              </Link>
            </div>
            <div className="button2">
              <button className="google" onClick={googleSignIn}>
                google
              </button>
              <button className="facebook">facebook</button>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default Login;
