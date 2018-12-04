
exports.seed = function(knex, Promise) {
  return knex('user_platforms').insert([
    {id: 1, user_id: 1, platform_id: 49, year_purchased: 2012},
    {id: 2, user_id: 1, platform_id: 6, year_purchased: 2012, platform_notes: 'Custom built AMD gaming PC, Sapphire Radeon 980 2GB GPU, 8GB Corsair RAM, 128GB SSD, 1TB 7200RPM HDD, 750 Watt PS, ASUS M5A99-FS MOBO, AMD FX-6200 Zambezi 6-Core 3.8GHz CPU'},
    {id: 3, user_id: 2, platform_id: 130 , year_purchased: 2017},
    {id: 4, user_id: 2, platform_id: 6, year_purchased: 2015, platform_notes: "Dell Inspiron 7200"},
    {id: 5, user_id: 2, platform_id: 48, year_purchased: 2016, platform_notes: "White edition"}
  ])
  .then(() => {
    return knex.raw(`SELECT setval('user_platforms_id_seq', (SELECT max(id) FROM user_platforms));`)
  })
};
