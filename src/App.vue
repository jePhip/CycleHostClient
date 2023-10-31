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
  mounted(){
   
  },
  setup(){
    const routeStore = useRouteStore()
    routeStore.getRoutes()
    return{routeStore}
  },
  data: () => ({
    //
    routeToAddApp: 
      {
        route: ``,
        terrain: `dirt`,
        length: 12341234,
        difficulty: `Beginner`,
        desc: `this new route is cool`,
        name: `new name`,
        gpx: ``,
      
    }
  }),

}
</script>
