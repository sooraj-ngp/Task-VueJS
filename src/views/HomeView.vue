<template>
  <!-- <hello-world /> -->
  <div>
    <v-row>
      <v-col>
        <h2>Hello {{user}}!</h2>
        <!-- <h2>{{ state.firstName }} {{ state.lastName }}</h2> -->
    
        <v-row>
        <v-col
        cols="5 ">
          <v-card
            class="pa-2 card"
            max-width="350"
            elevation="8"
            outlined
           
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
              :rules="rules.departmentName"
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
                  v-if="!submitButton"
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
              </v-col>
            </v-row>
            <v-row></v-row>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="auto">
          <div>
          <v-row>            
            <v-card>
              <v-card-title>
                Employee Details
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="searchString"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="employeeDetails"
              >
                <template v-slot:[`item.employee_name`]="{ item }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span
                        v-bind="attrs"
                        v-on="on"
                      >{{item.employee_name | nameTruncate(item.employee_name)}}</span>
                    </template>
                  <span>{{ item.employee_name }}</span>
                  </v-tooltip> 
                </template> 
                <template v-slot:[`item.employee_mail`]="{ item }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span
                        v-bind="attrs"
                        v-on="on"
                      >{{item.employee_mail | emailTruncate(item.employee_mail)}}</span>
                    </template>
                  <span>{{ item.employee_mail }}</span>
                  </v-tooltip> 
                </template> 
                <template v-slot:[`item.actions`]="{ index, item }">
                  <v-icon
                    dense
                    class="mr-2"
                    @click="editEmployee(index, item)"
                  >mdi-pencil</v-icon>
                  <v-icon
                    dense
                    @click="deleteDialogClick(index, item)"
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
                          @click="dialog = false"
                        >Cancel</v-btn>
                        <v-btn
                          color="error"
                          @click="deleteEmployee()"
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
              <h2>Total Count: {{ recordCount }}</h2>
              <!-- <h2>{{ employeeDetails }}</h2> -->
            <v-col></v-col>
          </v-row>
          </div>
        </v-col>
      </v-row>
      </v-col>
      <v-col cols="1">
        <div class="button">
          <v-btn 
          color="primary"
          @click="logout">Logout</v-btn>
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

// import axios from 'axios';
// import { createApp } from 'vue'
// import App from '@/App.vue'
// import { createStore } from 'vuex'
// import store from '@/store';
import { mapActions, mapGetters } from 'vuex'
// createApp(App).use(store).mount('#app')

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
      searchString: '',
      alertMessage: false,
      valid: true,
      submitButton:true,
      dialog: false,
      instance: null,
      rowId: 0,
      rowDetail: [],
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
        departmentName: [val => (val != '' && val != null) || 'Department is required'], 
      },
      // departmentIdNames: [],
      details: [],
      userDetails: [],
      newDetails: {},
      oldDetails: {},
    }
  },
  watch:{
    searchString(value){
      this.searchString = value
      if(this.searchString || this.searchString == ''){
        this.stringSearch(this.searchString)
      }

    }
  },
  mounted() {
    // console.log('mounted');
    if(!localStorage.getItem('user')){
      // console.log('hello',localStorage.getItem('user'));
      this.$router.push({ path: "/" })
    }
    else{
      const index = localStorage.getItem('user').indexOf('@')
      // console.log(localStorage.getItem('user').slice(0,index))
      this.user = localStorage.getItem('user').charAt(0).toUpperCase() + localStorage.getItem('user').slice(1, index)
      this.getEmployeeDetails()   
      this.getDepartmentDetails()
      // console.log(this.departmentDetails)
    }
  },
  filters: {
    nameTruncate: function(string) {
      // console.log(string);
      if (string.length > 6) {
        string = string.substring(0, 6) + '...';
      }
      return string
      },
      emailTruncate: function(string) {
      // console.log(string);
      if (string.length > 10) {
        string = string.substring(0, 10) + '...';
      }
      return string
      }
    },
  computed:{
    ...mapGetters("employeeInfo",[
      'employeeDetails', 'departmentDetails', 'recordCount', 'departments', 'departmentsCheck ', 
      'departmentNames', 'departmentName', 'departmentId' 
    ]),
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
    ...mapActions("employeeInfo",[
      'getEmployeeDetails', 'getDepartmentDetails', 'insertEmployeeDetail', 'deleteEmployeeDetail', 
      'updateEmployeeDetail', 'getDepartmentName', 'getDepartmentId', 'stringSearch'
    ]),
    view(){ 
      this.instance.get('/employee/selectAll')
      .then((response) => {
        this.employeeDetails = response.data
        // console.log(this.employeeDetails);
      })
    },
    submit(){
      if(!this.$refs.form.validate()){
        // console.log('error');
        this.snackbar = true
      }
      else{
        this.snackbar = false
        this.employee.departmentId = this.departments[this.employee.departmentName]
        // console.log(this.employee.departmentId)
        this.insertEmployeeDetail({
          employeeName: this.employee.name,
          employeeMail: this.employee.email.toLowerCase(),
          employeeNumber: this.employee.phoneNumber,
          departmentId: this.employee.departmentId
        })
        this.getEmployeeDetails()
        this.$refs.form.reset()
      }
    },
    reset(){
      this.$refs.form.reset()
      this.submitButton = true
    },
    deleteDialogClick(row){
      // console.log('click');
      this.dialog = true
      this.rowDetail = row
    },
    deleteEmployee(){
      // console.log(this.index,this.rowDetail.employee_id);
      this.deleteEmployeeDetail(this.rowDetail.employee_id)
      this.getEmployeeDetails()
      this.$refs.form.reset()
      this.submitButton = true
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
      // console.log(this.$store.state.departmentsCheck)
      this.getDepartmentName(this.employee.departmentId)
      this.employee.departmentName = this.departmentName
      // this.employee.departmentName = this.departmentsCheck[this.employee.departmentId]
      // console.log(this.oldDetails);
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
        updateDetails.employeeMail = this.employee.email.toLowerCase()
      }
      if(this.employeeDetails[this.rowId].employee_number != this.employee.phoneNumber){
        updateDetails.employeeNumber = this.employee.phoneNumber
      }
      if(this.employeeDetails[this.rowId].department_id != this.departments[this.employee.departmentName]){
        this.getDepartmentId(this.employee.departmentName)
        updateDetails.departmentId = this.departmentId
      }
      // console.log(updateDetails);
      this.updateEmployeeDetail(updateDetails)
      this.getEmployeeDetails()
      this.$refs.form.reset()
      this.submitButton = true
    },
    logout(){
      localStorage.clear();
      this.$router.push({ path: "/" })
    }
  }

}

</script>

<style scoped>
h2{
  color: white
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

