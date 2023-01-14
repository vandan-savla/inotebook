const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// route will be /api/auth/createUser 
router.post('/createUser',

   [
      body('name', 'Enter Valid Name').isLength({ min: 3 }),
      body('email', 'Enter Valid Email').isEmail({unique:true}),
      body('password', 'Password Must be more than 5 characters').isLength({ min: 5 }),
   ], async (req, res) => {
      const errors = validationResult(req);
      // checking the above validation 
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      try{
      // creating new user with unique email addresses
         let user = await User.findOne({email:req.body.email});

         if(user){
           return res.status(400).json({error:"Email already exists"});
         }

         // instead of  user.save(); res.send(req.body); we use below code.
          user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
         })
         
         res.json(user);
      }
      // other errors are caught here except email error
      catch(error){
         res.status(500).json({message:"Some error Occured"});

      }
      })


module.exports = router;