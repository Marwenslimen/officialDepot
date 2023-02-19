const express = require('express');
const router = express.Router();

// Require controller modules.
const product = require('../controllers/product.js');

/// POSTS ROUTES ///

//GET request to fetch all posts. NOTE This must come before route for id.
router.get('/getAllp', product.getAllProduct);
// to add a new product
router.post('/addp', product.addProduct)
// to update an existing product
router.put('/updatep/:id', product.updateProduct);
// to delete an existing product
router.delete('/deletep/:id', product.deleteProduct);

// to get all  with fournisseur id 
router.get('/fournisseurproduct', product.getFournisseurproduct); 

module.exports = router;