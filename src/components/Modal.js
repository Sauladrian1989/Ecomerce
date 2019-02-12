import React, { Component } from 'react'
import styled from 'styled-components';
import {ProductConsumer} from '../context';
import { ButtonContainer } from './Button';
import { Link } from 'react-router-dom';


export default class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
          {(value)=>{
              const {modalOpen, closeModal}= value;
              const {img, title, price}= value.modalProduct;

              if(!modalOpen){
                  return null;
              }else{
                 return ( <ModalContainer>
                    <div className="container">
                        <div className="row">
                            <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4  text-center text-capitalize p-5" >
                                <h5>Producto agregado al carro</h5>
                                <img src={img} className="img-fluid" alt="producto"></img>
                                <h5>{title}</h5>
                                <h5 className="text-muted">Precio:$ {price}</h5>
                                <Link to='/'>
                                    <ButtonContainer onClick={()=>{closeModal()}}>
                                        Seguir comprando
                                    </ButtonContainer>
                                </Link>
                                <Link to='cart'>
                                    <ButtonContainer  cart onClick={()=>{closeModal()}}>
                                        Ir a carro
                                    </ButtonContainer>
                                </Link>
                            </div>
                        </div>
                    </div>
                  </ModalContainer>
                 );
              }
              
          }}
      </ProductConsumer>
    )
  }
}


export const  ModalContainer = styled.div `
position: fixed;
top: 0;
left 0;
right:0;
bottom:0;
background: rgba(0,0,0,0.3);
display: flex;
align-item: center;
justify-content: center;
#modal{
    background: var(--mainWhite);
    margin-top: 5rem;
}
`