const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const home = require('./build/index.html')

express()
  .use(express.static(path.join(__dirname, 'build')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  .get('/', (req, res) => res.send(home))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))