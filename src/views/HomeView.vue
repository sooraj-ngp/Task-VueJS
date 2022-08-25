<template>
  <!-- <hello-world /> -->
  <div>
    <v-row>
      <v-col
      cols="4">
        <v-card
          class="pa-2 card"
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
            <h1>Employee </h1>
          <v-text-field
            v-model="employee.name"
            :rules="rules.name"
            color="blue darken-2"
            label="Name"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.email"
            v-on:keyup.enter="generatePassword"
            :rules="rules.email"
            color="blue darken-2"
            label="Email"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.phoneNumber"
            color="blue darken-2"
            label="Phone Number"
            maxlength="10"
            :rules="rules.phoneNumber"
            outlined
            required
          ></v-text-field>

          <v-combobox
            v-model="employee.departmentId"
            :rules="rules.department"
            :items="departmentIds"
            label="Department Id"
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
                v-if="submitButton"
                @click="submit"
              >Submit</v-btn>
              <v-btn
                color="primary"
                v-if="updateButton"
                @click="updateUser">
                Update
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                elevation="4"
                color="primary"
                outlined
                :disabled="isResetDisabled"
                @click="$refs.form.reset()"
              >Reset</v-btn>
            </v-col>
            <v-col></v-col>
          </v-row>
          <v-row></v-row>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <div v-if="employeeDetails.length>0">
        <v-row>
          <v-simple-table 
            class="table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Employee Id
                  </th>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Email
                  </th>
                  <th class="text-left">
                    Phone Number
                  </th>
                  <th class="text-left">
                    Department Id
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(entry, index) in employeeDetails"
                  :key="entry.employee_id"
                >
                  <td>{{ entry.employee_id }}</td>
                  <td>{{ entry.employee_name }}</td>
                  <td>{{ entry.employee_mail }}</td>
                  <td>{{ entry.employee_number }}</td>
                  <td>{{ entry.department_id }}</td>
                  <td>
                    <v-btn
                    depressed
                    @click="editUser(index)">
                        <v-icon>{{ icons.mdiPencil }}</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn
                    depressed
                    @click="deleteClick">
                    <v-icon>{{ icons.mdiDelete }}</v-icon>
                    </v-btn>
                  </td>
                  <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="290"
                  >
                    <v-card>
                      <v-card-title class="text-h5">
                        Do you want to Delete this record?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color=""
                          text
                          @click="dialog = false"
                        >Cancel</v-btn>
                        <v-btn
                          color="error"
                          @click="deleteUser(entry.employee_id)"
                        >Delete</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-row>
        <v-row>
          <v-col></v-col>
            <h2>Total Count: {{ employeeDetails.length }}</h2>
          <v-col></v-col>
        </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  mdiPencil,
  mdiDelete,
} from '@mdi/js'

import axios from 'axios';

export default {
  data(){
    return {
      icons: {
        mdiPencil,
        mdiDelete,
      },
      employee:{
        name: '',
        email: '',
        phoneNumber: '',
        departmentId: ''
      },
      name: '',
      email: '',
      passwordLength: '',
      password: '',
      alertMessage: false,
      valid: true,
      updateButton:false,
      submitButton:true,
      dialog: false,
      location: '',
      gender: '',
      instance: null,
      employeeDetails: [],
      departmentDetails: [],
      rowId: 0,
      hobbies: [],
      snackbar: false,
      rules: {
        name: [val => (val != '' && val != null)|| 'Name is required', val => (!val) || /^[a-zA-Z\s]*$/.test(val) || 'Name must be in alphabets only'],
        email: [val => (val != '' && val != null)|| 'Email is required', val => (!val) || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'E-mail must be valid'],
        phoneNumber: [val => (val != '' && val != null) || 'Phone Number is required', val => (!val) || /^[0-9]+$/.test(val) || 'Phone Number must be in numbers only'],
        department: [val => (val != '' && val != null) || 'Department is required'], 
      },
      departments: [],
      departmentIds: [],
      departmentNames: [],
      details: [],
      userDetails: [],

    }
  },
  mounted() {
    this.instance = axios.create({
      baseURL: 'http://127.0.0.1:3333',
      headers:{
        'Content-type': 'application/json'
      }
    })
    this.instance.get('/employee/selectAll')
    .then((response) => {
      this.employeeDetails = response.data
      // console.log(this.employeeDetails);
    })
    this.instance.get('/department/selectAll')
    .then((response) => {
      // console.log(response.data)
      this.departmentDetails = response.data.sort()
      for(let i=0; i<this.departmentDetails.length; i++){
        this.departmentIds.push(this.departmentDetails[i].department_id)
        this.departmentNames.push(this.departmentDetails[i].department_name)
      }
      this.departmentIds.sort()
      // console.log(this.departmentNames);
    })
  },
  computed:{
    isSubmitDisabled() {
      if(!this.employee.name || !this.employee.email || !this.employee.phoneNumber || !this.employee.departmentId){
        return true
      } else return false
    },
    isResetDisabled() {
      if(!this.employee.name && !this.employee.email && !this.employee.phoneNumber && !this.employee.departmentId){
        return true
      } else return false
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
      // console.log(this.hobbies.length);   
      // this.alertMessage = false 
      if(!this.$refs.form.validate()){
        console.log('error');
        this.snackbar = true
      }
      else{
        this.snackbar = false
        this.instance.post('/employee/insert',{
          employeeName: this.employee.name,
          employeeMail: this.employee.email.toLowerCase(),
          employeeNumber: this.employee.phoneNumber,
          departmentId: this.employee.departmentId
        })
        this.$refs.form.reset()
      }
    },
    deleteClick(){
      this.dialog = true
    },
    deleteUser(id){
      this.instance.delete('/employee/delete/'+id)
      this.$refs.form.reset()
      this.updateButton = false
      this.submitButton = true
      this.dialog = false
    },
    editUser(id){
      console.log(this.employeeDetails[id]);
      this.rowId = id
      this.employee.name = this.employeeDetails[id].employee_name
      this.employee.email = this.employeeDetails[id].employee_mail
      this.employee.phoneNumber = this.employeeDetails[id].employee_number
      this.employee.departmentId = this.employeeDetails[id].department_id
      this.updateButton = true
      this.submitButton = false
    },
    updateUser(){
      this.instance.patch('/employee/update',{
        employeeName:this.employee.name,
        employeeMail:this.employee.email.toLowerCase(),
        employeeNumber:this.employee.phoneNumber,
        departmentId:this.employee.departmentId
      })
      // this.employeeDetails[this.rowId].employee_name = this.employee.name
      // this.employeeDetails[this.rowId].employee_mail = this.employee.email 
      // this.employeeDetails[this.rowId].employee_number = this.employee.phoneNumber 
      // this.employeeDetails[this.rowId].department_id = this.employee.departmentId 
      this.$refs.form.reset()
      this.updateButton = false
      this.submitButton = true
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
h2{
  color:white
}
h1{
  text-align: center;
}
.card{
  margin-top: 4%;
  margin-left: 4%; 
}
.table{
  margin-top: 5%;
}
</style>

