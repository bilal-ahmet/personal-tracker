const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const indexRoutes = require('./routes/index.routes');
app.use('/', indexRoutes);


app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
