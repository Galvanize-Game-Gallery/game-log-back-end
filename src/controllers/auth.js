const authModel = require('../models/auth')
const jwt = require('jsonwebtoken')

function login(req, res, next){
  if(!req.body.username){
    return next({ status: 400, message: 'Bad request, no username'})
  }

  if(!req.body.password){
    return next({ status: 400, message: 'Bad request, no password'})
  }

  authModel.login(req.body.username, req.body.password)
  .then(function(user){

    const token = jwt.sign({id: user.id}, process.env.SECRET)

    return res.status(200).send({ token })
  })
  .catch(() => {
    next()
  })
 
}


function getAuthStatus(req, res, next){
    res.status(200).send({id:req.claim.id})
    
}

function isAuthenticated(req, res, next){

  if(!req.headers.authorization){
    return next({ status: 401, message: 'Unauthorized isauth1' })
  }
  const [scheme, credentials] = req.headers.authorization.split(' ')



  jwt.verify(credentials, process.env.SECRET, (err, payload)=>{
    if(err){
      return next({ status: 401, message: 'Unauthorized isAuth2' })
    }

    req.claim = payload

    next() 
  })
}

function isSelf(req, res, next){

  if(parseInt(req.params.userId) !== req.claim.id){
    return next({ status: 401, message: 'Unauthorized isSelf' })
  }

  next()
}



module.exports = {
  login,
  getAuthStatus,
  isAuthenticated,
  isSelf
}
