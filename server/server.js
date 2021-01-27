const path = require('path');
const cors = require('cors');
const faker = require('faker');
const express = require('express');
const bodyParser = require('body-parser');

const knex = require('knex')(require('./knexfile'));

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/ships', async (_, res) => {
  const ships = await knex('ships').select();
  res.json(ships);
});

app.put('/ships/:id', async (req, res) => {
  const shipID = req.params.id;
  await knex('ships').where({ id: shipID }).update(req.body);
  res.sendStatus(200);
});

app.post('/ships', async (_, res) => {
  const newShipPayload = {
    name: faker.name.jobDescriptor(),
    captain: faker.name.firstName(),
    lat: 34.74741002334936,
    lng: -46.24566763831464,
    avatar: Math.floor(Math.random() * 8) + 1,
  };
  const [shipID] = await knex('ships').insert(newShipPayload).returning('id');
  const ship = await knex('ships').where({ id: shipID }).first();
  res.json(ship);
});

app.delete('/ships/:id', async (req, res) => {
  const shipID = req.params.id;
  await knex('ships').where({ id: shipID }).delete();
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
