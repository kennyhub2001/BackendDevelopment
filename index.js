const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/products', productRoute);

app.get('/', (req, res) => {
    res.send('Hello from Node API');
});

//Get all product
app.get('/api/products',async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Get a specific product
app.get('/api/products/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findbyId(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//post a product
app.post('/api/products',async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//update a product
app.put('/api/products/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findbyIdAndUpdate(id, req.body);

        if(!product) {
            return res.status(404).json({message: "Product on found" });
        }

        const updatedProduct = await Product.findbyId(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//delete a product
app.delete('/api/products/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findbyIdAndDelete(id);

        if(!product) {
            return res.status(404).json({message: "Product on found" });
        }

        res.status(200).json({message: "Product deleted successfully!" });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
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