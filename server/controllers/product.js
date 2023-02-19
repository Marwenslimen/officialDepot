const db= require('../orm/index.js');
const Product= db.Product;
const cloudinary= require('../cloudinary/cloudinary.js');


module.exports = {

    //method to fetch all product from  database
    
    getAllProduct:async (req, res)=> {
        let products = await Product.findAll({})
        res.status(200).send(products)
        },

// method to add a product to the product table

    addProduct:async (req, res)=> {
         
const {name, description,price, quantity,image,category,fournisseurId}=req.body;

try{
    const result = await cloudinary.uploader.upload(image,{
        folder:'products'
    })
        const product = await Product.create({
            name,
            description,
            price,
            quantity,
            image:result.secure_url
                // // public_id:result.public_id,
                // url:result.secure_url,
            ,
            category,
            fournisseurId
        }

)

        res.status(200).send(product)
     } catch (error) {console.log(error)}
    },

    // method to update a product 



    updateProduct:async (req, res)=> {
        console.log(req.body)


        const {name, description,price, quantity,image,category}=req.body;
        try{
            const result = await cloudinary.uploader.upload(image,{
                folder:'products'
            })

    
    const product = await Product.update({
        name,
        description,
        price,
        quantity,
        image:result.secure_url,
        category
    },{where:{
        id:req.params.id}})
    res.status(200).send(product)
}catch (err){console.log(err)}
},

// method to delete a product 


deleteProduct:async (req, res)=> {

    const product = await Product.destroy({where:{
        id:req.params.id}})

    res.status(200).send('Product deleted')
},

getFournisseurproduct: async (req, res)=> {
    console.log("id ind controller", req.body.fournisseurId);
const product = await Product.findAll({where:{fournisseurId:req.body.fournisseurId}})
res.status(200).send(product)
}
}
