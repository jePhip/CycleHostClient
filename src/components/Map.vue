<template>
  <div class="mapContainer"> 
    <div class="routeList">
      <h3>{{ active && active.name || "Select Route" }}</h3>
      <div :key="r.name" v-for="(r) in routes">
        <v-btn @click="changeRoute(r)" :class="{active: r.active }">{{ r.name }}</v-btn>
      </div>
    </div>
    <div class="map">
      <div style="height:600px; width:auto">
        <l-map ref="map" v-model:zoom="zoom" :center="[37.5997592, -93.4091279]">
          <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
          ></l-tile-layer>
          <l-geo-json :geojson="route"></l-geo-json>
        </l-map>
      </div>
    </div>
  </div>
</template>
  
  
  <script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LGeoJson } from "@vue-leaflet/vue-leaflet";
  export default {
    async mounted(){
      //console.log("mounted")
      await this.fetchRoutes()
      //console.log(this.routes)
    },
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LGeoJson
    },
    data() {
      return {
        active: null, //route currently being displayed
        zoom: 12, //map zoom
        markerLatLng: [37.5997592, -93.4091279], //unused
        route: null, //route being displayed by Lgeojson
        routes: null,
      };
    },
    /* html form, click handler to submit
      input fields name, json/gpx, btn type of btn
      method named createRoute called by btn*/
    
    methods: {
      async fetchRoutes() {
        try {
          let response = await fetch('http://localhost:3000/v1/geo');//eventually change to env variable
          response = await response.json();
          this.routes = response.routes.map(r => {
            return {
              ...r,
              data: JSON.parse(r.route)
            }
          })
        } catch (error) {
          console.error(error);
        }
      },
      

      changeRoute(newRoute){
        this.active = newRoute
        this.route = newRoute.data
      },
    }
  };
  </script>
  
<style>
      .mapContainer {
      display: flex;
      justify-content: center;
      font-weight: bold;  
      text-align: center
    }
    .map {
      flex:2 1 auto;  
    }
    .routeList {
      color: blue;
      flex-direction: column;
      flex: 1 1 auto;
    }
    .routeList button{
      width: 75%;
    }
    .active {
      font-weight: bold;
      text-decoration: underline;
      text-align: center;
    }
</style>
  