import { Link,Redirect } from 'react-router-dom';
import Routes from './Routes';
import Menu from './core/Menu';
require("./App.css");

function App() {
  return (
    <div className="App" >
      <div className="bg">
        <header className="d-flex flex-wrap justify-content-center pt-3 p-5"> 
        <h2 class="p1 align-items-center mb-md-5 me-md-auto">Pizzeria Laezza</h2>

         <ul class="nav nav-pills">
        <li class="nav-item"><a href="/home" class="nav-link main_bac" aria-current="page">HOME</a></li>
        <li class="nav-item"><a href="#" class="nav-link main_bac">MENU</a></li>
        <li class="nav-item"><a href="#" class="nav-link main_bac">ORDER NOW</a></li>
        <li class="nav-item"><a href="#" class="nav-link main_bac">ABOUT</a></li>
      </ul>
        </header>
        <div className="container p-5">
          <div className="align-items-center mb-md-5 me-md-auto row">
        <h1 className="h font2 text-start">II Vero Sapore <br></br> Della Pizzeria</h1>
        <p className="text-start">Every Country has it's Traditional Food Or Famous Recipe,<br></br>
        Here in Italy and Napoli in Specific Pizza was born and become<br></br> 
        the Italy Traditional food and here will find the most 
        Delicious recipe for pizza
        </p>        
         </div>
       </div>
  </div>
 
  </div>
  )

}

export default App;

