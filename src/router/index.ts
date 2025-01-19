import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue') // Page for user input
  },
  {
    path: '/send-otp',
    component: () => import('@/views/Otp.vue') // Page for OTP
  },
  {
    path: '/onboarding',
    component: () => import('@/views/Onboarding.vue') // Page for OTP
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
  },
  {
    path: '/quizA',
    component: () => import('@/views/Question.vue') // Page for Box A
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const apiToken = localStorage.getItem('api_token'); // Check for an existing API token
  const phoneNumber = localStorage.getItem('phoneNumber'); // Check if phone number exists
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;


  // Case 1: User has API token, redirect `/login` or `/send-otp` to dashboard
  if (apiToken) {
    if (!user?.is_onboarded) {
      next('/onboarding'); // Redirect to onboarding if not onboarded
    } else if (to.path === '/login' || to.path === '/send-otp') {
      next('/choice'); // Redirect logged-in users to dashboard
    } else {
      next(); // Allow other routes
    }
  } 
  // Case 2: User does not have API token but has provided a phone number, send to OTP page
  else if (!apiToken && phoneNumber) {
    if (to.path !== '/send-otp') {
      next('/send-otp'); // Redirect to OTP page
    } else {
      next(); // Allow access to the OTP page
    }
  }
  // Case 3: User does not have an API token or phone number, redirect to login
  else {
    if (to.path !== '/login') {
      next('/login'); // Redirect to login page
    } else {
      next(); // Allow access to the login page
    }
  }
});
export default router;

