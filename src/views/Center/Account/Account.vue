<template>
  <div class="account">
    <div class="avatar-container">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <div class="info">
      <p class="username"><span>用户名</span><span>zhangsan</span></p>
      <p class="password"><span>密码</span><span><el-button @click="changepassword">修改密码</el-button></span></p>
      <p class="phone"><span>手机</span><span>131643135431</span></p>
    </div>
    <div class="info">
      <p class="account-type"><span>账号类别</span><span>货主(企业)</span></p>
      <p class="account-level"><span>账号级别</span><span>主账号</span></p>
      <p class="email"><span>油箱</span><span>zhangsan@QQ.com</span></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3289761550,697278018&fm=27&gp=0.jpg"
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    changepassword() {
      this.$router.push('/center/change_password')
    }
  }
};
</script>
<style lang="scss">
.account{
  display: flex;
  padding:100px 50px 0;
  >div{
    flex: 1
  }
  .avatar-container{
    text-align: center;
    .avatar{
      width: 100px;
      height: 100px;
      display: inline-block;
      margin-bottom: 20px;
    }
  }
  .info{
    p{
      display: block;
      padding: 10px 20px;
      margin: 0;
      height: 40px;
      line-height: 40px;
      >span{
        display: inline-block;
        width: 50%;
        .el-button{
          text-align: center;
        }
        &:nth-of-type(2){
          color: gray;
        }
      }
      &:first-child{
        padding-top: 0;
      }
      &:last-child{
        padding-bottom: 0;
      }
    }
  }
}
</style>
