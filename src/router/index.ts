import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('@/views/Main.vue') // Page for user input
  },
  {
    path: '/choice',
    component: () => import('@/views/ChoicePage.vue') // Page with Box A and Box B
  },
  {
    path: '/boxA',
    component: () => import('@/views/Child.vue') // Page for Box A
  },
  {
    path: '/boxB',
    component: () => import('@/views/Parent.vue') // Page for Box B
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;

