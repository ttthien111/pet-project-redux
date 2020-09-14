import React, { useEffect, useState } from 'react'
import { withRouter, Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { MDBBtn } from 'mdbreact';
import * as constant from '../Helper/constant'
import { AlertList, Alert, AlertContainer } from 'react-bs-notifier';
export default function Header_Setup() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [loginInformation, setLoginInformation] = useState(localStorage.getItem(constant.LOGIN_INFORMATION));
  const [position, setPosition] = React.useState("bottom-right");
  const [alerts, setAlerts] = React.useState([]);
  const [alertTimeout, setAlertTimeout] = React.useState(1);
  const [newMessage, setNewMessage] = React.useState(
    'Đăng xuất thành công'
  );

  const activeRoute = ['/','/cart','/products', '/aboutus']
  function signOut() {
    generate();
    localStorage.removeItem(constant.LOGIN_INFORMATION);
    setLoginInformation(null);
  }
  function checkLogin() {
    return (loginInformation == null ? (<Link to="/login">
      <MDBBtn color={'info'}>Đăng nhập</MDBBtn>
    </Link>) : <> <strong style={{ marginRight: '5px' }}>Chào {JSON.parse(loginInformation).data.accountUserName}</strong> <MDBBtn color={'secondary'} onClick={() => signOut()}>Đăng xuất</MDBBtn></>)
  }

  const generate = React.useCallback(
    type => {
      setAlerts(alerts => [
        ...alerts,
        {
          id: new Date().getTime(),
          type: type,
          headline: `Thông báo`,
          message: newMessage
        }
      ]);
    },
    [newMessage]
  );

  useEffect(() => {
    if(activeRoute.includes(window.location.pathname)){
      setCurrentPath(window.location.pathname);
      document.getElementById(window.location.pathname).className = 'active';
    }
    console.log(currentPath);
  }, [currentPath]);

  const onDismissed = React.useCallback(alert => {
    setAlerts(alerts => {
      const idx = alerts.indexOf(alert);
      if (idx < 0) return alerts;
      return [...alerts.slice(0, idx), ...alerts.slice(idx + 1)];
    });
  }, []);

  return {currentPath, loginInformation, position, alerts, alertTimeout, onDismissed, checkLogin}
}