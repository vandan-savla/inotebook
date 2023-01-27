const mongoose = require('mongoose');
const User = require('./User.js');
const {Schema} = mongoose;

const NoteSchema = new Schema({
 
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:'General'
    },
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

});

module.exports= mongoose.model('notes',NoteSchema);