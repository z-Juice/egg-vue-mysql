import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/* Layout */
import Layout from '@/views/layout'

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/activity'
  },
  {
    path: '/login',
    name: "login",
    component: () => import('@/views/login/index'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/register',
    name: "register",
    component: () => import('@/views/login/register'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/activity',
    component: Layout,
    meta: {
      requireAuth: true
    },
    children: [{
      path: '/',
      name: 'activity',
      component: () => import('@/views/activity/index')
    },{
      path: 'create',
      name: 'activityCreate',
      component: () => import('@/views/activity/create')
    }]
  },
  {
    path: '/user',
    component: Layout,
    meta: {
      requireAuth: true
    },
    children: [{
      path: '/',
      name: 'user',
      component: () => import('@/views/user/index')
    }]
  },
  {
    path: '/config',
    component: Layout,
    meta: {
      requireAuth: true
    },
    children: [{
      path: '/',
      name: 'config',
      component: () => import('@/views/config/index')
    }]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '*',   // 错误路由
    redirect: '/404'   //重定向
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
