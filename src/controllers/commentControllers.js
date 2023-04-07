import mongoose from 'mongoose';
import Comments from '../models/comments.js';
import Post from '../models/post.js';

export const createComments = async (req, res) => {
    try{
        if(!req.user) return res.json({message: 'Unauthenticated.'});

        const {content} = req.body;

        const postId = req.params;

        const newComment = new Comments({content: content, creator: req.user });

        await newComment.save();

        const id = new mongoose.Types.ObjectId(postId);

        const post = await Post.findByIdAndUpdate(id, {$push: {comments: newComment._id}}, {new:true});

        res.status(200).json(post);
    }catch(error){
        console.log(error);
        res.json({message: error.message});
    }
}

export const getComments = async (req, res) => {
    try{
        const {id} = req.params;

        const comments = await Post.findById(id).populate("comments");

        res.status(200).json(comments.comments);

    }catch(error){
        console.log(error);
        res.status(404).json({message: error.message});
    }
}

export const likeComment = async (req, res) => {
    try{
        if(!req.user) return res.json({message: 'Unauthenticated.'});

        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "No comment with this id"});

        const comment = await Comments.findById(id);

        const index = comment.likes.findIndex((id)=> id === String(req.user));

        if(index === -1){
            comment.likes.push(req.user);
        }else{
            comment.likes = comment.likes.filter((id)=> id !== String(req.user));
        }
        const updatedComment = await Comments.findByIdAndUpdate(id, comment, {new : true});

        res.json(updatedComment);
    }catch(error){
        console.log(error);
        res.json({message: error.message});
    }
}

export const createReply = async (req, res) => {
    try{
        if(!req.user) return res.json({message: 'Unauthenticated.'});

        const {content} = req.body;

        const commentId = req.params;

        if(!mongoose.Types.ObjectId.isValid(commentId)) return res.status(404).json({message: "No comment with this id"});

        const newReply = new Comments({content: content, creator: req.user });

        await newReply.save();

        const id = new mongoose.Types.ObjectId(commentId);

        const comment = await Comments.findByIdAndUpdate(id, {$push: {replies: newReply._id}}, {new:true}).populate('replies');

        res.status(200).json(comment);
    }catch(error){
        console.log(error);
        res.json({message: error.message});
    }
}

export const deleteComment = async (req, res) => {
    try{
        if(!req.user) return res.json({message: 'Unauthenticated.'});

        const {postId, commentId} = req.query;

        const post = await Post.findById(postId);

        if(!post) res.json({message:"No post with this id"});
        
        const index = post.comments.findIndex((id) => String(id) === commentId);

        if(index===-1) res.json({message:"Comment does not exist."});

        post.comments = post.comments.filter((id)=> String(id) !== commentId);

        await Comments.findByIdAndRemove(commentId);

        const updatedPost = await Post.findByIdAndUpdate(postId, post, {new : true});

        res.json(updatedPost);
    }catch(error){
        console.log(error);

        res.json({message: error.message});
    }
}