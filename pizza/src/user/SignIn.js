import React, {useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {signin, isAuthenticated,authenticate } from '../auth';
import UserInUp from '../Layouts/user_in_up'


const Signin =()=>{
 const [values,setValues] = useState({
     email:"admin@mail.com",
     password:"admin123456789",
     error:"",
     loading:false,
     redirectToReferrer:false
 });
 const {email,password,loading,error, redirectToReferrer} =values;
 const user=isAuthenticated();
 const handleChange= name =>event =>{
     setValues({...values,error:false, [name]:event.target.value});
 }
 const clickSubmit =event =>{
     event.preventDefault();
     setValues({...values, error:false,loading:true});
     signin({email,password}).then(data =>{
        if(data.error){
            setValues({...values,error:data.error, loading:false})
        }         
        else{
            authenticate(data, () =>{
                setValues({...values,redirectToReferrer:true})
            })
        }
     })
 }

 const signUpform =()=>(
     <form>
         {showLoading()}
            {showError()}
            {redirectUser()}
         <div className="form-group mt-3">
            <label className="text-muted">
                Email
            </label>
            <input onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email} />
         </div>

         <div className="form-group mt-3">
            <label className="text-muted">
               Password
            </label>
            <input onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password} />
         </div>
         <div class="d-grid gap-2 mt-4">
         <button onClick={clickSubmit} className="btn btn01">
                Login
            </button>
            </div>
           <p className="mt-4" >If you havn't account <Link style={{color:'orange'}} to="/signup">Signup</Link></p>
     </form>
 );
 const showError =()=>(
     <div className="alert alert-danger"
     style={{display:error ? "" : "none"}}>
         {error}
     </div>
 )
 const showLoading =()=>
 
    loading && (
    <div className="alert alert-info">
        <h3>Loading.....</h3>
    </div>
);

const redirectUser =()=>{
    if(redirectToReferrer){
        if(user && user.isAdmin){
            return <Redirect to="/admin/dashboard" />;
        }
        else{
            return <Redirect to="/user/profile"/>;
        }
    }
    if(isAuthenticated()){
        return <Redirect to="/"/>
    }
};


    return (
        <UserInUp childern={signUpform()} description={'Terms of use. Privacy policy'}>

        </UserInUp>
    )
}





export default Signin