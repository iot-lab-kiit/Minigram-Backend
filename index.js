import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './src/routes/user.js';
dotenv.config();

const app = express();
mongoose.connect(process.env.CONNECTION_URL).
    then(()=>console.log("Connected"))
    .catch((err)=>console.log("Database not connected"))

const PORT = process.env.PORT || 3300;
app.listen(PORT, ()=> {
    console.log(`Minigram server is running on port ${PORT}`);
})

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use('/user',userRoutes);