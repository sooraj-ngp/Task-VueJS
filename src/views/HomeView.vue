<template>
  <!-- <hello-world /> -->
  <div>
    <v-row>
      <v-col>
        <h2>Hello {{user}}!</h2>
        <v-row>
        <v-col
        cols="5 ">
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
              v-model="employee.departmentName"
              :items="departmentNames"
              label="Department Name"
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
                  @click="updateEmployee">
                  Update
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  elevation="4"
                  color="primary"
                  outlined
                  :disabled="isResetDisabled"
                  @click="reset"
                >Reset</v-btn>
              </v-col>
              <v-col>
                <!-- <v-btn
                  elevation="4"
                  color="primary"
                  @click="view"
                >view</v-btn> -->
              </v-col>
            </v-row>
            <v-row></v-row>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="auto">
          <div v-if="employeeDetails.length>0">
          <v-row>
            <!-- <v-simple-table 
              class="table"
              :search="search">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">
                      <b>Employee Id</b>
                    </th>
                    <th class="text-center">
                      <b>Name</b>
                    </th>
                    <th class="text-center">
                      <b>Email</b>
                    </th>
                    <th class="text-center">
                      <b>Phone Number</b>
                    </th>
                    <th class="text-center">
                      <b>Department Id</b>
                    </th>
                    <th colspan="2" class="text-center">
                      <b>Action</b>
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(entry, index) in employeeDetails"
                    :key="entry.employee_id"
                  >
                    <td class="text-center">{{ entry.employee_id }}</td>
                    <td class="text-center">{{ entry.employee_name }}</td>
                    <td class="text-center">{{ entry.employee_mail }}</td>
                    <td class="text-center">{{ entry.employee_number }}</td>
                    <td class="text-center">{{ entry.department_id }}</td>
                    <td class="text-center">
                    <v-icon 
                      color="black"
                      @click="editEmployee(index)">{{ icons.mdiPencil }}</v-icon>
                    </td>
                    <td class="text-center">
                      <v-icon
                        color="black" 
                        @click="dialog = true">{{ icons.mdiDelete }}</v-icon>
                    </td>
                    
                    <v-dialog
                      v-model="dialog"
                      persistent
                      max-width="350"
                    >
                      <v-card>
                        <v-card-title class="text-h5">
                          Do you want to <b>delete</b> this record? 
                        </v-card-title>
                        <v-card-actions>
                          <v-btn
                            text
                            @click="closeDialog"
                          >Cancel</v-btn>
                          <v-btn
                            color="error"
                            @click="deleteEmployee(index, entry.employee_id)"
                          >Delete</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </tr>
                </tbody>
              </template>
            </v-simple-table> -->
            
              <v-card>
                  <v-card-title>
                    Employee Details
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                  <v-data-table
                    :headers="headers"
                    :items="employeeDetails"
                    :search="search"
                  >
                    <template v-slot:[`item.actions`]="{ index, item }">
                      <v-icon
                        dense
                        class="mr-2"
                        @click="editEmployee(index, item)"
                      >mdi-pencil</v-icon>
                      <v-icon
                        dense
                        @click="deleteDialogClick()"
                      >mdi-delete</v-icon>
                      <v-dialog
                        v-if="dialog"
                        v-model="dialog"
                        persistent
                        max-width="375"
                      >
                        <v-card>
                          <v-card-title>
                            Do you want to delete this record? 
                          </v-card-title>
                          <v-card-actions>
                            <v-btn
                              text
                              @click="deleteDialogClose"
                            >Cancel</v-btn>
                            <v-btn
                              color="error"
                              @click="deleteEmployee(item)"
                            >Delete</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </template>             
                  </v-data-table>
                </v-card>
                 
          </v-row>
          <v-row>
            <v-col></v-col>
              <h2>Total Count: {{ employeeDetails.length }}</h2>
            <v-col></v-col>
          </v-row>
          </div>
        </v-col>
      </v-row>
      </v-col>
      <v-col cols="1">
        <div class="button">
        <router-link to="/login">
          <v-btn 
          color="primary"
          @click="logout">Logout</v-btn></router-link>
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
        id: '',
        name: '',
        email: '',
        phoneNumber: '',
        departmentId: '',
        departmentName:''
      },
      user:'',
      name: '',
      search: '',
      alertMessage: false,
      valid: true,
      updateButton:false,
      submitButton:true,
      dialog: false,
      instance: null,
      employeeDetails: [],
      departmentDetails: [],
      rowId: 0,
      snackbar: false,
      headers: [
        {
          text: 'Employee Id',
          align: 'center',
          sortable: true,
          value: 'employee_id',
        },
        { text: 'Name', align: 'center', value: 'employee_name' },
        { text: 'Email', align: 'center', value: 'employee_mail' },
        { text: 'Phone Number', align: 'center', value: 'employee_number' },
        { text: 'Department Id', align: 'center', value: 'department_id' },
        { text: 'Action', align: 'center', value: 'actions', sortable: false }
      ],
      rules: {
        name: [val => (val != '' && val != null)|| 'Name is required', val => (!val) || /^[a-zA-Z\s]*$/.test(val) || 'Name must be in alphabets only'],
        email: [val => (val != '' && val != null)|| 'Email is required', val => (!val) || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'E-mail must be valid'],
        phoneNumber: [val => (val != '' && val != null) || 'Phone Number is required', val => (!val) || /^[0-9]+$/.test(val) || 'Phone Number must be in numbers only'],
        department: [val => (val != '' && val != null) || 'Department is required'], 
      },
      departments: {},
      departmentsCheck: [],
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
    if(!localStorage.getItem('user')){
      // console.log('hello',localStorage.getItem('user'));
      this.$router.push({ path: "/login" })
    }
    else{
      this.instance.get('/employee/selectAll')
      .then((response) => {
        this.employeeDetails = response.data.reverse()
        // console.log(this.employeeDetails);
      })
      const index = localStorage.getItem('user').indexOf('@')
      // console.log(localStorage.getItem('user').slice(0,index))
      this.user = localStorage.getItem('user').charAt(0).toUpperCase() + localStorage.getItem('user').slice(1, index)
      this.instance.get('/department/selectAll')
      .then((response) => {
        // console.log(response.data)
        this.departmentDetails = response.data.sort()
        for(let i=0; i<this.departmentDetails.length; i++){
          this.departments[this.departmentDetails[i].department_name] = this.departmentDetails[i].department_id
          this.departmentsCheck[this.departmentDetails[i].department_id] = this.departmentDetails[i].department_name
          this.departmentNames.push(this.departmentDetails[i].department_name)
        }
        // console.log(this.departments);
        // console.log(this.departmentsCheck);
        // console.log(this.departmentNames);
      })
    }
  },
  computed:{
    isSubmitDisabled() {
      if(!this.employee.name || !this.employee.email || !this.employee.phoneNumber || !this.employee.departmentName){
        return true
      } else return false
    },
    isResetDisabled() {
      if(!this.employee.name && !this.employee.email && !this.employee.phoneNumber && !this.employee.departmentName){
        return true
      } else return false
    },
  },  
  methods:{
    view(){ 
      this.instance.get('/employee/selectAll')
      .then((response) => {
        this.employeeDetails = response.data.reverse()
        // console.log(this.employeeDetails);
      })
    },
    submit(){
      if(!this.$refs.form.validate()){
        console.log('error');
        this.snackbar = true
      }
      else{
        this.snackbar = false
        this.employee.departmentId = this.departments[this.employee.departmentName]
        // console.log(this.employee.departmentId)
      
        this.instance.post('/employee/insert',{
          employeeName: this.employee.name,
          employeeMail: this.employee.email.toLowerCase(),
          employeeNumber: this.employee.phoneNumber,
          departmentId: this.employee.departmentId
        }).then((response) => {
          console.log(response.data)
          this.view()
          this.$refs.form.reset()
        })
      }
    },
    reset(){
      this.$refs.form.reset()
      this.updateButton = false
      this.submitButton = true
    },
    deleteDialogClick(){
      console.log('click');
      this.dialog = true
    },
    deleteDialogClose(){
      console.log('close');
      this.dialog = false
    },
    deleteEmployee(row){
      // console.log(row);
      this.instance.delete('/employee/delete/'+row.employee_id)
      .then((response) => {
        console.log(response.data)
        this.view()
      })
      this.dialog = false
    },
    editEmployee(index, row){
      // console.log(index, ' : ', row);
      this.rowId = index
      this.employee.id = row.employee_id
      this.employee.name = row.employee_name
      this.employee.email = row.employee_mail
      this.employee.phoneNumber = row.employee_number
      this.employee.departmentId = row.department_id
      this.employee.departmentName = this.departmentsCheck[this.employee.departmentId]
      this.updateButton = true
      this.submitButton = false
    },
    updateEmployee(){
      // console.log(this.employee.id);
      let updateDetails = {}
      updateDetails.employeeId = this.employee.id
      if(this.employeeDetails[this.rowId].employee_name != this.employee.name){
        updateDetails.employeeName = this.employee.name
      }
      if(this.employeeDetails[this.rowId].employee_mail != this.employee.email){
        updateDetails.employeeMail = this.employee.email
      }
      if(this.employeeDetails[this.rowId].employee_number != this.employee.phoneNumber){
        updateDetails.employeeNumber = this.employee.phoneNumber
      }
      if(this.employeeDetails[this.rowId].department_id != this.departments[this.employee.departmentName]){
        updateDetails.departmentId = this.departments[this.employee.departmentName]
      }
      // console.log(updateDetails);
      this.instance.patch('/employee/update',updateDetails)
      .then((response) => {
        console.log(response.data)
        this.view()
        this.$refs.form.reset()
      })
      this.$refs.form.reset()
      this.updateButton = false
      this.submitButton = true
    },
    logout(){
      localStorage.clear();
      this.$router.push({ path: "/login" })
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
  margin-top: 4%;
  margin-left: 5%; 
}
.table{
  margin-top: 5%;
}
.button{
  margin-top: 10%;
  text-decoration: none;
}
</style>

