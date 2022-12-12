const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/USERDBMONGOOSE");
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const postsRoutes = require("./routes/posts");
const secret = "RESTAPIAUTH";
var jwt = require('jsonwebtoken');
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.json());

app.use('/posts', (req, res, next) => {
    if(req.headers.authorization){
        console.log(req.headers.authorization);
        const token = req.headers.authorization;
        if(token){
            jwt.verify(token, secret, function(err, decoded) {
                if(err) {
                    return res.status(403).json({
                        status: "failed",
                        message: "Not a valid token"
                    })
                }
                req.user =  decoded.data
                console.log(req.body);
                next();
            });
        }else {
            return res.status(401).json({
                status: "Failed",
                message: "Token is missing"
            })
        }
    }else {
        return res.status(403).json({
            status: "Failed",
            message: "Not authenticated user"
        })
    }

})


app.use("/", userRoutes);

app.use("/", loginRoutes);
app.use("/", postsRoutes);



app.get("*", (req, res) => {
    res.status(404).send("API NOT FOUND");
});

app.listen(3000, () => console.log("Server is up at port 3000"));


