const express = require('express');
const app = express()

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//db connection
mongoose.connect(
  process.env.MONGO_URI,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => {
    console.log('DB Connected')
  })

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
})


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// const customMiddleware = (req, res, next) => {
//   console.log('CUSTOM MIDDLEWARE')
//   next();
// }

app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);

app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized'})
  }
})


// app.get('/', customMiddleware, getPosts)

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`A Node JS API is listening on port: ${port}`)
})