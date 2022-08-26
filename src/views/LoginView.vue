<template>
  <!-- <hello-world /> -->
  <div>
    <v-row></v-row>
    <v-row class="justify-center">
        <v-col></v-col>
        <v-col>
        <v-card
          class="pa-2 mx-auto card"
          max-width="350"
          elevation="8"
          outlined
          tile
        >
        <v-snackbar
            v-model="snackbar"
            :timeout="3000">
            Enter a valid input
            <template v-slot:action="{ attrs }">
              <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >close</v-btn>
            </template>
          </v-snackbar>
          
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
            <h1>Login </h1>
          <v-text-field
            v-model="email"
            :rules="rules.email"
            color="blue darken-2"
            label="Email"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"

            @click:append="show = !show"
            color="blue darken-2"
            label="Password"
            :rules="rules.password"
            outlined
            required
          ></v-text-field>
         
          <v-row>
            <v-col></v-col>
            <v-col>
                <!-- <v-btn 
                    color="primary"
                    class="button"
                    to="/"><router-link to="/login"></router-link>Login</v-btn> -->
              <v-btn
                elevation="4"
                color="primary"
                @click="login"
              >Login</v-btn>
            </v-col>
            <v-col></v-col>
          </v-row>
          <v-row></v-row>
          </v-form>
        </v-card>
        </v-col>
        <v-col></v-col>
    </v-row>
  </div>
</template>

<script>

// import axios from 'axios';

export default {
  data(){
    return {
      email: '',
      password: '',
      rules: {
        email: [val => (val != '' && val != null)|| 'Email is required', val => (!val) || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'E-mail must be valid'],
        password: [val => (val != '' && val != null) || 'Password is required', v => v.length >= 8 || 'Min 8 characters', v => v.length <= 20 || 'Max 20 characters']
      },
      show: false,
      snackbar: false,
      valid: true
    }
  },
  methods:{
    login(){ 
      if(!this.$refs.form.validate()){
        console.log('error');
        this.snackbar = true
      }
      else{
        if(this.email == 'sooraj@gmail.com' || this.password == 'Sooraj!123'){
            this.$router.push({ path: "/" })
            localStorage.setItem('user', this.email)
        }
      }
    },
    view(){
      console.log(localStorage.getItem('user',), 'user');
      }
    }
}

</script>

<style scoped>
h2{
  color:white
}
h1{
  text-align: center;
}
.card{
  margin-top: 35%; 
}
.table{
  margin-top: 5%;
}
</style>

