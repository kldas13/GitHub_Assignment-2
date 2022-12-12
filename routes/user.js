const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
mongoose.connect("mongodb://localhost/USERDBMONGOOSE");
const bodyparser = require("body-parser");

const router = express.Router();

router.use(bodyparser.json());


router.get("/", async (req, res) => {
    try{
        // Write the code to fetch the data
        const users = await User.find();
        res.json({
            status: "Success",
            users: users
        })
    }catch(e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});
// Specific user
router.get("/:id", async (req, res) => {
    try{
        // Write the code to fetch the data

        const users = await User.find({_id : req.params.id});
        res.json({
            status: "Success",
            users: users
        })
    }catch(e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});

// 
// Specific user
router.post("/", async (req, res) => {
    try{
        // Write the code to create the data
        // console.log(req.body);
        const user = await User.create(req.body)
        res.json({
            status: "Success",
            user
        })
    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
});

// UPDATE
// router.put("//:email", async (req, res) => {
//     try{
//         // Write the code to create the data
//         // console.log(req.body);
//         const user = await User.updateMany({email : req.params.email}, {$set : {name: req.body.name}});
//         res.json({
//             status: "Success",
//             user
//         })
//     }catch(e) {
//         res.status(400).json({
//             status: "Failed",
//             message: e.message
//         })
//     }
// });
// update using id
router.put("/:id", async (req, res) => {
    try{
        // Write the code to create the data
        // console.log(req.body);
        const user = await User.updateOne({_id : req.params.id}, req.body);
        res.json({
            status: "Success",
            user
        })
    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
});

// delete using id
router.delete("/:id", async (req, res) => {
    try{
        // Write the code to create the data
        // console.log(req.body);
        const user = await User.deleteOne({_id : req.params.id});
        res.json({
            status: "Success",
            user
        })
    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
});

module.exports = router;