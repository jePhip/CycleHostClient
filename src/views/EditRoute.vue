<template>
  <v-row>
    <v-col cols="3"></v-col>
    <v-col cols="6">
      <EditRoutesTable />
    </v-col>
    <v-col cols="3"> </v-col>
  </v-row>
  <div class="add-route-container">
    <v-form
      class="routeForm"
      validate-on="submit lazy"
      @submit.prevent="submit"
      ref="form"
    >
      <v-container class="input">
        <v-text-field
          label="Route Name"
          prepend-icon="mdi-bike"
          class="routeName"
          type="text"
          variant="outlined"
          name="routeName"
          v-model="routeName"
          :rules="inputRules"
          required
        ></v-text-field>
        <v-container class="filter">
          <v-select
            label="Select Terrain:"
            prepend-icon="mdi-road"
            v-model="terrain"
            :items="['Paved', 'Gravel', 'Dirt']"
            :rules="inputRules"
          >
          </v-select>
          <v-select
            label="Select Difficulty: "
            prepend-icon="mdi-alert"
            v-model="difficulty"
            :items="['Beginner', 'Intermediate', 'Expert']"
            :rules="inputRules"
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
          :rules="inputRules"
          required
        ></v-textarea>
        <v-file-input
          label="Upload .gpx File"
          variant="outlined"
          accept=".gpx"
          type="file"
          ref="file"
          :rules="inputRules"
          prepend-icon="mdi-map"
          required
        ></v-file-input>
        <v-btn type="submit">submit</v-btn>
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
import EditRoutesTable from "@/components/editroute/EditRoutesTable.vue";
import { useRouteStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { ref, reactive, computed } from "vue";
const form = ref(null);
const file = ref(null); //gpx file
const routeStore = useRouteStore();
const { deleteRoute, addRoute, getRoutes } = storeToRefs(routeStore);
//route list
let routes = computed(() => routeStore.getRoutes);
//data to be sent to backend to create new route
let newRoute = ref();
let routeName = ref("");
let gpx = ref("");
let difficulty = ref("");
let routeLength = ref(0);
let terrain = ref("");
let routeDesc = ref("");
let elevation = ref(0);

//input validation
let inputRules = reactive([
  (v) => v.length > 0 || "Please add a value to this field",
]);
let deleteBtn = (id) => {
  routeStore.deleteRoute(id);
};
let submit = async (event) => {
  const check = (await event).valid;
  if (check) {
    try {
      await handleFile();
      //create route and send it to the backend
      let routeToAdd = {
        route: newRoute.value,
        name: routeName.value,
        gpx: gpx.value,
        difficulty: difficulty.value,
        length: routeLength.value,
        terrain: terrain.value,
        desc: routeDesc.value,
        elevation: elevation.value,
      };

      routeStore.addRoute(routeToAdd);
    } catch (error) {
      console.log("error", error);
    } //
  }
};
let handleFile = () => {
  return new Promise((resolve, reject) => {
    try {
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
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
          let elevArr = {
            locations: []
          };
          let count = 0;
          for (let i = 0; i < coords.length; i = i + countBy) {
            elevArr.locations[count] = {
              latitude: coords[i][1],
              longitude: coords[i][0],
            };
            count++;
          }
          console.log(elevArr);
          //get elevation at coord points from backend
          let eresponse = await fetch(
            `https://api.open-elevation.com/api/v1/lookup`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(elevArr),
            }
          );

          eresponse = await eresponse.json();
          console.log(eresponse);
          //elevation gain
          elevArr = eresponse.results;
          let egain = 0;
          let diff = 0;
          for (let i = 1; i < elevArr.length; i++) {
            diff = elevArr[i].elevation - elevArr[i - 1].elevation;
            //only positive elevation changes are added
            if (diff > 0) {
              egain += diff;
            }
          }
          egain = Math.round(egain * 3.28084 * 10) / 10; //meters to feet, rounded to 1 decimal
          elevation.value = egain;
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
            const diffLat = lat2 - lat1; //distance between each point
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
          let f = (response) => {
            // request succeeded
            resolve(response);
          };
          f();
        };
        reader.readAsText(file.value.files[0]);
      }
    } catch (e) {
      reject(e);
    }
  });
};
</script>
<style>
.routeForm .routeList {
  width: 50%;
}
.add-route-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.add-route-container .routeForm,
.routeList {
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

.add-route-container .routeList .routeForm {
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
  .input {
    width: 100%;
    padding: 0px;
    margin: 0 0 0 0;
  }

  .routeForm {
    width: 100%;
    margin: 0 0 0 0;
    padding: 0px;
  }

  .add-route-container {
    width: 100%;
    margin: 0 0 0 0;
    padding-bottom: 20px;
  }
}
</style>
