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

function verifyUserPlatform(userid, platformid) {
  return (
    db('user_platforms')
    .select('*')
    .where({
      user_id: userid,
      platform_id: platformid
    })
  )
  .then(data => {
    console.log(data);
    if(!data) throw {status:404, message: 'User does not own this platform, cannot add game'}

    return data
  })
}

function addToShelf(upid, pgid, gamebody){
  return (
    db('user_games_platform')
    .select('*')
    .where({
      u_p_id: upid,
      p_g_id: pgid
    })
  )
  .then(function([data]) {
    if (data) throw {status:400, message: 'This user already has this game for that platform'}
    
    let gameObject = {
      p_g_id: pgid,
      u_p_id: upid}
      
    if(gamebody.user_rating) gameObject.user_rating = gamebody.user_rating
    if(gamebody.notes) gameObject.notes = gamebody.notes

    return (
      db('user_games_platform').insert([
        gameObject
      ])
      .returning('*')
    )
  })
};

function dropFromShelf(gameid) {
  return db('user_games_platform')
    .del()
    .where({
      id: gameid,
    })
    .returning('*')
    .then(function ([data]) {
      delete data.id
      return data
    })
}

function addPlatformToUser(userID, body){
  return db('users')
  .where('users.id', userID)
  .then(function(gamer) {
    if (!gamer) 
      throw {status: 400, message: "Gamer does not exist"}

    return db('platforms')
    .where({igdb_id: body.platformId})
  })
  .then(function(system){
    if (!system) 
      throw {status: 400, message: "System does not exist"}
    
      let year = body.purchased ? body.purchased : 1975
      let notes = body.notes ? body.notes : ''

    return db('user_platforms')
    .insert({user_id: userID, 
      platform_id: body.platformId, 
      year_purchased: year, 
      platform_notes: notes})
      .returning('*')
  })
};

// function addToPlatformGames (gameID, platformID) {
//   return db('games')
//   .where('games.igdb_id',gameID )
//   .then(function(game){
//     if (!game)
//       throw { status: 400, message: "Game Not Found!"}

//     return db('platforms'
//     .where('platforms.igdb_id', platformID))
//   })
//   .then(function(system){
//     if (!system)
//       throw { status: 400, message: 'System not Found!'}

//     return db('platform_games')
//     .insert({
//       game_id: gameID,
//       platform_id: platformID
//     })
//     .returning('*')
//   })
// };

module.exports = {
  getOneByUserName,
  addPlatformToUser,
  // addToPlatformGames,
  create, 
  verifyUserPlatform,
  addToShelf,
  dropFromShelf
}
