const express = require('express');
module.exports = app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDatabase = require('./config/database')



// middleware 
app.use(cors())
app.use(express.json());





// connectDatabase()
app.get('/', (req, res) => {
    res.send("server is running");
})

app.listen(port, () => {
    console.log("server is running on port ", port);
})