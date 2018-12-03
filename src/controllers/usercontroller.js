const axios = require('axios')

const userModel = require('../models/usermodel') // review path for updating. 


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
}

module.exports = {
  create
}
