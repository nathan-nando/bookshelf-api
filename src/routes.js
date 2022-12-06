const { getBooks, getBookById, addBook, editBookById, deleteBookById} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getBooks,
  }, {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById,
  }, {
    method: 'POST',
    path: '/books',
    handler: addBook,
  }, {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookById,
  }, {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookById,
  },
];

module.exports = routes;