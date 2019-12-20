const express = require('express');
const morgan = require('morgan');
const { getPosts } = require('./routes/post');

const app = express()

app.use(morgan('dev'))
// app.use((req, res, next) => {
//   console.log('MIDDLEWARE')
//   next();
// })

// const customMiddleware = (req, res, next) => {
//   console.log('CUSTOM MIDDLEWARE')
//   next();
// }

app.get('/', getPosts)
// app.get('/', customMiddleware, getPosts)

const port = 8080;

app.listen(port, () => {
  console.log(`A Node JS API is listening on port: ${port}`)
})