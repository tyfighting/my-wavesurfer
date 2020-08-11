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
    nowZu: Number,
  },

  watch: {
    showPrevMore(val) {
      if (!val) this.quickprevIconClass = "el-icon-more";
    },
    showNextMore(val) {
      if (!val) this.quicknextIconClass = "el-icon-more";
    },
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

      console.log("newPage" + newPage);
      console.log("pageCount" + pageCount);
      console.log("currentPage" + currentPage);
      console.log("pagerCountOffset" + pagerCountOffset);
      if (target.className.indexOf("more") !== -1) {
        console.log(1);
        if (target.className.indexOf("quickprev") !== -1) {
          console.log(2);
          newPage = currentPage - pagerCountOffset;
          // const pageCount = Number(this.pageCount);
        } else if (target.className.indexOf("quicknext") !== -1) {
          console.log(3);
          newPage = currentPage + pagerCountOffset;
        }
      }

      console.log(newPage, pageCount, currentPage, pagerCountOffset);

      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }

        if (newPage > pageCount + this.$parent.nowZu * this.$parent.pageCount) {
          newPage = pageCount+ this.$parent.nowZu * this.$parent.pageCount;
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
    },
  },

  computed: {
    endPage() {
      return (this.$parent.nowZu + 1) * this.$parent.pageCount;
    },
    pagers() {
      const pagerCount = this.pagerCount;
      const halfPagerCount = (pagerCount - 1) / 2;

      const currentPage = Number(this.currentPage);
      const pageCount = Number(this.pageCount);

      let showPrevMore = false;
      let showNextMore = false;

      // console.log("pageCount" + pageCount);
      console.log("currentPage" + currentPage);
      // console.log("pagerCount" + pagerCount);

      if (pageCount > pagerCount) {
        const descPrev =
          this.pagerCount +
          this.$parent.nowZu * this.$parent.pageCount -
          halfPagerCount;
        const descNext =
          pageCount -
          halfPagerCount +
          this.$parent.nowZu * this.$parent.pageCount;
        if (currentPage > descPrev) {
          showPrevMore = true;
        }
        if (currentPage < descNext) {
          showNextMore = true;
        }
      }

      let array = [];
      console.log(showPrevMore, showNextMore);
      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2);
        for (let i = startPage; i < pageCount; i++) {
          array.push(
            Number(this.$parent.nowZu * this.$parent.pageCount + i)
          );
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(
            Number(this.$parent.nowZu * this.$parent.pageCount + i)
          );
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(
            Number(this.$parent.nowZu * this.$parent.pageCount + i)
          );
        }
      }

      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;
      // console.log(array);
      // array = array.map((item) => {
      //   return Number(this.$parent.nowZu * this.$parent.pageCount + item);
      // });

      console.log(array);
      return array;
    },
  },
  data() {
    return {
      current: null,
      showPrevMore: false,
      showNextMore: false,
      quicknextIconClass: "el-icon-more",
      quickprevIconClass: "el-icon-more",
    };
  },
};
</script>
