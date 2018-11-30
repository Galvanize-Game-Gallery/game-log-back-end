const db = require('./db')

db('courses')
.then((data) => {
  console.log(data)
}).catch(() => {
  console.log(`ERROR! Connection to Game Gallery DB not found!`)
}).finally(db.destroy)