const express = require('express');
const mongoose = require('mongoose');
const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello from Node API');
});

app.post('/api/products', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});


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