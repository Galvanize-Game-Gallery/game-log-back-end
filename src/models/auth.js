const db = require('../../db') 
const bcrypt = require('bcrypt')
const userModel = require('./usermodel') 


function login(username, password){
  let user

  return userModel.getOneByUserName(username)
  .then(function(data){
    if(!data) throw { status: 400, message: "Bad Request"}
    user = data
    return bcrypt.compare(password, data.password)
  })
  .then(function(status){
    if(!status) throw { status: 401, message: "Unauthorized Login"}
    delete user.password
    return user
  })
}

module.exports = {
  login
}
