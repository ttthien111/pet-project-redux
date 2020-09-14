import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCardBody } from 'mdbreact';
import Login_Setup from "./Login.spec";
export default function Login() {
    const {onChangeUsername, onChangePassword, userName, password, Login} = Login_Setup();
    return (
        <MDBContainer>
            <MDBRow>
                    <MDBCol >
                        <div style={{textAlign:'center'}}>
                            <form className='w-50' style={{display:"inline-block"}}>
                                <p className="h5 text-center mb-4">Sign in</p>
                                <div className="grey-text">
                                    <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                                        value={userName} onChange={(e) => onChangeUsername(e)} success="right" />
                                    <MDBInput value={password} onChange={(e) => onChangePassword(e)} label="Type your password" icon="lock" group type="password" validate />
                                </div>
                                <div className="text-center">
                                    <MDBBtn onClick={Login} color='info'>Sign in</MDBBtn>
                                </div>
                            </form>
                        </div>
                    </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};
