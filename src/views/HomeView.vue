<template>
  <!-- <hello-world /> -->
  <div>
    <v-row class="tree">
      <!-- <v-col >
        <treeselect 
          v-model="value" 
          :multiple="true" 
          :options='options' 
          :disable-branch-nodes="true" /><br><br>
      </v-col> -->
      <!-- <v-col>
        <v-treeview
          :active.sync="active"
          :items="allData"
          activatable
          color="warning"
          return-object
          open-all
          transition
          @update:active="getTreeData"
        ></v-treeview>
      </v-col> -->
      <v-col></v-col>
      <v-col cols="8" class="ml-1">
        <v-card>
          <v-card-title class="indigo white--text text-h5">
            Sample Data
          </v-card-title>
          <v-row
            class="pa-4"
            justify="space-between"
          >
            <v-col cols="6">
              <v-treeview
                open-all
                :active.sync="active"
                :items="allData"
                activatable
                color="warning"
                return-object
                transition
                @update:active="getTreeData"
              >
              </v-treeview>
            </v-col>

            <v-divider vertical></v-divider>

            <v-col
              class="d-flex text-center"
            >
              <v-scroll-y-transition mode="out-in">
                <div
                  v-if="!active"
                  class="text-h6 grey--text text--lighten-1 font-weight-light"
                  style="align-self: center;"
                >
                  Select an Item
                </div>
                <v-card
                  v-else
                  class=""
                  flat
                  max-width="500"
                >
                  <v-card-text class="text-left">
                    <span v-for="(item,key) in result" :key="key">
                      <b v-if="(typeof(item)!='object')">{{key}}</b>
                      <span v-if="(typeof(item)!='object')">:{{ (item && item!='undefined'&& item!=null) ? item : "No data found"}}<br></span>
                      <!-- <span v-if="(typeof(item)=='object')"><b>{{key}}</b>:<br>
                        <span v-for="(innerItem) in item" :key="innerItem">
                          <ul>
                            <li>
                              <span v-for="(value, innerKey) in innerItem" :key="innerKey.name" class="ml-4">
                                <span v-if="(typeof(item)=='object')">{{innerKey}} : {{value && value!='undefined' && value!=null ? value : "No data found"}}</span><br>
                              </span> 
                            </li>
                          </ul>
                        </span>
                      </span> -->
                    </span>
                    <!-- <span v-for="(item,key) in result" :key="item">
                      <b v-if="(typeof(item)!='object')">{{key}}</b>:{{item}}<br>
                    </span> -->
                  </v-card-text>
                </v-card>
              </v-scroll-y-transition>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
    <v-row>
      <v-col></v-col>
      <v-col cols="auto" class="pr-1">
        <v-row>
          <v-col></v-col>
          <v-col>
            <h2 class="text-center tableHeading" v-if="switchRoomList">Switch Room List</h2>
            <h2 class="text-center tableHeading" v-if="channelList">Channel List</h2>
            <h2 class="text-center tableHeading" v-if="site">Site</h2>
          </v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-simple-table v-if="switchRoomList">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    distanceToLocalDb
                  </th>
                  <th class="text-center">
                    imageFlag
                  </th>
                  <th class="text-center">
                    localDbRef
                  </th>
                  <th class="text-center">
                    name
                  </th>
                  <th class="text-center">
                    networkPointAvailable
                  </th>
                  <th class="text-center">
                    networkPointToBeInstalled
                  </th>
                  <th class="text-center">
                    notes
                  </th>
                  <th class="text-center">
                    routerRequired
                  </th>
                  <th class="text-center">
                    spareWayAtDb
                  </th>
                  <th class="text-center">
                    switchRoomId
                  </th>
                  <th class="text-center">
                    threePhaseRefAvailable
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in switchRoomList"
                  :key="item.switchRoomId"
                >
                  <td class="text-center">{{ (item.distanceToLocalDb && item.distanceToLocalDb!='undefined' && item.distanceToLocalDb != null) ? item.distanceToLocalDb : "No data found"}}</td>
                  <td class="text-center">{{ item.imageFlag && item.imageFlag!='undefined' ? item.imageFlag : "No data found"}}</td>
                  <td class="text-center">{{ item.localDbRef && item.localDbRef!='undefined' ? item.localDbRef : "No data found"}}</td>
                  <td class="text-center">{{ item.name && item.name!='undefined' ? item.name : "No data found"}}</td>
                  <td class="text-center">{{ item.networkPointAvailable && item.networkPointAvailable!='undefined' ? item.networkPointAvailable : "No data found"}}</td>
                  <td class="text-center">{{ item.networkPointToBeInstalled && item.networkPointToBeInstalled!='undefined' ? item.networkPointToBeInstalled : "No data found"}}</td>
                  <td class="text-center">{{ item.notes && item.notes!='undefined' ? item.notes : "No data found"}}</td>
                  <td class="text-center">{{ item.routerRequired && item.routerRequired!='undefined' ? item.routerRequired : "No data found"}}</td>
                  <td class="text-center">{{ item.spareWayAtDb && item.spareWayAtDb!='undefined' ? item.spareWayAtDb : "No data found"}}</td>
                  <td class="text-center">{{ item.switchRoomId && item.switchRoomId!='undefined' ? item.switchRoomId : "No data found"}}</td>
                  <td class="text-center">{{ item.threePhaseRefAvailable && item.threePhaseRefAvailable!='undefined' ? item.threePhaseRefAvailable : "No data found"}}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-simple-table v-if="channelList">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    Channel Id
                  </th>
                  <th class="text-center">
                    Created By
                  </th>
                  <th class="text-center">
                    Phase
                  </th>
                  <th class="text-center">
                    Phase Type
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in channelList"
                  :key="item.channelId"
                >
                  <td class="text-center">{{ item.channelId }}</td>
                  <td class="text-center">{{ item.createdBy }}</td>
                  <td class="text-left ml-5">
                    <span v-for="phaseItem,index in item.phase" :key="index">
                    <span v-for="phaseInnerItem, innerKey, index in phaseItem" :key="index">
                        {{ innerKey }} : {{ phaseInnerItem }}<br>
                    </span>
                    </span>
                  </td>
                  <td class="text-center">{{ item.phaseType }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-simple-table v-if="site">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    add2
                  </th>
                  <th class="text-center">
                    city
                  </th>
                  <th class="text-center">
                    country
                  </th>
                  <th class="text-center">
                    line_1
                  </th>
                  <th class="text-center">
                    line_2
                  </th>
                  <th class="text-center">
                    postcode
                  </th>
                  <th class="text-center">
                    road
                  </th>
                  <th class="text-center">
                    site_name
                  </th>
                  <th class="text-center">
                    town
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <!-- v-for="item in site"
                  :key="item.site_name" -->
                  <td class="text-center"> {{ site.add2 && site.add2!=null ? site.add2 : "No data found"}} </td>
                  <td class="text-center"> {{ site.city && site.city!=null ? site.city : "No data found" }} </td>
                  <td class="text-center"> {{ site.country && site.country!=null ? site.country : "No data found" }} </td>
                  <td class="text-center"> {{ site.line_1 && site.line_1!=null ? site.line_1 : "No data found" }} </td>
                  <td class="text-center"> {{ site.line_2 && site.line_2!=null ? site.line_2 : "No data found" }} </td>
                  <td class="text-center"> {{ site.postcode && site.postcode!=null ? site.postcode : "No data found" }} </td>
                  <td class="text-center"> {{ site.road && site.road!=null ? site.road : "No data found" }} </td>
                  <td class="text-center"> {{ site.site_name && site.site_name!=null ? site.site_name : "No data found" }} </td>
                  <td class="text-center"> {{ site.town && site.town!=null ? site.town : "No data found" }} </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-row>
      </v-col>
      <v-col></v-col>
    </v-row>

  </div>
</template>

<script>
// import Treeselect from '@riophae/vue-treeselect'
// import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {    
  // components: { Treeselect },
  mounted() {
    this.allData =  this.sample[0]["data"]
    this.channelList = null
    this.switchRoomList = null
    this.site = null
    // console.log(this.sample[0]["data"][0]);
    console.log(this.allData);
  },
  methods: {
    getTreeData(){
      this.result = this.active[0].dataValues
      this.switchRoomList = this.active[0].dataValues.switchRoomList
      this.channelList = this.active[0].dataValues.channelList
      this.site = this.active[0].dataValues.site
      if(this.channelList){
        this.site = null
        this.switchRoomList = null
      }
      if(this.site){
        this.channelList=null
        this.switchRoomList = null
      }
      if(this.switchRoomList){
        this.site = null
        this.channelList=null
      }
      console.log(this.active[0].dataValues);
      console.log(this.channelList, this.site, this.switchRoomList);
    }
  },
  data(){
    return {
      value: null,
      tree: [],
      allData: [],
      channelList: [],
      switchRoomList: [],
      site: [],
      sampleData: [],
      active: [],
      result: [],
      options: [ {
        id: 'a',
        label: 'a',
        children: [ {
          id: 'aa',
          label: 'aa',
        }, {
          id: 'ab',
          label: 'ab',
        } ],
      }, {
        id: 'b',
        label: 'b',
      }, {
        id: 'c',
        label: 'c',
        children: [ {
          id: 'ca',
          label: 'ca',
        },{
          id: 'cb',
          label: 'cb',
        } ],
      } ],
      files: {
        site: "bi bi-geo-alt-fill",
        meter: "bi bi-speedometer",
        room: "bi bi-door-open-fill",
        cabinet: "bi bi-inboxes-fill",
        meterElectricity: "fas fa-bolt",
        meterGas: "fas fa-burn",
        building: "fa fa-building",
        distributionBoard: "bi bi-diagram-2-fill",
        subDistributionBoard: "bi bi-diagram-3-fill",
        device: "bi bi-hdd-network-fill",
        gasLogger: "bi bi-file-medical-fill",
        circuit: "bi bi-cpu-fill",
        busbar: "fas fa-bacon",
      }, 
      sample: [ {
        "success": true,
        "data": [
          {
            "id": 5981,
            "dataValues": {
              "name": "Bakehouse Prestwick",
              "town": "Prestwick",
              "country": "UK",
              "address1": "71-75 Main St.",
              "postcode": "KA9 1JN",
              "siteVisitDate": "2022-07-11"
            },
            "category": "Site",
            "iconName": "bi bi-geo-alt-fill",
            "categoryId": 2,
            "parentId": 5980,
            "count": "1",
            "childIds": "6154",
            "connectedTo": [],
            "colorCode": "#1e88e5",
            "feederCircuitId": null,
            "switchRoomImage": [],
            "busbarId": null,
            "subdbName": null,
            "file": "site",
            "name": "Bakehouse Prestwick",
            "children": [
              {
                "id": 6154,
                "dataValues": {
                  "name": "Bakehouse Prestwick Building",
                  "floorCount": null
                },
                "category": "Building",
                "iconName": "fa fa-building",
                "categoryId": 4,
                "parentId": 5981,
                "count": "1",
                "childIds": "6155",
                "connectedTo": [],
                "colorCode": "#1e88e5",
                "feederCircuitId": null,
                "switchRoomImage": [],
                "busbarId": null,
                "subdbName": null,
                "file": "building",
                "name": "Bakehouse Prestwick Building",
                "children": [
                  {
                    "id": 6155,
                    "dataValues": {
                      "name": "Meter Room",
                      "floor": "undefined"
                    },
                    "category": "Room",
                    "iconName": "bi bi-door-open-fill",
                    "categoryId": 15,
                    "parentId": 6154,
                    "count": "3",
                    "childIds": "6156,6166,6145",
                    "connectedTo": [],
                    "colorCode": "#1e88e5",
                    "feederCircuitId": null,
                    "switchRoomImage": [],
                    "busbarId": null,
                    "subdbName": null,
                    "file": "room",
                    "name": "Meter Room",
                    "children": [
                      {
                        "id": 6156,
                        "dataValues": {
                          "name": "Cab 1"
                        },
                        "category": "Cabinet",
                        "iconName": "bi bi-inboxes-fill",
                        "categoryId": 11,
                        "parentId": 6155,
                        "count": "2",
                        "childIds": "6148,6153",
                        "connectedTo": [],
                        "colorCode": "#1e88e5",
                        "feederCircuitId": null,
                        "switchRoomImage": [],
                        "busbarId": null,
                        "subdbName": null,
                        "file": "cabinet",
                        "name": "Cab 1",
                        "children": [
                          {
                            "id": 6148,
                            "dataValues": {
                              "name": "BHP Meter DB",
                              "switchRoomList": [
                                {
                                  "name": "BHP Meter DB",
                                  "notes": null,
                                  "imageFlag": "true",
                                  "localDbRef": null,
                                  "spareWayAtDb": "0",
                                  "switchRoomId": "6148",
                                  "routerRequired": "0",
                                  "distanceToLocalDb": null,
                                  "networkPointAvailable": "0",
                                  "threePhaseRefAvailable": "0",
                                  "networkPointToBeInstalled": "0"
                                }
                              ]
                            },
                            "category": "Distribution Board",
                            "iconName": "bi bi-diagram-2-fill",
                            "categoryId": 5,
                            "parentId": 6156,
                            "count": "7",
                            "childIds": "6150,6167,6151,6169,6152,6149,6168",
                            "connectedTo": [
                              6145
                            ],
                            "colorCode": "#1e88e5",
                            "feederCircuitId": 0,
                            "switchRoomImage": [],
                            "busbarId": null,
                            "subdbName": null,
                            "file": "distributionBoard",
                            "name": "BHP Meter DB",
                            "children": []
                          },
                          {
                            "id": 6153,
                            "dataValues": {
                              "name": "BHP Device(54:10:ec:a7:d9:44)",
                              "macId": "54:10:ec:a7:d9:44",
                              "comment": null,
                              "channelList": [
                                {
                                  "phase": [
                                    {
                                      "dbId": "6148",
                                      "phaseId": "1",
                                      "circuitId": "6149",
                                      "phaseName": "Main Incomer",
                                      "breakerRef": "30",
                                      "ctTypeValue": "30",
                                      "classification": "Electrical Distribution & Use"
                                    }
                                  ],
                                  "channelId": "1",
                                  "createdBy": "test_umesh@powerofn.in",
                                  "phaseType": "3"
                                },
                                {
                                  "phase": [
                                    {
                                      "dbId": "6148",
                                      "phaseId": "1",
                                      "circuitId": "6150",
                                      "phaseName": "PIZZA OVEN",
                                      "breakerRef": "30",
                                      "ctTypeValue": "30",
                                      "classification": "Boiler"
                                    }
                                  ],
                                  "channelId": "2",
                                  "createdBy": "test_umesh@powerofn.in",
                                  "phaseType": "3"
                                },
                                {
                                  "phase": [
                                    {
                                      "dbId": "6148",
                                      "phaseId": "1",
                                      "circuitId": "6151",
                                      "phaseName": "LAINOX OVEN",
                                      "breakerRef": "30",
                                      "ctTypeValue": "30",
                                      "classification": "Compressed Air"
                                    }
                                  ],
                                  "channelId": "3",
                                  "createdBy": "test_umesh@powerofn.in",
                                  "phaseType": "3"
                                },
                                {
                                  "phase": [
                                    {
                                      "dbId": "6148",
                                      "phaseId": "1",
                                      "circuitId": "6152",
                                      "phaseName": "COMBI OVEN",
                                      "breakerRef": "30",
                                      "ctTypeValue": "30",
                                      "classification": "Kettle"
                                    }
                                  ],
                                  "channelId": "4",
                                  "createdBy": "test_umesh@powerofn.in",
                                  "phaseType": "3"
                                },
                                {
                                  "phase": [
                                    {
                                      "dbId": "6148",
                                      "phaseId": "1",
                                      "circuitId": "6168",
                                      "phaseName": "Test 2",
                                      "breakerRef": "80",
                                      "ctTypeValue": "120",
                                      "classification": null
                                    },
                                    {
                                      "dbId": "6148",
                                      "phaseId": "2",
                                      "circuitId": "6169",
                                      "phaseName": "Test 3",
                                      "breakerRef": "80",
                                      "ctTypeValue": "120",
                                      "classification": "Refrigeration"
                                    },
                                    {
                                      "dbId": "6148",
                                      "phaseId": "3",
                                      "circuitId": "6167",
                                      "phaseName": "Test 1",
                                      "breakerRef": "60",
                                      "ctTypeValue": "60",
                                      "classification": "Process Energy"
                                    }
                                  ],
                                  "channelId": "5",
                                  "createdBy": "test_umesh@powerofn.in",
                                  "phaseType": "1"
                                }
                              ]
                            },
                            "category": "Device",
                            "iconName": "bi bi-hdd-network-fill",
                            "categoryId": 7,
                            "parentId": 6156,
                            "count": "0",
                            "childIds": null,
                            "connectedTo": [
                              6148
                            ],
                            "colorCode": "#1e88e5",
                            "feederCircuitId": null,
                            "switchRoomImage": [],
                            "busbarId": null,
                            "subdbName": null,
                            "file": "device",
                            "name": "BHP Device(54:10:ec:a7:d9:44)",
                            "children": []
                          }
                        ]
                      },
                      {
                        "id": 6145,
                        "dataValues": {
                          "loa": null,
                          "mpan": "1800060712129",
                          "site": {
                            "add2": null,
                            "city": "Prestwick",
                            "road": null,
                            "town": null,
                            "line_1": null,
                            "line_2": "71-75 Main St.",
                            "country": null,
                            "postcode": "KA9 1JN",
                            "site_name": "Bakehouse Prestwick"
                          },
                          "type": "ELEC",
                          "meter": "1800060712129",
                          "eacKWh": null,
                          "eac_aq": null,
                          "status": null,
                          "gasMprn": null,
                          "category": null,
                          "end_date": null,
                          "mpan_top": "03801D04",
                          "supplier": null,
                          "exp_value": null,
                          "meterName": "Bakehouse Prestwick Meter"
                        },
                        "category": "Meter",
                        "iconName": "bi bi-speedometer2",
                        "categoryId": 3,
                        "parentId": 6155,
                        "count": "0",
                        "childIds": null,
                        "connectedTo": [],
                        "colorCode": "#1e88e5",
                        "feederCircuitId": null,
                        "switchRoomImage": [],
                        "busbarId": null,
                        "subdbName": null,
                        "file": "meter",
                        "name": "Bakehouse Prestwick Meter",
                        "children": []
                      },
                      {
                        "id": 6166,
                        "dataValues": {
                          "name": "Main Busbar"
                        },
                        "category": "Busbar",
                        "iconName": null,
                        "categoryId": 20,
                        "parentId": 6155,
                        "count": "0",
                        "childIds": null,
                        "connectedTo": [],
                        "colorCode": "#1e88e5",
                        "feederCircuitId": null,
                        "switchRoomImage": [],
                        "busbarId": null,
                        "subdbName": null,
                        "file": "busbar",
                        "name": "Main Busbar",
                        "children": []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }],
    }
  },
}

</script>

<style>
  .tree{
    margin-top: 1%;
  }
  .tableHeading{
    font-size: 20px;
  }
</style>