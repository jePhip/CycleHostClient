<template>
      <div style="height: 200px; width: auto">
        <l-map ref="map" v-model:zoom="zoom" :options="mapOptions">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
          <div v-if="route">
            <LPolyline
              @ready="red"
              ref="geo"
              :lat-lngs="poly(route.route.features[0].geometry.coordinates)"
              :color="blue"
            ></LPolyline>
          </div>
        </l-map>
      </div>

</template>

<script>
// css stylesheet
import "@/css/map.css";

import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LMarker,
  LGeoJson,
  LPolyline,
} from "@vue-leaflet/vue-leaflet";

export default {
  props: {
    route: null, //route inputed by parent component
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
    LPolyline
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
    poly(arr) {
      let count = 0;
      let countBy = Math.ceil(arr.length / 50); //excessive points causes polyline to lag the site
      let returnArr = [];
      for (let i = 0; i < arr.length; i = i + countBy) {
        returnArr[count] = [arr[i][1], arr[i][0]];
        count++;
      }
      console.log(returnArr.length);
      return returnArr;
    },
    red() {
      this.geo = this.$refs.geo.leafletObject;
      console.log("Bounds:", this.geo.getBounds());
      this.$refs.map.leafletObject.fitBounds(this.geo.getBounds());
    },
  },
};
</script>
