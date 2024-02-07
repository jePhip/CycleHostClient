<template>
  <v-container>
    <div class="text-h4" style="text-align: center">Suggest a route!</div>
    <v-container class="description">
      Please use the form below if you have a route you would like to see
      included in the Bolivar Cycling website!
      <br />
      Please provide a name for the route along with its associated GPX file.
      <br />
      Your submission will be reviewed by the City of Bolivar.
      <br />
    </v-container>
  </v-container>
  <v-row justify="center">
    <v-col style="margin: 20px" sm="11" md="6" lg="3">
      <form
        class="formContainer"
        @submit.prevent="handleSubmit"
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

        <v-btn @click="submit" class="submit" type="submit">submit</v-btn>
      </form>
    </v-col>
  </v-row>
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
    // handle file once uploaded
    handleFile() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },

    // send data to backend
    async postSuggestion() {
      const blob = new Blob([this.file], { type: "text/plain" });
      const text = await blob.text();
      console.log(text);

      /* const formData = new FormData();
        formData.append('name', this.name);
        formData.append('route', text);
        console.log(formData);*/

      let response = await fetch("http://localhost:3000/v1/email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          file: text,
        }),
      });
      //response = await response.json();
      return response;
    },

    // subbmit
    async submit() {
      try {
        const response = await this.postSuggestion(this.file, this.name);
        console.log(response);
        setTimeout(() => {
          location.reload();
        }, 1000);
      } catch (e) {
        console.log("error:\n");
        console.log(e);
      }
    },
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
