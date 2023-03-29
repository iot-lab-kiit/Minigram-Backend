import mongoose, { Mongoose } from 'mongoose';

const commentSchema = mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSchema",
        required: "true",
    },
    content: {
        type: "String",
        required: "true",
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "userSchema",
        default: [],
    },
    replies: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "commentSchema",
            default: [],
    }

})