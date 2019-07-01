<template>
  <div>
    <div
      class="books-area"
    >
      <div
        v-if="getStartedBooks.length"
        class="books"
      >
        <div
          v-for="(book, index) in getStartedBooks"
          :key="index"
          :class="{'selected': selectedId == book.id}"
          class="book"
          @click="getBook(book.id)"
        >
          <div
            v-if="book.volumeInfo.imageLinks"
            class="book__img"
          >
            <img
              :src="book.volumeInfo.imageLinks.thumbnail"
              :alt="book.volumeInfo.title"
            >
          </div>
          <div class="book__desc">
            <div
              class="stars-wrapper"
              :data-id="book.volumeInfo.averageRating"
            >
              <span
                v-if="book.volumeInfo.averageRating"
                v-stars="book.volumeInfo.averageRating"
                class="stars"
              />
            </div>
            <h2 class="book__title">
              {{ book.volumeInfo.title }}
            </h2>
            <div v-if="book.searchInfo">
              <p
                class="book__text"
                v-html="book.searchInfo.textSnippet"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination
      v-if="getStartedBooks.length"
      :current="currentPage"
      :total="totalBooks"
      :per-page="perPage"
      :type="type"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { eventBus } from '../main';
import Pagination from './Pagination.vue';

export default {
  name: 'Books',
  components: {
    Pagination,
  },
  props: {
    type: {
      type: String,
    },
  },
  data() {
    return {
      selectedId: '',
    };
  },
  computed: {
    ...mapGetters([
      'allBooks',
      'configBooks',
    ]),
    currentPage() {
      return this.configBooks(this.type).page;
    },
    getStartedBooks() {
      if (this.type == 'books') {
        return this.allBooks(this.type);
      }
      if (this.allBooks(this.type).length) {
        const arr = [];
        for (let i = (this.currentPage - 1) * this.perPage; i < this.perPage * this.currentPage; i++) {
          if (this.allBooks(this.type)[i]) {
            arr.push(this.allBooks(this.type)[i]);
          }
        }
        return arr;
      }
      return this.allBooks(this.type);
    },
    totalBooks() {
      return this.configBooks(this.type).totalBooks;
    },
    perPage() {
      return this.configBooks(this.type).perPage;
    },
  },
  mounted() {
    this.getStateContent();
  },
  methods: {
    getBook(id) {
      this.selectedId = id;
      const selectedBooks = this.allBooks('selectedBooks');
      const results = selectedBooks.filter(item => this.selectedId == item.id);
      const config = {
        type: this.type,
        id,
      };
      this.$store.commit('getBookById', config);
      eventBus.$emit('open', {
        isShow: true,
        selectedItem: results.length ? results[0] : null,
      });
    },
    getStateContent() {
      if (this.allBooks(this.type).length) {
        document.querySelector('.search-part__content').classList.add('loaded');
      } else {
        document.querySelector('.search-part__content').classList.remove('loaded');
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .books-area {
    margin: 0 auto;
    margin-top: 47px;
  }

  .selected-books .book {
    margin-top: 0;
  }

  .book {
    width: 100%;
    padding-top: 16px;
    padding-bottom: 10px;
    margin-bottom: 7px;
    margin-top: 11px;
    margin-left: -11px;
    padding-left: 12px;
    padding-right: 12px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    transition: background .5s ease;
    position: relative;
    cursor: pointer;
  }

  .book::after {
    content: '';
    position: absolute;
    bottom: -7px;
    left: 12px;
    right: 12px;
    height: 1px;
    background: #979797;
  }

  .book:hover,
  .book.selected {
    background: #F3F3F3;
    border-radius: 8px;
  }

  .book {
    &__img {
      max-width: 74px;
      flex-shrink: 0;
      margin-right: 10px;
    }

    &__desc {
      max-width: 335px;
      width: 100%;
    }

    &__title {
      margin-top: 8px;
      font-size: 17px;
      font-weight: 500;
    }

    &__text {
      font-size: 13px;
      margin-top: 6px;
    }
  }

  @media only screen and (max-width: 940px) {
    .books-area {
      max-width: 446px;
      width: 100%;
    }
  }

  @media only screen and (max-width: 475px) {
    .book__img {
      display: none;
    }

    .book {
      margin-left: 0;
    }
  }

</style>
