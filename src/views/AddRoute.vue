<template>
  <div class="add-route-container"> 
      <form class="routeForm" @submit.prevent="handleSubmit">
        <div class="input">
          <label>Route Name </label>
          <input type="text" name="routeName" v-model="routeName" required>
        </div>
        <div class="input">
          <label>Upload File </label>
          <input type="file" ref="file" @change="gpxToJSON(file)" required>
        </div>
        <div class="input">        
          <button class="button">Submit</button>
        </div>
      </form>
      <div class="routeList">
        <h2>Routes: </h2>
        <div class="route" :key="r.name" v-for="(r) in routes">
          <p>{{ r.name }} ID: {{ r.id }}</p>
          <button @click="deleteRoute(r.id)">DELETE</button>
        </div>
      </div>
    </div>


  </template>
  
  <script>
  export default {
    async mounted(){
      await this.fetchRoutes()
    },
    data() {
      return {
          newRoute: null,
          routeName: '',
          gpx: '',//TODO: add gpx to string parsing
          routes: null,
      }
    },
    methods: {
      async deleteRoute(id) {
        // DELETE request using fetch with async/await
        let response = await fetch(`http://localhost:3000/v1/geo/${id}`, { method: 'DELETE' });
        response = await response.json();
        this.routes = this.routes.filter(r => {//update route list
          return r.id !==  Number(response.id)
        })
        
      },
        async fetchRoutes() {//to display
        try {
          let response = await fetch('http://localhost:3000/v1/geo');//eventually change to env variable
          response = await response.json();
          this.routes = response.routes.map(r => {
            return {
              ...r,
              data: JSON.parse(r.route)
            }
          })
        } catch (error) {
          console.error(error);
        }
      },
        gpxToJSON(event) {
            const selectedFile = this.$refs.file.files[0];
            if (selectedFile) {
            const reader = new FileReader();
            const tj = require("@tmcw/togeojson"); 
            reader.onload = async (e) => {
                const fileContent = e.target.result;
                // Create a new Blob with the file content
                const blob = new Blob([fileContent], { type: 'text/plain' })
                let text = await blob.text()
                const newJSON = new DOMParser().parseFromString(text, "text/xml")
                const converted = tj.gpx(newJSON);
                this.newRoute = converted //<-- place converted json into data object
                return converted
                };
                reader.readAsText(selectedFile);
            }
        },
      async handleSubmit() {
        try {
          console.log(this.routeName, this.newRoute)
          const response = await this.postRoute(this.newRoute, this.routeName, this.gpx);
          if(response && response.message === 'success!') {//have backend return response object with code?
            await this.fetchRoutes();
          }
        } catch (error) {
          console.log('error', error)
        }
      },
      async postRoute( ){
        let response = await fetch(`http://localhost:3000/v1/geo/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // data you intend to send as JSON to the server
            route: this.newRoute,
            name: this.routeName,
            gpx: this.gpx

          })
        })
        response = await response.json();
        return response;
      },
    }
  }
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
  background: lavenderblush;
  margin: 0 0 10px 0;
}

.add-route-container .routeForm .input label {
  text-align: left;
  margin-right: 10px;
}

.add-route-container .routeList {
  text-align: center;
  background: teal;
  max-width: 500px;
  padding: 10px;
}

.routeList h2 {
  color: white;
}

.routeList .route {
  border: 3px solid grey;
  background: #eee;
  margin: 10px 0;
  padding: 10px;
  
}

.input {
  text-align: center;
  padding: 20px;
}


button.button {
  width: 100px;
  
}
</style>