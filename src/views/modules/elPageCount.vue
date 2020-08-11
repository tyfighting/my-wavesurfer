<template>
  <div>
    <ul @click="onPagerClick" class="el-pager">
      <li
        :class="{ active: currentPage1 === startPage1, disabled }"
        v-if="pageCount1 > 0"
        class="number"
      >
        {{ startPage1 }}
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
        :class="{ active: currentPage1 === pager, disabled }"
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
        :class="{ active: currentPage1 === endPage, disabled }"
        class="number"
        v-if="pageCount1 > 1"
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
    currentPage1: Number,
    pageCount1: Number,
    pagerCount: Number,
    disabled: Boolean,
    total: Number,
    options: Array,
    startPage1: Number,
    nowZu1: Number,
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
      const pageCount1 = this.pageCount1;
      const currentPage1 = this.currentPage1;
      const pagerCountOffset = this.pagerCount - 2;

      console.log("newPage" + newPage);
      console.log("pageCount1" + pageCount1);
      console.log("currentPage1" + currentPage1);
      console.log("pagerCountOffset" + pagerCountOffset);
      if (target.className.indexOf("more") !== -1) {
        console.log(1);
        if (target.className.indexOf("quickprev") !== -1) {
          console.log(2);
          newPage = currentPage1 - pagerCountOffset;
          // const pageCount1 = Number(this.pageCount1);
        } else if (target.className.indexOf("quicknext") !== -1) {
          console.log(3);
          newPage = currentPage1 + pagerCountOffset;
        }
      }

      console.log(newPage, pageCount1, currentPage1, pagerCountOffset);

      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }

        if (newPage > pageCount1 + this.$parent.nowZu1 * this.$parent.pageCount1) {
          newPage = pageCount1+ this.$parent.nowZu1 * this.$parent.pageCount1;
        }
      }
      console.log("newPage" + newPage);
      if (newPage !== currentPage1) {
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
      return (this.$parent.nowZu1 + 1) * this.$parent.pageCount1;
    },
    pagers() {
      const pagerCount = this.pagerCount;
      const halfPagerCount = (pagerCount - 1) / 2;

      const currentPage1 = Number(this.currentPage1);
      const pageCount1 = Number(this.pageCount1);

      let showPrevMore = false;
      let showNextMore = false;

      // console.log("pageCount1" + pageCount1);
      console.log("currentPage1" + currentPage1);
      // console.log("pagerCount" + pagerCount);

      if (pageCount1 > pagerCount) {
        const descPrev =
          this.pagerCount +
          this.$parent.nowZu1 * this.$parent.pageCount1 -
          halfPagerCount;
        const descNext =
          pageCount1 -
          halfPagerCount +
          this.$parent.nowZu1 * this.$parent.pageCount1;
        if (currentPage1 > descPrev) {
          showPrevMore = true;
        }
        if (currentPage1 < descNext) {
          showNextMore = true;
        }
      }

      let array = [];
      console.log(showPrevMore, showNextMore);
      if (showPrevMore && !showNextMore) {
        const startPage1 = pageCount1 - (pagerCount - 2);
        for (let i = startPage1; i < pageCount1; i++) {
          array.push(
            Number(this.$parent.nowZu1 * this.$parent.pageCount1 + i)
          );
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(
            Number(this.$parent.nowZu1 * this.$parent.pageCount1 + i)
          );
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage1 - offset; i <= currentPage1 + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < pageCount1; i++) {
          array.push(
            Number(this.$parent.nowZu1 * this.$parent.pageCount1 + i)
          );
        }
      }

      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;
      // console.log(array);
      // array = array.map((item) => {
      //   return Number(this.$parent.nowZu1 * this.$parent.pageCount1 + item);
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
