const Post = require('../models/Post')
const mongoose=require("mongoose")
const { findById } = require('../models/Post')


class postController{

    static getPosts(req,res){
        Post.find()
            .then((posts)=>res.status(200).json(posts))
            .catch(err=>console.log(err))
    }

    static addPost(req, res) {
        if(!req.user_id) return redirect('/login')
        const postData = {
            ...req.body,
            photo:req.file.filename
        }
        
        const newPost = Post(postData)
        newPost.save()
            .then(post => res.status(201).json(post))
            .catch(err=>console.log(err))        
    }

    static async updatePost(req,res){
        const { id } = req.params;       
        if (!mongoose.isValidObjectId(id)) res.status(404).json('id is incorrect')
        const postToUpdate = await Post.findById(id)
        
        const updatedPost = {
            _id: id,
            ...req.body,
            photo:req.file?req.file.filename:postToUpdate.photo
        }        
        Post.findByIdAndUpdate(id, updatedPost)
            .then(post => {                
                res.json(updatedPost)
            })
            .catch(err=>console.log(err))
    }

    static removePost(req, res) {        
        const { id } = req.params       
        if(!mongoose.isValidObjectId(id)) res.status(404).json('id is incorrect')
        Post.findByIdAndDelete(id)
            .then((post) => res.status(204).json(post))
            .catch(err=>console.log(err))
    }


    static async likePost(req, res) {
        console.log(req)
        
        try {
            if (!req.user_id) {            
            console.log('unauthorized operation')
            res.status(400).json('unauthorized operation')
        }
        const { id } = req.params;
        if(!mongoose.isValidObjectId(id)) res.status(404).json('id is incorrect')
            const postToUpdate = await Post.findById(id)            

            const updatedPost = {
                _id: id,
                title: postToUpdate.title,
                message:postToUpdate.message,
                creator:postToUpdate.creator,
                date_p: postToUpdate.date_p,                
                photo:postToUpdate.photo,                
                likeCount: postToUpdate.likeCount + 1
            }
            
            await Post.findByIdAndUpdate(id, updatedPost)
            res.json(updatedPost);
            
        } catch (error) {
            console.log(error)
        }
    }


}

module.exports= postController
