import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: '/add',
    name: 'Add Route',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AddRoute.vue')
    }
  },

  { 
    path: '/login',
    name: 'Login', 
    component: function(){ 
      return import(/* webpackChunkName: "login" */ '../views/Login.vue')
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
