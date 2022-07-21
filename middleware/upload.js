const multer = require('multer')
const size = 1024 * 1024 * 2;

const storage=multer.diskStorage({
    destination:function(req,filre,cb) {
        cb(null,"uploads")
    },
    filename: function (req, file, cb) {
        console.log("the uploaded file",file)
        const ext = file.originalname.split('.')[1]
        const selectedFileName=file.originalname.split('.')[0]
        const myFileName = selectedFileName + '-' + Date.now() + Math.round(Math.random() * 1E9)+"."+ext
        cb(null,myFileName)
    }
})

const upload = multer({ storage, limits: { fileSize: size } }).single('photo')

module.exports=upload