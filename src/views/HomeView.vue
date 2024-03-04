<template>
  <v-container >
    <Map />
  </v-container>
  <v-container>
    <v-text-field v-model="search"
        prepend-inner-icon="mdi-magnify"
        density="compact"
        label="Search"
        single-line
        flat
        hide-details
        variant="solo-filled"></v-text-field>
       <v-data-table v-model:search="search" :items=routes>
      <template v-slot:routes.name>
        <div class="text-end">name</div>
      </template>
    </v-data-table>
    <v-row>  
      <v-col v-for="r in routes" :key="r" sm="12" md="6" lg="3" xl="2">
        <RouteCard :route="r" />
      </v-col>
    </v-row>
      
  </v-container>
 
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
