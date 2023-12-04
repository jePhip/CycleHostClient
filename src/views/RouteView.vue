<template>
  <div>
  <div class="single-route" v-if="route">
    <div class="mapContainer">
      <div class="table">
        <RouteTable :route="route" />
      </div>
      

      <div class="map" v-if="route.route">
        <div style="height: 400px; width: 500px">
          <l-map ref="map" zoom="9" :center="[37.5997592, -93.4091279]">
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></l-tile-layer>
            <l-geo-json :geojson="route.route"></l-geo-json>
          </l-map>
        </div>
      </div>
    </div>

    <br>  

    <div class="desc">
        <RouteDetail :route="route" />
    </div>

  </div>
  <div class="noRoute" v-if="!route">
    <h1>Loading...</h1>
    <a class="noRoutea" href="/">Back to Home</a>
  </div>
</div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import RouteTable from "@/components/RouteViewTable.vue";
import RouteDetail from "@/components/RouteDetail.vue";
import { LMap, LTileLayer, LMarker, LGeoJson } from "@vue-leaflet/vue-leaflet";
import { useRouteStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive, computed } from "vue";
import { useRoute } from "vue-router";
const routeStore = useRouteStore();
const routing = useRoute();
const { getRoutebyID } = storeToRefs(routeStore);
const zoom = ref(12);
let route = computed(() => routeStore.getRoutebyID(routing.params.id));
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

.mapContainer
{ 
  display: flex;
  flex-direction: row;
}

.desc
{ 
  width: 100%;
  padding: 10px;
}

@media (max-width: 1000px)
{ 
  .mapContainer
  { 
    flex-direction: column;
    width: 100%;
  }

  .table
  { 
    width: 100%;
    margin: auto;
  }

  .map
  { 
    width: 100%;
    margin: auto;
  }

}
</style>