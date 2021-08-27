import React, { useEffect, useState } from 'react';
import { getproductById, getRelated } from './apicore';
import Card from './Card';
import Cart_Layout from '../Layouts/cart_layout'

const Product = props =>{
    const [product ,setProduct] = useState([]);
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);;


    const loadSingleProduct = productId =>{
        getproductById(productId).then(data =>{
            console.log(data)
            if(data.error){
                setError(data.error)
            }
            else{
                setProduct(data);
                getRelated(data._id).then(data =>{
                    if(data.error){
                        setError(data.error);
                    }
                    else{
                        setRelatedProduct(data);
                    }
                })
            }
        })
    }


useEffect(()=>{
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
},[])
return (
    <Cart_Layout title={product && product.name}  className="container-fluid">
        <div className="row">
            <div className="col-8">
               {product && product.code && <Card product={product} showViewProductButton={false} />
               }
            </div>
            <div className="col-4">
                <h4 className="p">Related Product</h4>
                {relatedProduct.map((p,i)=>(
                    <div className="mb-3" key={i}>
                       <Card product={p} />
                        </div>
                ))}
                <hr />
                
            </div>
        </div>
    </Cart_Layout>
)
}
export default Product;