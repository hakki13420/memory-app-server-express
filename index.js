const express = require('express')
const cors = require('cors')
//const bodyParser= require('body-parser')
const postsRoutes = require('./routes/postRoutes')
const authRoutes = require('./routes/authRoutes')

require("./config/database")
const app = express()

//statics folders
app.use(express.static('public'))
app.use(express.static('uploads'))


//middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/posts', postsRoutes)
app.use("/users",authRoutes)


//lunch server
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('server running on '+PORT)
})