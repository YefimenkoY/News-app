import { createSelector } from 'reselect';

const getBooks = state => state.books.books;
const getSaveBooks = state => state.saves.saves;

const selectBook = id => (
  createSelector(getBooks, books => (
    books.find(book => book.id === id))
  )
);

const selectSaveBook = id => (
  createSelector(getSaveBooks, books => (
    books.find(book => book.id === id))
  )
);

const checkExistingSaves = id => createSelector(
  getSaveBooks, saves => saves.some(save => save.id === id)
);

export {
  getBooks,
  getSaveBooks,
  selectBook,
  checkExistingSaves,
  selectSaveBook
};
