const mongoose= require('mongoose')

const postSchema = mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    date_p:{
        type:Date,
        default:new Date()
    },
    photo:String,
    likeCount:{
        type:Number,
        default:0
    }
},
{
    timestamps:true
}
)

const Post=mongoose.model("Post",postSchema,"posts")
module.exports=Post