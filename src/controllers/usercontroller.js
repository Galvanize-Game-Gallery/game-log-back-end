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
};

function addPlatform(req, res, next){
  const {year_purchased, platform_notes, platform_id, user_id} = req.body;
  userModel.addPlatformToUser(system, year_purchased, platform_notes, platform_id, user_id).then(function(result){
    res.status(201).send(result)
  })
};

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
  userModel.addToShelf(req.upid, req.pgid, req.body)
  .then(result => {
    res.status(201).send({result})
  })
  .catch(next)
}

function dropFromShelf(req, res, next) {
  userModel.dropFromShelf(req.params.gameId)
  .then(result => {
    res.status(202).send({result})
  })
  .catch(next)
}

function editGameOnShelf(req,res,next){
  userModel.editGameOnShelf(req.params.gameId, req.body.user_rating, req.body.notes)
  .then(result => {
    res.status(202).send({result})
  })
  .catch(next)
}

function addPlatformToUser(req, res, next) {
  if(!req.params.userId) return next({status: 400, message: 'Bad Request, UserID is required'})
  if(!req.body.platformId) return next({status: 400, message: 'Bad Request, PlatformID is required'})
  userModel.addPlatformToUser(req.params.userId, req.body)
  .then(result => {
    res.status(201).send({result})
  })
  .catch(next)
}

function getUserPlatforms(req, res, next) {
  if(!req.params.userId) return next({status: 400, message: 'Bad Request, UserID is required'})
  userModel.getUserPlatforms(req.params.userId, req.body)
  .then(result => {
    res.status(201).send({result})
  })
  .catch(next)

}

module.exports = {
  create, 
  verifyUserPlatform, 
  addToShelf,
  dropFromShelf, 
  addPlatform, 
  addPlatformToUser,
  editGameOnShelf,
  getUserPlatforms
}
