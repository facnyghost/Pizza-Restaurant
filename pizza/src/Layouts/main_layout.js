import React from "react";
import Menu from "../core/Menu";
import Slideshow from "../core/SlideShow";
import Footer from '../core/Footer'
const Main_Layout = ({
    title = "Title",
    description = "",
    className,
    children
}) => (
    <div >
        <Menu />
        <Slideshow />
     <div >
      <div class="col-lg-6 col-md-8 mx-4">
        <h1 class="h font-1 float-left bor">{title}</h1>
       {description}
      </div>

    <div className="album py-5 "/>

         <div className="container">
             <div className={className}>{children}</div>
           </div>
         </div>
         <Footer />

         </div>

);

export default Main_Layout;
