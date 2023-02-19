import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function  ProductDetails(props) {

  const [quantity,setQuantity] =useState(0)




  console.log("product DETAILS",props);
  const increment=()=>{
    setQuantity(quantity+20)
  }
  const decrement=()=>{
    setQuantity(quantity-20)
  }

  return (
    <div>
      <div id="contain">
        <div className="product-details">
          <h1>{props.data.name}</h1>
          <span className="hint-star star">
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star-o" aria-hidden="true" /> 
          </span>
          <p className="information">{props.data.category}</p>
          <span > <b> Quantity : {props.data.quantity} </b><button onClick={increment}>+</button> <button onClick={decrement}>-</button></span>
          <div className="control">
            <button className="btnnn">
              <span className="price">{props.data.price} DNT</span>
              <span className="shopping-cart">
                <i className="fa fa-shopping-cart" aria-hidden="true" />
              </span>
              <span className="buy">Ajouter au panier</span>
            </button>
          </div>
        </div>
        <div className="product-image">
          <img src={props.data.image} alt="" />
          <div className="info">
            <ul className="deslis">
              <li>
                <h4>Brand : {props.data.category}</h4>
              </li>
              <li>
              <h4> More details : 
                {props.data.description}</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductDetails
