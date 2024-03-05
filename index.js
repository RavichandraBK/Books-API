const express = require('express');
const app = express();
require('dotenv').config();
const mong = require('mongoose');
const books = require('./Routes/Books');
const bodyParser = require('body-parser');
const Cors = require('cors');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(Cors());
app.use('/api/books/',books);
app.listen(process.env.PORT,()=>{
    mong.connect(process.env.MongoDB_URL).then(()=>{
        console.log('Connected to DB')
        console.log(`Server is running at http://localhost:${process.env.PORT}`);
    })
})