import React, {useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {signup, isAuthenticated,authenticate } from '../auth';
import UserUp from '../Layouts/userUp'


const SignUp =()=>{
 const [value,setValues] = useState({
     name:'',
     email:'',
     password:'',
     phone:'',
     address:'',
     error:'',
     success:false
 });

 const {name , email, password,address,phone, success, error} = value;

 const handleChange = name =>event =>{
     setValues({...value,error:false, [name]:event.target.value})
 };
 const clickSubmit = event =>{
     event.preventDefault();
     setValues({...value,error:false});
     signup({name,email,password,address,phone}).then(data =>{
         if(data.error){
             setValues({...setValues,error:data.error,success:false});
         }
         else{
             setValues({
                 ...value,
                 name:'',
                 email:'',
                 password:'',
                 address:'',
                 phone:'',
                 error:'',
                 success:true
             })
         }
     })
 }

 const signUpform =()=>(
    <form>
        {showSuccess()}
           {showError()}
           <div className="form-group mt-1">
           <label className="text-muted">
               Name
           </label>
           <input onChange={handleChange("name")}
           type="name"
           className="form-control"
           value={name} />
        </div>

        <div className="form-group mt-1">
           <label className="text-muted">
               Email
           </label>
           <input onChange={handleChange("email")}
           type="email"
           className="form-control"
           value={email} />
        </div>

        <div className="form-group mt-1">
           <label className="text-muted">
              Password
           </label>
           <input onChange={handleChange("password")}
           type="password"
           className="form-control"
           value={password} />
        </div>
        <div className="form-group mt-1">
           <label className="text-muted">
               Phone
           </label>
           <input onChange={handleChange("phone")}
           type="phone"
           className="form-control"
           value={phone} />
        </div>
        <div className="form-group mt-1">
           <label className="text-muted">
               Address
           </label>
           <input onChange={handleChange("address")}
           type="address"
           className="form-control"
           value={address} />
        </div>

        <div class="d-grid gap-2 mt-2">
        <button onClick={clickSubmit} className="btn btn01">
               Sign up
           </button>
           </div>
           <p className="mt-4" >If you have account <Link style={{color:'orange'}} to="/signin">Signin</Link></p>
    </form>
);
 const showError= () =>(
    <div className="alert alert-danger"
    style={{display:error ? "" : "none"}}>
        {error}
    </div>
 )
 const showSuccess = () =>(
    <div className="alert alert-info"
    style={{display:success ? "" : "none"}}>
        welcome Dear Customer, Pizza waiting you...
            </div>
 )

    return (
        <UserUp  description={'Terms of use. Privacy policy'} childern={signUpform()}>

        </UserUp>
    )
}





export default SignUp