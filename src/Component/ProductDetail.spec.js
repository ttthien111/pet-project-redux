import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { MDBContainer } from 'mdbreact';
export default function ProductDetail_Setup(props) {
    const [numberOfProduct, setNumberOfProduct] = useState(1);
    const [position, setPosition] = React.useState("bottom-right");
    const [alerts, setAlerts] = React.useState([]);
    const [alertTimeout, setAlertTimeout] = React.useState(0.5);
    const [newMessage, setNewMessage] = React.useState(
        "Đã được thêm vào giỏ hàng"
    );

    const generate = React.useCallback(
        type => {
            setAlerts(alerts => [
                ...alerts,
                {
                    id: new Date().getTime(),
                    type: type,
                    headline: `Yay!!!`,
                    message: newMessage
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

    //SumOfProduct = price of product * quantity
    let SumOfProduct = numberOfProduct * props[4];
    //when user click add to cart
    function addToCart() {
        //get product which were chosen or return empty array
        let data = JSON.parse(localStorage.getItem('myBillDetail')) || [];
        //flag to check item was already in cart 
        let isDup = false;
        //get product information was sent by productDetailData
        const productData = {
            'pId': props[0],
            'pName': props[1],
            'pCategory': props[2],
            'pImage': props[3],
            'pPrice': props[4],
            'pDiscount': props[5],
            'numberOrder': numberOfProduct,
            'total': SumOfProduct
        }
        //check duplicate product
        for (let index = 0; index < data.length; index++) {
            //if duplicate then accumulate that item into data array
            //trigger flag and break loop
            if (productData.pId == data[index].pId && productData.pCategory == data[index].pCategory) {
                data[index].numberOrder += productData.numberOrder;
                data[index].total += productData.total;
                isDup = true;
                break;
            }
        }
        //if not duplicate, then push new product to array
        if (!isDup) {
            data.push(productData)
        }
        //set new storage
        localStorage.setItem('myBillDetail', JSON.stringify(data));

        //alert
        generate("success");
    }

    //prevent negative number from user input
    function checkMin(num) {
        if (num < 1) {
            setNumberOfProduct(1);
        }
        else {
            setNumberOfProduct(numberOfProduct - 1);
        }
    }
    return { numberOfProduct, newMessage, position, alerts, alertTimeout, setNumberOfProduct, generate, onDismissed, addToCart, checkMin }
}