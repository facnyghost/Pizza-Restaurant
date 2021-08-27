import React, { useEffect, useState } from 'react'
import {API} from '../config'



const ShowImage =({item})=>{
  
    return( 
 <div className="product-img">
            <img         
            src={item}
            alt={item.name}
            className="mb-3 rounded width:200px height:200px"
            style={{maxHeight:"100%" , maxWidth:"100%"}}
            /> 
           </div>
 )
}
export default ShowImage

