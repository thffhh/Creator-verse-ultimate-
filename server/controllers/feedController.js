const Post = require("../models/Post");

exports.getFeed = async (req, res) => {
  try {
    const { type, studio, page = 1, limit = 20 } = req.query;
    const query = {};
    if (type) query.type = type;
    if (studio) query.studioType = studio;

    const posts = await Post.find(query)
      .populate("author", "displayName photoURL")
      .sort({ isBoosted: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ success: true, posts, total: await Post.countDocuments(query) });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({ author: req.user.uid, ...req.body });
    res.status(201).json({ success: true, post });
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.likesCount += 1;
    await post.save();
    res.json({ success: true, likes: post.likesCount });
  } catch (err) { res.status(400).json({ error: err.message }); }
};
