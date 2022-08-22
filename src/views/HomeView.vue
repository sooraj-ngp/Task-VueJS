<template>
  <!-- <hello-world /> -->
  <div>
    <v-row>
      <v-col>
        <v-card
          class="pa-2 card"
          max-width="450"
          elevation="8"
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
          Gender:
          <v-radio-group v-model="gender" required>
            <v-row>
              <v-col></v-col>
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
          <v-combobox
            v-model="location"
            :rules="rules.location"
            :items="locations"
            label="Location"
            clearable
            outlined
          ></v-combobox>
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
        </v-card>
      </v-col>
      <v-col>
        <v-btn
        @click="view">
          View
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: '',
      email: '',
      passwordLength: '',
      password: '',
      buttonView: false,
      location: '',
      gender: [],
      interests: [],
      rules: {
        name: [val => (val || '').length > 0 || 'This field is required', val => (!val) || /^[a-zA-Z\s]*$/.test(val) || 'This field must be in alphabets only'],
        email: [val => (val || '').length > 0 || 'This field is required', val => (!val) || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'E-mail must be valid'],
        passwordLength: [val => (val|| '').length > 0 || 'This field is required', val => (!val) || /^[0-9]*$/.test(val) || 'This field must be in numbers only', val => (7 < (val)) && ((val) < 21) || 'Password length must be between 8 and 20'],
        location: [val => (val || '').length > 0 || 'This field is required']
      },
      locations: ['Chennai','Bangalore','Hyderabad','Pune','Mumbai','Delhi','Kolkata'],
      detail: [],
      userDetails: [],
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
      this.userDetails = localStorage.getItem('userDetails')
      console.log(this.userDetails)
    },
    submit(){
      this.detail.push({
        name: this.name,
        email: this.email,
        gender: this.gender,
        interests: this.interests,
        location: this.location
      })
      localStorage.setItem('userDetails',JSON.stringify(this.detail))
      alert('Form Submitted!')
      this.name = ''
      this.email = ''
      this.passwordLength = ''
      this.location = ''
      this.gender = []
      this.interests = []
    },
    clear(){
      window.location.reload()
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
  margin-top: 2%;
  margin-left: 2%; 
}
</style>

