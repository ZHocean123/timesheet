import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Layout from '../views/layout/layout';
import Home from '../views/home';
import WindowSetting from '../views/window-setting';
import Login from '../views/login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'apply-list',
          name: 'apply-list',
          component: Home,
        },
        {
          path: 'window-setting',
          name: 'window-setting',
          component: WindowSetting,
        },
        {
          path: 'department-setting',
          name: 'department-setting',
          component: Home,
        },
        {
          path: 'home',
          name: 'home',
          component: Home,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
