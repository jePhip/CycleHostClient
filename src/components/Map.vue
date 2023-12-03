<template>
  <v-container fluid class="mapContainer"> 
    
    <div class="map">
      <div style="height:600px; width:auto">
        <l-map ref="map" v-model:zoom="zoom" :center="[37.5997592, -93.4091279]" :options="mapOptions">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
          <div v-if="routes">
            <div :key="r.name" v-for="r in routes">
              <l-geo-json :geojson="r.data"></l-geo-json>
            </div>
          </div>
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
        zoom: 12, //map zoom
        markerLatLng: [37.5997592, -93.4091279], //unused
        routes: null,

          mapOptions: {
          scrollWheelZoom: false
          }  

        
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
      
    }
  };   


  </script>
  

  