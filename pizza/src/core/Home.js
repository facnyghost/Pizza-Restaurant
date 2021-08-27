import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Main_Layout from '../Layouts/main_layout';
import Card from './Card';
import {getProducts} from './apicore';
import { isAuthenticated } from '../auth';

const Home= ()=>{
 const [productBySell, setProductBySell] = useState([]);
 const [productByArrival, setProductByArrival]= useState([])
 const [error ,setError]=useState(false);
 const {user ,token} =isAuthenticated();
 const loadProductsBySell =() =>{
     getProducts('rating').then(data => {
         if(data.error){
             setError(data.error);
         }
        
         else{
        console.log(data)
            setProductBySell(data);
         }
     })
 }

const loadProductsByArrival=()=>{
    getProducts('createdAt').then(data=>{
        if(data.error){
            setError(data.error);
        }
        else{
        

            setProductByArrival(data);
        }
    })
}
useEffect(()=>{
  //  loadProductsByArrival();
    loadProductsBySell();

},[])
    return(
     
        <Main_Layout title="Pizza and Pasta Menu" 
        className="container-fluid">
       <h2 className="mb-4">Top Rating</h2>
       <div className="row">
        <p>{productByArrival}</p>
        {productByArrival.map((product,i)=>(
            <Card key={i} product={product} />
        )
           )}
       </div>
       <h2 className="mb-4">Classic Dishes</h2>
       <div className="row">
           {productBySell.map((product,i)=> (
               <div key={i} className="col-4 mb-3">
             <Card product={product}  />
            </div>
    ))}
       </div>
       

    </Main_Layout>
   )
}

export default Home;