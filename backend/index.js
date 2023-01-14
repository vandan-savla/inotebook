const connectToMongo = require("./db");
const express = require('express')

connectToMongo();

const app = express()
app.use(express.json());
const port = 5000
const auth=require('./routes/auth')
const notes=require('./routes/notes')


// available Routes


app.use('/api/auth',auth);
app.use('/api/notes',notes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

