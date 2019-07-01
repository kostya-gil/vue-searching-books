import { STORAGE_KEY } from './constants';

export default {
  books: {
    items: [],
    query: '',
    page: 1,
    totalBooks: 0,
    perPage: 10,
    stateLoadedSuggestionBooks: false,
    isLoading: false,
  },
  selectedBooks: {
    items: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
    totalBooks: 0,
    page: 1,
    perPage: 2,
  },
  chosenBook: null,
};
