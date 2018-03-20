const express = require('express')
const path = require('path')
const fs = require('fs');
const cloudinary = require('cloudinary')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'build')))
  .get('/', (req, res) => res.sendFile(path.join(__dirname, 'build/index.html')))
  .post('/upload', upload.single('image'), (req, res) => {
    console.log(req);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
