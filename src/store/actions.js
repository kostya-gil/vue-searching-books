import axios from 'axios';

export default {
  async fetchBooks({ commit, state }, { title, page }) {
    try {
      state.books.query = title;
      state.books.isLoading = true;
      state.books.page = page;

      const startIndex = (state.books.page * 10) - 9;
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${state.books.query}&startIndex=${startIndex}&maxResults=${state.books.perPage}`);

      const config = {
        books: response.data.items,
      };
      commit('setBooks', config);
      commit('updateStateLoadedSuggestionBooks', true);
      state.books.totalBooks = parseInt(response.data.totalItems, 10);
      state.contentLoaded = true;

      setTimeout(() => {
        state.books.isLoading = false;
      }, 500);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
