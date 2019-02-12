import React, { Component } from 'react'
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';



export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value=>{
          const {id, area, img,info, price, title, inCart}=value.detailProduct;
          return(
            <div className="container py-5">
              {/* titulo */}
                <div className="row">
                  <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                    <h1>{title}</h1>
                  </div>
                </div>
                {/* fin titulo */}
                 {/* infrmacion de producto */}
                 <div className="row">
                  <div className="col-10 mx-auto col-md-6 my-3 ">
                    <img src={img} className="img-fluid" alt="Producto"></img>
                  </div>
                   {/* texto de producto */}
                  <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <h2>Producto : {title}</h2>
                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                      Area: <span className="text-uppercase">
                        {area}
                      </span>
                    </h4>
                    <h4 className="text-blue">
                      <strong>
                        Precio: <span>$</span>{price}
                      </strong>
                    </h4>
                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                      Acerca del producto:
                    </p>
                    <p className="text-muted lead">
                      {info}
                    </p>
                     {/* Botones */}
                     <Link to='/'>
                       <ButtonContainer>
                         Regresar a los productos
                       </ButtonContainer>
                     </Link>
                     <ButtonContainer 
                     cart
                     disabled={inCart?true:false}
                     onClick={()=>{
                        value.addToCart(id);
                        value.openModal(id);
                     }}>
                       {inCart? 'inCart': "add to cart"}
                     </ButtonContainer>
                  </div>
                </div>
            </div>
          )
        }}
      </ProductConsumer>
    )
  }
}
