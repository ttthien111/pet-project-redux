import React, { useState, useEffect } from 'react'
import ProductDetail_Setup from './ProductDetail.spec'
import * as constant from '../Helper/constant'
import { MDBContainer } from 'mdbreact';
import { AlertList } from 'react-bs-notifier';
export default function ProductDetail(props) {

  //props get from Data/ProductDetail
  //props contain number of fields which was declared as below
  // Id: props[0],
  //   Name: props[1],
  //     Category: props[2],
  //       Image: props[3],
  //         Price: props[4],
  //           Discount: props[5]
  const { numberOfProduct, newMessage, generate, position, alerts, alertTimeout, setNumberOfProduct, onDismissed, addToCart, checkMin } = ProductDetail_Setup(props);
  return (
    <MDBContainer>
      <div class="card mt-5 hoverable">
        <div class="row mt-5">
          <div class="col-lg-6">
            {/*Carousel Wrapper*/}
            <div id="carousel-thumb" class="carousel slide carousel-fade carousel-thumbnails" data-ride="carousel">

              {/*Slides*/}
              <div class="carousel-item active">
                <img src={constant.pImage + props[3]} alt="Second slide" class="img-fluid" />
              </div>
              {/*/.Slides*/}


            </div>
            {/*/.Carousel Wrapper*/}
          </div>
          <div class="col-lg-5 mr-3 text-center text-md-left">
            <h2 class="h2-responsive text-center text-md-left product-name font-weight-bold dark-grey-text mb-1 ml-xl-0 ml-4">
              <strong>{props[1]}</strong>
            </h2>
            <span class="badge badge-danger product mb-4 ml-xl-0 ml-4" style={{ marginRight: '10px' }}>bestseller</span>
            <span class="badge badge-danger product mb-4 ml-xl-0 ml-4">{props[5] > 0 ? <>{`-${props[5] * 100}%`} </> : <></>}</span>
            <h3 class="h3-responsive text-center text-md-left mb-5 ml-xl-0 ml-4">
              <span class="red-text font-weight-bold">
                <strong>{props[4]}</strong>
              </span>
              {props[5] > 0 ?
                (
                  <span class="grey-text">
                    <small>
                      <s>
                        {(1 + props[5]) * props[4]}
                      </s>
                    </small>
                  </span>
                ) :
                (
                  <span class="grey-text">
                    <small>
                      <s>
                      </s>
                    </small>
                  </span>
                )}
            </h3>

            {/*Accordion wrapper*/}
            <div class="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">

              {/* Accordion card */}
              <div class="card">

                {/* Card header */}
                <div class="card-header" role="tab" id="headingOne1">
                  <p data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne1" aria-expanded="true" aria-controls="collapseOne1">
                    <h5 class="mb-0">
                      Mô tả
                      <i class="fas fa-angle-down rotate-icon"></i>
                    </h5>
                  </p>
                </div>
                <div id="collapseOne1" class="collapse show" role="tabpanel" aria-labelledby="headingOne1" data-parent="#accordionEx">
                  <div class="card-body">
                    {props[6]}
                  </div>
                </div>
              </div>
              <br></br>
              <div style={{ width: '100%', textAlign: "center" }} className="def-number-input number-input">
                <div>
                  <button onClick={() => checkMin(numberOfProduct - 1)} className="minus">-</button>
                  <input min={'1'} type="number" style={{ textAlign: 'center', width: '100px' }} className="quantity" name="quantity" value={numberOfProduct} onChange={(e) => setNumberOfProduct(parseInt(e.target.value))} />
                  <button onClick={() => setNumberOfProduct(numberOfProduct + 1)} className="plus">+</button>
                </div>
                <br></br>
                <div>
                  <strong>Tổng: <p style={{ color: 'red', display: "inline-block" }}>{numberOfProduct * props[4]}</p></strong>
                </div>
              </div>
              <section class="color">
                <div class="mt-5">

                  <div class="row mt-3 mb-4">
                    <div class="col-md-12 text-center text-md-left text-md-right">
                      <button class="btn btn-primary btn-rounded waves-effect waves-light" onClick={addToCart}>
                        <i class="fas fa-cart-plus mr-2" aria-hidden="true"></i> Add to cart</button>
                    </div>
                  </div>
                </div>
              </section>
              {/* /.Add to Cart */}
            </div>
          </div>
        </div>
      </div>
      <>
        <AlertList
          position={position}
          alerts={alerts}
          timeout={alertTimeout}
          dismissTitle="Begone!"
          onDismiss={onDismissed}
        />
      </>
    </MDBContainer>
  )
}