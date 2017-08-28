import { createSelector } from 'reselect';

const getBooks = state => state.books.books;
const getSaveBooks = state => state.saves.saves;

export const selectBook = id => (
  createSelector(getBooks, books => (
    books.filter(book => book.id === id))[0]
  )
);

export const selectSaveBook = id => (
  createSelector(getSaveBooks, books => (
    books.filter(book => book.id === id))[0]
  )
);
