const express = require('express')
const path = require('path')
const fs = require('fs')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'build/static')))
  .get('/', (req, res) => res.sendFile(path.join(__dirname, 'build/index.html')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  fs.readdir(__dirname, function(err, items) {
    for (var i=0; i<items.length; i++) {
        console.log(items[i]);
    }
});