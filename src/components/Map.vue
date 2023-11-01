<template>
  <v-container fluid class="mapContainer"> 

    <div class="routeList">   
      
  



      <h3>{{ active && active.name || "Select Route" }}</h3>
      <div :key="r.name" v-for="(r) in routes">
        <v-btn @click="changeRoute(r)" :class="{active: r.active }">{{ r.name }}</v-btn>
      
      </div>

      <v-container class="filter">
        <v-select label="Select Type of Ride:" :items="['Paved', 'Gravel', 'Dirt','Any']">
                 
        </v-select>

        <v-select label="Select Distance: " :items="['0-10 Miles', '10-20 Miles', '20-30 Miles','30-40 Miles', '40-50 Miles', '50+ Miles', 'Any Distance']"> 

        </v-select>

      </v-container>

      
     
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
  </v-container>
</template>
  
  
  <script>
  // css stylesheet
  import '@/css/map.css';
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
  

  