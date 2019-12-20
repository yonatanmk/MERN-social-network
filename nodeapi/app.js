const express = require('express');

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World From Node.js')
})

const port = 8080;

app.listen(port, () => {
  console.log(`A Node JS API is listening on port: ${port}`)
})