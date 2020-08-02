<template>
  <div>
    <ul @click="onPagerClick" class="el-pager">
      <li
        :class="{ active: currentPage === startPage, disabled }"
        v-if="pageCount > 0"
        class="number"
      >
        {{ startPage }}
      </li>
      <li
        class="el-icon more btn-quickprev"
        :class="[quickprevIconClass, { disabled }]"
        v-if="showPrevMore"
        @mouseenter="onMouseenter('left')"
        @mouseleave="quickprevIconClass = 'el-icon-more'"
      ></li>
      <li
        v-for="pager in pagers"
        :key="pager"
        :class="{ active: currentPage === pager, disabled }"
        class="number"
      >
        {{ pager }}
      </li>
      <li
        class="el-icon more btn-quicknext"
        :class="[quicknextIconClass, { disabled }]"
        v-if="showNextMore"
        @mouseenter="onMouseenter('right')"
        @mouseleave="quicknextIconClass = 'el-icon-more'"
      ></li>
      <li
        :class="{ active: currentPage === endPage, disabled }"
        class="number"
        v-if="pageCount > 1"
      >
        {{ endPage }}
      </li>
    </ul>
  </div>
</template>

<script type="text/babel">
export default {
  name: "ElPager",

  props: {
    currentPage: Number,
    pageCount: Number,
    pagerCount: Number,
    disabled: Boolean,
    total: Number,
    options: Array,
    startPage: Number,
    nowZu: Number
  },

  watch: {
    showPrevMore(val) {
      if (!val) this.quickprevIconClass = "el-icon-more";
    },
    currentPage(val) {
      console.log(val);
      console.log(this.pagers);
    },
    showNextMore(val) {
      if (!val) this.quicknextIconClass = "el-icon-more";
    }
  },

  methods: {
    onPagerClick(event) {
      const target = event.target;
      if (target.tagName === "UL" || this.disabled) {
        return;
      }

      let newPage = Number(event.target.textContent);
      const pageCount = this.pageCount;
      const currentPage = this.currentPage;
      const pagerCountOffset = this.pagerCount - 2;

      if (target.className.indexOf("more") !== -1) {
        if (target.className.indexOf("quickprev") !== -1) {
          newPage = currentPage - pagerCountOffset;
        } else if (target.className.indexOf("quicknext") !== -1) {
          newPage = currentPage + pagerCountOffset;
        }
      }

      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }

        if (newPage > pageCount) {
          newPage = pageCount;
        }
      }
      console.log("newPage" + newPage);
      if (newPage !== currentPage) {
        this.$emit("change", newPage);
      }
    },

    onMouseenter(direction) {
      if (this.disabled) return;
      if (direction === "left") {
        this.quickprevIconClass = "el-icon-d-arrow-left";
      } else {
        this.quicknextIconClass = "el-icon-d-arrow-right";
      }
    }
  },

  computed: {
    endPage() {
      return (this.$parent.nowZu + 1) * this.$parent.pageCount;
    },
    pagers() {
      const pagerCount = this.pagerCount;
      const halfPagerCount = (pagerCount - 1) / 2;

      const currentPage = Number(this.currentPage);
      // const currentPage = Number(
      //   this.$parent.newZu * this.$parent.zushu + this.currentPage
      // );
      const pageCount = Number(this.pageCount);

      let showPrevMore = false;
      let showNextMore = false;

      console.log("pageCount" + pageCount);
      console.log("currentPage" + currentPage);
console.log("endPage" + this.endPage);
      if (pageCount > pagerCount) {
        if (currentPage > this.pagerCount - halfPagerCount) {
          showPrevMore = true;
        }

        if (currentPage < this.pagerCount - halfPagerCount) {
          showNextMore = true;
        }
      }

      const array = [];
      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2);
        for (let i = startPage; i < pageCount; i++) {
          array.push(Number(this.$parent.nowZu * this.$parent.pageCount + i));
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(Number(this.$parent.nowZu * this.$parent.pageCount + i));
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(Number(this.$parent.nowZu * this.$parent.pageCount + i));
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(Number(this.$parent.nowZu * this.$parent.pageCount + i));
        }
      }

      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;
      console.log(array);
      return array;
    }
  },
  data() {
    return {
      current: null,
      showPrevMore: false,
      showNextMore: false,
      quicknextIconClass: "el-icon-more",
      quickprevIconClass: "el-icon-more"
    };
  }
};
</script>
