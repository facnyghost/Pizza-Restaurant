import React, {useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import { isAuthenticated } from '../auth';
import Cart_Layout from '../Layouts/cart_layout'


const Dashboard =()=>{
    const [history, setHistory]= useState([]);
    console.log(isAuthenticated())
    const user= isAuthenticated();
        const token = isAuthenticated().token;
        const init= (userId,token)=>{
            /* purshase history*/
    };

    const userLinks= ()=>{
        return(
            <div className="card">
                <h4 className="card-header">Admin Jobs</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/create/product">
                            Add New Dish
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/create/category">
                            Add New Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">
                            View Orders
                            </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/meals">
                          Manage Meals
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
    const adminInfo =()=>{
        return (
            <div className="card mb-5">
                <h3 className="card-header">Admin Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{user.user_name}</li>
                    <li className="list-group-item">{user.user_email}</li>
                    <li className="list-group-item">{user.isAdmin === true ?
                    "Admin" : "Registered User"    
                }</li>
                    
                </ul>
            </div>
        )
    }
    const purchaseHistory = history =>{
            /* purchase history */
    }
    
    return (
        <Cart_Layout title="My Profile" childern={'User Profile'} description={'Terms of use. Privacy policy'}>
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">
                    {adminInfo()}
                </div>
            </div>
        </Cart_Layout>
    )
}





export default Dashboard;