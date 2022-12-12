<template>
  <RouterView />
</template>

<script>
import LoginForm from '@/components/login/loginForm.vue'
import RegistForm from '@/components/login/RegistForm.vue'

export default{
  components:{
    LoginForm,RegistForm
  }
}
</script>

<style scoped>

</style>
