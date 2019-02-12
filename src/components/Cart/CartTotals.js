import React from 'react'

import { Link } from 'react-router-dom';

export default function CartTotals({value}) {
const {cartSubTotal, cartTax, cartTotal,clearCart,paidBill}= value;


  return <React.Fragment>
       <div className="container">
           <div className="row">
               <div className="col-10 mt-2 mb-sm-5 ml-auto col-sm-8 text-capitalize text-right">
                    <Link to='/'>
                        <button className="btn btn-outline-danger text-uppercase mb-3 px-5" 
                        type="button" onClick={()=> clearCart()}>
                        Limpiar Carro
                        </button>
                    </Link>
                    <button className="btn btn-outline-primary text-uppercase mb-3 px-5" style={{width:"7rem",height:"2.3rem"}} 
                        type="button" onClick={()=> paidBill()}>
                        Pagar
                    </button>
                    <h5>
                        <span className="text-title">
                            Subtotal : 
                        </span>
                        <strong>$ {cartSubTotal}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">
                            Impuestos : 
                        </span>
                        <strong>$ {cartTax}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">
                            Total : 
                        </span>
                        <strong>$ {cartTotal}</strong>
                    </h5>
               </div>
               
                </div>
       </div>
   </React.Fragment>
  
}
