
<template>
    <div id="Login">
      <h1>Login Form</h1>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input v-model="preusername" type="text" id="username" required>
  
        <label for="password">Password:</label>
        <input v-model="prepassword" type="password" id="password" required>
  
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
            preusername: 'bob', 
            prepassword: 'dylan',
        };
    },

    methods: {
        async login(){
            this.error = '';
            this.message = '';

            await fetch('http://localhost:3000/v1/user/'+this.preusername,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: JSON.stringify({
                    username: this.preusername,
                    password: this.prepassword,
                }),
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
        validation(){
        if(this.preusername == this.username && this.prepassword == this.password){
            validate = true;
            
        }
    }
    
    },
}
</script>

<style> 



</style>