import React from "react";
import Footer from "../core/Footer";
import Menu from "../core/Menu";

const Cart_Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div className="m-0 p-0">
     <div class="row py-lg-5 bg_2">
      <div class="col-lg-6 col-md-8 mx-4">
        <h1 class="h font-1 float-left font1">{title}</h1>
       
      </div>
     </div>
    <div className="album py-5 "/>
         <div className="container">
             <div className={className}>{children}</div>
           </div>
           <Footer />
         </div>
);

export default Cart_Layout;
