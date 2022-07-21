const express = require('express')
const postController = require("../controllers/postController")
const upload = require('../middleware/upload')
const auth = require('../middleware/auth')


const router= express.Router()

router.get('/',postController.getPosts)
router.post('/', auth,upload,postController.addPost)
router.delete('/:id',auth, postController.removePost)
router.put('/:id',auth, upload, postController.updatePost)

router.post('/like/:id',auth,postController.likePost)

module.exports=router