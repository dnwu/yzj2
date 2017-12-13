<template>
  <div class="select-box">
    <img :src=select?icon1:icon class="detail-img" @click="productChange">
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        select: false,
        icon: require('../../../assets/product9.png'),
        icon1: require('../../../assets/product8.png')
      }
    },
    methods: {
      productChange () {
        this.select = !this.select
        if (this.select) {
          this.$emit('increment', true)
        } else {
          this.$emit('increment', false)
        }
      }
    }
  }
</script> 

<style lang="scss" scoped>
</style>