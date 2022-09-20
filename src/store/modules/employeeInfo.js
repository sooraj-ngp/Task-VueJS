import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  headers:{
    'Content-type': 'application/json',
    'AppKey':'0ba5ntcQizGig4A0W6FytENeoFiwnvTS'
  }
})

export const state = {
  employeeDetails: [],
  departmentDetails: [],
  recordCount : 0,
  departments: {},
  departmentsCheck: {},
  departmentNames: [],
  departmentName: '',
  departmentId: null,
}

export const getters = {
  employeeDetails: (state) => state.employeeDetails,
  departmentDetails: (state) => state.departmentDetails,
  recordCount: (state) => state.recordCount,
  departments: (state) => state.departments,
  departmentsCheck: (state) => state.departmentsCheck,
  departmentNames: (state) => state.departmentNames,
  departmentName: (state) => state.departmentName,
  departmentId: (state) => state.departmentId,
}

export const mutations = {
  increment (state) {
    state.count++
  },
  employeeDetailsFetched(state, data) {
    // console.log('data');
    state.employeeDetails = data.allDetails
    state.recordCount = data.recordCount
    // console.log(state.recordCount, state.employeeDetails);
  },
  departmentNameFetched(state, departmentId){
    // console.log(state.departmentsCheck[departmentId], departmentId)
    state.departmentName = state.departmentsCheck[departmentId]
  },
  departmentIdFetched(state, departmentName){
    // console.log(state.departments[departmentName], departmentName)
    state.departmentId = state.departments[departmentName]
  },
  departmentDetailsFetched(state, data) {
    // console.log(data);      
    state.departmentDetails = data
    // for(let i=0; i < data.length; i++) {
    //     // console.log(data[i]);
    //     // let departmentDetail = data[i];
    //     state.departmentDetails.push(data[i]);
    // }
    for(let i=0; i<state.departmentDetails.length; i++){
      state.departments[state.departmentDetails[i].department_name] = state.departmentDetails[i].department_id
      state.departmentsCheck[state.departmentDetails[i].department_id] = state.departmentDetails[i].department_name
      state.departmentNames.push(state.departmentDetails[i].department_name)
    }
    console.log(state.departmentDetails);
  },
}

export const actions = {
  getEmployeeDetails({commit}) {
    // console.log('get');
    instance.get("/employee/selectAll")
    .then((response) => {
      console.log(response);
      commit('employeeDetailsFetched', response.data)
    })
  },
  getDepartmentDetails(context){
    instance.get("/department/selectAll")
    .then((response) => {
      // console.log(response.data);
      context.commit('departmentDetailsFetched', response.data)
    })
  },
  insertEmployeeDetail(context, params){
    // console.log(context, params);
    instance.post('/employee/insert', params)
    .then((response) => {
      console.log(response);
    })
  },
  deleteEmployeeDetail(context, id) {
    instance.delete("/employee/delete/"+id)
    .then((response) => {
      console.log(response.data);
    })
    // console.log(id, 'deleted');
  },
  getDepartmentName(context, departmentId){
    // console.log(departmentId);
    context.commit('departmentNameFetched', departmentId)
  },
  getDepartmentId(context, departmentName){
    // console.log(departmentName);
    context.commit('departmentIdFetched', departmentName)
  },
  updateEmployeeDetail(context, updateDetails){
    console.log('update details', updateDetails)
    instance.patch('/employee/update',updateDetails)
    .then((response) => {
      console.log(response.data);
    })
  },
  stringSearch(context, searchString){
    // console.log(searchString);
    instance.get('/employee/selectAll/'+searchString)
      .then((response) => {
        console.log(response)
        context.commit('employeeDetailsFetched', response.data)
      })
  },
}
    