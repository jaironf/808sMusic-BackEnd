const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const {PORT} = process.env
const {dbConnection} = require('./config/config')

dbConnection();

app.use(express.json())
app.use(cors())

app.use('/users', require('./routes/users'))



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;

