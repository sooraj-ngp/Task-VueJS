import Vue from 'vue'
import Vuex from 'vuex'
import modules from "./modules";

Vue.use(Vuex);
export default new Vuex.Store({
  modules
});


// import axios from 'axios';
// import Vue from 'vue'
// import Vuex from 'vuex'
// import env from '@/.env'

// Vue.use(Vuex)

// const instance = axios.create({
//   baseURL: process.env.VUE_APP_URL,
//   headers:{
//     'Content-type': 'application/json',
//     'AppKey':'0ba5ntcQizGig4A0W6FytENeoFiwnvTS'
//   }
// })

// export default new Vuex.Store({
//   state: {
//     allEmployeeDetails: [],
//     allDepartmentDetails: [],
//     employeeDetailsCount : 0,
//   },
//   getters: {
//     allEmployeeDetails: (state) => state.allEmployeeDetails,
//     allDepartmentDetails: (state) => state.allDepartmentDetails,
//     employeeDetailsCount: (state) => state.employeeDetailsCount,
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     },
//     employeeDetailsFetched(state, data) {
//       // console.log(data);
//       // console.log(state.employeeDetails);
//       state.allEmployeeDetails = data.allDetails
//       // console.log(data.allDetails.length)
//       // for(let i=0; i < data.allDetails.length;i++) {
//       //     console.log(data.allDetails[i]);
//       //     let employeeDetail = data.allDetails[i];
//       //     state.allEmployeeDetails.push(employeeDetail);
//       // }
//       state.employeeDetailsCount = data.recordCount
//       // console.log(state.employeeDetailsCount, state.allEmployeeDetails);
//     },
//     // employeeDetailInserted(state, data) {
//     //   state.allEmployeeDetails = data.allDetails
//     //   state.employeeDetailsCount = data.recordCount
//     // },
//     departmentDetailsFetched(state, data) {
//       // console.log(data);      
//       state.allDepartmentDetails = []
//       for(let i=0; i < data.length; i++) {
//           // console.log(data[i]);
//           // let departmentDetail = data[i];
//           state.allDepartmentDetails.push(data[i]);
//       }
//       console.log(state.allDepartmentDetails);
//     },
//   },
//   actions: {
//     deleteEmployeeDetail(id) {
//       instance.delete("/employee/delete"+id);
//     },
//     getEmployeeDetails({commit}) {
//       instance.get("/employee/selectAll")
//       .then((response) => {
//         console.log(response.data);
//         commit('employeeDetailsFetched', response.data)
//       })
//     },
//     getDepartmentDetails(context){
//       instance.get("/department/selectAll")
//       .then((response) => {
//         // console.log(response.data);
//         context.commit('departmentDetailsFetched', response.data)
//       })
//     },
//     insertEmployeeDetail(context, params){
//       console.log(params);
//       // instance.post('/employee/insert',{ params })
//     }
//   },
//   modules: {
//   }
// })
