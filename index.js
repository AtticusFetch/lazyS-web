const express = require('express')
const path = require('path')
const fs = require('fs');
const cloudinary = require('cloudinary')
const multer = require('multer')
const upload = multer({
  dest: path.join(__dirname, './upload/')
});
const PORT = process.env.PORT || 5000

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

app.post('/upload', upload.fields([{name: 'title'}, {name: 'description'}, {name: 'picture'}]), (req, res) => {
  const file = req.files.picture[0];
  const title = req.body.title;
  const description = req.body.description;
  console.log('will upload:', `${file.path}.${file.mimetype.split('/')[1]}`);
  cloudinary.uploader.upload(
    `${file.path}.${file.mimetype.split('/')[1]}`,
    (result) => {
      console.log(result);
      res.send();
    }
  );
});

app.listen(PORT);
