const express=require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app=express();
const logs=require('./api/logs');
mongoose.connect('mongodb://localhost/1338', {useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;
app.use(cors({
    origin:'http://localhost:3000'
}))
app.use(express.json());


port = process.env.port || 5000;

app.get('/' , (req,res) => {
   
}) 
app.use('/api/logs' , logs);

app.use((req,res,next) => {
    const error=new Error("not found");
    res.status(404);
    next(error);
})

app.use((error,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json(
        {
            error:error.message
        }
    )
})


app.listen(port , () => {
    console.log("Listening at http://localhost:5000")
})
