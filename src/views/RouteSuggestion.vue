<template> 

    <v-form @submit.prevent="submit">
        <v-text-field
            v-model="name"
            label="Name"
            required
        />
        
        <v-file-input
           
            label="GPX File"
            accept=".gpx"
            required
            type="file"
            ref="file"
            
        ></v-file-input>

        <v-btn type="submit">Submit</v-btn>  
    
    </v-form>

</template>

<script setup>

import { ref } from 'vue';


    let file = ref();
    let handleFile = () => {
        let fileContent = file.value.files[0];
        console.log(fileContent);
    }

    
</script>

<style> 

</style>