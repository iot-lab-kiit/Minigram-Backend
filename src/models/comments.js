import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: "String",
        required: true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    replies: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: []
    }

})

export default mongoose.model("Comments",commentSchema);