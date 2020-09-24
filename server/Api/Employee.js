var express = require('express');
var router = express.Router();

var empModel = require('../modules/emp_module');


router.get('/getData',function(req, res, next){
    var getPassCat = empModel.find({});
    getPassCat.exec()
        .then((data) => {
            res.send({result:data})
        }).catch((err) => {
            res.json(err);
        })
})


router.post('/postData',function(req, res, next){
    var addcat = new empModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        picture: req.body.picture,
        salary: req.body.salary,
        position: req.body.position
    })
    addcat.save()
        .then((data) => {
            res.status(201).json({
                msg: "data inserted successfully.",
                result: data
            })
        }).catch((err) => {
            res.json(err);
        })
})


router.patch('/updateData/:id',(req,res,next)=>{
    empModel.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        picture: req.body.picture,
        salary: req.body.salary,
        position: req.body.position
    })
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.json(err);
    })
})


router.delete('/deleteData/:_id',(req,res,next)=>{
    empModel.findByIdAndDelete(req.params._id)
    .exec()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.json(err);
    })

})

module.exports = router;