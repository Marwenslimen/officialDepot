import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Cases from './Cases.jsx';
import PopOutUpdate from './PopOutUpdate.jsx';


const ProductList = (props) => {
  console.log("fournisseur id in product list",props.four);
    const [products,setProducts]=useState([])
    const [change,setChange]=useState(false); 
    const [openForm,setOpenForm]=useState(false); // to open creating update form
    const [openFormUpdate,setOpenFormUpdate]=useState(false);// to open updating update form
    const [id,setId]=useState(0)
    const [toUpdate,setToUpdate]=useState({})
    const [image,setImage]=useState("")

  //  console.log("img url from data", JSON.parse(image));
    // const [name,setName]=useState("")
    // const [price,setPrice]=useState(0)
    // const [image,setImage]=useState("")
    // const [description,setDescription]=useState("")
    // const [category,setCategory]=useState("")
    // const [quantity,setQuantity]=useState("")


// fetching data belong to the current fournisseur 
 useEffect(() => {
let id=props.four.id
    axios.get(`/api/product/fournisseurproduct/${id}`)
    .then(result=>{console.log(result)
    setProducts(result.data)})
    .catch(err=>console.log(err))
  }, [change]);

const togglePopup =() => {
setOpenFormUpdate(!openFormUpdate)
setChange(!change)

}


  //onclick open create product inputs 
  const togglePopupCreate =() => {
setOpenForm(!openForm)   
  setChange(!change);
}

  
 
// // Add new products 
// const onClickCreate =()=>{
// axios.post('http://localhost:3030/api/product/addp',{
//     "name":name,
//     "price":price,
//     "description":description,
//     "image":image,
//     "category":category,
//     "quantity":quantity,
// })
// .then(res=>{
//   console.log(res)
// }).catch(err=>{console.log(err)})
// setChange(!change)
// }

// handle the onclick event to delete product
const onEdit=(product)=>{
  console.log('edited product',product)
  setToUpdate(product)
}
const onDelete =(product) => {
    let id=product;
    console.log(id);
    axios.delete(`/api/product/deletep/${id}`)
    .then(response => console.log("product deleted"))
    .catch(error => console.log(error))
    setChange(!change);
}
  return (
    <div>

<button onClick={()=>togglePopupCreate()} >Create a new product</button>
{openForm && <Cases four={props.four}  closePop={togglePopupCreate}/>}


    <table id="customers">
      <thead>
        <tr>
        <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Category</th>
          <th>Quantity</th>
     
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => {
     
        
        return  <tr key={index}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price} TND</td>
            <td>{product.description}</td>
            <td>{product.category}</td>
            <td>{product.quantity}</td>
            {/* <td><img src={product.image} /></td> */}
            <button  className="editbutton"  onClick={()=>{
              onEdit(product)
              togglePopup()
              setImage(product.image)
              }} >Edit</button>
              
            {openFormUpdate && <PopOutUpdate   change={change} setChange={setChange} product={toUpdate} handleClose={togglePopup}/>}
            <button  onClick={()=>onDelete(product.id)}class="deletebutton">Delete</button>
          </tr>
})}
      </tbody>
    </table>
    </div>
  );
};

export default ProductList;