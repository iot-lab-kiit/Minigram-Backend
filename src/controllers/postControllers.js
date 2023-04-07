import mongoose from 'mongoose';
import Post from '../models/post.js';

export const createPost = async (req, res) => {
    const post = req.body;

    try{
        const newPost = new Post({...post, creator: req.user});

        await newPost.save();

        res.status(201).json(newPost);

    }catch(error){
        console.log(error);
        res.status(409).json({message: error.message});
    }
}

export const getPosts = async (req, res) => {

    try{
        const posts = await Post.find();

        res.status(200).json(posts);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const updatePost = async (req,res) => {

    try{
        const {id} = req.params;
        const post = req.body;

        if(!req.user) return res.json({ message: 'Unauthenticated.'});

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "No post with this id"});

        const updatedPost = await Post.findByIdAndUpdate(id, {...post, id, updatedAt: new Date()}, {new: true});

        res.json(updatedPost);
    }catch(error){
        console.log(error);
        res.json({message: error.message});
    }
}

export const deletePost = async (req, res) => {
    try{
        const {id} = req.params;

        if(!req.user) return res.json({ message: 'Unauthenticated.'});

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "No post with this id"});

        await Post.findByIdAndRemove(id);

        res.status(200).json({message:"Deleted succesfully"});
    }catch(error){
        console.log(error);
        res.json({message: error.message});
    }

}

export const likePost = async(req, res )=> {
    const {id} = req.params;

    if(!req.user) return res.json({message: 'Unauthenticated.'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "No post with this id"});

    const post = await Post.findById(id);

    const index = post.likes.findIndex((id)=> id === String(req.user));

    if(index === -1){
        post.likes.push(req.user);
    }else{
        post.likes = post.likes.filter((id)=> id !== String(req.user));
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, {new : true});

    res.json(updatedPost);
}