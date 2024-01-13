<template>
  <v-container fluid class="mapContainer">
    <div class="map">
      <div style="height: 200px ; width: auto">
        <l-map
          ref="map"
          v-model:zoom="zoom"
          :options="mapOptions"
        >
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
      zoom: 12, //map zoom
      markerLatLng: [37.5997592, -93.4091279], //unused
      routes: null,

      mapOptions: {
        scrollWheelZoom: false,
        interactive: false,
        clickable: false,
      },
    };
  },
  /* html form, click handler to submit
        input fields name, json/gpx, btn type of btn
        method named createRoute called by btn*/

  methods: {
    red(){
      this.geo = this.$refs.geo.leafletObject;
      console.log("Bounds:", this.geo.getBounds());
      this.$refs.map.leafletObject.fitBounds(this.geo.getBounds())
    }
  },
};
</script>