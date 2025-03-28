import { createRouter, createWebHistory } from "vue-router";

let routes = [
  {
    path: "/",
    name: "Department-Head",
    component: () => import("../components/DepartmentHead/HomeView.vue"),
  },
  {
    path: "/TimeToWork",
    name: "TimeToWork",
    component: () =>
      import("../components/DepartmentHead/TimeToWork/TimeAll.vue"),
  },
  {
    path: "/Employee",
    name: "EmployeeView",
    component: () =>
      import("../components/DepartmentHead/Employee/EmployeeView.vue"),
  },
  {
    path: "/SubmitDocuments",
    name: "Submit-Documents",
    component: () =>
      import("../components/DepartmentHead/SubmitDocuments/DocumentsView.vue"),
  },
  {
    path: "/OT",
    name: "OT",
    component: () =>
      import("../components/DepartmentHead/SubmitDocuments/OT.vue"),
  },
  {
    path: "/Record/AddRecord",
    name: "Record",
    component: () =>
      import("../components/DepartmentHead/Record/AddRecord.vue"),
  },
  {
    path: "/Record/RecordView",
    name: "RecordView",
    component: () =>
      import("../components/DepartmentHead/Record/RecordView.vue"),
  },
  {
    path: "/Request/Record",
    name: "Request-Record",
    component: () =>
      import("../components/DepartmentHead/Record/Request/MemoRequest.vue"),
  },
  {
    path: "/Record/ApproveRecord",
    name: "ApproveRecord",
    component: () =>
      import("../components/DepartmentHead/Record/ApproveRecord.vue"),
  },
  {
    path: "/Profile",
    name: "ProfileView",
    component: () =>
      import("../components/DepartmentHead/Profile/ProfileView.vue"),
  },
  {
    path: "/RequesttoLeave",
    name: "RequesttoLeave",
    component: () =>
      import("../components/Employee/HeadSupervisor/RequesttoLeave.vue"),
  },
  {
    path: "/EmployeeReTime",
    name: "EmployeeReTime",
    component: () =>
      import("../components/Employee/TimeToWork/Employee_ReTime.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
