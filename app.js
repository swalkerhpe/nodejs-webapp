const express = require('express');
const chalk = require('chalk');
const debug = require('debug');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { magentaBright } = require('chalk');
const bookRouter = express.Router();

const url = 'mongodb://localhost:27018/';
const dbName = 'test';
const port = 8081
const app = express();

app.use('/assets', express.static(path.join(__dirname, './src/assets')));
app.set('views', './src/views/');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
      
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const col = await db.collection('webapps');
          const collectionOne = await col.find().toArray();
          const col4 = await db.collection('quotation');
          const quotation = await col4.find().toArray();
          const col5 = await db.collection('dogs');
          const dogs = await col5.find().toArray();
          console.log(collectionOne);
          console.log(quotation);
          

          res.render(
            'index',
            {
              collectionOne,
              dogs
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });




app.get('/portfolio-details.html', (req, res) => {
  res.render(
    'portfolio-details'
  );
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});

console.log('testing');
