import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './src/routes/user.js';
import postRoutes from './src/routes/post.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3300;
mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>app.listen(PORT, ()=> {
        console.log(`Minigram server is running on port ${PORT}`);
    }))
    .catch((err)=>console.log(err))


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use('/user',userRoutes);
app.use('/post',postRoutes);