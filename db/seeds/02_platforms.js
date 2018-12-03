exports.seed = function(knex, Promise) {
  return knex('platforms').insert([
    {id: 1, igdb_id: 49, name: 'Xbox One', url: 'https://www.igdb.com/platforms/xboxone', logo_url: ''},
    {id: 2, igdb_id: 48, name: 'Playstation 4', url: 'https://www.igdb.com/platforms/ps4--1', logo_url: '//images.igdb.com/igdb/image/upload/t_thumb/kjp5zjzy8omfm8kgxarx.jpg'},
    {id: 3, igdb_id: 6, name: 'PC', url: 'https://www.igdb.com/platforms/win', logo_url: '//images.igdb.com/igdb/image/upload/t_thumb/xtlhtldurl2s6r9t7lxz.jpg'},
    {id: 4, igdb_id: 130, name: 'Nintendo Switch', url: 'https://www.igdb.com/platforms/nintendo-switch', logo_url: '//images.igdb.com/igdb/image/upload/t_thumb/puo50ayd23qxze5yz45r.jpg'}
  ])
  .then(() =>{
    return knex.raw(`SELECT setval('platforms_id_seq', (SELECT max(id) FROM platforms));`)})
};
