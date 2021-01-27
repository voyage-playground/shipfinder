const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const knex = require('knex')(require('./knexfile'));

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/ships', async (req, res) => {
  const ships = await knex('ships').select();
  res.json(ships);
});

app.put('/ships/:id', async (req, res) => {
  const shipID = req.params.id;
  await knex('ships').where({ id: shipID }).update(req.body);
  res.sendStatus(200);
});

app.use(express.static(path.join(__dirname, 'static')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`ShipFinder running on port ${port}...`);
});
