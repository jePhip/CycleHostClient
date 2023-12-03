<template>
  <div class="add-route-container">
    <v-form class="routeForm" @submit.prevent="handleSubmit()" ref="form">
      <v-container class="input">
        <v-text-field
          label="Route Name"
          prepend-icon="mdi-bike"
          class="routeName"
          type="text"
          variant="outlined"
          name="routeName"
          v-model="routeName"
          required
        ></v-text-field>
        <v-container class="filter">
          <v-select
            label="Select Terrain:"
            v-model="terrain"
            :items="['Paved', 'Gravel', 'Dirt']"
          >
          </v-select>
          <v-select
            label="Select Difficulty: "
            v-model="difficulty"
            :items="['Beginner', 'Intermediate', 'Expert']"
          >
          </v-select>
        </v-container>
        <v-textarea
          label="Route Description"
          prepend-icon="mdi-pencil"
          class="routeDesc"
          type="text"
          variant="outlined"
          name="routeDesc"
          v-model="routeDesc"
          required
        ></v-textarea>
        <v-file-input
          label="Upload .gpx File"
          variant="outlined"
          type="file"
          ref="file"
          @change="handleFile(file)"
          required
        ></v-file-input>
        <v-btn @click="submit">submit</v-btn>
      </v-container>
    </v-form>

    <v-container class="routeList">
      <h2>Routes:</h2>
      <v-container class="route" :key="r.name" v-for="r in routes">
        <p>{{ r.name }} ID: {{ r.id }}</p>
        <v-btn @click="deleteBtn(r.id)">DELETE</v-btn>
      </v-container>
    </v-container>
  </div>
</template>

<script setup>
import { useRouteStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive, computed} from "vue";
const file = ref(null); //gpx file
const routeStore = useRouteStore();
const { deleteRoute, addRoute, getRoutes } = storeToRefs(routeStore);
//route list
let routes = computed(()=>routeStore.getRoutes);
//data to be sent to backend to create new route
let newRoute = ref();
let routeName = ref("");
let gpx = ref("");
let difficulty = ref("");
let routeLength = ref(0);
let terrain = ref("");
let routeDesc = ref("");
let elevation = ref(0)

let deleteBtn = (id) => {
  routeStore.deleteRoute(id);
};
let submit = async () => {
  try {
    handleFile();
    //create route and send it to the backend
    let routeToAdd = {
      route: newRoute.value,
      name: routeName.value,
      gpx: gpx.value,
      difficulty: difficulty.value,
      length: routeLength.value,
      terrain: terrain.value,
      desc: routeDesc.value,
      elevation: elevation.value
    };
    routeStore.addRoute(routeToAdd);
  } catch (error) {
    console.log("error", error);
  } //
};
let handleFile = (e) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const tj = require("@tmcw/togeojson"); //gpx to json converter
      const fileContent = file.value.files[0];
      //gpx text -> base64 to be stored in db
      const blob = new Blob([fileContent], { type: "text/plain" });
      const text = await blob.text();
      gpx.value = btoa(text);
      //make the text into a gpx file and parse it into a json object
      const gpxFile = new DOMParser().parseFromString(text, "text/xml");
      const converted = tj.gpx(gpxFile);
      newRoute.value = converted; 


      const coords = converted.features[0].geometry.coordinates;
      //max locations per request is 512
      let countBy = Math.ceil(coords.length / 512);
      let elevArr = {};
      let count = 0;
      for (let i = 0; i < coords.length; i = i + countBy) {
        elevArr[count] = {
          latitude: coords[i][1],
          longitude: coords[i][0],
        };
        count++;
      }
      //get elevation at coord points from backend
      let eresponse = await fetch(`http://localhost:3000/v1/geo/e`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(elevArr),
      });
      eresponse = await eresponse.json();
      //elevation gain
      elevArr = eresponse.response.results;
      let egain = 0;
      let diff = 0;
      for (let i = 1; i < elevArr.length; i++) {
        diff = elevArr[i].elevation - elevArr[i-1].elevation;
        if (diff > 0) {
          egain += diff;
        }
      }
      egain = Math.round((egain) * 3.28084 * 10) / 10 //meters to feet, rounded to 1 decimal
      console.log(egain, "egain");
      elevation.value = egain
      //route length/distance
      let totalDistance = 0;
      let lat1 = 0;
      let long1 = 0;
      let lat2 = 0;
      let long2 = 0;
      for (let i = 0; i < coords.length - 1; i++) {
        
        const d2ra = (angle) => (angle * Math.PI) / 180; //degrees to radians
        lat1 = d2ra(coords[i][1]);
        long1 = d2ra(coords[i][0]);
        lat2 = d2ra(coords[i + 1][1]);
        long2 = d2ra(coords[i + 1][0]);
        //use haversine formula to calculate distance between the two points
        const diffLat = lat2 - lat1;//distance between each point
        const diffLong = long2 - long1;
        const a =
          Math.sin(diffLat / 2) ** 2 +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin(diffLong / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const radius = 6371000; //earths radius
        const distance = radius * c;
        totalDistance += distance;
      }

      routeLength.value =
        Math.round((totalDistance / 1000) * 0.621371 * 10) / 10; //meters to miles, rounded to 1 decimal
      console.log(routeLength.value)
    };
    reader.readAsText(file.value.files[0]);
  }
};
</script>
<style>


.routeForm .routeList
{ 
  width: 50%;
}
.add-route-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.add-route-container .routeForm, .routeList{
  display: flex;
  flex-direction: column;
  text-align: center;
  background: #eee;
  margin: 0 0 10px 0; 
  width: 50%; 
  color: #083a8c;
}

.add-route-container .routeList .routeForm .input label {
  text-align: left;  
  margin-right: 10px;
}

.add-route-container .routeList .routeForm  {
  text-align: center;
  background: white;
  width: 50%;
}



.routeList .route {
  background: #eee;
}

.input {
  text-align: center;
  padding: 20px;
  width: 50%;
}

button.button {
  width: 100px;
  background: lightgray;
}

.routeList {
  font-family: roboto;
  display: flex;
  flex-direction: column;
}

@media (max-width: 600px) {
  .input  {
    width: 100%;
    padding: 0px;
    margin: 0 0 0 0;
  }

  .routeForm {
    width: 100%;
    margin: 0 0 0 0;
    padding: 0px;
  }

  .add-route-container
  { 
    width: 100%;
    margin: 0 0 0 0;
    padding: 0px;
  }

  
}
</style>
