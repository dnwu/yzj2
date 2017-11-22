<template>
  <div class="personal">
    <div class="username">
      <div>用户名</div>
      <div><el-input v-model="username" placeholder="用户名"></el-input></div>
    </div>
    <div class="mobilephone">
      <div>手机号</div>
      <div><el-input v-model="mobilephone" placeholder="手机号"></el-input><el-button type="info">修改</el-button></div>
    </div>
    <div class="Email">
      <div>邮箱</div>
      <div><el-input v-model="Email" placeholder="邮箱"></el-input><el-button type="info">修改</el-button></div>
    </div>
    <div class="account-type">
      <div>账号类型</div>
      <div><el-input v-model="account_type" placeholder="账号类型"></el-input></div>
    </div>
    <div class="account-level">
      <div>账号级别</div>
      <div><el-input v-model="account_level" placeholder="账号级别"></el-input></div>
    </div>
    <div class="telephone">
      <div>固定电话</div>
      <div><el-input v-model="telephone1" placeholder="010"></el-input><el-input v-model="telephone2" placeholder="6666666"></el-input></div>
    </div>
    <div class="clientname">
      <div>客户姓名</div>
      <div><el-input v-model="clientname" placeholder="姓名"></el-input></div>
    </div>
    <div class="identityid">
      <div>身份证号码</div>
      <div><el-input v-model="identityid" placeholder="身份证号"></el-input></div>
    </div>
    <div class="identitypic">
      <div>身份证正反面</div>
      <div>
        <el-input v-model="identitypic" placeholder="选择文件..."></el-input>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <el-button size="medium" type="info">浏览</el-button>
        </el-upload>
      </div>
    </div>
    <div class="address">
      <div>客户地址</div>
      <div><Distpicker @selected="onSelected"></Distpicker></div>
    </div>
    <div class="detailed-address">
      <div>客户详细地址</div>
      <div><el-input v-model="detailed_address" placeholder="长顺路66号"></el-input></div>
    </div>
    <div class="save">
      <el-button type="success">保存</el-button>
    </div>
  </div>
</template>
<script>
import Distpicker from 'v-distpicker'
 export default {
   components:{Distpicker},
    data() {
      return {
        username:'zhangsan',
        mobilephone:'138646435213',
        Email:'12312443124@qq.com',
        account_type:'主账号',
        account_level:'1级',
        telephone1:196,
        telephone2:6666666,
        clientname:'曾阿牛',
        identityid:'4132132135431353123',
        identitypic:'124312.jpg',
        address:{
          province:'',
          city:'',
          area:''
        },
        detailed_address:'长顺路6666号'
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.identitypic = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      onSelected(data) {
        // console.log(data)
        this.address.province = data.province.value
        this.address.city = data.city.value
        this.address.area = data.area.value
      }
    }
  }
</script>
<style lang="scss" scoped>
.personal{
  padding: 30px 100px;

  >div{
    display: flex;
    margin: 20px 0;
    >div{
      &:first-child{
        width: 150px;
        height: 40px;
        text-align: right;
        line-height: 40px;
        padding-right: 20px;
      }
      &:last-child{
        flex: 1;
      }
    }
  }
  .mobilephone,.Email,.identitypic{
    >div{
      &:last-child{
        display: flex;
        .el-button{
          margin-left: 10px;
        }
      }
    }
  }
  .telephone{
    >div{
      &:last-child{
        display: flex;
        .el-input:first-child{
          width: 150px;
          margin-right: 10px;
        }
      }
    }
  }
  .save{
    position: relative;
    .el-button{
      position: absolute;
      left:50%;
      transform: translateX(-50%);
    }
  }
}
</style>
