import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: () => import('@/Index.vue'),
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/Dashboard.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/components/NotFound.vue'),
    },
  ],
});

export default router;
