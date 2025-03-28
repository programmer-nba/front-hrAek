import { createRouter, createWebHistory } from "vue-router";

let routes = [

  {
    path: "/",
    name: "Admin",
    component: () => import("../components/Admin/HomeView.vue"),
  },
  {
    path: "/employee/all",
    name: "EmployeeAll",
    component: () => import("../components/Admin/Employee/EmployeeAll.vue"),
  },
  {
    path: "/Add/Employee",
    name: "AddEmployee",
    component: () => import("../components/Admin/Employee/AddEmployee.vue"),
  },
  {
    path: "/ParthnerView",
    name: "Parthner",
    component: () => import("../components/Admin/Parthner/ParthnerView.vue"),
  },
  {
    path: "/RecordView",
    name: "Record",
    component: () => import("../components/Admin/Record/RecordView.vue"),
  },
  {
    path: "/ConsignmentRequest",
    name: "Consignment-Request",
    component: () => import("../components/Admin/E-Market/ConsignmentRequest.vue"),
  },
  {
    path: "/RequestOpenStore",
    name: "Request-Open-Store",
    component: () => import("../components/Admin/E-Market/RequestOpenStore.vue"),
  },
  {
    path: "/AddWork",
    name: "AddWork",
    component: () => import("../components/Admin/Work/AddWork.vue"),
  },
  {
    path: "/WorkView",
    name: "WorkView",
    component: () => import("../components/Admin/Work/WorkView.vue"),
  },
  {
    path: "/Contract",
    name: "Contract",
    component: () => import("../components/Admin/Contract/ContractView.vue"),
  },
  
  {
    path: '/ContractbyID/:id', 
    name: "ContractByID",
    component: () => import("../components/Admin/Contract/ContractbyID.vue"),
  },
  {
    path: "/Profile",
    name: "ProfileView",
    component: () => import("../components/Admin/Profile/ProfileView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
