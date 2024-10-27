import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    body:{
        type:String,
        require: true,
    },
    image:{
        type: String,
    },
},{
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export default Post;