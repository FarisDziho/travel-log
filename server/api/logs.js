const {Router} =require ('express');
const logEntry = require('../models/logEntry');

const router=Router();


router.get('/' , async (req,res) => {
    const entries = await logEntry.find();
    res.json(entries);
})
router.post('/',  async (req,res,next) => {
    try{
        console.log(req)
        const logEntry=new LogEntry(req.body);
        const createdEntry=await logEntry.save();
        res.json(createdEntry);
    }
    catch(error){
        next(error);
    }



})

module.exports=router;