import React, { useState, useEffect, useRef } from "react";
import { MDBRow, MDBCard, MDBCardBody, MDBTooltip, MDBTable, MDBTableBody, MDBTableHead, MDBInput, MDBBtn, MDBContainer } from "mdbreact";
import { AlertList } from 'react-bs-notifier';
import * as constant from '../Helper/constant';
import Cart_Setup from './Cart.spec';
export default function Cart() {
    const { column, cartData, loginInformation, inputNumberUpdate, position, alerts, alertTimeout, data, rowsTemp, rows, getInputValue, DeleteCurentItem, Purchase, onDismissed } = Cart_Setup();

    if (cartData.length !== 0)
        return (
            <MDBContainer>
                <MDBRow className="my-2" center>
                    <MDBCard className="w-100">
                        <MDBCardBody>
                            <MDBTable className="product-table">
                                <MDBTableHead className="font-weight-bold" color="mdb-color lighten-5" columns={column} />
                                <MDBTableBody rows={rows} />
                                <MDBTableBody rows={rowsTemp} />
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
                <AlertList
                    position={position}
                    alerts={alerts}
                    timeout={alertTimeout}
                    dismissTitle="Begone!"
                    onDismiss={onDismissed}
                />
            </MDBContainer>
        )
    else
        return (
            <MDBContainer>
                <img style={{ width: '100%', height: '600px' }} class="center" src="https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png" />
            </MDBContainer>
        )
}