<template>
  <p>Empty</p>
  <v-file-input
          label="Upload .gpx File"
          variant="outlined"
          accept=".gpx"
          type="file"
          ref="file"
          required
        ></v-file-input>
<v-btn @click="console.log(bt())"></v-btn>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
let file = ref();
let someFunc = () => {
  let fileContent = file.value.files[0];
  console.log(fileContent);
}

</script>

<style>

</style>