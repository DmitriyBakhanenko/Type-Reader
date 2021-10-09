import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signUpStart } from '../redux/user/user.actions';
import './Create.style.scss';

const Create = () => {
  const [hiddenUsr, setHiddenUsr] = useState(true);
  const [hiddenEmail, setHiddenEmail] = useState(true);
  const [hiddenPwd, setHiddenPwd] = useState(true);
  const [hiddenPwdConfirm, setHiddenPwdConfirm] = useState(true);
  const [shifrPwd, setShifrPwd] = useState('');
  const [shifrPwdConfirm, setShifrPwdConfirm] = useState('');
  const history = useHistory();

  const [submitCheck, setSubmitCheck] = useState({
    pwdMatchSuccess: true,
    checkName: true,
    checkEmail: true,
    checkPwd: true,
    notValidEmail: true,
  });

  const {
    pwdMatchSuccess,
    checkName,
    checkPwd,
    checkEmail,
    notValidEmail,
  } = submitCheck;

  const cursorEvent: any = useRef();
  const refUsrCont: any = useRef();
  const refEmailCont: any = useRef();
  const refPwdCont: any = useRef();
  const refPwdConfirmCont: any = useRef();
  const refUsrInpt: any = useRef();
  const refEmailInpt: any = useRef();
  const refPwdInpt: any = useRef();
  const refPwdConfirmInpt: any = useRef();

  const dispatch = useDispatch();

  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { displayName, email, password, passwordConfirm } = userCredentials;

  // *** focuses first input on component did mount
  useEffect(() => {
    refUsrInpt.current?.focus();
  }, []);

  // *** sets focus and blinking on input click event
  const handleInputClick = (e: any) => {
    if (e.target === refUsrCont.current) {
      refUsrInpt.current?.focus();
      setHiddenUsr(!hiddenUsr);
      setHiddenPwd(true);
      setHiddenPwdConfirm(true);
      setHiddenEmail(true);
    } else if (e.target === refPwdCont.current) {
      refPwdInpt.current?.focus();
      setHiddenPwd(!hiddenPwd);
      setHiddenUsr(true);
      setHiddenPwdConfirm(true);
      setHiddenEmail(true);
    } else if (e.target === refPwdConfirmCont.current) {
      refPwdConfirmInpt.current?.focus();
      setHiddenPwdConfirm(!hiddenPwdConfirm);
      setHiddenUsr(true);
      setHiddenPwd(true);
      setHiddenEmail(true);
    } else {
      refEmailInpt.current?.focus();
      setHiddenPwdConfirm(true);
      setHiddenUsr(true);
      setHiddenPwd(true);
      setHiddenEmail(!hiddenEmail);
    }
  };

  // *** turns password to a shifr
  useEffect(() => {
    setShifrPwd('*'.repeat(password.length));
    setShifrPwdConfirm('*'.repeat(passwordConfirm.length));
  }, [password, passwordConfirm]);

  // *** sets blinking cursor to the name input
  useEffect(() => {
    if (document.activeElement === ReactDOM.findDOMNode(refUsrInpt.current))
      cursorEvent.current = setInterval(() => setHiddenUsr(!hiddenUsr), 500);
    return () => {
      clearInterval(cursorEvent.current);
    };
  });

  // *** sets blinking cursor to the email input
  useEffect(() => {
    if (document.activeElement === ReactDOM.findDOMNode(refEmailInpt.current))
      cursorEvent.current = setInterval(
        () => setHiddenEmail(!hiddenEmail),
        500
      );
    return () => {
      clearInterval(cursorEvent.current);
    };
  });

  // *** sets blinking cursor to the pass input
  useEffect(() => {
    if (document.activeElement === ReactDOM.findDOMNode(refPwdInpt.current))
      cursorEvent.current = setInterval(() => setHiddenPwd(!hiddenPwd), 500);
    return () => {
      clearInterval(cursorEvent.current);
    };
  });

  // *** sets blinking cursor to the pass confirm input
  useEffect(() => {
    if (
      document.activeElement === ReactDOM.findDOMNode(refPwdConfirmInpt.current)
    )
      cursorEvent.current = setInterval(
        () => setHiddenPwdConfirm(!hiddenPwdConfirm),
        500
      );
    return () => {
      clearInterval(cursorEvent.current);
    };
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!displayName)
      return setSubmitCheck({
        checkName: false,
        checkPwd: true,
        pwdMatchSuccess: true,
        checkEmail: true,
        notValidEmail: true,
      });

    if (!email)
      return setSubmitCheck({
        checkName: true,
        checkEmail: false,
        checkPwd: true,
        pwdMatchSuccess: true,
        notValidEmail: true,
      });

    if (!password || !passwordConfirm)
      return setSubmitCheck({
        checkName: true,
        checkEmail: true,
        checkPwd: false,
        pwdMatchSuccess: true,
        notValidEmail: true,
      });

    if (password !== passwordConfirm)
      return setSubmitCheck({
        checkName: true,
        checkEmail: true,
        checkPwd: true,
        pwdMatchSuccess: false,
        notValidEmail: true,
      });

    if (!ValidateEmail(email))
      return setSubmitCheck({
        checkName: true,
        checkEmail: true,
        checkPwd: true,
        pwdMatchSuccess: true,
        notValidEmail: false,
      });

    setSubmitCheck({
      checkName: true,
      checkEmail: true,
      checkPwd: true,
      pwdMatchSuccess: true,
      notValidEmail: true,
    });

    const credentials = { displayName, password, email };
    dispatch(signUpStart(credentials));
    history.push('/');
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="login container">
      <h1 className="header">
        <span className="sign">{'_> '}</span>Create.
      </h1>
      <p className="info">
        Please enter your credentials to create a new user account.
      </p>
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <div
          ref={refUsrCont}
          onClick={(e) => handleInputClick(e)}
          className="cmd1"
        >
          <div className="span">{'Name >  '}</div>
          <span className="span1">{displayName}</span>
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
            maxLength={16}
            ref={refUsrInpt}
            className="input1"
            type="text"
            name="displayName"
            onChange={handleChange}
            value={displayName}
          />
        </div>
        <div
          ref={refEmailCont}
          onClick={(e) => handleInputClick(e)}
          className="cmd1"
        >
          <div className="span">{'Email >  '}</div>
          <span className="span1">{email}</span>
          <div
            className="cursor1"
            style={
              hiddenEmail ? { visibility: 'hidden' } : { visibility: 'visible' }
            }
          ></div>
          <input
            required
            type="email"
            autoComplete="off"
            minLength={4}
            maxLength={26}
            ref={refEmailInpt}
            className="input1"
            name="email"
            onChange={handleChange}
            value={email}
          />
        </div>
        <div
          ref={refPwdCont}
          onClick={(e) => handleInputClick(e)}
          className="cmd2"
        >
          <div className="span">{'Pwd >  '}</div>
          <span className="span2">{shifrPwd}</span>
          <div
            style={
              hiddenPwd ? { visibility: 'hidden' } : { visibility: 'visible' }
            }
            className="cursor2"
          ></div>
          <input
            required
            autoComplete="off"
            ref={refPwdInpt}
            minLength={8}
            type="text"
            className="input2"
            name="password"
            onChange={handleChange}
            value={password}
          />
        </div>
        <div
          ref={refPwdConfirmCont}
          onClick={(e) => handleInputClick(e)}
          className="cmd3"
        >
          <div className="span">{'Pwd again >  '}</div>
          <span className="span3">{shifrPwdConfirm}</span>
          <div
            style={
              hiddenPwdConfirm
                ? { visibility: 'hidden' }
                : { visibility: 'visible' }
            }
            className="cursor3"
          ></div>
          <input
            required
            autoComplete="off"
            ref={refPwdConfirmInpt}
            minLength={8}
            type="text"
            className="input3"
            name="passwordConfirm"
            onChange={handleChange}
            value={userCredentials.passwordConfirm}
          />
        </div>
        {pwdMatchSuccess ? null : <p id="info-fail">Password doesn't match</p>}
        {checkName ? null : <p id="info-fail">Please enter your name</p>}
        {checkEmail ? null : <p id="info-fail">Please enter your email</p>}
        {notValidEmail ? null : (
          <p id="info-fail">Please enter your email correctly</p>
        )}
        {checkPwd ? null : <p id="info-fail">Please enter your password</p>}
        <div className="button" id="create-user-btn">
          <Link to="/">
            <button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              className="login"
            >
              Submit
            </button>
          </Link>
          <Link to="/">
            <button className="return">Return</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

function ValidateEmail(email: string) {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

export default Create;
