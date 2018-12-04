const axios = require('axios')

const userModel = require('../models/usermodel') // review path for updating. 


function create(req, res, next){
  if(!req.body.username){
    return next({ status: 400, message: 'Bad Request, Username required'})
  }

  if(!req.body.password){
    return next({ status: 400, message: 'Bad Request, Password Required'})
  }

  userModel.create(req.body.username, req.body.password, req.body.fname, req.body.lname)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}

function verifyUserPlatform(req,res,next) {
  if(!req.params.userId) return next({status: 400, message: 'Bad Request, UserID is required'})
  if(!req.params.platformId) return next({status: 400, message: 'Bad Request, Platform_ID is required'})
  userModel.verifyUserPlatform(req.params.userId, req.params.platformId)
  .then(data => {
    req.upid = data[0].id
    return next()
  })
  .catch(next)
}

function addToShelf(req,res,next){
  console.log(req.upid, '...', req.pgid)
  userModel.addToShelf(req.upid, req.pgid, req.body)
  .then(result => {
    res.status(201).send({result})
  })
  .catch(next)
}

module.exports = {
  create, verifyUserPlatform, addToShelf
}
