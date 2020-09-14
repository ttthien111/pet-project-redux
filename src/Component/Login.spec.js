import React, { useState } from "react";
import Axios from 'axios'
import * as constant from '../Helper/constant'
export default function Login_Setup() {
    const [userName, setUserName] = useState('ABC');
    const [password, setPassword] = useState('123');

    function alertLoginStatus(res) {
        if (res !== undefined) {
            alert('Đăng nhập thành công');
            delete (res.data.accountPassword);
            localStorage.setItem(constant.LOGIN_INFORMATION, JSON.stringify(res));
            console.log(localStorage.getItem(constant.LOGIN_INFORMATION));
            window.location.replace('http://localhost:3000/');
        }
        else {
            alert('Vui lòng đăng nhập lại');
            window.location.reload();
        }
    }
    const onChangeUsername = (e) => {
        setUserName(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    async function Login() {
        var userInfo = JSON.stringify({ userName, password });
        console.log(userInfo);
        const response = await Axios.post(constant.URL + 'LoginAuthentication/Authenticate', userInfo, {
            headers: { 'content-type': 'application/json; charset=utf-8' }
        })
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch(e => console.log(e));
        console.log(response);
        alertLoginStatus(response);
    }
    return {onChangeUsername, onChangePassword, userName, password, Login}
}