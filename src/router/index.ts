

import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login' // Redirect to login
  },
  {
    path: '/home',
    component: () => import('@/views/HomePage.vue') // Page for user input
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue') // Page for user input
  },
  {
    path: '/send-otp',
    component: () => import('@/views/OtpPage.vue') // Page for OTP
  },
  {
    path: '/onboarding',
    component: () => import('@/views/OnboardingPage.vue') // Page for OTP
  },
  {
    path: '/choice',
    component: () => import('@/views/ChoicePage.vue') // Page with Box A and Box B
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardPage.vue') // Page for Box A
  },
  {
    path: '/boxB',
    component: () => import('@/views/ParentPage.vue') // Page for Box B
  },
  {
    path: '/scale/:id',
    name: 'Questions',
    component: () => import('@/views/QuestionPage.vue') // Page for Box A
  },
// add child and parent dashboard routes
  {
    path: '/child-dashboard',
    name: 'ChildDashboard',
    component: () => import('@/views/ChildDashboardPage.vue') // Child Dashboard Page
  },
  { 
    path: '/parent-dashboard',
    name: 'ParentDashboard',
    component: () => import('@/views/ParentDashboardPage.vue') // Parent Dashboard Page
  },
  {
    path: '/growth',
    name: 'Growth',
    component: () => import('@/views/GrowthPage.vue') // Growth Page
  },
  {
    path: '/ai-chat',
    name: 'AIChat',
    component: () => import('@/views/AIChat.vue') // AI Chat Page
  },
  {
    path: '/activity/balloon',
    name: 'BalloonActivity',
    component: () => import('@/views/MagicBalloonActivity.vue') // Balloon Activity Page
  },
  {
    path: '/activity/five-fingers',
    name: 'FiveFingersActivity',
    component: () => import('@/views/FiveFingersActivity.vue') // Five Fingers Activity Page
  },
  {
    path: '/activity/memory-master',
    name: 'MemoryMasterGame',
    component: () => import('@/views/MemoryMasterGame.vue') // Memory Master Activity Page
  },
  {
    path: '/counseling',
    name: 'Counseling',
    component: () => import('@/views/CounselingPage.vue') // Counseling Page
  }
];

export const routeList: Array<RouteRecordRaw> = routes; // your existing routes


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeList
});

router.beforeEach((to, from, next) => {
  const apiToken = localStorage.getItem('api_token'); // Check for an existing API token
  const phoneNumber = localStorage.getItem('phoneNumber'); // Check if phone number exists
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;


  // Case 1: User has API token, redirect `/login` or `/send-otp` to dashboard
  if (apiToken) {
    if (!user?.is_onboarded && to.path !== '/onboarding') {
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

if (to.path === '/dashboard') {
  const profile = localStorage.getItem('selectedProfile');
  const childName = localStorage.getItem('childName');
  const parentName = localStorage.getItem('parentName');

  if (profile === 'child') {
    return next({
      name: 'ChildDashboard',
      query: { name: childName || '' }
    });
  }

  if (profile === 'parent') {
    return next({
      name: 'ParentDashboard',
      query: { name: parentName || '' }
    });
  }

  return next(); // no profile selected
}

 
});
export default router;

