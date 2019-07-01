import { STORAGE_KEY } from './constants';

export default {
  getBookById(state, { type, id }) {
    const index = state[type].items.findIndex(book => book.id === id);
    if (index !== -1) {
      state.chosenBook = state[type].items[index];
    }
  },
  initStateChosenBook(state) {
    state.chosenBook = null;
  },
  updateStateLoadedSuggestionBooks(state, flag) {
    state.books.stateLoadedSuggestionBooks = flag;
  },
  setBooks(state, { books }) {
    state.books.items = books;
  },
  addBookToSelected(state, book) {
    state.selectedBooks.items.push(book);
    state.contentLoaded = true;
    state.selectedBooks.totalBooks = state.selectedBooks.items.length;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.selectedBooks.items));
  },
  nextSelectedPage(state, page) {
    state.selectedBooks.page = page;
  },
};
