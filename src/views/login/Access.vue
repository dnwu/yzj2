<template>
  <div>
    <template v-if="username">
      <p @click='tocenter'>欢迎您！{{username}}</p>
    </template>
    <template v-else>
      <p><span class="link" @click.stop="handleClick('login')">会员登录</span><span class="split">|</span><span class="link" @click.stop="handleClick('register')">注册</span></p>
    </template>
  </div>
</template>
<script>
import cookie from "@/util/cookie";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // username: cookie.getCookie("username")
      // username: this.cookie
    };
  },
  methods: {
    handleClick(path) {
      this.$router.push({ name: path });
    },
    tocenter() {
      console.log(1111);
    },
    text() {
      console.log("getter", this.cookie);
    }
  },
  computed: {
    ...mapGetters(["username"])
  }
};
</script>
<style scoped>
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
