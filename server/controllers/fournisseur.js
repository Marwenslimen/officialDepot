//Controller related to comments ressource.
//Complete the request handlers with models interaction after importing them from the database folder
const db= require('../orm/index.js');
const Fournisseur= db.Fournisseur
const cloudinary= require('../cloudinary/cloudinary.js');
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")


module.exports = {

// method to add a new fournisseur
//     addFournisseur:async (req, res)=> {
//         console.log(req.body);
//         const {CompanyName,manager,email,password,image,adress} = req.body;
//         try{
//             const result = await cloudinary.uploader.upload(image,{
//                 folder:'fournisseurs'
//             })
//         const fournisseur = await Fournisseur.create({
//             CompanyName,
//             manager,
//             email,
//             password,
//             image:result.secure_url,
//             adress

    
//         }
//         )

//         res.status(200).send(fournisseur)
//     }catch (err){console.log(err)}
// },

//get all the fournisseurs
getFournisseur :async (req, res)=> {
    let  fournisseurs= await Fournisseur.findAll()
    res.status(200).send(fournisseurs)
},

// method to update fournisseur information in the database
updateFournisseur:async (req, res)=> {
    let id=req.params.id
    const product = await Fournisseur.update(req.body,{where:{id:id}})
    res.status(200).send(product)
},

// method to delete a fournisseur account 
deleteFournisseur:async (req, res)=> {
    let id=req.params.id
    await Fournisseur.destroy({where:{id:id}})
    res.status(200).send('account deleted')
},

//signing a user up
//hashing users password before its saved to the database with bcrypt
signUp:async(req,res)=>{
    const {CompanyName,manager,email,password,image,adress} = req.body;
    try{
        const result = await cloudinary.uploader.upload(image,{
            folder:'fournisseurs'
        })
    
            //saving founisseur
            const fournisseur=await Fournisseur.create({CompanyName,
                manager,
                email,
                password:await bcrypt.hash(password,10),
                image:result.secure_url ,
                adress,
            });
            //if fournisseur details is captured
   //generate token with the fournisseur's id and the secretKey in the env file
   // set cookie with the token generated
   if(fournisseur){
    let token=jwt.sign({id:fournisseur.id,manager:fournisseur.manger},process.env.SECRET_KEY,{
        expiresIn:1*24*60*60*1000,
    })
    // res.cookie('jwt',token )
    // console.log(token)
    return res.status(201).send(fournisseur)
   }else{
    return res.status(409).send('details are not correct')
   }
    }catch(err){
        console.log(err)
    }
},
//login authentication
login:async(req,res)=>{
    try{
        const {email,password}=req.body;
//find a founisseur by their email
const founisseur=await Fournisseur.findOne({
    where:{ email:email}
})
//if founisseur email is found, compare password with bcrypt
if(founisseur){
    const isSame=await bcrypt.compare(password,founisseur.password)
    //if password is the same
     //generate token with the fournisseur's id and the secretKey in the env file
     if(isSame){
        let token=jwt.sign({id:founisseur.id},process.env.SECRET_KEY,{
            expiresIn:  1*24*60*60*1000, 
        })
        //if password matches wit the one in the database
        //go ahead and generate a cookie for the fournisseur
        res.cookie("jwt",token)
        console.log(token)
        //send fournisseur data
        return res.status(201).send(founisseur) 
     }else{
        return res.status(401).send("Authentication failed")
     }
}else{
    return res.status(401).send("Authentication failed")
}
    }catch(err){
        console.log(err)
    }
},
getfour:async (req, res) => {
    try{
      const token = req.headers.jwt
      if (token) {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      const founisseur = await Fournisseur.findOne({
        where: {
          id: data.id
        }
      });
        res.send(founisseur);
      } else {
        res.status(400).send("Cookie not found");
      }
    }catch (error) {
      console.log(error);}
   }
}
