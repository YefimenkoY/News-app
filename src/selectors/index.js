import { createSelector } from 'reselect';

const getBooks = state => state.books.books;
const getSaveBooks = state => state.saves.saves;

const selectBook = id => (
  createSelector(getBooks, books => (
    books.filter(book => book.id === id))[0]
  )
);

const selectSaveBook = id => (
  createSelector(getSaveBooks, books => (
    books.filter(book => book.id === id))[0]
  )
);

const checkExistingSaves = id => createSelector(
  getSaveBooks, saves => saves.find(save => save.id === id)
);

export {
  getBooks,
  getSaveBooks,
  selectBook,
  checkExistingSaves,
  selectSaveBook
}
