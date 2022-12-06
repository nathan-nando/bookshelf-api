/* eslint-disable eqeqeq */
const { nanoid } = require('nanoid');
const books = require('./books');

const getBooks = (req, h) => {
  const { name, reading, finished } = req.query;

  if (name) {
    console.log('called name');
    const booksFilteredName = books.filter((book) => book.name.includes(name.toLowerCase()));
    const res = h.response({
      status: 'success',
      data: booksFilteredName,
    });
    res.code(200);
    return res;
  }

  if (reading) {
    console.log('call reading');
    const bookFilteredReading = books.filter((book) => book.reading == reading);
    const res = h.response({
      status: 'success',
      data: bookFilteredReading,
    });
    res.code(200);
    return res;
  }

  if (finished) {
    console.log('call finished');
    const bookFilterFinished = books.filter((book) => book.finished == finished);
    const res = h.response({
      status: 'success',
      data: bookFilterFinished,
    });
    res.code(200);
    return res;
  }

  const res = h.response({
    status: 'success',
    data: books,
  });
  res.code(200);
  return res;
};
const getBookById = (req, h) => {
  const { bookId } = req.params;

  const book = books.filter((b) => b.id === bookId)[0];

  if (book !== undefined) {
    const res = h.response({
      status: 'success',
      data: book,
    });
    res.code(200);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  res.code(404);
  return res;
};

const addBook = (req, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.payload;

  const id = nanoid(16);

  const insertedAt = new Date().toISOString();

  const updatedAt = new Date().toISOString();

  const finished = pageCount === readPage ? 1 : 0;

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    insertedAt,
    updatedAt,
    finished,
  };

  if (!name) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    res.code(400);
    return res;
  }

  if (readPage > pageCount) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    res.code(400);
    return res;
  }

  books.push(newBooks);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const res = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    res.code(201);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  res.code(500);
  return res;
};

const editBookById = (req, h) => {
  const { bookId } = req.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.payload;

  const updatedAt = new Date().toISOString();

  const finished = pageCount === readPage ? 1 : 0;

  if (!name) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    res.code(400);
    return res;
  }

  if (readPage > pageCount) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    res.code(400);
    return res;
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
      finished,
    };

    const res = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    res.code(200);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  res.code(404);
  return res;
};

const deleteBookById = (req, h) => {
  const { bookId } = req.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);

    const res = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });

    res.code(200);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  res.code(404);
  return res;
};

module.exports = {
  getBooks, getBookById, addBook, editBookById, deleteBookById,
};