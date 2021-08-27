import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Card from './Card';
//import moment from'moment'
import {getCart} from './cartHelpers';
import Cart_Layout from '../Layouts/cart_layout';
import Checkout from './Checkout';


const Cart = () =>{
    const [items, setItems] = useState([]);
    const [run, setRun] =useState(false);

    useEffect(() =>{
        setItems(getCart());
    },[run]);

    const showItems = items =>{
        return (
            <div>
                <h2>Your Order has {`${items.length}`} items</h2> 
                
                <hr />
                {items.map((product,i)=>(
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run} />
                ))}
            </div>
        )
    }


    const noItemsMessage =() =>(
        <h2>
            Your Cart is empty. <br></br> <Link to="/" >Continue Shopping</Link>
        </h2>
    );
    return (
        <Cart_Layout title="Shopping cart" >
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-6">
                    <h2 className="mb-4">Your Cart Summary</h2>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Cart_Layout>
    )
}

export default Cart;