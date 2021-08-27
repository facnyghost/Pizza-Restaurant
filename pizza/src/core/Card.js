import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from'moment'
import {addItem,updateItem,removeItem} from './cartHelpers';

const Card =({
    product,
    token,
    showViewProductButton=true,
    showAddToCartButton=true,
    cartUpdate=true,
    showRemoveProductButton=true,
    setRun =f =>f,
    run = undefined
})=>{
    const [redirect,setRedirect] = useState(false);
    const [count,setCount] = useState(product.count);
    const showViewButton= showViewProductButton =>{
        return(
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn borderd mt-2 mb-2 mx-3 card-btn-2 rounded-pill">Details</button>
                </Link>
            )
        )
    };
    const addToCart= () =>{
        addItem(product,setRedirect(true));
    }
    const shouldRedirect= redirect =>{
        if(redirect){
            return <Redirect to="/cart"/>;
        }
    }
    const showAddToCartBtn =showAddToCartButton =>{
        return(
            showAddToCartButton && 
            <button onClick={addToCart} className="btn borderc mt-2 mb-2  card-btn-2 rounded-pill">
                Add to Order
            </button>
        )
    }

    const showStock = rating =>{
        return rating > 3 ? (
            <span className="badge back1 badge-pill">
Highly Recommended</span>
        ):(
            <span className="badge back1 badge-pill"> New Tasty</span>
        
        )
    }
    
    const handleChange = productId => event =>{
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >= 1){
            updateItem(productId,event.target.value);
        }
    }
    const showCartUpdateOptions = cartUpdate =>{
        return (
            cartUpdate && (
                <div>
                    <div className="input-group-mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                 Quantity
                            </span>
                            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>

                        </div>

                    </div>
                </div>
            )
        )
    }
    const showRemoveButton = showRemoveProductButton =>{
        return (
            showRemoveProductButton && (
                <button onClick={()=>{
                    removeItem(product._id);
                    setRun(!run);
                }}
                className="btn btn-outline-danger rounded-pill mt-2 mb-2">
                    Remove
                </button>
            )
        )
    }

    return(
        <div className="card">
            <div className="card-header card-header-1 p">
                {product.name}
            </div>
            <div className="card-body">
            {shouldRedirect(redirect)}
            <ShowImage item={product.image} />
            <p className="card-p ">Category: <span className="font5">{product.category && product.category.child_name} </span></p>
            <p className="card-p mt-2">Prepartion Time: <span className="font5">{product.preparetime}</span></p>
            <p className="card-p">Price: <span className="font5 money">{product.price}</span></p>

            {showStock(product.rating)}
            <br></br>
            {showAddToCartBtn(showAddToCartButton)}
            {showViewButton(showViewProductButton)}
            {showRemoveButton(showRemoveProductButton)}
            {showCartUpdateOptions(cartUpdate)}

            </div>
        </div>
    )
}

export default Card;