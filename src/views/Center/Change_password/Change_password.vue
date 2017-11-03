<template>
  <div class="change_password">
    <p><span>当前密码:</span><el-input v-model="old_password" placeholder="请输入当前密码"></el-input></p>
    <p><span>新密码:</span><el-input v-model="new_password1" placeholder="请输入新密码"></el-input></p>
    <p><span>确认新密码:</span><el-input v-model="new_password2" placeholder="请确认新密码"></el-input></p>
    <el-button type="primary">确认</el-button>
    <el-button>取消</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      old_password:null,
      new_password1:null,
      new_password2:null
    }
  }
}
</script>
<style lang="scss">
.change_password{
    width: 400px;
    margin: 60px auto;
    .el-input{
      margin: 10px 0;
    }
}
</style>
