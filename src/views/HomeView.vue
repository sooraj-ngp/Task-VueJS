<template>
  <!-- <hello-world /> -->
  <div>
    <v-card
      :key="n"
      class="pa-2 card"
      max-width="400"
      outlined
      tile
    >
      <v-text-field
        v-model="name"
        :rules="rules.name"
        color="blue darken-2"
        label="Name"
        outlined
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="rules.email"
        color="blue darken-2"
        label="Email"
        outlined
        required
      ></v-text-field>
      <v-text-field
        v-model="passwordLength"
        color="blue darken-2"
        label="Password Length"
        :rules="rules.passwordLength"
        outlined
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        color="blue darken-2"
        label="Password"
        readonly
        outlined
      ></v-text-field>
      Gender:
      <v-radio-group v-model="radioGroup" >
        <v-row>
          <v-col>
            <v-radio
              label="Male"
              value="radio-male"
            ></v-radio>
          </v-col>
          <v-col>
            <v-radio
              label="Female"
              value="radio-female"
            ></v-radio>
          </v-col>
        </v-row>
      </v-radio-group>
      Hobbies:
      <v-row>
        <v-col>
          <v-checkbox
            v-model="selected"
            label="Movies"
            value="Movies"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="selected"
            label="Series"
            value="Series"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="selected"
            label="Gaming"
            value="Gaming"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-combobox
        v-model="location"
        :items="items"
        label="Location"
        
        outlined
      ></v-combobox>

      </v-card>

      <!-- <button @click="add">Submit</button> -->
  </div>
</template>


<script>
export default {
  data(){
    return {
      name: '',
      email: '',
      passwordLength: '',
      selected: [],
      rules: {
        name: [val => (val || '').length > 0 || 'This field is required', val => (!val) || /^[a-zA-Z\s]*$/.test(val) || 'Name must be in alphabets only'],
        email: [val => (val || '').length > 0 || 'This field is required', val => !val || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'E-mail must be valid'],
        passwordLength: [val => (val|| '').length > 0 || 'This field is required', val => (7 < (val)) && ((val) < 21) || 'Password length must be between 8 and 20']
      },
      location: [],
      items: [
        'Chennai',
        'Bangalore',
        'Hyderabad'
      ],
    }
  },
  
  methods:{
    
  }
}
 // import HelloWorld from '../components/ArithmeticOperations'

  // export default {
  //   name: 'HomeView',

  //   components: {
  //     HelloWorld,
  //   },
  // }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card{
  margin-top: 1%;
  margin-left: 37%; 
}
</style>

