<template>
  <div class="add-route-container"> 
      <v-form class="routeForm" @submit.prevent="handleSubmit">
        <v-container class="input">
          <label>Route Name</label>
          <v-text-field prepend-icon="mdi-bike" class="routeName" type="text" variant="outlined" name="routeName" v-model="routeName" required ></v-text-field>
        </v-container>
        <v-container class="input">
          <label>Upload File</label>
          <v-file-input variant="outlined" type="file" ref="file" @change="handleFile(file)" required></v-file-input>
        </v-container>
        <v-container class="input">        
          <button class="button">Submit</button>
        </v-container>
      </v-form>
      <v-container class="routeList">
        <h2>Routes: </h2>
        <v-container class="route" :key="r.name" v-for="(r) in routes">          
          <p>{{ r.name }} ID: {{ r.id }}</p>
          <v-btn @click="deleteRoute(r.id)">DELETE</v-btn>
        </v-container>
      </v-container>     

    </div>
</template>

<script>
export default {
  async mounted() {
    await this.fetchRoutes();
  },
  data() {
    return {
      newRoute: null,
      routeName: "",
      gpx: "", 
      routes: null,
    };
  },
  methods: {
    async deleteRoute(id) {
      // DELETE request using fetch with async/await
      let response = await fetch(`http://localhost:3000/v1/geo/${id}`, {
        method: "DELETE",
      });
      response = await response.json();
      this.routes = this.routes.filter((r) => {
        //update route list
        return r.id !== Number(response.id);
      });
    },
    async fetchRoutes() {
      //to display
      try {
        let response = await fetch("http://localhost:3000/v1/geo"); //eventually change to env variable
        response = await response.json();
        this.routes = response.routes.map((r) => {
          return {
            ...r,
            data: JSON.parse(r.route),
          };
        });
      } catch (error) {
        console.error(error);
      }
    },
    handleFile(event) {
      const selectedFile = this.$refs.file.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        const tj = require("@tmcw/togeojson");
        reader.onload = async (e) => {
          const fileContent = e.target.result;
          // Create a new Blob with the file content
          const blob = new Blob([fileContent], { type: "text/plain" });
          let text = await blob.text();
          this.gpx = btoa(text)
          //this.gpx = blob //to be sent to db
          const gpxFile = new DOMParser().parseFromString(text, "text/xml");
          const converted = tj.gpx(gpxFile);
          this.newRoute = converted; //<-- place converted json into data object
          return converted;
        };
        reader.readAsText(selectedFile);
      }
    },
    async handleSubmit() {
      try {
        console.log(this.routeName, this.newRoute, this.gpx);
        const response = await this.postRoute(
          this.newRoute,
          this.routeName,
          this.gpx
        );
        if (response && response.message === "success!") {
          //have backend return response object with code?
          await this.fetchRoutes();
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    async postRoute() {
      let response = await fetch(`http://localhost:3000/v1/geo/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // data you intend to send as JSON to the server
          route: this.newRoute,
          name: this.routeName,
          gpx: this.gpx,
        }),
      });
      response = await response.json();
      return response;
    },
  },
};
</script>

<style>
.add-route-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.add-route-container .routeForm {
  display: flex;
  flex-direction: column;
  text-align: left;
  background: #eee;
  margin: 0 0 10px 0;
  width: 50%; 
  color: #083a8c;
  
  
}

.add-route-container .routeForm .input label {
  text-align: left;
  margin-right: 10px;
}

.add-route-container .routeList {
  text-align: center;
  background: white;
  width: 50%;
  
}

.routeList h2 {
  color: white;
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

.routeList
{ 
  font-family: roboto;    
}




</style>
