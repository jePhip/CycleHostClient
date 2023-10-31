
<template> 
   <div>   
             
        <!-- login form for admin-->
        <div class="centered-container">
            <h2>Admin Login</h2>    
            <v-sheet>       
                <v-form v-model="form" ref="form" class="login-form">             
                    <!-- text field to get username from admin -->
                    <v-text-field label="Username" v-model="title"  :rules="inputRules" type="input"></v-text-field>
                    <!-- text field to get password from admin-->
                    <v-text-field label="Password" type="input" v-model="content" hint="Enter your password to access routes"></v-text-field>
                    <!-- button to submit the form and complete login-->
                    <br>
                    <v-btn flat class="success mx-0 mt-3" @click="submit" type="submit">Sign In</v-btn>
                </v-form>
            </v-sheet>           
        </div>    
    </div>   
</template>

<script> 
export default{
data() {
    return{
        title: '',
        content: '',
        inputRules: [
            v => v.length >= 3 || ''
        ]
    }
},
methods: {
    submit() {
        if (this.$refs.form.validate()){
        console.log(this.title, this.content)
        }
    }
},
}
</script>

<style> 

.centered-container
{ 
    margin: auto;
    width: 50%;
    text-align: center;
}




</style>