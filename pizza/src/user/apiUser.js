import {API} from '../config';

export const getuserById= (userId,token)=>{
    return fetch(`${API}/users/${userId}`,
    {
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(data =>{
        return data.json();
    })
    .catch(err => console.log(err));
}

export const update= (userId,token,user)=>{
    return fetch(`${API}/users/update/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
            
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err));
}

export const updateUser = (user, next)=>{
    if(typeof window != "undefined"){
        if(localStorage.getItem("jwt")){
            let auth= JSON.parse(localStorage.getItem("jwt"));
            auth.user= user;
            localStorage.setItem("jwt",JSON.stringify(auth));
            next()
        }
    }
}