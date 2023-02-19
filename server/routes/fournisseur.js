const express = require('express');
const router = express.Router();

// Require controller modules.
const Fournisseur = require('../controllers/fournisseur.js');
const fournisseAuth=require("../middleware/fornisseAuth")


// get all the fournisseurs
router.get('/getf', Fournisseur.getFournisseur);


//ADD a new fournisseur 
// router.post('/addf', Fournisseur.addFournisseur);
// update fournisseur information
router.put('/updatef/:id', Fournisseur.updateFournisseur);
// delete fournisseur information
router.delete('/deletef/:id', Fournisseur.deleteFournisseur);

//signup endpoint
//passing the middleware function to the signup
router.post("/signup", fournisseAuth.saveFournisseur,Fournisseur.signUp)
//login route
router.post("/login",Fournisseur.login)

router.get('/tokenf', Fournisseur.getfour);


module.exports = router;