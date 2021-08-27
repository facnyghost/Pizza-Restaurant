import {API} from '../config';
import queryString from 'query-string'
export const getProducts = sortBy =>{
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
        method:'GET',
    })
    .then(response=>{
        return response.json()
    })
    .catch(error=>console.log(error));
}

export const getImage = (item,token) =>{
    return fetch(`${item}`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        return response.url;
    })
    .catch(error=>console.log(error));

}

export const getproductById = productId =>{
    return fetch(`${API}/products/${productId}`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    }).catch(error => console.log(error));
}

export const getRelated = productId =>{
    return fetch(`${API}/products/related/${productId}`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => console.log(error))
};

export const getBraintreeClientToken =(token) =>{
    return fetch(`${API}/braintree/getToken`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err))
}
export const processPayment =(token,paymentData)=>{
    return fetch(`${API}/braintree/payment`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(paymentData)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err))
}

export const createOrder =(token, createOrderData)=>{
    return fetch(`${API}/orders/create`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({order:createOrderData})
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err))

}