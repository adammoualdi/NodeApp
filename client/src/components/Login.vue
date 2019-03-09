<template>

<div class="login_wrapper">
  <form>
    Username: <input type="text" v-model="username"><br>
    Password: <input type="password" v-model="password"><br>
    <router-link :to="{name: 'Posts'}">
      <button class="login_post_btn" @click="register">Login</button>
    </router-link>
  </form>

</div>

</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'Login',
  data () {
    return {
    // username: '',
    // password: ''
    }
  },
  methods: {
    async register () {
      await PostsService.register({
        username: this.username,
        password: this.password
      })
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>

<style lang="styl" scoped>
  /* @import '~styl/style.css' */
  @import '../assets/css/style.css'
</style>
