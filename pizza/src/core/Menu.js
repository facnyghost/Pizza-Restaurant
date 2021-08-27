import React,{Fragment} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
import { itemTotal } from './cartHelpers'
const isActive = (history, path)=>{
    if(history.location.pathname === path){
        return{
            color:'#ff9900'
        }
    }
    else{
        return {color:'#ffffff'}
    }
}

const Menu = ({history})=>(
    
    <div className="d-flex flex-wrap width:100% justify-content-center py-1 mb-4 navbar-back navbar-expand-md back v">
        <div className= "d-flex align-items-center mb-3 mb-md-auto text-dark text-decoration-none">
        </div>
        <ul className="nav fs-4 nav-pills font1">
        <li className="nav-item">
                <Link className="nav-link"  style={isActive(history,'/home')} to="/home">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link"  style={isActive(history,'/restaurant')} to="/restaurant">Restaurant</Link>
            </li>

            <li className="nav-item">

                <Link className="nav-link"  style={isActive(history,'/cart')} to="/cart">
                    Cart{" "}
                    <button type="button" class="btn btn-light btn-circle btn-sm">
                        
                <sup>
                    <small className="cart-badge">{itemTotal()}</small>
                </sup>
                </button> 

                </Link>
            </li>


            {isAuthenticated() && isAuthenticated().isAdmin === false &&(
                <li className="nav-item">
                    <Link 
                        className="nav-link"
                        style={isActive(history,"/user/profile")}
                        to="/user/profile">
                            Profile
                        </Link>
                </li>
            )}


            {isAuthenticated() && isAuthenticated().isAdmin === true &&(
                <li className="nav-item">
                    <Link 
                        className="nav-link"
                        style={isActive(history,"/admin/dashboard")}
                        to="/admin/dashboard">
                            Admin
                        </Link>
                </li>
            )}
            {isAuthenticated() && (
                  <li className="nav-item">
                      <span  style={{cursor:"pointer" , color:"#ffffff"}} onClick={()=>
                      signout(()=>{
                          history.push("/");
                      })}>
                      Signout
                          </span>
                  </li>
                            )}
          {!isAuthenticated() && (
              <Fragment>
                  <li className="nav-item">
                      <Link className="nav-link" style={isActive(history,'/signup') } to="/signup">Signup</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" style={isActive(history,'/signin') } to="/signin">Signin</Link>
                  </li>
                  
              </Fragment>
          )}
            
        
           </ul>

    </div>
)

export default withRouter(Menu);

/**        <h2 class="p1 align-items-center mb-md-5 me-md-auto font1">Pizzeria Laezza</h2>
 */