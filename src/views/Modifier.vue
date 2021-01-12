<template>
  <div class="modifier">
    <div class="green-yellow " v-on:click="doThis($event, 1)">
      <a v-on:click="doThis($event, 2)">doThis</a>
    </div>
    <div class="hotpink" v-on:click="doThisStop($event, 1)">
      <a v-on:click.stop="doThisStop($event, 2)">doThisStop</a>
    </div>
    <div>
      <form action="form_action.asp" method="post">
        <p>
          First name:
          <input type="text" name="fname" />
        </p>
        <p>
          Last name:
          <input type="text" name="lname" />
        </p>
        <el-button v-on:submit="onSubmit">onSubmit</el-button>
        <el-button v-on:submit="onSubmitPrevent">onSubmitPrevent</el-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "modifier",
  methods: {
    //事件冒泡，用stop修饰符阻止，我们平时都是默认冒泡的，冒泡是一直冒到document根文档为止。
    // 如果元素被阻止冒泡了，千万别去用事件委托的方式监听事件，因为事件委托的原理是利用事件冒泡，当冒泡被阻止，就无法监听了。
    doThis(e, index) {
      console.log("doThis", e.target, index);
      //  doThis <a data-v-0f6f5191>​doThis​</a>​ 2
      //  doThis <a data-v-0f6f5191>​doThis​</a>​ 1
      //  doThis <a data-v-0f6f5191>​doThis​</a>​ 0
    },
    doThisStop(e, index) {
      console.log("doThisStop", e.target, index);
      //  doThisStop <a data-v-0f6f5191>​doThisStop​</a>​ 2
    },
    onSubmit() {
      console.log("onSubmit");
    },
    onSubmitPrevent() {
      console.log("onSubmitPrevent");
    },
  },
};
</script>
<style lang="scss" scoped>
.green-yellow {
  background: greenyellow;
  margin: 10px 0;
}
.hotpink {
  background: hotpink;
}
</style>
