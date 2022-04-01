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
      error: err.message
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
      error: err.message
    });
  }
});

router.post('/', async (req, res) => {

});

router.put('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

router.get(':id/comments', async (req, res) => {

});





module.exports = router;