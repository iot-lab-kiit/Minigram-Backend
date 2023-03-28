import mongoose from 'mongoose';

export const connectToDatabase = async ()=>{

    if(mongoose.connections[0]){
        return;
    }
    await mongoose.connect("mongodb+srv://mini:imQhKWBavKgcggYf@cluster0.wbx1lol.mongodb.net/?retryWrites=true&w=majority").
    then(()=>console.log("Connected"))
    .catch((err)=>console.log(err))
}