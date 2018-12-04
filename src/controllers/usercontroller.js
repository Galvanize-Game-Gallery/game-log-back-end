const axios = require('axios')

const userModel = require('../models/usermodel') // review path for updating. 
const igdb = require('../models/igdbmodel')


function create(req, res, next){
  if(!req.body.username){
    return next({ status: 400, message: 'Bad username'})
  }

  if(!req.body.password){
    return next({ status: 400, message: 'Bad username'})
  }

  if(!req.body.fname){
    return next({ status: 400, message: 'Bad username'})
  }

  if(!req.body.lname){
    return next({ status: 400, message: 'Bad username'})
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

module.exports = {
  create,
  addPlatform
}
