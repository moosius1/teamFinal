const path = require('path');
const dotenv = require('dotenv')
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongodb = require('./db/connect');
const passport = require('passport')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-with, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Content_Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

dotenv.config({ path: './config/config.env' })

require('./config/passport')(passport)


// Handlebars Helpers
const {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
  } = require('./helpers/hbs')

  // Handlebars
app.engine( 
    '.hbs', exphbs.engine ({
      helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select,
      },
      defaultLayout: 'main',
      extname: '.hbs',
    })
  )
  app.set('view engine', '.hbs')

//express-sessions middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({process.env.MONGODB_URI})
}));



//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use('/auth', require('./routes/auth'));

app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } 
});

mongodb.initMongoose((err) => {
  if (err) {
    console.log(err);
  } 
});


module.exports = app;
