<template>
  <div class="single-route">   

    <div class="mapContainer">

      <div class="table"> 
        <RouteTable />        
      </div>

      <div class="desc">
        <strong class="text-decoration-bold">Description</strong>
        <p>
          The Frisco Highline Trail is the longest Rail-Trail in Missouri, at 36
          miles, and connects Springfield to Bolivar, Missouri, with several
          historic rural farm towns along the route. Bicyclists, runners, and
          walkers enjoy the Ozarks' scenery there in all seasons.
        </p>
        <br>
        <strong>Points of Interest</strong>
        <p>Best View - Little Sac River's stone railroad bridge, built circa 1884</p>
      </div>
      
      

      

      <div class="map">
        <div style="height: 400px; width: 500px">
          <l-map ref="map" zoom="9" :center="[37.5997592, -93.4091279]">
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
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LGeoJson } from "@vue-leaflet/vue-leaflet";
import RouteTable from "@/components/SingleRouteTable.vue";
import FriscoT from "@/data/FriscoT.json";

export default {//TODO: get route from database and pass in route details to route table,
                //pass in route data to geojson and desc
  name: "RouteView",
  data (){
    return {
        route: FriscoT
        //markerLatLng: 
        
    }
  },

  components: {
    RouteTable,
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
  },
};
</script>

<style>

.desc
 {
    width: 50%;
    font-weight: 400;    
    background: #eee;
}
.desc.p {
  text-align: left;
}
.single-route {
  scale: 90%;
}

.table
{ 
 
  width: 50%;
}


</style>
