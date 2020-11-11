var Book = require('../models/book');

// Find all books in database
exports.findAll = (req, res) => {
    Book.find()
    .then(books => {
        res.send(books);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving books"     
        });
    });
};

// Create a new book
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Book must have a title"
        });
    }

    // Create a new book
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
    });

    // Save book in the database
    book.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
           message: err.message || "An error occurred while creating the Book" 
        });
    });
};

// Find a single book
exports.findOne = (req, res) => {
    Book.findById(req.params.id)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });            
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving book with id " + req.params.id
        });
    });
};

// Update a single book from database
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Book title can not be empty"
        });
    }

    // Find book and update it with the request body
    Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled Book",
        author: req.body.author,
        genre: req.body.genre
    }, {new: true})
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating book with id " + req.params.id
        });
    });
};

// Delete a book in the database
exports.delete = (req, res) => {
    //console.log(req.params);
    Book.findByIdAndRemove(req.params.id)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });
        }
        res.send({message: "Book deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete book with id " + req.params.id
        });
    });
};
