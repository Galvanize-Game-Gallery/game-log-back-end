const db = require('../../db')
const bcrypt = require('bcrypt')

//Are we using this somewhere? It has no controller...
function getOneByUserName(username){
  return (
    db('users') 
    .where({ username })
    .first()
  )
}

function getUser(userId){
  return db('users')
  .where({id: userId})
  .then(function([result]) {
    if(result){
      delete result.password
      return result
    }
    else {
      throw {status:400, message: 'User Not Found'}
    }
  })
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
    if(data.length < 1) throw {status:404, message: 'User does not own this platform, cannot add game'}
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

function dropFromShelf(gameId, platformId, userId) {
  return db.raw(`select ugp.id from user_games_platform ugp
  inner join platform_games pg on ugp.p_g_id = pg.id
  inner join user_platforms up on ugp.u_p_id = up.id
  where up.platform_id =${platformId} and pg.game_id =${gameId} and up.user_id =${userId}`)
  .then(result =>{
    if(result.rows.length > 0){
      return db.raw(`delete from user_games_platform where id=${result.rows[0].id}`)
        .then(result => {
          return "Deleted Successfully!"
        })
    }
  })
};

function editGameOnShelf(gameid, user_rating, notes) {
  return db('user_games_platform')
  .update({user_rating,notes})
  .where({id: gameid})
  .returning('*')
  .then(function([data]){
    return data
  })
};

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

module.exports = {
  getOneByUserName,
  addPlatformToUser,
  create, 
  verifyUserPlatform,
  addToShelf,
  dropFromShelf,
  editGameOnShelf,
  getUser
}
