<template>

<div class="login_wrapper">
  <form>
    Username: <input type="text" v-model="username"><br>
    Password: <input type="password" v-model="password"><br>
    <router-link :to="{name: 'Posts'}">
      <button class="register_post_btn" @click="register">Sign up</button>
    </router-link>
  </form>

</div>

</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'Register',
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
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>

</style>
