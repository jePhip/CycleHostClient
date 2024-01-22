
<template>
    <div id="Login">
      <h1>Login Form</h1>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required>
  
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required>
  
        <button type="submit">Login</button>
      </form>
      <p v-if="error" style="color: red;">{{ error }}</p>
      <p v-if="message" style="color: green;">{{ message }}</p>
    </div>
  </template>

<script> 
export default{
    data(){
        return{
            validate: false,
            error: '',
            message: '',
            username: '',
            password: '',
        };
    },

    methods: {
        async login(){
            this.error = '';
            this.message = '';

            await fetch('http://localhost:3000/v1/user/'+username,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/plain'
                },

            })
            
            .then(response=>response.json())
            .then(data =>{
                this.message=data.message;
            })
            .catch(error=> {
                this.error = 'Invalid username or password';
                console.error('Login failed', error);
            });
        
        },
        
    
    },
}
</script>

<style> 



</style>