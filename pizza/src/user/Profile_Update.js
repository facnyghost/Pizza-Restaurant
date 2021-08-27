import { updateLocale } from 'moment';
import React, {useEffect, useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import { isAuthenticated } from '../auth';
import Cart_Layout from '../Layouts/cart_layout'
import { getuserById, update, updateUser } from './apiUser';


const Profile_Update =props=>{
 const [values, setValues] = useState({
     name:'',
     email:'',
     password:'',
     error:false,
     success:false
 })

 const {token} = isAuthenticated();
 const {name,email,password,error,success} = values;

 const init = userId =>{
     console.log(userId)
     getuserById(userId,token).then(data =>{
         if(data.error){
             setValues({...values,error:true})
         }
         else{
             setValues({
                 ...values,
                 name:data.name,
                 email:data.email
             })
         }
     })

 }
 useEffect(() =>{
    const userId=props.match.params.id;
     init(userId);
 },[])

 const handleChange = name =>e =>{
     setValues({
         ...values,
         error:false,
         [name]:e.target.value
     })
 }

 const clickSubmit = e =>{
     e.preventDefault();
     update(props.match.params.id,token,{name,email,password}).then(data =>{
         if(data.error){
             alert(data.error);
         }
         else{
             updateUser(data, ()=>{
                 setValues({...values,
                name:data.name,
            email:data.email,
        success:true})
             })
         }
     })
    
 }

 const redirectUser = success =>{
    if(success){
        return <Redirect to="/cart" />;
    }
 };

 const ProfileUpdate = (name,email,password) =>(
     <form  className="container-sm g-3"> 
         <div className="form-group">
             <label className="text-muted">Name</label>
             <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
         </div>
         <div className="form-group">
             <label className="text-muted">E-mail</label>
             <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
         </div>
         <div className="form-group">
             <label className="text-muted">Password</label>
             <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
         </div>
            <button onClick={clickSubmit} className="btn btn-warning mt-3 btn-lg card-btn-3 rounded-pill">
                Update
            </button>

     </form>
     

 );
    return (
        <Cart_Layout title="My Profile" childern={'User Profile'} description={'Terms of use. Privacy policy'}>
                      <div className="me-md-3 pt-3 px-3 pt-md-5 px-md-5  overflow-hidden ">

            <h2 className="mb-4 my-3 py-3">Update Profile</h2>
            {ProfileUpdate(name,email,password)}
            {redirectUser(success)}            
            </div>
        </Cart_Layout>
    )
}





export default Profile_Update;