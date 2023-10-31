<template>
  <div class="single-route" v-if="route">
    <div class="mapContainer">
      <div class="table">
        <RouteTable :route="route" />
      </div>
      <div class="desc">
        <RouteDetail :route="route" />
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
  <div class="noRoute" v-if="!route">
    <h1>404: No route found!</h1>
    <a class="noRoutea" href="/">Back to Home</a>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LGeoJson } from "@vue-leaflet/vue-leaflet";
import RouteTable from "@/components/RouteViewTable.vue";
import RouteDetail from "@/components/RouteDetail.vue";
import {useRouteStore} from '@/store/index.js'
export default {
  //TODO: get route from database and pass in route details to route table,
  //pass in route data to geojson and desc
  name: "RouteView",
  async mounted() {
    //console.log("router id" + this.$router.params.id)
    this.route = (this.routeStore.getRoutebyID(this.$route.params.id))
    this.mapRoute = (this.routeStore.getRoutebyID(this.$route.params.id)).route
  },
  setup(){
    const routeStore = useRouteStore()
    return{routeStore}
  },
  data() {
    return {
      active: null, //route currently being displayed
      zoom: 12, //map zoom
      mapRoute: null, //route being displayed by Lgeojson
      route: null,
    };
  },

  components: {
    RouteDetail,
    RouteTable,
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
  },
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
.noRoute {
  display: grid;
  justify-content: center;
  font-size: x-large;
  padding-bottom: 200px;
}

.table {
  width: 50%;
}
</style>
