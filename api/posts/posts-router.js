// implement your posts router here
const router = require('express').Router();

const Post = require('./posts-model');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: 'The posts information could not be retrieved',
      error: err.message,
      stack: err.stack
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({
        message: 'The post with the specified ID does not exist'
      });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({
      message: 'The post information could not be retrieved',
      error: err.message,
      stack: err.stack
    });
  }
});

router.post('/', async (req, res) => {
  const { title, contents } = req.body;
  try {
    if (!title || !contents) {
      res.status(400).json({
        message: 'Please provide title and contents for the post'
      });
    } else {
      const newPost = await Post.insert(req.body);
      const createdPost = await Post.findById(newPost.id);
      res.status(201).json(createdPost)
    }
  } catch (err) {
    res.status(500).json({
      message: 'There was an error while saving the post to the database',
      error: err.message,
      stack: err.stack
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { contents, title } = req.body;
  try {
    if (!contents || !title) {
      res.status(400).json({
        message: 'Please provide title and contents for the post'
      });
    } else {
      const foundPost = await Post.findById(id);
      if (!foundPost) {
        res.status(404).json({
          message: 'The post with the specified ID does not exist'
        });
      } else {
        const data = await Post.update(id, req.body)
        if (data) {
          const updatedPost = await Post.findById(id);
          res.json(updatedPost)
        }
      }
    }
  } catch (err) {
    res.status(500).json({
      message: 'The post information could not be modified',
      error: err.message,
      stack: err.stack
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findById(id);
    if (!deletedPost) {
      res.status(404).json({
        message: 'The post with the specified ID does not exist'
      });
    } else {
      await Post.remove(id);
      res.status(200).json(deletedPost);
    }
  } catch (err) {
    res.status(500).json({
      message: 'The post could not be removed',
      error: err.message,
      stack: err.stack
    });
  }
});

router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const idFound = await Post.findById(id);
    if (!idFound) {
      res.status(404).json({
        message: 'The post with the specified ID does not exist'
      });
    } else {
      const postComments = await Post.findPostComments(id);
      res.status(200).json(postComments);
    }
  } catch (err) {
    res.status(500).json({
      message: 'The comments information could not be retrieved',
      error: err.message,
      stack: err.stack
    });
  }
});





module.exports = router;