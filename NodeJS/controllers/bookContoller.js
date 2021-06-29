
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Book } = require('../models/book');

// Get request of list of records in books collections
router.get('/', (req, res) => {
    Book.find((err, docs) => {
        if (!err) { res.send(docs);}
        else { console.log('Error in retrieving book:' + JSON.stringify(err, undefined, 2)); }
    });
});

// Get request of book Id 
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');

    Book.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in retrieving book:' + JSON.stringify(err,undefined,2)); }
    });
});

// Post request of book record
router.post('/', (req, res) => {
    var emp = new Book({
        title: req.body.title,
        author: req.body.author,
        yearPublished: req.body.yearPublished,
        isbn: req.body.isbn,
        category: req.body.category,
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in saving book: ' + JSON.stringify(err, undefined, 2)); }
    });
});

// Update request of book record
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : ${req.params.id}');

    var emp = {
        title: req.body.title,
        author: req.body.author,
        datePublished: req.body.datePublished,
        isbn: req.body.isbn,
        category: req.body.category,
    };
    Book.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in updating book: ' + JSON.stringify(err, undefined, 2)); }
    });
});

// Delete request of book record
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No recorded book with given id : ${req.params.id}`);

    Book.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in deleting book:' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports = router;

