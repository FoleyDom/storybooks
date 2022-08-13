const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

// Logging
// Very cool tool, use in every project
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// HandleBars
//! Add the word .engine after exphbs
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
// Both of these lines are needed for handlebars
app.set('view engine', '.hbs')

// Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Sever running in ${process.env.NODE_ENV} mode on port ${PORT}`))
