import { createSelector } from 'reselect';

const getBooks = state => state.books.books;

export const selectBook = id => (
  createSelector(getBooks, books => (
    books.filter(book => book.id === id))[0]
  )
);

export const selectDetailBook = id => (
  createSelector(getBooks, books => (
    books.filter(book => book.id === id)
  ))
);

