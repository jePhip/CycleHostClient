<template>
  <div>
    <div class="single-route" v-if="route">
      <v-row justify="center">
        <v-col cols="9">
          <h1>{{ route.name }}</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="9">
          <RouteViewMap :route="route" />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="9">
          <RouteTable :route="route" />

        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="9">
          <RouteDetail :route="route" />

        </v-col>
      </v-row>
    </div>
    <div class="noRoute" v-if="!route">
      <h1>Loading...</h1>
      <a class="noRoutea" href="/">Back to Home</a>
    </div>
  </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import RouteTable from "@/components/routeview/RouteViewTable.vue";
import RouteDetail from "@/components/routeview/RouteDetail.vue";
import RouteViewMap from "@/components/routeview/RouteViewMap.vue";
import { LMap, LTileLayer, LMarker, LGeoJson } from "@vue-leaflet/vue-leaflet";
import { useRouteStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive, computed } from "vue";
import { useRoute } from "vue-router";
const routeStore = useRouteStore();
const routing = useRoute();
const { getRoutebyID } = storeToRefs(routeStore);
const zoom = ref(12);
let route = computed(() => routeStore.getRoutebyID(routing.params.id));
</script>

<style>

</style>
