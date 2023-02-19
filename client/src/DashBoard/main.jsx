import React ,{useEffect,useState} from 'react'
import Prof from '..//DashBoard/FournisseurProfile/Prof.jsx'
import ProductList from './ProductList/ProductList.jsx';
import axios from 'axios'

const main=()=> {
    const [view,setView]=useState("")
    const [Fournisseur,setFournisseur] = useState([])   
    const [four,setfour]=useState("")


const config = {
    headers:{
      jwt: document.cookie.slice(4)
    }
  };
useEffect(()=>{
    axios.get("http://localhost:3000/api/fournisseur/tokenf",config)
      .then(res=>{
              setfour(res.data)
              console.log("current fournisseur",res.data)
          })
      .catch(err=>{
              console.log(err)
          })
},[])




useEffect(() => {
    axios.get('/api/fournisseur/getf')
    .then(result=>{
        setFournisseur(result.data)
        console.log(result.data) 
;})
    .catch(err=>console.log(err))
  }, []);


const onChangeView=(nav)=>{
    setView(nav)
    console.log(view)
}

    
  const changeView =()=>{
    
  if (view === "profile"){
      return <Prof  Fournisseur={Fournisseur} />
    }else if (view === "productList"){
     return <ProductList four={four} />
    } }
  
  return (

    <div>
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">DashBoard</a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active">Home</li>
      <li onClick={()=>onChangeView('profile')}>Profile</li>
      <li onClick={()=>onChangeView('productList')}>Products List</li>
 
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
  </div>

</nav> 
 <h1> hi {four.CompanyName} </h1>
{changeView()}
</div>
)
}

export default main