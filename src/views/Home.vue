<template>
  <div id="home">
    <div
      v-if="isLoading"
      class="loading-mask"
    >
      <object class="is-loading">
        <svg
          xmlns:svg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.0"
          width="35px"
          height="35px"
          viewBox="0 0 128 128"
          xml:space="preserve"
        ><g><path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#000000"
          fill-opacity="1"
        /><path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#c0c0c0"
          fill-opacity="0.25"
          transform="rotate(45 64 64)"
        /><path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#c0c0c0"
          fill-opacity="0.25"
          transform="rotate(90 64 64)"
        /><path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#c0c0c0"
          fill-opacity="0.25"
          transform="rotate(135 64 64)"
        /><path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#c0c0c0"
          fill-opacity="0.25"
          transform="rotate(180 64 64)"
        /><path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#c0c0c0"
          fill-opacity="0.25"
          transform="rotate(225 64 64)"
        /><path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#c0c0c0"
          fill-opacity="0.25"
          transform="rotate(270 64 64)"
        /><path
          d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
          fill="#c0c0c0"
          fill-opacity="0.25"
          transform="rotate(315 64 64)"
        /><animateTransform
          attributeName="transform"
          type="rotate"
          values="0 64 64;45 64 64;90 64 64;135 64 64;180 64 64;225 64 64;270 64 64;315 64 64"
          calcMode="discrete"
          dur="1200ms"
          repeatCount="indefinite"
        /></g></svg>
      </object>
    </div>
    <div class="desc-part">
      <h1 class="desc-part__title">
        Библиотека
      </h1>
      <Book />
    </div>
    <div class="search-part">
      <div
        class="search-part__content"
      >
        <Search />
        <Books type="books" />
      </div>
    </div>
  </div>
</template>

<script>
import Search from '../components/Search.vue';
import Books from '../components/Books.vue';
import Book from '../components/Book.vue';

export default {
  name: 'Home',
  components: {
    Search,
    Books,
    Book,
  },
  computed: {
    isLoading() {
      return this.$store.getters.loading;
    },
  },
};
</script>
