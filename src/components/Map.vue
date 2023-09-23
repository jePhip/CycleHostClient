<template>
    <div class="map">
      <div style="height:400px; width:600px">
        <l-map ref="map" v-model:zoom="zoom" :center="[37.5997592, -93.4091279]">
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
  import  DtoT from '@/data/DunneganparkToTaylor.json'
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
        markerLatLng: [37.5997592, -93.4091279],
        route: DtoT
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
  