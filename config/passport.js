const LocalStrategy  = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
const User = require("../models/User");

module.exports = function(passport){
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    console.log(password);
  }));
}