import Post from "../models/post.js";

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


