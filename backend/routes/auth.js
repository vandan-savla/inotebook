const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { genSalt } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

// route1 will be /api/auth/register - Creating New user
router.post('/register',

   [
      body('name', 'Enter Valid Name').isLength({ min: 3 }),
      body('email', 'Enter Valid Email').isEmail({ unique: true }),
      body('password', 'Password Must be more than 5 characters').isLength({ min: 5 }),
   ], async (req, res) => {
      const errors = validationResult(req);
      // checking the above validation 
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      try {
         // creating new user with unique email addresses
         let user = await User.findOne({ email: req.body.email });

         if (user) {
            return res.status(400).json({ error: "Email already exists" });
         }
         // generating salt and hashing the password 
         const salt = await bcrypt.genSalt(10);
         const secPass = await bcrypt.hash(req.body.password, salt);

         // instead of  user.save(); res.send(req.body); we use below code.
         user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
         })
         const data = {
            user: {
               id: user.id
            }
         }
         // creating jwt token
         const JWT_SECRET = '!@#thisisgoodjwtsecret$%^';

         const authtoken = jwt.sign(data, JWT_SECRET);


         // res.json(user);
         res.json({ authtoken });
      }
      // other errors are caught here except email error
      catch (error) {
         res.status(500).json({ message: "Some error Occured" });

      }
   })


// route2 will be /api/auth/login - loggin in Existing user
router.post('/login',

   [
      // body('name', 'Enter Valid Name').isLength({ min: 3 }),
      body('email', 'Enter Valid Email').isEmail(),
      body('password', 'Password Cant be blank').exists(),
   ], async (req, res) => {
      const errors = validationResult(req);
      // checking the above validation 
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      // destructuring to make code cleaner and easier to read
      const { email, password } = req.body;

      try {

         let user = await User.findOne({ email });


         if (!user) {
            return res.status(400).json({ error: "Login with correct Credentials" });
         }

         // console.log('in try')
         const passwordCompare = await bcrypt.compare(password, user.password);
         // console.log(passwordCompare)

         if (!passwordCompare) {
            return res.status(400).json({ error: "Login with correct Credentials" });
         }

         // instead of  user.save(); res.send(req.body); we use below code.
         const data = {
            user: {
               id: user.id
            }
         }
         // creating jwt token
         const JWT_SECRET = '!@#thisisgoodjwtsecret$%^';

         const authtoken = jwt.sign(data, JWT_SECRET);


         // res.json(user);
         res.json({ authtoken });
      }
      // other errors are caught here except email error
      catch (error) {
         res.status(500).json({ message: "Some error Occured" });

      }
   })


// route3 will be /api/auth/getuser - getting details of Existing user
router.post('/getuser', fetchuser,

   async (req, res) => {

      try {

         let userid = req.user.id;
         const user = await User.findById(userid).select("-password")

         res.json(user);
         // res.json({ authtoken });
      }
      // other errors are caught here except email error
      catch (error) {
         res.status(500).json({ message: "Some error Occured" });

      }
   })
module.exports = router;