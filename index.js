import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectToDatabase = async ()=>{

    if(mongoose.connections[0]){
        return;
    }
    await mongoose.connect(process.env.CONNECTION_URL).
    then(()=>console.log("Connected"))
    .catch((err)=>console.log(err))
}