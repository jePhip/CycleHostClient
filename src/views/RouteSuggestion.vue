<template>

  
    <v-container>
      <div v-if="success">
        <v-alert 
        type="success"
        title="Suggestion Submitted!"
        text="Your route has been submitted for review by the City of Bolivar!">
      </v-alert>
      </div>

      <div v-if="!valid" >
        <v-alert class="invalidForm"
          type="warning"
          title="Invalid Form Input"
          text="Please include GPX file and name of route."
          width="max"
        >     

        </v-alert>

      </div>

      <v-container class="description" v-show="!success">
        <v-card
          width="max"
          prepend-icon="mdi-map-marker-outline"
          color="#083a8c"
          class="justify-center"
        >
          <template v-slot:title> Submit a route! </template>

          <v-card-text>
            Please use the form below to submit a route suggestion for the cycling website!
            <br>
            Your submission will be reviewed by the City of Bolivar.
            <br>
            Please include the name of your route, associated GPX file, points of interest you would like to include along the route, and optionally your contact information. 
          </v-card-text>
        </v-card>
        
      </v-container>
  
      <form v-show="!success"
        class="formContainer"
        @submit.prevent="handleSubmit"
        enctype="multipart/form-data"
        id="form"
        name="form"
        ref="form"
      >
        <v-text-field
          variant="outlined"
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

        <v-text-field
          variant="outlined"
          label="Points of Interest"
          prepend-icon="mdi-map-marker-radius"
          v-model="poi"
          name="poi"
          id="poi"          
        ></v-text-field>

        <v-text-field
          variant="outlined"
          label="Email"
          prepend-icon="mdi-email"
          v-model="email"
          name="email"
          id="email"
          type="email"
          

        >
        </v-text-field>
  
        <v-btn @click="submit" class="submit" type="submit">submit</v-btn>
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
        success: false,
        email: "",
        poi: "",
        valid: true,

      };
    },
  
    methods: {

      // handle file once uploaded 
      handleFile() {
        this.file = this.$refs.file.files[0];
        console.log(this.file);
        
      },
      
      // send data to backend 
      async postSuggestion()
      { 

        const blob = new Blob([this.file], { type: "text/plain" });
        const text = await blob.text();
        console.log(text);
        

       /* const formData = new FormData();
        formData.append('name', this.name);
        formData.append('route', text);
        console.log(formData);*/

        

        let response = await fetch('http://localhost:3000/v1/email/', {
          method: "POST",
          headers: 
          { 
            "Content-Type": "application/json",
             
          },
          body: JSON.stringify({
            name: this.name,
            file: text,
            poi: this.poi,
            email: this.email

          })
          
        })
        //response = await response.json();
        return response;
      },

      // subbmit 
      async submit(){ 
        try{

          if(!this.file || !this.name){
            this.valid=false;
            return;
          }else{
            this.valid=true;
          }

          const response = await this.postSuggestion(
            this.file,
            this.name
          );       
          console.log(response);   
            //setTimeout(() => {
            //location.reload();
        //}, 1000);

        if (response.status === 200){
          this.success = true;
        }
        }
        catch(e){
          console.log("error:\n");
          console.log(e);

        }     

      }
    },
  };
  </script>
  
  <style>
  .formContainer {
    max-width: 500px;
    color: #083a8c;
    padding: 10px;
  }

  .invalidForm {
    padding: 20px;
   
  }

  
  
  </style>