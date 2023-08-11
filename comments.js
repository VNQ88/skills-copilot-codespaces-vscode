// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

// GET /comments
router.get('/', function(req, res, next) {
    Comment.find(function(err, comments) {
        if (err) {
            return next(err);
        }
        res.json(comments);
    });
});

// POST /comments
router.post('/', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.save(function(err, comment) {
        if (err) {
            return next(err);
        }
        res.json(201, comment);
    });
});

// GET /comments/:id
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Comment.findById(id, function(err, comment) {
        if (err) {
            return next(err);
        }
        if (comment === null) {
            return res.json(404, {message: 'Comment not found'});
        }
        res.json(comment);
    });
});

// PUT /comments/:id
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Comment.findById(id, function(err, comment) {
        if (err) {
            return next(err);
        }
        if (comment === null) {
            return res.json(404, {message: 'Comment not found'});
        }
        comment.text = req.body.text;
        comment.save();
        res.json(comment);
    });
});

// DELETE /comments/:id
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Comment.findById(id, function(err, comment) {
        if (err) {
            return next(err);
        }
        if (comment === null) {
            return res.json(404, {message: 'Comment not found'});
        }
        comment.remove(function(err) {
            if (err) {
                return next(err);
            }
            res.json(comment);
        });
    });
});

module.exports = router;