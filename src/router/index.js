import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import CrudView from '../views/CrudView.vue';
import { useAuth } from '../composables/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'crud',
      component: CrudView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to) => {
  const { isAuthenticated } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticated.value && to.name !== 'login') {
    return { name: 'login' };
  }
  if (isAuthenticated.value && to.name === 'login') {
    return { name: 'home' };
  }
});

export default router;