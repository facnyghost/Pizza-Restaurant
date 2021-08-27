import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import App from './App';
import Home from './core/Home';
import Restaurant from './core/Restaurant';
import SignIn from './user/SignIn'
import SignUp from './user/SignUp'
import Profile from './user/Profile'
import Profile_Update from './user/Profile_Update'
import Dashboard from './admin/dashboard'
import AddCategory from './admin/AddCategory'
import Orders from './admin/Orders'
import AddProduct from './admin/AddProduct'
import UpdateProduct from './admin/UpdateProduct'
import ManageProduct from './admin/ManageProduct'
import ManageMeal from './admin/ManageMeal'
import AdminRoute from './auth/AdminRoute'
import PrivateRoute from './auth/PrivateRoute'
import Product from './core/Product'
import Cart from './core/Cart';
require('dotenv')


const Routes=() =>{
    return(
        
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} >
                </Route>
                <Route path="/home" exact component={Home} >
                    <Home />
                </Route>
                <Route path="/signin" exact component={SignIn} />
                
                <Route path="/signup" exact component={SignUp} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/restaurant" exact component={Restaurant}>
                    <Restaurant />
                </Route>
                <Route path="/product/:productId" exact component={Product} /> 
                <AdminRoute path="/admin/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/create/category" exact component={AddCategory} />
                <AdminRoute path="/admin/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <AdminRoute path="/admin/products" exact component={ManageProduct} />
                <AdminRoute path="/admin/meals" exact component={ManageMeal} />
                <AdminRoute path="/admin/update/product/:id" exact component={UpdateProduct} />


                <PrivateRoute path="/user/profile/" exact component={Profile} />
                <PrivateRoute path="/user/profile/update/:id" exact component={Profile_Update} />
                
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;