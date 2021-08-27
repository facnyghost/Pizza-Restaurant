import React, {useEffect, useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import { isAuthenticated } from '../auth';
import Cart_Layout from '../Layouts/cart_layout'
import {getCategories,updateProduct, getProduct} from './apiAdmin';


const UpdateProduct =(props)=>{

const [values,setValues]=useState({
    name:'',
    category:'',
    code:'',
    yield:'',
    preparetime:'',
    dough_type:'',
    taste_type:'',
    price:'',
    createproduct:'',
    redirectProfile:false,
    formData:''
});

const [categories, setCategories] = useState([]);

const {token} =isAuthenticated();
const{
    name,
    category,
    code,
    Yield,
    preparetime,
    dough_type,
    taste_type,
    price,
    error,
    redirectProfile,
    createproduct,
    loading,
    formData
}= values;

const init=(productId) =>{
    getProduct(productId).then(data =>{
        if(data.error){
            setValues({...values,error:data.error})
        }
        else{
            setValues({
                ...values,
                name:data.name,
                category:data.category._id,
                code:data.code,
                Yield:data.yield,
                preparetime:data.preparetime,
                dough_type:data.dough_type,
                taste_type:data.taste_type,
                price:data.price,     
                formData: new FormData()
            })
            initCategories();
        }
    })
}


const initCategories = ()=>{
    getCategories().then(data =>{
        if(data.error){
            setValues({...values,error:data.error})
        }
        else{
            setCategories(data)
        }
    })
}

useEffect(()=>{
    init(props.match.params.id);
},[])

const handleChange = name =>event =>{
    const value= name === 'image' ? event.target.files[0] : event.target.value;
    formData.set(name,value);
    console.log(name,value);

    setValues({...values,[name]:value})
}


const clickSubmit = event =>{
    event.preventDefault();
    setValues({...values,error:'',loading:true});
    updateProduct(props.match.params.id,token,formData).then(data =>{
        if(data.error){
            setValues({
                ...values,error:data.error
            })
        }
        else{
            setValues({
            name:'',
            category:'',
            code:'',
            Yield:'',
            //ingredients:[],
            preparetime:'',
            dough_type:'',
            taste_type:'',
             price:'',
          //  image:'',
            loading:false,
            error:false,
            redirectProfile:true,
            createproduct:data.name
            })
        }
    })
}

const newProductform= ()=>(
    <form className="mb-3" onSubmit={clickSubmit}>
        {showError()}
        {showSuccess()}
        {showLoading()}
        {redirectUser()}
        {/* <label className="text-muted fs-5">Post Photo</label>
    <div className="form-group fs-5">
            <input
                onChange={handleChange("image")}
                type="file"
                name="image"
                accept="image/*"
            />
    </div> */}

    <div className="form-group">
        <label className="text-muted fs-5">Name</label>
        <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
        />
    </div>

    {/* <div className="form-group">
        <label className="text-muted fs-5">Ingredients</label>
        <textarea
            onChange={handleChange("ingredients")}
            className="form-control"
            value={ingredients}
        />
    </div> */}

    <div className="form-group">
        <label className="text-muted fs-5">Price</label>
        <input
            onChange={handleChange("price")}
            type="text"
            className="form-control"
            value={price}
        />
    </div>

    <div className="form-group">
        <label className="text-muted fs-5">Category</label>
        <select
            onChange={handleChange("category")}
            className="form-control"
        >
            <option >Please select</option>
            {categories && categories.map((c,i)=> (<option key={i} value={c._id}>{c.root_name}</option>))}
        </select>
    </div>

    <div className="form-group">
        <label className="text-muted fs-5">Taste Type</label>
        <select
            onChange={handleChange("taste_type")}
            className="form-control"
        >
            <option>Select</option>
            <option value="Spicy">Spicy</option>
            <option value="Regular">Regular</option>
        </select>
    </div>

    <div className="form-group">
        <label className="text-muted fs-5">Yield</label>
        <input
            onChange={handleChange("yield")}
            type="text"
            className="form-control"
            value={Yield}
        />
    </div>

    <div className="form-group">
        <label className="text-muted fs-5">Preparetime</label>
        <input
            onChange={handleChange("preparetime")}
            type="text"
            className="form-control"
            value={preparetime}
        />
    </div>
    <div className="form-group">
        <label className="text-muted fs-5">Dough Type</label>
        <input
            onChange={handleChange("dough_type")}
            type="text"
            className="form-control"
            value={dough_type}
        />
    </div>

    <div className="form-group">
        <label className="text-muted fs-5">Code</label>
        <input
            onChange={handleChange("code")}
            type="text"
            className="form-control"
            value={code}
        />
    </div>

    <button className="btn btn-outline-primary">Create Product</button>
</form>

) 

const showSuccess =()=>(
    <div className="alert alert-info" style={{display :createproduct ? '':'none'}}>
        <h2>{`${createproduct}`} is Created!!</h2>
    </div>
)

const showError =()=>(
    <div className="alert alert-danger" style={{display :error ? '':'none'}}>
        <h2>{error}</h2>
    </div>
)


const showLoading =()=>
  loading && (  <div className="alert alert-success" >
        <h2>Loading...</h2>
    </div>)


const redirectUser =()=>{
    if(redirectProfile){
        if(!error){
            return <Redirect to="/" />
        }
    }
}
return (
    <Cart_Layout title="Update  Meal" description={'Terms of use. Privacy policy'}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                {newProductform()}
                </div>
            </div>

    </Cart_Layout>
)

}

export default UpdateProduct;