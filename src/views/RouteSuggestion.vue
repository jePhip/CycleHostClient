<template>
    <v-container>
      <v-container class="description">
        Please use the form below if you have a route you would like to see
        included in the Bolivar Cycling website!
        <br />
        Please provide a name for the route along with its associated GPX file.
        <br />
        Your submission will be reviewed by the City of Bolivar.
        <br />
      </v-container>
  
      <form
        class="formContainer"
        @submit.prevent="sendEmail"
        enctype="multipart/form-data"
        id="form"
        name="form"
        ref="form"
      >
        <v-text-field
          label="Route Name"
          prepend-icon="mdi-bike"
          v-model="name"
          name="name"
          id="name"
          required
        >
        </v-text-field>
  
        <v-file-input
          label="Upload .gpx File"
          variant="outlined"
          type="file"
          ref="file"
          @change="handleFile()"
          required
          name="file"
          accept=".gpx"
        ></v-file-input>
  
        <v-btn class="submit" type="submit">submit</v-btn>
      </form>
    </v-container>
  </template>
  
  <script>
  
  export default {
    name: "routeSuggestion",
    data() {
      return {
        name: "",
        file: null,
      };
    },
  
    methods: {
      handleFile() {
        const selectedFile = this.$refs.file.files[0];
        console.log(selectedFile);
      },
      
      async postSuggestion()
      { 
        let response = await fetch('http://localhost:3000/v1/email', {
          method: "POST",
          headers: 
          { 
            "Content-Type": "application/json",
          },
          body: 
          { 
            name: this.name,
            route: this.file
          }
        })
      }
    },
  };
  </script>
  
  <style>
  .formContainer {
    max-width: 500px;
    color: #083a8c;
  }
  
  .description {
    text-align: center;
  }
  </style>