import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MenuP from '../views/Project/MenuP.vue'
import TableV from '../views/Project/TableV.vue'
import TableC from '../views/Project/TableC.vue'
import RegisterV from '../views/Project/RegisterV.vue'
import RegisterT from '../views/Project/RegisterT.vue'
import MenuE from '../views/Stock/MenuE.vue'
import RegisterE from '../views/Stock/RegisterE.vue'
import TableE from '../views/Stock/TableE.vue'
import Index from '../views/Index.vue'
import RegisterProd from '../views/Stock/RegisterProd.vue'
import RegisterTecAndVend from '../views/Project/RegisterTecAndVend.vue'
import { is } from 'quasar'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/Menu.vue'),
      children: [
        { 
          name: 'menuP',
          path: 'menuP',
          component: MenuP,
          meta: {requiresAuth: true}
        },
        { 
          name: 'tableV',
          path: 'tableV',
          component: TableV,
          meta: {requiresAuth: true}
        },
        {
          name: 'tableC',
          path: 'tableC',
          component: TableC,
          meta: {requiresAuth: true}
        },
        {
          name: 'registerV',
          path: 'registerV',
          component: RegisterV,
          meta: {requiresAuth: true}
        },
        {
          name: 'registerT',
          path: 'registerT',
          component: RegisterT,
          meta: {requiresAuth: true}
        },
        {
          name: 'registerO',
          path: 'registerO',
          component: RegisterTecAndVend,
          meta: {requiresAuth: true}
        }
      ]
    },
    {
      path: '/',
      component: () => import('../layouts/MenuE.vue'),
      children: [
        {
          name: 'menuE',
          path: 'menuE',
          component: MenuE,
          meta: {requiresAuth: true}
        },
        {
          name: 'registerE',
          path: 'registerE',
          component: RegisterE,
          meta: {requiresAuth: true}
        },
        {
          name: 'tableE',
          path: 'tableE',
          component: TableE,
          meta: {requiresAuth: true}
        },
        {
          name: 'registerprod',
          path: 'registerprod',
          component: RegisterProd,
          meta: {requiresAuth: true}
        }
      ]
    },
    {
      path: '/login',
      component: Login,
    },
    {
      name: 'index',
      path: '/index',
      component: Index
    }
  ]
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user');
  console.log(localStorage.getItem('user'))
  if (to.matched.some(record => record.meta.requiresAuth) && isAuthenticated === "") {
    next('/login');
  } else {
    next();
  }
});

export default router;
