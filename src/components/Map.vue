<template>
    <div class="map">
      <div style="height:400px; width:600px">
        <l-map ref="map" v-model:zoom="zoom" :center="[37.5997592, -93.4091279]"> <!-- This needs to be dynamic in the future -->
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
          <l-marker :lat-lng="markerLatLng" ></l-marker>
          <l-geo-json :geojson="route"></l-geo-json>
        </l-map>
      </div>
    </div>
  </template>
  
  
  <script>
  import "leaflet/dist/leaflet.css";
  import  bikeRoute from '@/data/Frisco.json' //Should add a way to dynamically change bikeRoute ###Change from DtoT -> bikeRoute
  import { LMap, LTileLayer, LMarker, LGeoJson } from "@vue-leaflet/vue-leaflet";
  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LGeoJson
    },
    data() {
      return {
        zoom: 12,
        markerLatLng: [37.5997592, -93.4091279],//also needs to be dynamic
        route: bikeRoute //Change from DtoT -> bikeRoute
      };
    },
  };
  </script>
  
<style>
    .map {
      display: flex; 
      justify-content: center;
    }
</style>
  