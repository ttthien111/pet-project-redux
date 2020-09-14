import React, { useState, useEffect, useRef } from "react";
import { MDBRow, MDBCard, MDBCardBody, MDBTooltip, MDBTable, MDBTableBody, MDBTableHead, MDBInput, MDBBtn, MDBContainer } from "mdbreact";
import { AlertList } from 'react-bs-notifier';
import * as constant from '../Helper/constant'
export default function Cart_Setup() {
    //first initial
    const cartData = JSON.parse(localStorage.getItem(constant.BILL_DETAIL)) || []
    const column = constant.CART_COLUMN;
    const rowsTemp = [];
    const rows = [];
    let TotalBill = 0;
    //hooks:
    const [loginInformation, setLoginInformation] = useState(localStorage.getItem(constant.LOGIN_INFORMATION));
    const [inputNumberUpdate, setInputNumberUpdate] = useState(cartData);
    const [position, setPosition] = React.useState("bottom-right");
    const [alerts, setAlerts] = React.useState([]);
    const [alertTimeout, setAlertTimeout] = React.useState(1);
    const [newMessage, setNewMessage] = React.useState(
        null
    );
    const [columns, setColumns] = useState(cartData);
    const [data, setData] = useState(column);
    const didMountRef = useRef(false);

    function getInputValue(value, index) {
        let newArr = [...inputNumberUpdate];
        console.log(newArr);
        newArr[index].numberOrder = value;
        setInputNumberUpdate(newArr);
    }
    
    function DeleteCurentItem(index) {
        cartData.splice(index, 1);
        localStorage.setItem(constant.BILL_DETAIL, JSON.stringify(cartData));
        window.location.reload();
    }

    function Purchase() {
        if (loginInformation !== null) {
            setNewMessage('Đơn hàng đã được tiếp nhận');
            generate('success');
            setTimeout(() => localStorage.removeItem(constant.BILL_DETAIL), 500);
            setTimeout(() => window.location.replace('http://localhost:3000/products'), 2000);
        }
        else {
            setNewMessage('Vui lòng đăng nhập để mua hàng');
            generate('danger');
        }

    }

    cartData.map((row, index) => {
        let category = row.pCategory === 1 ? 'Thực phẩm' : row.pCategory === 2 ? 'Đồ chơi' : 'Quần áo';
        let imgURL = process.env.PUBLIC_URL + "/images/" + row.pImage;
        TotalBill += inputNumberUpdate[index].numberOrder * row.pPrice;
        return rows.push(
            {
                'img': <img src={imgURL} style={{ width: '100px', height: '100px' }} alt="" className="img-fluid z-depth-0" />,
                'product': [<h5 className="mt-3" key={new Date().getDate + 1}><strong>{row.pName}</strong></h5>, <p key={new
                    Date().getDate} className="text-muted">{row.pName}</p>],
                'category': category,
                'price': `${row.pPrice}`,
                'qty':
                    <>
                        <input min={'1'} type="number" placeholder={row.numberOrder} value={inputNumberUpdate.numberOrder} style={{ width: "100px" }} onChange={(e) => getInputValue(parseInt(e.target.value), index)} />
                    </>,
                'amount':
                    <>
                        <strong>{inputNumberUpdate[index].numberOrder * row.pPrice}</strong>
                    </>,
                'buttonRefresh':
                    <>
                        <i className="fas fa-camera fa-xs"></i>
                        <MDBTooltip placement="top">
                            <MDBBtn onClick={() => DeleteCurentItem(index)} color="primary" size="m">
                                X
                        </MDBBtn>
                            <div>Xóa sản phẩm</div>
                        </MDBTooltip>
                    </>
            }
        )
    });

    rowsTemp.push({
        'img': <div></div>,
        'product': <div></div>,
        'category': <div></div>,
        'price': <div></div>,
        'qty': <strong>Tổng</strong>,
        'amount': <strong style={{ color: 'red' }}>{TotalBill}</strong>,
        'button':
            <MDBTooltip placement="top">
                <MDBBtn onClick={Purchase} color="primary" size="m">
                    Mua ngay
                        </MDBBtn>
                <div>Hoàn tất đơn đặt</div>
            </MDBTooltip>
    })

    useEffect(() => {
        if (didMountRef.current)
            Purchase();
        else
            didMountRef.current = true;
    }, [newMessage]);

    const generate = React.useCallback(
        type => {
            setAlerts(alerts => [
                ...alerts,
                {
                    id: new Date().getTime(),
                    type: type,
                    message: newMessage,
                    headline: `Thông báo!`
                }
            ]);
        },
        [newMessage]
    );
    const onDismissed = React.useCallback(alert => {
        setAlerts(alerts => {
            const idx = alerts.indexOf(alert);
            if (idx < 0) return alerts;
            return [...alerts.slice(0, idx), ...alerts.slice(idx + 1)];
        });
    }, []);

    return { column, cartData, loginInformation, inputNumberUpdate, position, alerts, alertTimeout, data, rowsTemp, rows, getInputValue, DeleteCurentItem, Purchase, onDismissed }
}
