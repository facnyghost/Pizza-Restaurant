import React, {useEffect, useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import { isAuthenticated } from '../auth';
import Cart_Layout from '../Layouts/cart_layout'
import {createCategory} from './apiAdmin';
const AddCategory =props=>{
 const [value,setValue] =useState({
     root_name:'',
     child_name:''
 });

 const [error,setError] =useState(false);
 const [success, setSuccess] =useState(false);
 
 const {user,token} = isAuthenticated();
 const {root_name,child_name} =value;
 const handleChange = name =>event =>{
    setError("");
    setValue({...value,[name]:event.target.value})
}


 const clickSubmit = e =>{
     e.preventDefault();
    setError("");
    setSuccess(false);
    console.log(value)
    createCategory(token,value).then(
        data =>{
            if(data.error){
                setError(data.error);
            }
            else{
                setError("");
                setSuccess(true);
            }
        }
    )
    }

const newCategoryform =()=>(
    <form onSubmit={clickSubmit}>
        <div className="form-group">
            <label className="text-muted">
            Main Name
            </label>
        <input 
            type="text"
            className="form-control"
            onChange={handleChange('root_name')}
            value={root_name}
            autoFocus
            required />

        </div>
  
        <div className="form-group">
            <label className="text-muted">
                Secondry Name
            </label>
        <input 
            type="text"
            className="form-control"
            onChange={handleChange('child_name')}
            value={child_name}
            required />
            
        </div>

        
        <button className="btn btn-outline-warning mt-3">Create Category</button>

    </form>
)
const showSuccess =()=>{
    if(success){
        return <h3 className="text-success">{root_name} is Created!!</h3>
    }
}
const showError =()=>{
    if(error){
        return <h3 className="text-danger">Can't Created something wrong</h3>
        
    }
}
const goBack=()=>(
    <div className="mt-5">
        <Link to="/admin/dashboard" className="text-warning">
            Back to Dashboard
        </Link>
    </div>
)
    return (
        <Cart_Layout title="Add New Category" description={'Terms of use. Privacy policy'}>
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {showSuccess()}
                        {showError()}
                        {newCategoryform()}
                        {goBack()}
                    </div>
                </div>

        </Cart_Layout>
    )
}





export default AddCategory;