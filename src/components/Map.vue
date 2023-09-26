<template>
  <div class="mapContainer">
    <div class="routeList">
      <h3>{{ active && active.name || "Select Route" }}</h3>
      <div :key="r.name" v-for="(r) in routes">
        <button @click="changeRoute(r)" :class="{active: r.active }">{{ r.name }}</button>
      </div>
      <div class="jsonloader">
        <div>
          <textarea v-model="jsoninput" id="" cols="30" rows="10"></textarea>
        </div>
        <button @click="loadjson">Load</button>
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
        active: null,
        zoom: 12,
        markerLatLng: [37.5997592, -93.4091279],
        route: null,
        routes: [
          {data: DtoT, name: "Dunnegan to Taylor"},
          {data: TtoF, name: "Taylor to Freddy's"},
          {data: RCtoA, name: "Recreation Center to Aldi"},
          {data: Frisco, name: "Frisco"}
        ],
        jsoninput: null
      };
    },
    methods: {
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
  