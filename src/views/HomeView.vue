<template>
  <Map />
  <h1>start cards</h1>
  <v-container fluid>
    <v-row>
      <v-col v-for="r in routes" :key="r" cols="3">
        <RouteCard :route="r" />
      </v-col>
    </v-row>
  </v-container>
  <h1>end cards</h1>
  <RoutesTable />
  <br />
</template>

<script setup>
import { defineComponent } from "vue";
import { useRouteStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { ref, reactive, computed } from "vue";
//Components
import Map from "@/components/Map.vue";
import RoutesTable from "@/components/RoutesTable.vue";
import RouteCard from "@/components/cards/RouteCard.vue";

const routeStore = useRouteStore();
const { getRoutes } = storeToRefs(routeStore);
let routes = computed(() => routeStore.getRoutes);
</script>

<style>
.RoutesTable {
  scale: 80%;
}
</style>
