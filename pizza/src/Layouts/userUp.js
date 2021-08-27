import React from 'react'
import Menu from '../core/Menu'

const UserUp = ({
    main_title = "Pizzeria Laezza",
    second_title="Create Your account!!",
    description="Description",
    className,
    childern=''
}) =>(
<div class="d-md-flex h-md-100 align-items-center">

<div class="col-md-5 p-0 bg-white h-md-100">
<div class="align-items-center h-md-100 p-5 justify-content-center">
    <h1 class="p1">{main_title}</h1>
    <p className="p-2 fs-5">{second_title} </p>
    <div className={className}> {childern} <br>
    </br>
    <p className="font3 mt-5">{description}</p></div>
    </div>
</div>

<div class="col-md-7 p-0 uiu h-md-100 loginarea ">

    <div class="align-items-center h-md-100 p-5 justify-content-center">
  
    </div>
</div>
    
</div>

);

export default UserUp;