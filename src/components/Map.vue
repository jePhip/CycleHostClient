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
              <LPolyline
                :lat-lngs="poly(r.route.features[0].geometry.coordinates)" :color="r.color"
              ></LPolyline>
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
import {
  LMap,
  LTileLayer,
  LMarker,
  LGeoJson,
  LPolyline,
} from "@vue-leaflet/vue-leaflet";
import { useRouteStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { ref, reactive, computed } from "vue";
const routeStore = useRouteStore();
const getRoutes = storeToRefs(routeStore);
const getRoutebyID = storeToRefs(routeStore);
let map = reactive();
let routes = computed(() => routeStore.getRoutes.map(r => ({
  ...r, 
  color: randColor()
})));
let zoom = ref(12);
let markerLatLng = [
  [37.5997592, -93.4],
  [37.5997592, -93.4091279],
];
let poly = (arr) => {
  let count = 0;
  let countBy = Math.ceil(arr.length / 500); //excessive points causes polyline to lag the site
  let returnArr = []
  for (let i = 0; i < arr.length; i = i+countBy) {
    returnArr[count] = [arr[i][1], arr[i][0]
    ];
    count++
  }
  console.log(returnArr.length)
  return returnArr
};
let randColor = (() => {
  const rand = Math.floor(Math.random() * 256);
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const color = `rgb(${red}, ${green}, ${blue})`;

  return color;
})
let mapOptions = reactive({
  scrollWheelZoom: false,
});
</script>
<style>
</style>
