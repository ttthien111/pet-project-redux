import React from 'react'

export const URL = 'https://localhost:44380/api/'
export const pImage = process.env.PUBLIC_URL + "/images/";

//local Storage
export const LOGIN_INFORMATION = 'loginInformation';
export const BILL_DETAIL = 'myBillDetail';

//product 
export const CART_COLUMN = [
    {
        label: <strong>Hình ảnh</strong>,
        field: 'img',
    },
    {
        label: <strong>Tên sản phẩm</strong>,
        field: 'product'
    },
    {
        label: <strong>Loại</strong>,
        field: 'category'
    },
    {
        label: <strong>Đơn giá (VNĐ)</strong>,
        field: 'price'
    },
    {
        label: <strong>Số lượng</strong>,
        field: 'qty'
    },
    {
        label: <strong>Tổng</strong>,
        field: 'amount'
    },
    {
        label: '',
        field: 'button'
    }
]

