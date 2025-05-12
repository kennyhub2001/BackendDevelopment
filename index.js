const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/products', productRoute);

app.get('/', (req, res) => {
    res.send('Hello from Node API');
});


//connect to a DataBase
mongoose.connect("mongodb+srv://kennosoro44:vBlJJW1qs7eYpj2P@backenddb.ty4wzaf.mongodb.net/?retryWrites=true&w=majority&appName=backendDB")
.then(() =>{
    console.log("Connected to the Database");
    app.listen(3000, () => {
        console.log('server is running on port 3000');
    });
})
.catch(() => {
    console.log('Connection failed!')
})