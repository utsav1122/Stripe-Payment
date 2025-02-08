import React, { useState } from 'react'; // Import useState
import logo from './logo.svg';
import './App.css';
import Stripechekout  from 'react-stripe-checkout';

function App() {

  const [product, setProduct] = useState({
    name:"React from FB",
    price:10,
    productBy:"facebook"
  });

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type":"application/json"
    }
    return fetch(`http://localhost:8282/payment`,{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE",response);
      const {status} = response;
      console.log("STATUS",status);
    })
  }  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
         
        </a>
      <Stripechekout 
      stripeKey= "pk_test_51QMtqf08o9ppX59KNgtGZSZLHToy0puBQwAFjEvVH3PB8SNS4JT27FTYNmVbI385nRgHhFi5mNdIEx8DTIGVX05Q008aadaKah"
       token = {makePayment}
        name="Buy React"
        amount={product.price * 100}
        shippingAddress = ""
        billingAddress = ""
       >
        <button className='btn large pink'>Buy ReactJS in just {product.price}$ </button>
        </Stripechekout> 


      </header>
    </div>
  );
}

export default App;
