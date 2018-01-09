<template>
<div class="bill_look">
  <header class="is-flex ali-center header">
    <h4>账单查看</h4>
  </header>
</div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@mixin header {
  height: 61px;
  align-items: center;
  padding-left: 20px;
  color: #b3b3b3;
  h4 {
    font-weight: normal;
  }
}
.header {
  @include header;
}
</style>
