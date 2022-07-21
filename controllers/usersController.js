const User =require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

const dotenv = require('dotenv')
dotenv.config();

function validate(firstName, lastName, email,password, confirmPassword) {
    errors=[]        
    if (!(firstName && lastName && email && password && confirmPassword)) {
        this.error.push({ message: "all fields are required " })        
    } else if (password !== confirmPassword) {
        this.error.push({message:"password dont mismasmatch"})
    }
    return this.errors
}
class usersController{   
    
    static async register(req, res) {
        try {
            const { firstName, lastName, email, password, confirmPassword } = req.body            
            const user = await User.findOne({ email: email })            
                if (user) return res.status(401).json({ "error": "user already exist try othye one" })
                console.log("error array",validate(firstName, lastName, email, password, confirmPassword))
                if (validate(firstName, lastName, email, password, confirmPassword).length > 0) {
                    res.status(400).json(errors)
                }
                const hashPassword=await bcrypt.hash(password,12)
                User.create({
                    name: firstName + " " + lastName,
                    email: email,
                    password: hashPassword
                }, (err,user) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json("server error")
                    }
                    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY)
                    user.token = token
                    user.save()
                    .then(userRes=>res.status(200).json(userRes))                    
                })
            
        } catch (error) {
            console.log(error)                    
        }
    }

    static async login(req, res){
        
        try {            
            const {email,password} = req.body;
            const user = await User.findOne({ email })
            if (!user) res.status(404).json({ error: "user not found" })
            const valid = await bcrypt.compare(password, user.password)            
            if (!valid) res.status(404).json({ error: "credential error" })
            const token = jwt.sign({ email: email, id: user._id }, process.env.JWT_KEY, { expiresIn: 3600 })
            console.log("controller token", token)
            const profile = {
                profile: {
                    email: email,
                    id:user._id
                },
                token:token
            }
            res.json(profile)
        } catch (error) {
          console.log(error)  
        }
    }
}

module.exports=usersController