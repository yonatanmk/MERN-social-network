const Post = require('../models/post');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getPosts = (req, res) => {
  const posts = Post.find().select('_id title body')
    .then(posts => res.json({ posts }))
    .catch(err => console.log(err))
};

// exports.getPosts = async (req, res) => {
//   // get current page from req.query or use default value of 1
//   const currentPage = req.query.page || 1;
//   // return 3 posts per page
//   const perPage = 6;
//   let totalItems;

//   const posts = await Post.find()
//       // countDocuments() gives you total count of posts
//       .countDocuments()
//       .then(count => {
//           totalItems = count;
//           return Post.find()
//               .skip((currentPage - 1) * perPage)
//               .populate('comments', 'text created')
//               .populate('comments.postedBy', '_id name')
//               .populate('postedBy', '_id name')
//               .select('_id title body created likes')
//               .limit(perPage)
//               .sort({ created: -1 });
//       })
//       .then(posts => {
//           res.status(200).json(posts);
//       })
//       .catch(err => console.log(err));
// };

exports.createPost = (req, res, next) => {
  console.log('CREATE POST')
  console.log(req)
  // const post = new Post(req.body); 
  // console.log('Creating Post: ', post)

  // post.save()
  //   .then(result => {
  //     res.json({
  //       post: result,
  //     })
  //   })

  // post.save((err, result) => {
  //   if (err) {
  //     return res.status(400).json({
  //         error: err
  //     });
  //   }
  //   res.json({ post: result });
  //   // res.json(result);
  // });

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }
    let post = new Post(fields);

    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(result);
    });
  });
};