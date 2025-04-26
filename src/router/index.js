import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PersonalInfo from '@/components/PersonalInfo.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/personal-info', name: 'PersonalInfo', component: PersonalInfo },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
