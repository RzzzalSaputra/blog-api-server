import Post from "../models/post.js";
import { uploadRemover } from "../utils/uploadRemover.js";

export const createPost = async (req,res)=>{
    const {title, body} = req.body;
    const image = req.file? req.file.name : null
try {

    const post = new Post({title, body, image})
    const savedPost = await post.save()
    
    return res.status(201).json({message: "Post Created",
        data: savedPost
    })
} catch (error) {
    console.error(error)
    return res.status(500).json({message: "unable to create post"})
}
}

export const getPosts = async (req,res)=>{
    try {
        const posts = await Post.find({})
        return res.status(200).json({message: "Posts Found",
            data: posts
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "unable to fetch posts"})
    }
}

export const getPostbyId = async (req,res)=>{
    const {id} = req.params;
    try {
        const post = await Post.findById(id)
        
        if(!post){
            return res.status(404).json({message: "Post not found"})
        }

        return res.status(200).json({message: "Post Found",
            data: post
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "unable to fetch post"})
    }
}

export const updatePost = async (req,res)=>{
    const {id} = req.params
    const {title, body} = req.body
    const newImage = req.file? req.file.name : null
    try {
        const post = await Post.findById(id)

        if(!post){
            return res.status(404).json({message: "Post not found"})
        }

        if(newImage){
            uploadRemover(post.image)
        }

        post.title = title
        post.body = body
        post.image = newImage ?  newImage : post.image

        const updatedPost = await post.save()

        return res.status(200).json({message: "Post Updated",
            data: updatedPost
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "unable to update post"})
    }
}

export const deletePost = async (req,res)=>{
    const {id} = req.params
    try {
        const post = await Post.findByIdAndDelete(id)

        if(!post){
            return res.status(404).json({message: "Post not found"})
        }

        uploadRemover(post.image)

        return res.status(200).json({message: "Post Deleted",
            data: post
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "unable to delete post"})
    }
}


