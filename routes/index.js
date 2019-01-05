var express = require('express');
var router = express.Router();
var path = require('path');
const axios = require('axios');

//routes
////INDEX
router.get('/books', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'))
});

////NEW
router.get('/books/new', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'new.html'))
});

////detail
router.get('/books/detail', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'detail.html'))
})


/////////////////////////////
//push books here
const books = [];

//saving codes
router.post('/books', function (req, res) {
  const postIsbn = req.body; //isbn code comes from the body
  console.log(postIsbn)
  axios
    .get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + postIsbn.isbn)
    .then(function (resultado) {
      const data = resultado.data
      books.push({
        isbn: postIsbn.isbn,
        title: data.items[0].volumeInfo.title
      })
      res.json(books)
    })

})

// requesting codes:
router.get('/api/books', function (req, res) {
  res.json(books)
})

//requesting details
router.get('/api/books/:isbn', function (req, res, next) {
  const isbn = req.params.isbn
  axios
    .get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn) //asking code to google api
    .then(function (resultado) {
      const data = resultado.data
      console.log(data.items[0].volumeInfo.title);

      const book = {
        title: data.items[0].volumeInfo.title,
        subtitle: data.items[0].volumeInfo.subtitle || '', // ||'' to prevent undefined 
        description: data.items[0].volumeInfo.description || '',
        authors: data.items[0].volumeInfo.authors || '',
        cover: data.items[0].volumeInfo.imageLinks.thumbnail,
        isbn: isbn
      }
      res.json(book)
    })
})


module.exports = router;
