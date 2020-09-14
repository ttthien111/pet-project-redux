import React, { useEffect, useState } from 'react'
import { withRouter, Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Product from '../Component/Products';
import AboutUs from '../Component/AboutUs';
import Cart from '../Component/Cart';
import Dashboard from '../Component/Dashboard';
import ProductDetail from '../Data/ProductDetail'
import Login from '../Component/Login'
import 'bootstrap/dist/css/bootstrap.css';
import { MDBBtn } from 'mdbreact';
import * as constant from '../Helper/constant'
import { AlertList, Alert, AlertContainer } from 'react-bs-notifier';
import Header_Setup from './Header.spec'
function Header() {
  const {currentPath, loginInformation, position, alerts, alertTimeout, onDismissed, checkLogin} = Header_Setup();
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light" color="black" fixed="top" dark expand="md">
        <a className="navbar-brand" href="#">PETSHOP</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item" id='/'>
              <Link to="/" className="nav-link">Trang chủ <span className="sr-only"></span></Link>
            </li>
            <li className="nav-item dropdown" id='/products'>
              <Link to="/products" className="nav-link" id="navbarDropdown" role="button">
                Sản phẩm
              </Link>
            </li>
            <li className="nav-item" id='/cart'>
              <a className="nav-link" href="/cart">Giỏ hàng</a>
            </li>
            <li className="nav-item" id='/aboutus'>
              <a className="nav-link" href="/aboutus">Về chúng tôi</a>
            </li>
          </ul>
        </div>
        {checkLogin()}
      </nav>
      <Switch>
        <Route exact path='/'>
          <Dashboard></Dashboard>
        </Route>
        <Route exact path='/aboutUs'>
          <AboutUs></AboutUs>
        </Route>
        <Route exact path='/cart'>
          <Cart></Cart>
        </Route>
        <Route exact path='/login'>
          <Login></Login>
        </Route>
        <Route exact path='/products'>
          <Product></Product>
        </Route>
        <Route path='/products/:category/:productName'>
          <ProductDetail></ProductDetail>
        </Route>
      </Switch>
      <AlertList
        className={`btn btn-info`}
        position={position}
        alerts={alerts}
        timeout={alertTimeout}
        dismissTitle="Begone!"
        onDismiss={onDismissed}
      />
    </Router>
  )
}
export default withRouter(Header);