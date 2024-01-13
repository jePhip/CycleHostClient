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

<script setup>
import Footer from "@/components/nav/Footer.vue";
import NavBar from "@/components/nav/NavBar.vue";
import { useRouteStore } from "@/store/index.js"; //
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
const routeStore = useRouteStore();
onMounted(async () => {
  await routeStore.getRoutesInit(); //puts route list into store//
  const { routes } = storeToRefs(routeStore);

  return { routeStore };
});
</script>

<style>
.v-main {
  padding-bottom: 70px;
  background: rgb(55, 55, 55);
}

</style>
