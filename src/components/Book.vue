<template>
  <div>
    <transition name="slide-fade">
      <div
        v-if="chosenBook"
        v-show="isShow"
        class="book-area"
      >
        <a
          href=""
          class="prev-link"
          @click.prevent="closeBook"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
              fill="white"
            />
          </svg>
          <span class="prev-link__author">{{ chosenBook.volumeInfo.authors ? chosenBook.volumeInfo.authors.join(', '): 'Не указан' }}</span>
        </a>
        <div class="book">
          <div class="book__preview">
            <div
              v-if="chosenBook.volumeInfo.imageLinks"
              class="book__img"
            >
              <img
                :src="chosenBook.volumeInfo.imageLinks.thumbnail"
                :alt="chosenBook.volumeInfo.title"
              >
            </div>
            <div class="book__info">
              <h2 class="book__title">
                {{ chosenBook.volumeInfo.title }}
              </h2>
              <p class="book__author">
                Автор: <span>{{ chosenBook.volumeInfo.authors ? chosenBook.volumeInfo.authors.join(', '): 'Не указан' }}</span>
              </p>
              <p class="book__year">
                Год: <span>{{ chosenBook.volumeInfo.publishedDate | filterDate }}</span>
              </p>
              <div
                v-if="chosenBook.volumeInfo.averageRating"
                class="book__raiting"
              >
                <span
                  v-stars="chosenBook.volumeInfo.averageRating"
                  class="stars"
                />
                <p class="book__raiting-text">
                  Рейтинг: <span>{{ chosenBook.volumeInfo.averageRating }}</span>
                </p>
              </div>
              <div class="book__shares">
                <a
                  v-if="!selectedItem"
                  href=""
                  class="book__shares-item"
                  @click.prevent="addBookToSelected(chosenBook)"
                >
                  <object class="book__shares-item-icon">
                    <svg
                      width="20"
                      height="19"
                      viewBox="0 0 20 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 2.09C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.42 20 5.5C20 9.2769 16.6056 12.3549 11.4627 17.0185L11.45 17.03L10 18.35L8.55 17.04L8.51052 17.0041C3.38263 12.3442 0 9.27033 0 5.5C0 2.42 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09ZM10 15.65L10.1 15.55C14.86 11.24 18 8.39 18 5.5C18 3.5 16.5 2 14.5 2C12.96 2 11.46 2.99 10.94 4.36H9.07C8.54 2.99 7.04 2 5.5 2C3.5 2 2 3.5 2 5.5C2 8.39 5.14 11.24 9.9 15.55L10 15.65Z"
                      />
                    </svg>
                  </object>
                  <p
                    class="book__shares-item-text"
                  >
                    В изранное
                  </p>
                </a>
                <a
                  v-if="selectedItem"
                  v-show="selectedItem.id == chosenBook.id"
                  href="/#/selected"
                  class="book__shares-item chosen"
                >
                  <object class="book__shares-item-icon">
                    <svg
                      width="20"
                      height="19"
                      viewBox="0 0 20 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.5 0C12.76 0 11.09 0.81 10 2.09C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.42 0 5.5C0 9.28 3.4 12.36 8.55 17.04L10 18.35L11.45 17.03C16.6 12.36 20 9.28 20 5.5C20 2.42 17.58 0 14.5 0Z"
                        fill="#D0021B"
                      />
                    </svg>
                  </object>
                  <p
                    class="book__shares-item-text"
                  >
                    Перейти
                  </p>
                </a>
                <a
                  href="javascript:void(0);"
                  class="book__shares-item share"
                >
                  <object class="book__shares-item-icon">
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15 14.08C14.24 14.08 13.56 14.38 13.04 14.85L5.91 10.7C5.96 10.47 6 10.24 6 10C6 9.76 5.96 9.53 5.91 9.3L12.96 5.19C13.5 5.69 14.21 6 15 6C16.66 6 18 4.66 18 3C18 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 3.24 12.04 3.47 12.09 3.7L5.04 7.81C4.5 7.31 3.79 7 3 7C1.34 7 0 8.34 0 10C0 11.66 1.34 13 3 13C3.79 13 4.5 12.69 5.04 12.19L12.16 16.35C12.11 16.56 12.08 16.78 12.08 17C12.08 18.61 13.39 19.92 15 19.92C16.61 19.92 17.92 18.61 17.92 17C17.92 15.39 16.61 14.08 15 14.08Z"
                        fill="#C7CAD2"
                      />
                    </svg>
                  </object>
                  <p class="book__shares-item-text">
                    Поделиться
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div class="book__desc">
            <h3 class="book__desc-title">
              Описание книги
            </h3>
            <p
              v-if="chosenBook.volumeInfo.description"
              class="book__desc-text"
            >
              {{ chosenBook.volumeInfo.description }}
            </p>
            <p
              v-else
              class="book__desc-text"
            >
              К сожалению, у данной книги не имеется описание...
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { eventBus } from '../main';

export default {
  name: 'Book',
  data() {
    return {
      isShow: true,
      selectedItem: null,
    };
  },
  computed: {
    ...mapGetters(['chosenBook']),
  },
  mounted() {
    this.$store.commit('initStateChosenBook');
    eventBus.$on('open', (data) => {
      this.isShow = data.isShow;
      this.selectedItem = data.selectedItem;
    });
  },
  methods: {
    addBookToSelected(book) {
      this.$store.commit('addBookToSelected', book);
      this.selectedItem = this.chosenBook;
    },
    closeBook() {
      this.isShow = false;
      eventBus.$emit('close', {
        isShow: false,
      });
    },
  },
  filters: {
    filterDate(value) {
      if (!value) return 'Не указана';
      const arr = value.split('-');
      arr.forEach((item) => {
        if (item.length > 2) {
          value = item;
        }
      });
      return value;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .slide-fade-enter-active {
      transition: all .4s ease;
    }
    .slide-fade-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to {
      transform: translateX(-1000px);
    }

  .book-area {
    position: fixed;
    overflow: auto;
    top: 0;
    left: 0;
    bottom: 0;
    width: 55%;
    z-index: 100;
    padding: 59px 50px 0 64px;
    background: #F3F3F3;
  }

  .book {
    max-width: 600px;
    width: 100%;

    &__preview {
      display: flex;
      justify-content: space-between;
    }

    &__info {
      max-width: 377px;
      width: 100%;
    }

    &__title {
      margin-top: 13px;
      font-size: 21px;
      font-weight: 500;
      color: black;
    }

    &__img {
      flex-shrink: 0;
      margin-right: 10px;
      box-shadow: 0px 14px 21px rgba(0, 0, 0, 0.397532);
    }

    &__author,
    &__year {
      margin-top: 16px;
      font-size: 15px;
      color: #7D8888;
    }

    &__year {
      span {
        color: black;
      }
    }

    &__author {
      span {
        color: #417505;
      }
    }

    &__raiting {
      margin-top: 18px;
      max-width: 205px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    &__raiting-text {
      font-size: 15px;
      margin-top: -2px;
      color: #7D8888;

      span {
        color: black;
      }
    }

    &__shares {
      margin-top: 36px;
      max-width: 240px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    &__shares-item {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #C7CAD2;


      &.chosen {
        path {
          fill: #D0021B;
        }
      }

      path {
        fill: #C7CAD2;
        stroke: inherit;
      }

      &:hover {
        .book__shares-item-text {
          color: #417505;
          text-decoration: underline;
        }
      }

      &.share:hover {
        path {
          fill: black;
        }
      }
    }

    &__shares-item-icon,
    &__shares-item-text {
      transition: all .3s ease;
    }

    &__shares-item-text {
      margin-top: -3px;
      margin-left: 10px;
      font-size: 13px;
      color: #C7CAD2;
      text-decoration: none;
    }

    &__desc {
      margin-top: 91px;
      margin-bottom: 114px;
    }

    &__desc-title {
      font-size: 19px;
      font-weight: 500;
    }

    &__desc-text {
      margin-top: 16px;
      font-size: 15px;
      line-height: 1.6;
    }
  }

  .prev-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    font-size: 16px;
    font-weight: 700;
    background: rgba(0, 0, 0, .6);
    display: none;
    padding: 14px 0 14px 20px;

    &__author {
      position: absolute;
      right: 20px;
      color: #413f3f;
      font-size: 12px;
      top: 18px;
    }

  }

  @media only screen and (max-width: 940px) {
    .prev-link {
      display: block;
    }

    .book-area {
      width: 100%;
      padding: 0 16px;
    }

    .book {
      margin: 0 auto;

      &__preview {
        display: block;
        padding-top: 50px;
      }

      &__img {
        margin: 0;
        box-shadow: none;
        text-align: center;
      }

      &__author span {
        text-decoration: underline;
      }

      &__desc {
        margin-top: 38px;
        margin-bottom: 30px;
      }
    }
  }
</style>
