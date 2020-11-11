var express = require('express');
var router = express.Router();

var book_controller = require('../controllers/bookController');

/// BOOK ROUTES ///

/* GET list of books. */

/* GET request for all books */
router.get('/', book_controller.findAll);

/* POST request to create a book. */
router.post('/', book_controller.create);

/* GET request for a single book. */
router.get('/:id', book_controller.findOne);

/* PUT request to update a book. */
router.put('/:id', book_controller.update);

/* DELETE request to remove a book */
router.delete('/:id', book_controller.delete);

module.exports = router;
