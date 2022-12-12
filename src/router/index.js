import { createRouter, createWebHashHistory } from 'vue-router'
import LoginForm from '@/components/login/LoginForm.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/regist',
      name: 'regist',
      component: ()=> import ('@/components/login/RegistForm.vue')
    },
    {
      path: '/findPassword',
      name: 'findPassword',
      component: ()=> import ('@/components/login/FindPassword.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: ()=> import ('@/components/note/MainView.vue')
    },
  ]
})

export default router
