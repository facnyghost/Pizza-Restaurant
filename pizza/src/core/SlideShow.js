import { useEffect, useRef, useState } from "react";
import image_1 from '../Images/pexels-narda-yescas-1566837.jpg';
import image_3 from  '../Images/pexels-pixabay-280453.jpg';
import image_2 from  '../Images/pexels-ponyo-sakana-5088638.jpg';
const colors =[image_1,image_2,image_3];
const delay = 2500;

function Slideshow(){
 const [index,setIndex]= useState(0);
 const timeoutRef = useRef(null);

 function resetTimeout(){
     if(timeoutRef.current){
         clearTimeout(timeoutRef.current);
     }
 }
 useEffect(()=>{
     resetTimeout();
     timeoutRef.current= setTimeout(
         ()=> setIndex((prevIndex)=>
         prevIndex === colors.length -1 ? 0 : prevIndex +1 ),
         delay
     );


 return () => {
    resetTimeout();
  };
}, [index]);

return (
  <div className="slideshow">
    <div
      className="slideshowSlider"
      style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
    >
      {colors.map((backgroundI, index) => (
         
        <div
          className="slide"
          key={index}
          style={{ background:`url(${backgroundI})`,
          backgroundPosition: `center`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
        ><h1></h1></div>
      
        ))
      }
    </div>

    <div className="slideshowDots">
      {colors.map((_, idx) => (
        <div
          key={idx}
          className={`slideshowDot${index === idx ? " active" : ""}`}
          onClick={() => {
            setIndex(idx);
          }}
        ></div>
      ))}
    </div>
  </div>
);
}

export default Slideshow;