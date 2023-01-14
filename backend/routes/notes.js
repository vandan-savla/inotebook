const express = require('express');
const router= express.Router();

router.get('/',(req,res) =>{
   console.log("hello this is in notes.js")
})


module.exports=router;