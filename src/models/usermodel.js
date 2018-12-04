const knex = require('../../db') // review this if we run into issues. 

const db = require('../../db')
const bcrypt = require('bcrypt')

function getOneByUserName(username){
  return (
    db('users') 
    .where({ username })
    .first()
  )
}

function create(username, password, fname, lname){  

  return getOneByUserName(username)
  .then(function(data){
    if(data) throw { status: 400, message:'User already exists'}

    return bcrypt.hash(password, 10)
  })
  .then(function(hashedPassword){

    return (
      db('users')
      .insert({ username, password: hashedPassword, fname, lname }) 
      .returning('*')
    )
  })
  .then(function([ data ]){
    delete data.password
    return data
  })
}

function addPlatformToUser(userID, platformID, purchased, notes) {
  return db('users')
    .where('user.id', userID)
    .then(function (gamer) {
      if (!gamer)
        throw { status: 400, message: "Gamer does not exist" }

      return db('platforms')
        .where('platform.igdb_id', platformID)
    })
    .then(function (system) {
      if (!system)
        throw { status: 400, message: "System does not exist" }

      return db(user_platforms)
        .insert({
          user_id: userID,
          platform_id: platformID,
          year_purchased: purchased,
          platform_notes: notes
        })
        .returning('*')
    })
}

function addToPlatformGames (gameID, platformID) {
  return db('games')
  .where('games.igdb_id',gameID )
  .then(function(game){
    if (!game)
      throw { status: 400, message: "Game Not Found!"}

    return db('platforms'
    .where('platforms.igdb_id', platformID))
  })
  .then(function(system){
    if (!system)
      throw { status: 400, message: 'System not Found!'}

    return db('platform_games')
    .insert({
      game_id: gameID,
      platform_id: platformID
    })
    .returning('*')
  })
};

function addGame(gameID, title, coverArt, info) {
  return db('games')
  .insert({
    igdb_id: gameID,
    title: title,
    cover_url: coverArt,
    desc: info
  })
  .returning('*')
};

module.exports = {
  getOneByUserName,
  create,
  addPlatformToUser,
  addToPlatformGames,
  addGame
}
