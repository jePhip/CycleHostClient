<template>
  <div class="table">
    <RouteTable />
  </div>

  <div class="mapContainer">
    <div class="desc">
      <strong class="text-decoration-underline">Description</strong>
      <p>
        The Frisco Highline Trail is the longest Rail-Trail in Missouri, at 36
        miles, and connects Springfield to Bolivar, Missouri, with several
        historic rural farm towns along the route. Bicyclists, runners, and
        walkers enjoy the Ozarks' scenery there in all seasons.
      </p>
    </div>
    <div class="map">
      <div style="height: 400px; width: 500px">
        <l-map ref="map" zoom="12" :center="[37.5997592, -93.4091279]">
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
import RouteTable from "@/components/RouteTable.vue";
import Frisco from "@/data/Frisco.json";

export default {
  name: "RouteView",
  data (){
    return {
        route: Frisco
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
.mapContainer {
  justify-content: right;
  flex: 2 1 auto;
}
.desc {
    font-weight: 400;
    align-content: left;
}
.table {
  scale: 90%;
}
</style>
