const express = require('express')
const path = require('path')
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const cloudinary = require('cloudinary')
const multer = require('multer')
const upload = multer({
  dest: path.join(__dirname, './upload/')
});
const MONGO_CONNECTION_URL = 'mongodb://heroku_dkwrnml7:1u2qsc885fjc4c2o82uaa30ltc@ds219879.mlab.com:19879/heroku_dkwrnml7';
const PORT = process.env.PORT || 5000;
const DB_NAME = 'heroku_dkwrnml7';
let DB = null;

const app = express();
let DBClient;

const fields = [
  {
    name: 'title'
  },
  {
    name: 'description'
  },
  {
    name: 'picture'
  },
  {
    name: 'type'
  },
  {
    name: 'price'
  },
  {
    name: 'restaurant'
  },
];

const connectToDB = () => new Promise((resolve, reject) => {
  MongoClient.connect(MONGO_CONNECTION_URL, function (err, client) {
    if (err) throw new Error('Could connect to the db', err);
    console.log("Connected successfully to server");
    DBClient = client;

    DB = DBClient.db(DB_NAME);
    resolve(DB);
  });
});

const insertItem = (item) => connectToDB()
  .then(db => new Promise(resolve => {
    console.log('item', item);
    const itemsCollections = db.collection(item.type);
    itemsCollections.insertOne(item, (err, result) => {
      if (err) throw new Error(err.message);
      DBClient.close();
      resolve();
    });
  }));

const retreiveItems = restaurantId => connectToDB()
  .then(db => new Promise(resolve => {
    const foodCollection = db.collection('foodItems');
    const restaurantCollection = db.collection('restaurants');
    restaurantCollection.find({ "_id": restaurantId }).toArray((err, docs) => {
      if (err) throw new Error(err.message);
      const restaurantName = docs[0].title;
      foodCollection.find({ "restaurant": restaurantName }).toArray((err, docs) => {
        if (err) throw new Error(err.message);
        resolve(docs);
      });
    });
  }));
  
const retreiveRestaurants = () => connectToDB()
  .then(db => new Promise(resolve => {
    db.collection('restaurants').find({}).toArray((err, docs) => {
      if (err) throw new Error(err.message);
      resolve(docs);
    });
  }));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

app.get('/foodItems', (req, res) => {
  retreiveItems(req.query.id)
    .then(items => res.send(JSON.stringify(items)));
});

app.get('/restaurants', (req, res) => {
  retreiveRestaurants()
    .then(items => res.send(JSON.stringify(items)));
});

app.post('/upload', upload.fields(fields), (req, res) => {
  const file = req.files.picture[0];
  /**
   *  fieldname           Field name specified in the form	
      originalname            Name of the file on the user's computer	
      encoding            Encoding type of the file	
      mimetype            Mime type of the file	
      size            Size of the file in bytes	
      destination           The folder to which the file has been saved	DiskStorage
      filename            The name of the file within the destination	DiskStorage
      path            The full path to the uploaded file	DiskStorage
      buffer            A Buffer of the entire file	MemoryStorage
   */
  const title = req.body.title;
  const description = req.body.description;
  const type = req.body.type;
  const price = req.body.price;
  const restaurant = req.body.restaurant;

  cloudinary.uploader.upload(
    file.path,
    (result) => {
      /**
       * { public_id: 'iajcoo0yhdwszgsnk2zu',
           version: 1521583976,
           signature: '4338c4d9ac2c239510d8eaf657e986463f166f21',
           width: 946,
           height: 708,
           format: 'png',
           resource_type: 'image',
           created_at: '2018-03-20T22:12:56Z',
           tags: [],
           bytes: 21209,
           type: 'upload',
           etag: 'fa46215f50bb552076d6d27b60307e2e',
           placeholder: false,
           url: 'http://res.cloudinary.com/hh73vlsda/image/upload/v1521583976/iajcoo0yhdwszgsnk2zu.png',
           secure_url: 'https://res.cloudinary.com/hh73vlsda/image/upload/v1521583976/iajcoo0yhdwszgsnk2zu.png',
           original_filename: 'fdd1a2319bcef5af472bab402238a2e9' }
       */
      let item = {
        image: result.secure_url,
        title,
        description,
        type,
      };
      if (type === 'foodItems') {
        item = {
          ...item,
          price,
          restaurant,
        };
      }
      insertItem(item)
        .then(() => res.send());
    }
  );
});

app.listen(PORT);