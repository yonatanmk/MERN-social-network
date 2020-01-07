const express = require('express');
const { getPosts, createPost, postsByUser } = require('../controllers/post');
const { userById } = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require('../validator');


const router = express.Router();

router.get('/', getPosts);
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/by/:userId', requireSignin, postsByUser);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

module.exports = router;