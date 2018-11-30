const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const user = require('./routes/userroute')
const game = require('./routes/gameroute')
app.use('/user', user)
app.use('/game', game)


app.use((err, req, res, next) => {
    console.error(err)
    const status = err.status || 500
    res.status(status).json({ error: err })
  })
  
  app.use((req, res, next) => {
    res.status(404).json({ error: { message: 'Not found' }})
  })
  
if (process.env.NODE_ENV !== 'development') {
    const listener = () => console.log(`Gaming on ${port}`)
    let server = app.listen(port, listener)
}
  