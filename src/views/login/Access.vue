<template>
  <div>
    <template v-if="username">
      <div @mouseover='overcenter' @mouseout="toleave" class="welcome">
        <p>欢迎您！{{username}}</p>
        <transition name="fade">
          <div v-if="showOrhide" class="logout">
            <ul>
              <li @click="goCenter">个人中心</li>
              <li @click='logout'>退出登录</li>
            </ul>
          </div>
        </transition>
      </div>
    </template>
    <template v-else>
      <p><span class="link" @click.stop="handleClick('login')">会员登录</span><span class="split">|</span><span class="link" @click.stop="handleClick('register')">注册</span></p>
    </template>
  </div>
</template>
<script>
import cookie from "@/util/cookie";
import { mapGetters ,mapMutations } from "vuex";
export default {
  data() {
    return {
      // usernameStatus: cookie.getCookie("username"),
      // username: this.cookie,
      showOrhide:false
    };
  },
  created () {
    console.log('created',this.username);
  },
  methods: {
    ...mapMutations({
      setcookie:'SET_USERNAME'
    }),
    handleClick(path) {
      this.$router.push({ name: path });
    },
    overcenter() {
      this.showOrhide = true;
      clearTimeout(this.timer)
    },
    goCenter() {
      this.$router.push('/center')
    },
    toleave() {
      this.timer = setTimeout(() => {
        this.showOrhide = false;
      },500)
    },
    logout() {
      this.showOrhide = false;
      this.$cookie.delete('username')
      this.setcookie('')
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters(["username"])
  }
};
</script>
<style scoped>
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
.welcome{
  position: relative;
}
.welcome .logout{
  position: absolute;
  z-index: 9999;
  top:26px;
  left:10px;
  background-color: #f9f9f9;
  width: 100px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #f1f1f1;
  box-shadow: 0 0 4px #f1f1f1;
}
.welcome .logout::before{
  content:'';
  display: inline-block;
  width: 0;
  height: 0;
  border: 8px solid #f1f1f1;
  border-color: transparent transparent #f1f1f1 transparent;
  position: absolute;
  top: -16px;
  left: 50%;
  transform:translateX(-50%)
}
.welcome .logout li{
  padding: 10px;
  cursor: pointer;
  user-select: none;
}
.welcome .logout li:hover{
  background-color: #f1f1f1;
}
.welcome .logout li:active{
  background-color: #e9e9e9;
}
/* 动画开始 */
.fade-enter-active,.fade-leave-active{
  transition: all 0.3s cubic-bezier(1,.01,1,.63);
}
.fade-enter,.fade-leave-to{
  opacity: 0;
}
.split {
  padding: 0 15px;
  font-size: 16px;
}
.link {
  cursor: pointer;
  font-size: 15px;
  color: #48576a;
}
.link:hover {
  color: #f7ba2a;
}
p:hover {
  cursor: pointer;
}

</style>
