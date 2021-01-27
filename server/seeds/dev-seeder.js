const SHIPS = [
  {
    name: 'The Tranquillity',
    captain: 'Jaden',
    lat: 34.74741002334936,
    lng: -46.24566763831464,
    avatar: 'jaden',
  },
  {
    name: 'The Delicacy',
    captain: 'Daniel',
    lat: 41.16475226034781,
    lng: -67.97373842772936,
    avatar: 'daniel',
  },
  {
    name: 'Breaking Bad',
    captain: 'Walter',
    lat: 18.91037363964806,
    lng: -40.07054149563417,
    avatar: 'walter',
  },
  {
    name: 'The Sea Wizard',
    captain: 'Oliver',
    lat: 51.573845344918084,
    lng: -21.250075333297676,
    avatar: 'oliver',
  },
];

module.exports.seed = async knex => {
  await knex('ships').insert(SHIPS);
};
