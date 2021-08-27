import {API} from '../config'


export const createCategory =(token,category)=>{
    return fetch(`${API}/categories/new_category`,{
        method:"POST",
        headers:{
            Accpet:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })

}


export const createdProduct =(token,product)=>{
    return fetch(`${API}/products/new_product`,{
        method:"POST",
        headers:{
            Accpet:'application/json',
            Authorization:`Bearer ${token}`
        },
        body: product
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        console.log(error);
    })
}

export const getCategory =categoryId =>{
    return fetch(`${API}/categories/${categoryId}`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(error=>{console.log(error)})
}

export const getCategories =() =>{
    return fetch(`${API}/categories/`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(error=>{console.log(error)})
}

export const UpdateCategory =(categoryId,token,category)=>{
    return fetch(`${API}/update/${categoryId}`,{
        method:"PUT",
        headers:{
            'Content-Type': 'application/json',
            Accpet:'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response =>{
        return response.json();
    }).catch(error => console.log(error));
}
export const getProduct =(productId)=>{
    return fetch(`${API}/products/${productId}`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(error=>{console.log(error)})

}

export const getProducts =()=>{
    return fetch(`${API}/products/`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(error=>{console.log(error)})

}

export const updateProduct =(productId,token,product)=>{

    return fetch(`${API}/update/${productId}`,{
        
        method:"PUT",
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        
        body:product

    })
    .then(response =>{
        return response.json();
    }).catch(error => console.log(error));
}

export const deleteProduct=(productId,token)=>{
    return fetch(`${API}/products/delete/${productId}`,{
        method:"DELETE",
        headers:{
            'Content-Type': 'application/json',
            Accpet:'application/json',
            Authorization:`Bearer ${token}`
        },
      
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}