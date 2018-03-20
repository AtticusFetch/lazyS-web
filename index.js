const express = require('express')
const path = require('path')
const fs = require('fs');
const cloudinary = require('cloudinary')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'build')))
  .use(express.bodyParser({uploadDir:'/tmp' }))
  .get('/', (req, res) => res.sendFile(path.join(__dirname, 'build/index.html')))
  .post('/upload', (req, res) => {
    console.log('request', req);
    const tempPath = req.files.file.path;
    const targetPath = path.resolve('./uploads/image.png');
    fs.rename(tempPath, targetPath, err => {
        if (err) throw err;
        console.log("Upload completed!");
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
