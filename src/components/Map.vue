<template>
  <v-container fluid class="mapContainer">
    <div class="map">
      <div style="height: 600px; width: auto">
        <l-map
          ref="map"
          v-model:zoom="zoom"
          :center="[37.5997592, -93.4091279]"
          :options="mapOptions"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
          <div v-if="routes">
            <div :key="r.name" v-for="r in routes">
              <l-geo-json :geojson="r.route"></l-geo-json>
            </div>
          </div>
        </l-map>
      </div>
    </div>
  </v-container>
</template>

<script setup>
// css stylesheet
import "@/css/map.css";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LGeoJson } from "@vue-leaflet/vue-leaflet";
import { useRouteStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { ref, reactive, computed } from "vue";
const routeStore = useRouteStore();
const getRoutes = storeToRefs(routeStore);
const getRoutebyID = storeToRefs(routeStore);
let map = reactive();
let routes = computed(() => routeStore.getRoutes);
let zoom = ref(12);
let markerLatLng = [37.5997592, -93.4091279];
let mapOptions = reactive({
  scrollWheelZoom: false,
});
</script>
<style>
.CardMap{
  scale: 30%;
}
</style>
