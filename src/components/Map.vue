<template>
  <div class="mapContainer">
    <div class="routeList">
      <h3>{{ active && active.name || "Select Route" }}</h3>
      <div :key="r.name" v-for="(r) in routes">
        <button @click="changeRoute(r)" :class="{active: r.active }">{{ r.name }}</button>
      </div>
      <button v-if="customRoute.data !=null" @click="changeRoute(customRoute)">Custom Route</button>
      <div class="jsonloader">
        <div>
          <textarea v-model="jsoninput" id="" cols="30" rows="10" placeholder="Input a Custom Route via JSON"></textarea>
        </div>
        <button @click="loadjson">Load custom JSON</button>
      </div>
      <div class="gpxInput">
        <p>Upload a gpx file to create a custom route</p>
        <input type="file" ref="file" @change="handleFileChange">
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
  //**********************
  //will come from backend in future
  import DtoT from '@/data/DunneganparkToTaylor.json'
  import TtoF from '@/data/TaylorToFreddys.json'
  import RCtoA from '@/data/RecCenterToAldi.json'
  import Frisco from '@/data/Frisco.json' //Should add a way to dynamically change bikeRoute ###Change from DtoT -> bikeRoute
  //**********************

  //gpx temp
  //import GtoBFgpx from '@/data/GazeboToBaseballFields.gpx'
  //
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
        fileInput: null,
        customRoute: {
          data: null,
          name: "Custom Route"
        },
        active: null,
        zoom: 12,
        markerLatLng: [37.5997592, -93.4091279],
        route: null,
        routes: [
          {data: DtoT, name: "Dunnegan to Taylor"},
          {data: TtoF, name: "Taylor to Freddy's"},
          {data: RCtoA, name: "Recreation Center to Aldi"},
          {data: Frisco, name: "Frisco"},
          
        ],
        jsoninput: null
      };
    },
    methods: {
      handleFileChange(event) {
        const selectedFile = this.$refs.file.files[0];
        if (selectedFile) {
          const reader = new FileReader();
          const tj = require("@tmcw/togeojson");
          reader.onload = async (e) => {
            const fileContent = e.target.result;
            // Create a new Blob with the file content
            const blob = new Blob([fileContent], { type: 'text/plain' })
            let text = await blob.text()
            const newJSON = new DOMParser().parseFromString(text, "text/xml")
            const converted = tj.gpx(newJSON);
            this.customRoute.data = converted
            console.log(converted)
            };
            reader.readAsText(selectedFile);
            }
      },
      changeRoute(newRoute){
        this.active = newRoute
        this.route = newRoute.data
      },
      loadjson(){
        if(this.jsoninput == null){
          alert("Enter JSON")
        }
        else{
          try{
          this.route = JSON.parse(this.jsoninput)
          this.active = {
            name: "Custom Route"
          }}
          catch(e){
            alert("invalid json!")
          }
        }
      }
    }
  };
  </script>
  
<style>
    .mapContainer {
      display: flex;
      justify-content: center;
      font-weight: bold
    }
    .map {
      flex:2 1 auto;  
    }
    .jsonloader {
      flex-direction: column;
      padding: 10px;
    }
    .routeList {
      color: blue;
      flex-direction: column;
      flex: 1 1 auto;
    }


    .routeList button{
      width: 51%;
    }
    .active {
      font-weight: bold;
      text-decoration: underline;
    }
</style>
  