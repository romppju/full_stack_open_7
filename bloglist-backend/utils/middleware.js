const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/*
const getTokenFrom = request => {
    const authorization = request.get('authorization')
  
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    
    if (authorization && authorization.startsWith('Bearer ')) {
        const bearerToken =  authorization.replace('Bearer ', '')
        request.token = bearerToken    
    }
    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({error: 'token invalid'})
    }

    const user = await User.findById(decodedToken.id)

    request.user = user

    next()
}
*/

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }
  
  // NOT USED CURRENTLY
  const tokenExtractor = (request, response, next) => {
    request.token = getTokenFrom(request)
    next()
  }
  
  
  const userExtractor = async (request, response, next) => {
    const token = getTokenFrom(request)
  
    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }
    
      request.user = await User.findById(decodedToken.id)
    }
  
    next()
}

const errorHandler = (error, request, response, next) => {
    
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({error: 'token missing or invalid'})
    }

    next(error)
}



module.exports = {
    errorHandler, tokenExtractor, userExtractor
}