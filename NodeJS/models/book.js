
const mongoose = require('mongoose');

var Book = mongoose.model('Book', {
    title: { type: String },
    author: { type: String },
    yearPublished: { type: Number },
    isbn: { type: Number },
    category: { type: String }  
});

module.exports = { Book };
