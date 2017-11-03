<template>
  <el-menu :default-active="defaultactive" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <template v-for="mn in menu">
      <template v-if="!mn.children">
        <el-menu-item :index="mn.view">{{mn.title}}</el-menu-item>
      </template>
      <template v-else-if="mn.children && !mn.next">
        <el-submenu :index="mn.view">
          <template slot="title">{{mn.title}}</template>
          <template v-for="chd in mn.children">
            <el-menu-item :index="chd.view">{{chd.title}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-else-if="mn.children && mn.next">
        <el-submenu :index="mn.view">
          <template slot="title">{{mn.title}}</template>
          <template v-for="chd in mn.children">
            <my-el-menu-item-group :title="chd.title" :index="chd.view">
              <template v-for="chdp in chd.children">
                <el-menu-item :index="chdp.view">{{chdp.title}}</el-menu-item>
              </template>
            </my-el-menu-item-group>
          </template>
        </el-submenu>
      </template>
    </template>
  </el-menu>
</template>
<script>
  import ElMenuItemGroup from "../../node_modules/element-ui/packages/menu/src/menu-item-group";
  import MyElMenuItemGroup from '@/components/MyElMenuItemGroup'
  import menu from '@/menu'
  export default {
    components: {ElMenuItemGroup, MyElMenuItemGroup},
    name: 'menu',
    data (){
      return {
        menu: menu,
        defaultactive: "home"
      }
    },
    mounted(){
      // console.log(this.$route)
      this.defaultactive = this.$route.matched[0].name || 'home';
    },
    methods: {
      handleSelect(key, keyPath){
      //  console.log(key, keyPath);
       if(key == 'about/company') {
         window.location.href = 'http://yzj.sibat.cn/yzj/'
       }
        this.go(key);
      },
      go(target){
        this.$router.push({name: target});
      }
    },
    watch: {
      $route(){
        this.defaultactive = this.$route.matched[0].name;
      }
    }
  }
</script>
