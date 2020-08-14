<template>
  <div>
    <ul @click="onPagerClick" class="el-pager">
      <li
        :class="{ active: currentPage === startPage, disabled }"
        v-if="groupCount > 0"
        class="number"
      >
        {{ startPage }}
      </li>
      <li
        class="el-icon more btn-quickprev"
        :class="[quickprevIconClass, { disabled }]"
        v-if="showPrevMore && endPage !== startPage"
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
        v-if="showNextMore && endPage !== startPage"
        @mouseenter="onMouseenter('right')"
        @mouseleave="quicknextIconClass = 'el-icon-more'"
      ></li>
      <li
        :class="{ active: currentPage === endPage, disabled }"
        class="number"
        v-if="groupCount > 1 && endPage !== startPage"
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
    groupCount: Number,
    pagerCount: Number,
    disabled: Boolean,
    total: Number,
    options: Array,
    startPage: Number,
    currentGroup: Number,
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
      const groupCount = this.groupCount;
      const currentPage = this.currentPage;
      const pagerCountOffset = this.pagerCount - 2;

      console.log("newPage" + newPage);
      console.log("groupCount" + groupCount);
      console.log("currentPage" + currentPage);
      console.log("pagerCountOffset" + pagerCountOffset);
      if (target.className.indexOf("more") !== -1) {
        console.log(1);
        if (target.className.indexOf("quickprev") !== -1) {
          console.log(2);
          newPage = currentPage - pagerCountOffset;
          // const groupCount = Number(this.groupCount);
        } else if (target.className.indexOf("quicknext") !== -1) {
          console.log(3);
          newPage = currentPage + pagerCountOffset;
        }
      }

      console.log(newPage, groupCount, currentPage, pagerCountOffset);

      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }

        if (
          newPage >
          groupCount + this.$parent.currentGroup * this.$parent.groupCount
        ) {
          newPage =
            groupCount + this.$parent.currentGroup * this.$parent.groupCount;
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
      let totalPage = 1;
      if (this.$parent.totalNum > this.$parent.value) {
        totalPage = Math.ceil(this.$parent.totalNum / this.$parent.value);
      }
      let end = (this.$parent.currentGroup + 1) * this.groupCount;
      end = totalPage < end ? totalPage : end;
      return end;
    },
    pagers() {
      const pagerCount = this.pagerCount;
      const halfPagerCount = (pagerCount - 1) / 2;

      const currentPage = Number(this.currentPage);
      let groupCount = Number(this.groupCount);
      // cosnt totalGroup=
      if (this.$parent.totalGroup - 1 === this.$parent.currentGroup) {
        if (this.endPage % this.groupCount !== 0) {
          groupCount = this.endPage % this.groupCount;
        }
      }
      let showPrevMore = false;
      let showNextMore = false;

      // console.log("groupCount" + groupCount);
      console.log("currentPage" + currentPage);
      // console.log("pagerCount" + pagerCount);

      if (groupCount > pagerCount) {
        const descPrev =
          this.pagerCount +
          this.$parent.currentGroup * this.$parent.groupCount -
          halfPagerCount;
        const descNext =
          groupCount -
          halfPagerCount +
          this.$parent.currentGroup * this.$parent.groupCount;
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
        const startPage = groupCount - (pagerCount - 2);
        for (let i = startPage; i < groupCount; i++) {
          array.push(
            Number(this.$parent.currentGroup * this.$parent.groupCount + i)
          );
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(
            Number(this.$parent.currentGroup * this.$parent.groupCount + i)
          );
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < groupCount; i++) {
          array.push(
            Number(this.$parent.currentGroup * this.$parent.groupCount + i)
          );
        }
      }

      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;
      // console.log(array);
      // array = array.map((item) => {
      //   return Number(this.$parent.currentGroup * this.$parent.groupCount + item);
      // });

      if (this.endPage === this.startPage) {
        array = [];
      }
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
