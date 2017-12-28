import {mapMutations} from 'vuex'

export const logout = {
  methods:{
    ...mapMutations({
      setUsertype:'SET_USERTYPE',
      setToken:'SET_TOKEN',
      setUsername:'SET_USERNAME',
      setId:'SET_ID'
    }),
    logout() {
      this.$cookie.delete('username')
      this.setUsername('')
      this.setUsertype('')
      this.setToken('')
      this.setId('')
      this.$router.push('/login')
    }
  }
}
