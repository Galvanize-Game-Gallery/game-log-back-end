const db = require('./db')

db('courses')
.then((data) => {
  console.log(data)
}).catch(() => {
  console.log(`ERROR! Connection to Game Gallery DB not found!`)
}).finally(db.destroy)

//This File is for Testing the database connection! 
//To utilize, switch the 'main' key in package.json from 'index.js' to 'main.js'