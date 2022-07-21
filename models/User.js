const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    active:{
        type: Boolean,
        default:false
    }

},
    {
        timestamps:true
    }
)

const User = mongoose.model("User", userSchema, "users");

module.exports=User