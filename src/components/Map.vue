<template>
  <v-container fluid class="mapContainer">
    <div class="map">
      <div style="height: 500px; width: auto">
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
                :lat-lngs="poly(r.route.features[0].geometry.coordinates)"
                :color="r.color"
                weight="4"
                ><l-popup>
                  <a class="popup" :href="'/route/' + r.id">
                    <v-container>
                      <h3 class="nameh3">{{ r.name }}</h3>
                      <v-sheet :height="5" :width="0"></v-sheet>
                      <h4>Length: {{ r.length }} miles</h4>
                      <h4>Difficulty: {{ r.difficulty }}</h4>
                      <h4>Terrain: {{ r.terrain }}</h4>
                      <v-row>
                        <v-col cols="10"></v-col>
                        <v-col cols="2">
                          <v-icon icon="mdi-launch"></v-icon>
                        </v-col>
                      </v-row>
                    </v-container>
                  </a> </l-popup
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
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import { useRouteStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { ref, reactive, computed } from "vue";
const routeStore = useRouteStore();
const getRoutes = storeToRefs(routeStore);
const getRoutebyID = storeToRefs(routeStore);
let map = reactive();
let routes = computed(() =>
  routeStore.getRoutes.map((r) => ({
    ...r,
    color: randColor(),
  }))
);
let zoom = ref(12);
let markerLatLng = [
  [37.5997592, -93.4],
  [37.5997592, -93.4091279],
];
let poly = (arr) => {
  let count = 0;
  let countBy = Math.ceil(arr.length / 500); //excessive points causes polyline to lag the site
  let returnArr = [];
  for (let i = 0; i < arr.length; i = i + countBy) {
    returnArr[count] = [arr[i][1], arr[i][0]];
    count++;
  }
  console.log(returnArr.length);
  return returnArr;
};
let count = 0;
let randColor = () => {
  const rand = Math.floor(Math.random() * 6);
  const colors = ["rgb(60, 140, 255)", "rgb(255, 0, 255)", "rgb(255, 215, 0)", "rgb(100, 100 ,200 )", "rgb(200, 255 ,200 )", "rgb(255, 100 ,0)", "rgb(200, 0,0)"];
  const color = `${colors[count]}`;
  if(count<6){
    count++;
  }else{
    count = 0;
  }
  return color;
};
let mapOptions = reactive({
  //scrollWheelZoom: false,
});
</script>
<style>
.nameh3 {
  text-decoration: underline;
}
.popup {
  text-decoration: none;
  color: inherit;
}
</style>
