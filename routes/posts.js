const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/post");
mongoose.connect("mongodb://localhost/USERDBMONGOOSE");
const bodyparser = require("body-parser");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret = "RESTAPIAUTH";

const router = express.Router();

router.use(bodyparser.json());


// parse application/x-www-form-urlencoded
router.use(bodyparser.urlencoded({ extended: false }))

router.post("/posts", async (req, res) => {
    console.log(req.body);
    try{
        const posts = await Post.create({
            title: req.body.title,
            body: req.body.body,
            image : req.body.image
        })
        res.json({
            status: "Post Created",
            posts
        })

    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
});

router.get("/posts/all", async (req, res) => {
    console.log(req.body);
    try{
        const posts = await Post.find()
        res.json({
            status: "Success",
            posts
        })

    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
});

router.get("/posts/:id", async (req, res) => {
    console.log(req.body);
    try{
        const posts = await Post.find({_id : req.params.id})
        res.json({
            status: "Success",
            posts
        })

    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
});

router.put("/posts/:id", async (req, res) => {
    console.log(req.body);
    try{
        const posts = await Post.updateOne({_id : req.params.id}, req.body)
        res.json({
            status: "Successfully Updated",
            posts
        })

    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
});

router.delete("/posts/:id", async (req, res) => {
    console.log(req.body);
    try{
        const posts = await Post.deleteOne({_id : req.params.id})
        res.json({
            status: "Successfully Deleted",
            posts
        })

    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
});

module.exports = router;