<template>
  <div>
    <div class="pagination">
      <div
        v-if="hasPrev()"
        class="pagination__left"
      >
        <a
          href=""
          @click.prevent="changePage(prevPage)"
        >
          <object>
            <svg
              width="2"
              height="5"
              viewBox="0 0 2 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5L2 3.53179L0.999244 2.5L2 1.55076L2 0L0 2V3.08424L2 5Z"
                fill="#848E8E"
              />
            </svg>
            <svg
              width="2"
              height="5"
              viewBox="0 0 2 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5L2 3.53179L0.999244 2.5L2 1.55076L2 0L0 2V3.08424L2 5Z"
                fill="#848E8E"
              />
            </svg>
          </object>
        </a>
      </div>
      <div class="pagination__mid">
        <a
          v-if="hasFirst()"
          href="#"
          @click.prevent="changePage(1)"
        ><span>1</span></a>
        <p v-if="hasFirst()">
          ...
        </p>
        <a
          v-for="page in pages"
          href="#"
          :class="{ current: current == page }"
          @click.prevent="changePage(page)"
        >
          <span>{{ page }}</span>
        </a>
        <p v-if="hasLast()">
          ...
        </p>
        <a
          v-if="hasLast()"
          href="#"
          @click.prevent="changePage(totalPages)"
        ><span>{{ totalPages }}</span></a>
      </div>
      <div
        v-if="hasNext()"
        class="pagination__right"
      >
        <a
          href=""
          @click.prevent="changePage(nextPage)"
        >
          <object>
            <svg
              width="2"
              height="5"
              viewBox="0 0 2 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 5L0 3.53179L1.00076 2.5L0 1.55076L0 0L2 2V3.08424L0 5Z"
                fill="#848E8E"
              />
            </svg>
            <svg
              width="2"
              height="5"
              viewBox="0 0 2 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 5L0 3.53179L1.00076 2.5L0 1.55076L0 0L2 2V3.08424L0 5Z"
                fill="#848E8E"
              />
            </svg>
          </object>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Pagination',
  props: {
    type: {
      type: String,
    },
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    pageRange: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    ...mapGetters([
      'configBooks',
    ]),
    query() {
      return this.configBooks(this.type).query;
    },
    pages() {
      const pages = [];

      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i);
      }

      return pages;
    },
    rangeStart() {
      const start = this.current - this.pageRange;

      return (start > 0) ? start : 1;
    },
    rangeEnd() {
      const end = this.current + this.pageRange;

      return (end < this.totalPages) ? end : this.totalPages;
    },
    totalPages() {
      return Math.ceil(this.total / this.perPage);
    },
    nextPage() {
      return this.current + 1;
    },
    prevPage() {
      return this.current - 1;
    },
  },
  methods: {
    hasFirst() {
      return this.rangeStart !== 1;
    },
    hasLast() {
      return this.rangeEnd < this.totalPages;
    },
    hasPrev() {
      return this.current > 1;
    },
    hasNext() {
      return this.current < this.totalPages;
    },
    changePage(page) {
      if (this.type == 'books') {
        if (this.query) {
          const config = {
            title: this.query,
            page,
          };
          this.$store.dispatch('fetchBooks', config);
        }
      } else {
        this.$store.commit('nextSelectedPage', page);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px auto 25px auto;
    height: 36px;

    &__left,
    &__right {
      border-radius: 4px;
      border: 1px solid #CCCCCC;
      width: 36px;
      height: 36px;
      position: relative;
      cursor: pointer;

      a {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        object {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

      }
    }

    &__mid {
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        border: 1px solid #CCCCCC;
        width: 32px;
        height: 36px;
        position: relative;
        cursor: pointer;
        background: transparent;
        transition: all .5s ease;

        &:hover {
          background: #F3F3F3;
        }

        &.current {
          background: #848E8E;
          border-color: #848E8E;

          span {
            color: white;
          }
        }

        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 15px;
          color: #848E8E;
        }
      }
    }

    &__left {
      border-radius: 4px 0px 0px 4px;
    }

    &__right {
      border-radius: 0px 4px 4px 0px;
    }
  }
</style>
