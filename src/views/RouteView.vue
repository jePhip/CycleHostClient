<template>
  <div class="single-route">
    <div class="mapContainer">
      <div class="table">
        <RouteTable :route="route"/>
      </div>

      <div class="desc">
        <RouteDetail :route="route"/>
      </div>
      
      

      

      <div class="map" v-if="mapRoute">
        <div style="height: 400px; width: 500px">
          <l-map ref="map" zoom="9" :center="[37.5997592, -93.4091279]">
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></l-tile-layer>
            <l-geo-json :geojson="mapRoute"></l-geo-json>
          </l-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LGeoJson } from "@vue-leaflet/vue-leaflet";
import RouteTable from "@/components/RouteViewTable.vue";
import RouteDetail from '@/components/RouteDetail.vue'

export default {
  //TODO: get route from database and pass in route details to route table,
  //pass in route data to geojson and desc
  name: "RouteView",
  async mounted(){
    //console.log("router id" + this.$router.params.id)
     await this.fetchRoute(this.$route.params.id)
    },
  data() {
    return {
      active: null, //route currently being displayed
        zoom: 12, //map zoom
        mapRoute: null, //route being displayed by Lgeojson
        route: null
      }
    },

  components: {
    RouteDetail,
    RouteTable,
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
  },
  methods: {
    async fetchRoute(id) {
      console.log(id)
      try {
        let response = await fetch("http://localhost:3000/v1/geo/" + id); //eventually change to env variable
        response = await response.json();
        this.route = response.route
        this.mapRoute = JSON.parse(this.route.route)
      } catch (error) {
        console.error(error);
      }
    },
      
  }
};
</script>

<style>
.desc {
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

.table {
  width: 50%;
}
</style>
