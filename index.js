const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./src/routes');
require('dotenv').config();
const app = express();
const { errorHandler } = require('./src/middlewares/errorMiddleware');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const expressLayouts = require('express-ejs-layouts');

// Sequelize setup
const db = require('./src/models');
const sequelize = db.sequelize;

// Session Store
const sessionStore = new SequelizeStore({ db: sequelize });

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));

// Ensure the sessions table is created
sessionStore.sync();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  res.locals.user = req.session.user || null; // Pass `user` from session to views
  res.locals.error = null; // Initialize `error` as null
  next();
});

// Configure EJS Layouts
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(routes);

app.use(errorHandler);

// View Engine
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Routes
app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
