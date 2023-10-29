<template> 
   <div>   
        <h2>Admin Login</h2>       
        <!-- login form for admin-->
        <div class="centered-container">
            <v-form v-model="form" class="login-form">             
                <!-- text field to get username from admin -->
                <v-text-field label="Username"></v-text-field>
                <!-- text field to get password from admin-->
                <v-text-field label="Password"></v-text-field>
                <!-- button to submit the form and complete login-->
                <br>
                <v-btn type="submit">Sign In</v-btn>
            </v-form> 
        </div>    
    </div>   
</template>

<script> 

</script>

<style> 




</style>