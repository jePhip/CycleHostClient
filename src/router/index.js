import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RouteView from '../views/RouteView.vue'
const routes = [
  {
    path: '/route/:id',
    name: 'Route',
    component: RouteView
  },
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
    path: '/edit',
    name: 'Edit Routes',
    component: function () {
      return import(/* webpackChunkName: "edit" */ '../views/AddRoute.vue')
    }
  },
  
  {
    path: '/test',
    name: 'Test',
    component: function () {
      return import(/* webpackChunkName: "route" */ '../views/TestView.vue')
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
