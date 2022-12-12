const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema =  new Schema({
  title : {type: String, required: true},
  body: {type: String},
  image : {type: String}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;