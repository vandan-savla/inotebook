const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
const router = express.Router();

// Route1 to fetch all the notes of a user
router.post('/fetchallnotes', fetchUser, async (req, res) => {
   // console.log("hello this is in notes.js")
   try {
      let notes = await Notes.find({ user: req.user.id })
      res.json(notes);
   } catch (error) {
      res.status(500).json({ message: "Some error Occured" });
   }


})

// to add new note of logged in user
router.post('/addnotes', fetchUser,

   [
      body('title', 'Title must be more than 3 characters').isLength({ min: 3 }),
      body('description', 'Enter Description Minimum 5 characters').isLength({ min: 5 }),

   ], async (req, res) => {
      const errors = validationResult(req);
      // checking the above validation 
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      try {
         const { title, description, tag } = req.body;
         const note = new Notes({ title, description, tag, user: req.user.id })

         const savedNote = await note.save()
         console.log(note.user)
         res.json(savedNote)
      }

      catch (error) {
         res.status(500).json({ message: "Some error Occured" });

      }
   })

// to update an existing note of loggedin user

router.put('/updatenote/:id', fetchUser,
   async (req, res) => {

      const { title, description, tag } = req.body;
      const newNote = {}

      if (title) { newNote.title = title }
      if (description) { newNote.description = description }
      if (tag) { newNote.tag = tag }

      let note = await Notes.findById(req.params.id);

      // checking the above validation 
      if (!note) {
         return res.status(400).send("Note not Found");
      }
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not authorized to update");
      }


      try {

         note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
         res.json({ note })
      }

      catch (error) {
         res.status(500).json({ message: "Some error Occured" });

      }

   })

// to delete an existing note of loggedin user

router.delete('/deletenote/:id', fetchUser,
   async (req, res) => {


      let note = await Notes.findById(req.params.id);

      // checking the above validation 
      if (!note) {
         return res.status(400).send("Note not Found");
      }
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not authorized to update");
      }


      try {

         note = await Notes.findByIdAndDelete(req.params.id);
         res.json({"message":"Deleted Successfully",note:note})

      }

      catch (error) {
         res.status(500).json({ message: "Some error Occured" });

      }

   })



module.exports = router;