<template>
  <div class="pagination-index">
    <nav aria-label="page navigation">
      <ul class="pagination">
        <li class="page-item">
          <a
            @click="changePage(1)"
            class="page-link pagination-firstpage"
            v-if="pagination.currentPage > 1">
            First Page
          </a>
        </li>
        <li class="page-item">
          <a
            @click="changePage(pagination.currentPage - 1)"
            class="page-link pagination-previous"
            v-if="pagination.currentPage > 1">
            Previous
          </a>
        </li>
        <li class="page-item" v-for="(page, index) in displayPages" :key="index">
          <a
            @click="changePage(page)"
            class="page-link">
            {{ page }}
          </a>
        </li>
        <li class="page-item">
          <a
            @click="changePage(pagination.currentPage + 1)"
            class="page-link pagination-next"
            v-if="pagination.currentPage < pagination.lastPage">
            Next
          </a>
        </li>
        <li class="page-item">
          <a
            @click="changePage(pagination.lastPage)"
            class="page-link pagination-lastpage"
            v-if="pagination.currentPage < pagination.lastPage">
            Last Page
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'pagination-index',
  props: ['pagination'],
  data() {
    return {
      pages: [],
    };
  },
  methods: {
    changePage(page) {
      this.$router.push(this.pagination.routerUrl + page);
    },
  },
  computed: {
    displayPages() {
      let from = this.pagination.currentPage - 2;

      if (from < 1) {
        from = 1;
      }

      let to = from + 4;

      if (to > this.pagination.lastPage) {
        to = this.pagination.lastPage;
      }

      while (from <= to) {
        for (let i = 0; i < 5; i++) {
          this.pages[i] = from;
          from++;
        }
      }
      return this.pages;
    },
  },
};
</script>
