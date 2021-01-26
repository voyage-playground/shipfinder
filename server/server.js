const path = require('path');
const cors = require('cors');
const express = require('express');

const knex = require('knex')(require('./knexfile'));

const app = express();
const port = 3000;

app.use(cors());

app.get('/ships', async (req, res) => {
  const ships = await knex('ships').select();
  res.json(ships);
});

// if (process.env.NODE_ENV === 'production') {
// Serve any static files
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
// }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
