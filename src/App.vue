<template>
  <v-app>
    <v-main>
      <NavBar />
      <v-content>
        <router-view />
      </v-content>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer.vue'
import NavBar from '@/components/NavBar.vue'
import {useRouteStore} from '@/store/index.js'
export default {
  name: 'App',
  components: {
    Footer,
    NavBar
  },
  setup(){
    const routeStore = useRouteStore()
    routeStore.getRoutes()//puts route list into store
    return{routeStore}
  },
  data: () => ({
    //
  }),

}
</script>
