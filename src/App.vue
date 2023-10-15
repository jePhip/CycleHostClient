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
export default {
  name: 'App',
  components: {
    Footer,
    NavBar
  },
  data: () => ({
    //
  }),
}
</script>
