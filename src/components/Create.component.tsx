import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './Create.style.scss';

const Create = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [hiddenUsr, setHiddenUsr] = useState(true);
  const [hiddenPwd, setHiddenPwd] = useState(true);
  const [hiddenPwdConfirm, setHiddenPwdConfirm] = useState(true);
  const [shifrPwd, setShifrPwd] = useState('');
  const [shifrPwdConfirm, setShifrPwdConfirm] = useState('');
  const [pwdMatch, setPwdMatch] = useState(true);

  const cursorEvent: any = useRef();
  const refUsrCont: any = useRef();
  const refPwdCont: any = useRef();
  const refPwdConfirmCont: any = useRef();
  const refUsrInpt: any = useRef();
  const refPwdInpt: any = useRef();
  const refPwdConfirmInpt: any = useRef();

  // *** focuses first input on component did mount
  useEffect(() => {
    refUsrInpt.current?.focus();
  }, []);

  // *** sets focus and blinking on input click event
  const handleClick = (e: any) => {
    if (e.target === refUsrCont.current) {
      refUsrInpt.current?.focus();
      setHiddenUsr(!hiddenUsr);
      setHiddenPwd(true);
      setHiddenPwdConfirm(true);
    } else if (e.target === refPwdCont.current) {
      refPwdInpt.current?.focus();
      setHiddenPwd(!hiddenPwd);
      setHiddenUsr(true);
      setHiddenPwdConfirm(true);
    } else {
      refPwdConfirmInpt.current?.focus();
      setHiddenPwdConfirm(!hiddenPwdConfirm);
      setHiddenUsr(true);
      setHiddenPwd(true);
    }
  };

  // *** turns password to a shifr
  useEffect(() => {
    setShifrPwd('*'.repeat(password.length));
    setShifrPwdConfirm('*'.repeat(passwordConfirm.length));
  }, [password, passwordConfirm]);

  // *** sets blinking cursor to the first input
  useEffect(() => {
    if (document.activeElement === ReactDOM.findDOMNode(refUsrInpt.current))
      cursorEvent.current = setInterval(() => setHiddenUsr(!hiddenUsr), 500);
    return () => {
      clearInterval(cursorEvent.current);
    };
  });

  // *** sets blinking cursor to the second input
  useEffect(() => {
    if (document.activeElement === ReactDOM.findDOMNode(refPwdInpt.current))
      cursorEvent.current = setInterval(() => setHiddenPwd(!hiddenPwd), 500);
    return () => {
      clearInterval(cursorEvent.current);
    };
  });

  // *** sets blinking cursor to the third input
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
    if (password !== passwordConfirm) {
      setPwdMatch(false);
    } else {
      setPwdMatch(true);
    }
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
        <div ref={refUsrCont} onClick={(e) => handleClick(e)} className="cmd1">
          <div className="span">{'Usr >  '}</div>
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
            maxLength={16}
            ref={refUsrInpt}
            className="input1"
            type="text"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
        </div>
        <div ref={refPwdCont} onClick={(e) => handleClick(e)} className="cmd2">
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div
          ref={refPwdConfirmCont}
          onClick={(e) => handleClick(e)}
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
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
        </div>
        {pwdMatch ? null : <p id="info-pwd">Passwords Don't Match</p>}
        <div className="button">
          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            className="login"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
