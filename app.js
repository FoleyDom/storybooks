const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
//Used to store user session *below*
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Body Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Logging
// Very cool tool, use in every project
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars Helpers
const { formatDate, stripTags, truncate } = require('./helpers/hbs')

// HandleBars
//! Add the word .engine after exphbs
app.engine(
    '.hbs',
    exphbs.engine({
        helpers: { formatDate, stripTags, truncate },
        defaultLayout: 'main',
        extname: '.hbs',
    }),
)
// Both of these lines are needed for handlebars
app.set('view engine', '.hbs')

// Sessions middleware
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        // Stores user session using code below
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }),
    }),
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Sever running in ${process.env.NODE_ENV} mode on port ${PORT}`))
