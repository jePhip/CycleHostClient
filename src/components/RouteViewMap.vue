<template>
    <v-container fluid class="mapContainer">
      <div class="map" v-if="route.route">
        <div style="height: 400px; width: 500px">
          <l-map ref="map" zoom="9" :center="[37.5997592, -93.4091279]">
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></l-tile-layer>
            <div v-if="route">
              <l-geo-json ref="geo" @ready="red" :geojson="route.route"></l-geo-json>
            </div>
          </l-map>
        </div>
      </div>
    </v-container>
  </template>
  
  <script>
  // css stylesheet
  import "@/css/map.css";
  
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LGeoJson, } from "@vue-leaflet/vue-leaflet";
  
  export default {
    props: {
      route: null, //route inputed by parent component
    },
  
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LGeoJson,
    },
    data() {
      return {
        zoom: 11, //map zoom
        markerLatLng: [37.5997592, -93.4091279], //unused
        routes: null,
  
        mapOptions: {
          scrollWheelZoom: false,
        },
      };
    },
    /* html form, click handler to submit
          input fields name, json/gpx, btn type of btn
          method named createRoute called by btn*/
  
    methods: {
      red(){
        this.geo = this.$refs.geo.leafletObject;
        this.$refs.map.leafletObject.fitBounds(this.geo.getBounds())
      }
    },
  };
  </script>
  