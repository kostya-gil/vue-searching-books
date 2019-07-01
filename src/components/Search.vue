<template>
  <div class="search">
    <form @submit.prevent="sendQuery($event)">
      <a
        href="/#/selected"
        class="search__selected"
      >
        <object>
          <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 0C12.76 0 11.09 0.81 10 2.09C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.42 0 5.5C0 9.28 3.4 12.36 8.55 17.04L10 18.35L11.45 17.03C16.6 12.36 20 9.28 20 5.5C20 2.42 17.58 0 14.5 0Z"
              fill="#4B5959"
            />
          </svg>
        </object>
        <span class="search-popup">Избранное</span>
      </a>
      <input
        v-model="query"
        autofocus
        type="text"
        class="search__input"
        placeholder="Поиск"
        @keydown.up="up"
        @keydown.down="down"
        @keydown.enter="sendQuery"
      >

      <button
        type="submit"
        class="search__btn"
      >
        <object>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.71 11H12.5L17.49 16L16 17.49L11 12.5V11.71L10.73 11.43C9.59 12.41 8.11 13 6.5 13C2.91 13 0 10.09 0 6.5C0 2.91 2.91 0 6.5 0C10.09 0 13 2.91 13 6.5C13 8.11 12.41 9.59 11.43 10.73L11.71 11ZM2 6.5C2 8.99 4.01 11 6.5 11C8.99 11 11 8.99 11 6.5C11 4.01 8.99 2 6.5 2C4.01 2 2 4.01 2 6.5Z"
              fill="#4B5959"
            />
          </svg>
        </object>
      </button>
    </form>
    <ul
      v-if="isShow"
      id="suggest-list"
      class="suggest-list"
    >
      <li
        v-for="(suggest,index) in suggestions"
        :key="index"
        class="suggest-list__item"
        :class="{ 'selected': (selected == index)}"
        @click="fetchBooks(suggest.volumeInfo.title)"
      >
        {{ suggest.volumeInfo.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';

export default {
  name: 'Search',
  data() {
    return {
      query: '',
      suggestions: [],
      isShow: false,
      selectedItem: null,
      selected: -1,
    };
  },
  watch: {
    query() {
      this.debouncedGetAnswer();
    },
  },
  created() {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
    document.addEventListener('click', (e) => {
      if (e.target.className == 'search__input' && this.suggestions.length != 0) {
        this.isShow = true;
      } else if (e.target.className != 'suggest-list' || e.target.className != 'suggest-list__item') {
        this.isShow = false;
      }
    });
  },
  methods: {
    up() {
      if (this.selected == -1) {
        return;
      }
      this.selected -= 1;
    },
    down() {
      if (this.selected >= this.suggestions.length - 1) {
        return;
      }
      this.selected += 1;
    },
    sendQuery(e) {
      e.preventDefault();
      if (this.selected == -1) {
        this.fetchBooks(this.query);
      } else {
        if (this.isShow) {
          this.selectedItem = this.suggestions[this.selected];
          this.fetchBooks(this.selectedItem.volumeInfo.title);
        }
        this.selected = -1;
      }
      this.isShow = false;
    },
    fetchBooks(title) {
      if (title) {
        const config = {
          title: title.replace(/\s+/g, '+'),
          page: 1,
        };
        this.$store.dispatch('fetchBooks', config);
        this.query = title;
      }
    },
    async getAnswer() {
      if (this.query) {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.query.replace(/\s+/g, '+')}&maxResults=5`);
        this.suggestions = response.data.items;

        if (this.$store.getters.stateLoadedSuggestionBooks) {
          this.isShow = false;
          this.$store.commit('updateStateLoadedSuggestionBooks', false);
        } else {
          this.isShow = true;
        }
      } else {
        this.suggestions = [];
        this.isShow = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .search {
    position: relative;
    margin: 0 auto;

    form {
      display: flex;
      justify-content: space-between;
      width: 100%;
      position: relative;
    }

    &__selected {
      width: 44px;
      height: 44px;
      background: #F3F3F3;
      border: 1px solid #7D8888;
      box-shadow: 0px 16px 17px rgba(0, 0, 0, 0.201427);
      border-radius: 4px;
      position: relative;
      transition: all .5s ease;
      margin-right: 12px;
      flex-shrink: 0;

      .search-popup {
        display: block;
        position: absolute;
        font-size: 15px;
        border-radius: 4px;
        background: rgba(0,0,0, 0.700776);
        padding: 7px 16.5px 8px 16.5px;
        color: #fff;
        top: -40.5px;
        right: 50%;
        transform: translateX(50%);
        opacity: 0;
        transition: opacity .5s ease;

        &:before {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 8px 9px 0 9px;
          border-color: rgba(0,0,0, 0.700776) transparent transparent transparent;
        }
      }

      &:hover {
        box-shadow: 0px 3px 14px 3px rgba(33, 7, 252, 0.42);

        .search-popup {
          opacity: 1;
        }
      }

      object {
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

    }

    &__input {
      max-width: 390px;
      width: 100%;
      padding: 12px 50px 10px 16px;
      font-size: 17px;
      border-radius: 4px;
      box-shadow: 0px 16px 17px rgba(0, 0, 0, 0.201427);
      border: 1px solid #7d8888;
      transition: all .5s ease;

      &:focus,
      &:hover {
        box-shadow: 0px 3px 14px 3px rgba(33, 7, 252, 0.42);
      }
    }

    &__btn {
      background: transparent;
      position: absolute;
      right: 16px;
      top: 55%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }

  .suggest-list {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    z-index: 20;
    border: 1px solid #7d8888;
    border-radius: 4px;
    border-top: none;
    background: white;
    box-shadow: 0px 16px 17px rgba(0, 0, 0, 0.201427);

    &__item {
      padding: 10px 16px;
      cursor: pointer;
      color: #4B5959;
      transition: all 0.3s ease;

      &.selected,
      &:hover {
        background: #F3F3F3;
      }

    }
  }

  @media only screen and (max-width: 940px) {
    .search {
      padding-top: 64px;
      max-width: 446px;
      width: 100%;
    }

    .suggest-list,
    .search__loading {
      top: 120px;
    }
  }
</style>
