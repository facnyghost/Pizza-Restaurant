import React, {useEffect, useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import { isAuthenticated } from '../auth';
import Cart_Layout from '../Layouts/cart_layout'
import {getProducts,deleteProduct} from './apiAdmin';


const ManageMeal =(props)=>{
const [products,setProducts] =useState([]);
const {user, token} = isAuthenticated();

const loadProducts=() =>{
    getProducts().then(data =>{
        console.log(data)
        if(data.error){
          console.log(data.error)
        }
        else{
        setProducts(data);
        }
        })
}

const removeproduct= productId =>{
    deleteProduct(productId,token).then(data=>{
        if(data.error){
            console.log(data.error)
          }
          else{
            loadProducts();
        }
          }) 
}

useEffect(()=>{
    loadProducts();
},[])

return (
    <Cart_Layout title="Manage Meals" description={'Terms of use. Privacy policy'}>
            <div className="row">
                <div className="col-12">

                    <h2 className="text-center">Total {products.length} Products</h2>
                    <ul className="list-group">
                                {products.map((p,i)=>(
                               
                        <li key={i}
                               className="list-group-item jsutify-content-between align-items-center ">
                                        <strong className="mx-3">{p.name}</strong>
                                        <Link to={`/admin/update/product/${p._id}`} >
                                            <span className=" mx-4  badge bg-warning badge-pill">
                                                Update
                                            </span>
                                        </Link>
                                        <span onClick={() => removeproduct(p._id)}
                                        className="badge mx-4 bg-danger badge-pill">
                                            Remove
                                        </span>
                                    </li>
                                ))}
                    </ul>
                </div>
            </div>

    </Cart_Layout>
)

}

export default ManageMeal;