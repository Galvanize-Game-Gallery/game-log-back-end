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
    .where({
      user_id: userid,
      platform_id: platformid
    })
    .returning('*')
  )
  .then(data => {
    if(!data) throw {status:404, message: 'User does not own this platform, cannot add game'}

    return data
  })
}

function addToShelf(upid, pgid, gamebody){
  return (
    db('user_games_platform')
    .where({
      u_p_id: upid,
      p_g_id: pgid
    })
    .returning('*')
  )
  .then(data => {
    if (data) throw {status:400, message: 'This user already has this game for that platform'}

    return (
      db('user_games_platform').insert([
        {}
        // {id: 1, p_g_id: 2, u_p_id: 1, user_rating: 2, notes: "This game is super slow, the economy sucks, the user interface is over-engineered"}
      ])
    )
  })
}

module.exports = {
  getOneByUserName,
  create,
  verifyUserPlatform
}
