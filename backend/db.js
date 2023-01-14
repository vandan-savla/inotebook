const mongoose = require('mongoose');

// change from localhost to 0.0.0.0 error is solved
// const mongoURI = "mongodb://0.0.0.0:27017/inotebook";
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = () => {
    mongoose.connect(mongoURI, 
         (err) => {
        if (err) console.log(err)
        else console.log("mongdb is connected");
    });
}
module.exports = connectToMongo;