const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://127.0.0.1:27017/blogify').then(()=>console.log('connected to database')).catch((err)=>console.log(err.message));