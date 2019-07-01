<template>
  <div id="selected">
    <div class="desc-part">
      <h1 class="desc-part__title">
        Библиотека
      </h1>
      <Book />
    </div>
    <div class="search-part">
      <div
        class="search-part__content selected-books"
      >
        <h2 class="selected-books__title">
          <a
            href="/#/"
            class="selected-books__prev-icon"
          >
            <object>
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
                  fill="#4B5959"
                />
              </svg>
            </object>
          </a>
          <span>Избранное</span>
        </h2>
        <Books type="selectedBooks" />
      </div>
    </div>
  </div>
</template>

<script>
import Books from '../components/Books.vue';
import Book from '../components/Book.vue';

export default {
  name: 'Selected',
  components: {
    Books,
    Book,
  },
};
</script>
<style scoped lang="scss">
  .selected-books__prev-icon {
    background: #F3F3F3;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    position: relative;
  }

  .selected-books__prev-icon,
  .selected-books__title span {
    display: inline-block;
    vertical-align: middle;
  }

  .selected-books__prev-icon object {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .selected-books__title {
    margin-bottom: 53px;

    span {
      margin-left: 12px;
      font-size: 21px;
      font-weight: 500;
    }
  }

  @media only screen and (max-width: 940px) {
    .selected-books__title {
      margin: 0 -15px;
      background: #F3F3F3;
      padding: 10px 0 8px 0;
    }
  }

</style>
