const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
//async function beacause we need to await to display saved user couse it
// takes some sec to bo saved to DB :)
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
    
});

//LOGIN
router.post("/login", async (req,res) =>{
    try{
    const user = await User.findOne({username: req.body.username});
    if(!user){
        return res.status(401).json("Wrong credentials!");
    } 

    const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const OriginalPassword = hashedPass.toString(CryptoJS.enc.Utf8);

    if(OriginalPassword !== req.body.password){
       return res.status(401).json("Wrong credentials!");
    } 

    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
    },
     process.env.JWT_SEC,
     {expiresIn: "3d"}  
    );

// we dont want to send our password so we pass only other stuff without the pass :)
    const {password, ...others} = user._doc;

    res.status(200).json({...others, accessToken});
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;