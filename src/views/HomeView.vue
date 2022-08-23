<template>
  <!-- <hello-world /> -->
  <div>
    <v-row>
      <v-col
      cols="4">
        <v-card
          class="pa-2 card"
          max-width="450"
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
            v-on:keyup.enter="generatePassword"
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

          <v-combobox
            v-model="location"
            :rules="rules.location"
            :items="locations"
            label="Location"
            clearable
            outlined
          ></v-combobox>
          Gender:
          <v-radio-group v-model="gender" required>
            <v-row>
              <v-col></v-col>
              <v-col>
                <v-radio
                  label="Male"
                  value="Male"
                ></v-radio>
              </v-col>
              <v-col>
                <v-radio
                  label="Female"
                  value="Female"
                ></v-radio>
              </v-col>
              <v-col></v-col>
            </v-row>
          </v-radio-group>
          Hobbies:
          <v-row>
            <v-col 
            cols="4"
              md="3">
              <v-checkbox
                v-model="interests"
                label="Music"
                value="Music"
              ></v-checkbox>
            </v-col>
            <v-col
            cols="4"
              md="3">
              <v-checkbox
                v-model="interests"
                label="Movies"
                value="Movies"
              ></v-checkbox>
            </v-col>
            <v-col 
            cols="4"
              md="3">
              <v-checkbox
                v-model="interests"
                label="Series"
                value="Series"
              ></v-checkbox>
            </v-col>
            <v-col
            cols="4"
              md="3">
              <v-checkbox
                v-model="interests"
                label="Gaming"
                value="Gaming"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col></v-col>
            <v-col>
              <v-btn
                elevation="4"
                color="primary"
                :disabled="isSubmitDisabled"
                @click="submit"
              >Submit</v-btn>
              
            </v-col>
            <v-col>
              <v-btn
                elevation="4"
                color="primary"
                :disabled="isResetDisabled"
                
                @click="clear"
              >Reset</v-btn>
            </v-col>
            <v-col></v-col>
          </v-row>
          <v-row></v-row>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <v-row>
          <!-- <v-btn
          @click="view"
          class="table">
            View
          </v-btn> -->
        </v-row>
        <v-row>
          <v-simple-table class="table" :headers="headers">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    S.No
                  </th>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Email
                  </th>
                  <th class="text-left">
                    Gender
                  </th>
                  <th class="text-left">
                    Hobbies
                  </th>
                  <th class="text-left">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(entry, index) in details"
                  :key="index"
                >
                  <td>{{ index+1 }}</td>
                  <td>{{ entry.name }}</td>
                  <td>{{ entry.email }}</td>
                  <td>{{ entry.gender }}</td>
                  <td>{{ entry.interests }}</td>
                  <td>{{ entry.location }}</td>
                  <td>
                    <v-btn
                    depressed
                    @click="edit">
                        <v-icon>{{ icons.mdiPencil }}</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn
                    depressed
                    @click="deleteUser(index)">
                      <v-icon>{{ icons.mdiDelete }}</v-icon>
                    </v-btn>
                    </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

        </v-row>
      </v-col>
      <!-- <v-col></v-col> -->
    </v-row>
  </div>
</template>

<script>
import {
  mdiPencil,
  mdiDelete,
} from '@mdi/js'

export default {
  
  data(){
    return {
      icons: {
        mdiPencil,
        mdiDelete,
      },
      name: '',
      email: '',
      passwordLength: '',
      password: '',
      alertMessage: false,
      valid: true,
      location: '',
      count: 0,
      gender: '',
      interests: [],
      snackbar: false,
      rules: {
        name: [val => (val || '').length > 0 || 'This field is required', val => (!val) || /^[a-zA-Z\s]*$/.test(val) || 'This field must be in alphabets only'],
        email: [val => (val || '').length > 0 || 'This field is required', val => (!val) || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'E-mail must be valid'],
        passwordLength: [val => (val|| '').length > 0 || 'This field is required', val => (!val) || /^[0-9]*$/.test(val) || 'This field must be in numbers only', val => (7 < (val)) && ((val) < 21) || 'Password length must be between 8 and 20'],
        location: [val => (val || '').length > 0 || 'This field is required'], 
      },
      locations: ['Chennai','Bangalore','Hyderabad','Pune','Mumbai','Delhi','Kolkata'],
      details: [],
      userDetails: [],
      headers: [
        { text: "S.No", value: "name", width: "20%" },
        { text: "Calories", value: "calories", width: "50%" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs", width: "200px" },
      ],
    }
  },
  computed:{
    isSubmitDisabled() {
      return (
        this.name.length === 0 ||
        this.email.length === 0 ||
        this.passwordLength.length === 0 ||
        this.gender.length === 0 ||
        this.interests.length === 0 ||
        this.location.length === 0 
      )
    },
    isResetDisabled() {
      return (
        this.name.length === 0 &&
        this.email.length === 0 &&
        this.passwordLength.length === 0 &&
        this.gender.length === 0 &&
        this.interests.length === 0 &&
        this.location.length === 0 
      )
    }

  },
  watch:{
    passwordLength(value){
      this.passwordLength = value
      if(value<8 || value>20 || /^[a-zA-Z\s]*$/.test(value)){
        this.password = ''
      }
      else{
        this.generatePassword()
      }
    }
  },
  
  methods:{
    view(){
      console.log(this.userDetails)
    },
    submit(){    
      // this.alertMessage = false 
      if(!this.$refs.form.validate()){
        console.log('error');
        this.snackbar = true
      }
      else{
        this.snackbar = false
        this.count+=1
        this.details.push({
          count: this.count,
          name: this.name,
          email: this.email,
          gender: this.gender,
          interests: this.interests,
          location: this.location
        })
        this.$refs.form.reset()
      }
    },
    deleteUser(id){
      this.details.splice(id,1)
    },
    clear(){
      this.$refs.form.reset()
    },
    generatePassword(){
      // console.log("password");
      const Allowed = {
        Uppers: "QWERTYUIOPASDFGHJKLZXCVBNM",
        Lowers: "qwertyuiopasdfghjklzxcvbnm",
        Numbers: "1234567890",
        Symbols: "!@#$%^&*"
      }

      const getRandomCharFromString = (str) => str.charAt(Math.floor(Math.random() * str.length))

      const generate = (length = this.passwordLength) => { 
        let pwd = "";
        pwd += getRandomCharFromString(Allowed.Uppers); 
        pwd += getRandomCharFromString(Allowed.Lowers); 
        pwd += getRandomCharFromString(Allowed.Numbers); 
        pwd += getRandomCharFromString(Allowed.Symbols);
        for (let i = pwd.length; i < length; i++)
          pwd += getRandomCharFromString(Object.values(Allowed).join('')); 
        return pwd
      }
      this.password = generate(this.passwordLength)
    }
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
  margin-top: 4%;
  margin-left: 4%; 
}
.table{
  margin-top: 5%;
}
</style>

