const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Post = require("./models/postModel");
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// =================================================== All Routes Are Defined Here routes =============================================================

//                                             ============== GET ALL POST ==============

app.get("/post", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//                                             ============== CREATE POST ==============

app.post("/post", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//                                             ============== GET SINGLE POST ==============

app.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//                                             ============== UPDATE POST ==============

app.put("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body);
    if (!post) {
      return res.status(404).json({ message: `Can't find Id` });
    }
    const updatedPost = await Post.findById(id);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//                                             ============== DELETE POST ==============

app.delete("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id, req.body);
    if (!post) {
      return res.status(404).json({ message: `Can't find Id` });
    }
    const updatedPost = await Post.findById(id);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://dharmik:dvadgama1210@crudapi.mmjih.mongodb.net/CrudApi?retryWrites=true&w=majority&appName=CrudApi"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log("Node");
    });
  })
  .catch((error) => {
    console.log(error);
  });
