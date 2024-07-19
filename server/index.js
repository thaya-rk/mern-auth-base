const express =require('express')
const dotenv =require('dotenv').config()
const cors =require("cors")
const {mongoose} =require('mongoose') 

const app=express();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database Connected"))
.catch(()=>console.log("Database failed connection"))

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});


//middleware
app.use(express.json())



app.use('/',require("./routes/authRoutes"))
const port=8000;

app.listen(port,()=> console.log(`Server running on ${port}`))
