import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'





const ProductContext = React.createContext(); //creamos un objeto de tipo contexto
// Viene con dos objetos Provider y Consumer



class ProductProvider extends Component {

    state={ // funcion que nos arroja el estado del componente, productos y los detalles del producto
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct:detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    };


    componentDidMount(){
        this.setProducts();
    }

    setProducts = ()=>{ // funcion que muestra los productos
        let tempProducts=[];
        storeProducts.forEach(item =>{
            const singleItem={...item};
            tempProducts = [...tempProducts, singleItem];

        });
        this.setState(()=>{
            return{products:tempProducts}
        })
    }

    getItem= (id)=>{ // funcion para obtener el producto deseado
        const product =this.state.products.find(item=> item.id ===id);
        return product;
    }



    handleDetail=(id)=>{ // funcion que ayuda a mostrar los detalles de cada producto
        const product= this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product}
        })
    }

    addToCart=(id)=>{ //funcion para agregar productos al carro
        let tempProducts= [...this.state.products];
        const index= tempProducts.indexOf(this.getItem(id)); //tomamos el indice del item seleecionado
        const product = tempProducts[index];// guardamos en una constante u le pasamos el indice
        product.inCart= true; //cambiamos los valores del producto seleccionado
        product.count=1;
        const price= product.price;
        product.total= price;
        this.setState(()=>{
            return {products: tempProducts, cart: [...this.state.cart,
            product] };
        }, ()=> {
            this.addTotals();
        });

    }
    


    openModal=id=>{ //metodo que muestra el zoom al producto seleccionado
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalProduct: product,modalOpen:true}
        })
    }

    closeModal = () =>{ //metodo que cierra el zoom a producto seleccionado
        this.setState(()=>{
            return {modalOpen:false}
        })
    }
    
    increment= id =>{ //incrementa la cantidad de un producto
       let tempCart= [...this.state.cart];
       const selectedProduct= tempCart.find(item=>item.id === id);

       const index = tempCart.indexOf(selectedProduct);
       const product= tempCart[index];

       product.count= product.count + 1;
       product.total= product.count * product.price;

       this.setState(
           ()=>{return{cart:[...tempCart]}
        },
        ()=>{
            this.addTotals()});
    }

    decrement= (id) =>{ // disminuye la cantidad de un producto
        let tempCart= [...this.state.cart];
        const selectedProduct= tempCart.find(item=>item.id === id);
 
        const index = tempCart.indexOf(selectedProduct);
        const product= tempCart[index];

        product.count= product.count -1;

        if(product.cout=== 0){
            this.removeItem(id)
        }else{
            product.total= product.count * product.price;

        }
        this.setState(
            ()=>{return{cart:[...tempCart]}
         },
         ()=>{
             this.addTotals()});
    }

    removeItem= (id) =>{ // elimina un producto
       let tempProducts= [...this.state.products];
       let tempCart= [...this.state.cart];

       tempCart= tempCart.filter(item => item.id !== id);


       const index= tempProducts.indexOf(this.getItem(id));
       let removeProduct= tempProducts[index];
       removeProduct.inCart=false;
       removeProduct.count=0;
       removeProduct.total=0;

       this.setState(()=>{
           return{
               cart:[...tempCart],
                products:[...tempProducts]
           }
       },()=>{
           this.addTotals();
       }
       )} 

    clearCart= () =>{ // limpie el carro de compras
        this.setState(()=>{
            return {cart:[]};
        },()=>{
            this.setProducts();
            this.addTotals();
        })
    }

    paidBill=()=>{ // mensaje de compra realizada
        alert("Gracias por su compra");
        this.setState(()=>{
            return {cart:[]};
        },()=>{
            this.setProducts();
            this.addTotals();
        })
    }
  

    addTotals= ()=>{ // agrega los totales de la compra
        let subTotal= 0;
        this.state.cart.map(item =>(subTotal += item.total));
        const tempTax= subTotal* 0.16;
        const tax= parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=>{
            return{
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

  render() {
    return (
     <ProductContext.Provider 
        value={{
         ...this.state,
         handleDetail:this.handleDetail,
         addToCart:this.addToCart,
         openModal: this.openModal,
         closeModal: this.closeModal,
         increment: this.increment,
         decrement: this.decrement,
         removeItem: this.removeItem,
         clearCart: this.clearCart,
         paidBill: this.paidBill
       
         
     }}>
         {this.props.children}
     </ProductContext.Provider>
    )
  }
}


//Creamos el Consumer
const ProductConsumer= ProductContext.Consumer;


export  {ProductProvider, ProductConsumer};