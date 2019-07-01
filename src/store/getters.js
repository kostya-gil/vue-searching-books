export default {
  allBooks: state => type => state[type].items,
  chosenBook(state) {
    return state.chosenBook;
  },
  stateLoadedSuggestionBooks(state) {
    return state.books.stateLoadedSuggestionBooks;
  },
  loading(state) {
    return state.books.isLoading;
  },
  configBooks: state => (type) => {
    const config = {
      totalBooks: state[type].totalBooks,
      perPage: state[type].perPage,
      page: state[type].page,
      query: type == 'books' ? state.books.query : null,
    };
    return config;
  },
};
