import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { isAuthenticated } from '../auth';
import {emptyCart,updateItem,removeItem} from './cartHelpers';
import { getBraintreeClientToken, getProducts, processPayment } from './apicore';

import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products, setRun = f => f, run = undefined}) =>{
    const [data,setData] =useState({
        loading:false,
        success:false,
        clientToken: null,
        error:'',
        instance:{},
        address:''
    })

    const userId= isAuthenticated() && isAuthenticated()._id;
    const token= isAuthenticated() && isAuthenticated().token;
    const getToken =(userId,token) =>{
        getBraintreeClientToken(token).then(data =>{
            if(data.error){
                console.log(data.error);
            }
            else{
                console.log(data);
                setData({clientToken:data.clientToken})
            }
        })
    }


    useEffect(()=>{
        getToken(userId,token);
    },[])

    const handleAddress =event =>{
        setData({...data,address:event.target.value});
    };
    const getTotal= () =>{
        
        return products.reduce((currentvalue,nextvalue) =>{
            // console.log(currentvalue + parseInt(nextvalue.count) * parseInt(nextvalue.price.slice(0, -1)))
            return currentvalue + parseInt(nextvalue.count) * parseInt(nextvalue.price.slice(0, -1));
        },0);
    }

    const showCheckout =() =>{
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ):(
            <Link to="/signin">
                <button className="btn btn-primary"> Signin in to Checkout</button>
            </Link>
        )
    }
    let deriveryAddress = data.address;
    
    const buy =() =>{
        setData({loading:true});
        let nonce;
        let getNonce= data.instance
        .requestPaymentMethod()
        .then(data =>{
            nonce =data.nonce;
            const paymentData ={
                paymentMethodNonce:nonce,
                amount:getTotal(products)
            }
            processPayment(token,paymentData)
            .then(response =>{
                console.log(response)
                const createOrderData ={
                    products:products,
                    transaction_id:response.transaction.id,
                    amount:response.transaction.amount,
                    address:deriveryAddress
                };
                createOrderData(token,createOrderData)
                .then(response =>{
                    emptyCart(() =>{
                        setRun(!run);
                        console.log('payment success and empty cart')
                        setData({
                            loading:false,
                            success:true,
                        })
                    })
                })
                .catch(error =>{
                    console.log(error);
                    setData({loading:false})
                })
            })
            .catch(error =>{
                setData({...data,error:error.message})
            })

        })
    }
    const showDropIn =() =>(
        <div onBlur={() => setData({...data,error:''})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="form-group mb-3">
                        <label className="text-muted">
                            Delivery Address
                        </label>

                        </div>

                    <DropIn 
                        options={{
                            authorization:data.clientToken,
                            paypal:{
                                flow:'vault'
                            }
                        }}
                        onInstance ={instance => (data.instance = instance)} />

                        <button  onClick={buy} className="btn btn-success btn-block">
                            Pay
                        </button>
                    </div>
            ): null}
        </div>
    )
    const showError = error =>(
        <div className="alert alert-danger" style={{display :error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = success =>(
        <div className="alert alert-info" style={{display :success ? '' : 'none'}}>
            {success}
        </div>
    )
    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;
    return (
        <div>
            <h2>Total:${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )

}
export default Checkout;