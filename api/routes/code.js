const Code = require("../models/Code");
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/",verifyTokenAndAdmin,async (req,res)=>{
    const newCode = new Code(req.body);
    try{
        const savedCode = await newCode.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
});

//UPDATE

router.put("/:id",verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updatedCode = await Code.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedCode);
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await Code.findByIdAndDelete(req.params.id);
        res.status(200).send("Code has been deleted!");
    }catch(err){
        res.status(500).json(err);
    }
});


//GET BY NAME  

router.get("/:name", verifyTokenAndAuth, async (req, res)=>{
    try{
        const codes = await Code.find({codeName: req.params.name});
        res.status(200).json(codes);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;