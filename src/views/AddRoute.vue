<template>
    <form @submit.prevent="handleSubmit">
      <label>Route Name</label>
      <br>
      <input type="text" v-model="routeName" required>
      <br>
      <label>Upload File</label>
      <br>
      <input type="file" ref="file" @change="gpxToJSON(file)">
      <br>
      <button>Submit</button>
    </form>

    <div class="routeList">
      <div :key="r.name" v-for="(r) in routes">
        <p>{{ r.name }} ID: {{ r.id }}</p>
      </div>
    </div>

  </template>
  
  <script>
  export default {
    async mounted(){
      console.log("mounted")
      await this.fetchRoutes()
      console.log(this.routes)
    },
    data() {
      return {
          newRoute: null,
          routeName: '',
          gpx: '',
          routes: null,
      }
    },
    methods: {
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
                this.newRoute = converted //<--
                return converted
                };
                reader.readAsText(selectedFile);
            }
        },
      handleSubmit() {
        console.log(this.routeName, this.newRoute)
        this.postRoute(this.newRoute, this.routeName, this.gpx)
      },
      postRoute( ){
        fetch(`http://localhost:3000/v1/geo/`, {
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
      },
    }
  }
  </script>

<style>
</style>