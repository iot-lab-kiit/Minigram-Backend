import mongoose, { Mongoose } from 'mongoose';

const postSchema = mongoose.Schema({
    message: String,
    creator: {
        types: mongoose.Schema.Types.ObjectId,
        ref: "userSchema",
        required: "true",
    },
    selectedFile: {
        types: [String],
        required: true,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "userSchema",
        default: [],
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "commentSchema",
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})