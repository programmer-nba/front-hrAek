import { createRouter, createWebHistory } from "vue-router";

let routes = [
  // {
  //   path: "/",
  //   name: "Employee",
  //   component: () => import("../components/Employee/DashboardView.vue"),
  // },
  {
    path: "/",
    name: "Employee",
    component: () => import("../components/Employee/Work.vue"),
  },
  {
    path: "/SuccessTime",
    name: "SuccessTime",
    component: () => import("../components/Employee/SuccessTime.vue"),
    props: true,
  },
  {
    path: "/FirstPage",
    name: "FirstPage",
    component: () => import("../components/Employee/DashboardEmployee/ReportEmployee/FirstPage.vue"),
  },
  {
    path: "/ReportEmployee",
    name: "ReportEmployee",
    component: () =>
      import(
        "../components/Employee/DashboardEmployee/ReportEmployee/ReportEmployee.vue"
      ),
  },
  // {
  //   path: "/DashboardEmployee",
  //   name: "DashboardEmployee",
  //   component: () =>
  //     import("../components/Employee/DashboardEmployee/DashboardEmployee.vue"),
  // },
  {
    path: "/Work",
    name: "Work",
    component: () => import("../components/Employee/Work.vue"),
  },
  {
    path: "/TimeToWork",
    name: "TimeToWork",
    component: () => import("../components/Employee/TimeToWork/TimeAll.vue"),
  },
  {
    path: "/EmployeeReTime",
    name: "EmployeeReTime",
    component: () =>
      import("../components/Employee/TimeToWork/Employee_ReTime.vue"),
  },
  // {
  //   path: "/SubmitDocuments",
  //   name: "SubmitDocuments",
  //   component: () =>
  //     import("../components/Employee/SubmitDocuments/DocumentsView.vue"),
  // },
  {
    path: "/OT",
    name: "OT",
    component: () => import("../components/Employee/SubmitDocuments/OT.vue"),
  },
  // {
  //   path: "/DocumenType",
  //   name: "DocumenType",
  //   component: () => import("../components/Employee/Record/DocumenType.vue"),
  // },
  {
    path: "/DocsLeave",
    name: "DocsLeave",
    component: () => import("../components/Employee/Record/DocsLeave.vue"),
  },
  {
    path: "/Record/AddRecord",
    name: "Record",
    component: () => import("../components/Employee/Record/AddRecord.vue"),
  },
  {
    path: "/Record/Expenses",
    name: "Expenses",
    component: () => import("../components/Employee/Record/Expenses.vue"),
  },

  {
    path: "/Record",
    name: "RecordView",
    component: () => import("../components/Employee/Record/RecordView.vue"),
  },
  {
    path: "/project",
    name: "mywork",
    component: () => import("../components/Employee/Work/MyWork.vue"),
  },
  {
    path: "/Work/AddWork",
    name: "AddWork",
    component: () => import("../components/Employee/Work/AddWork.vue"),
  },
  // {
  //   path: "/Contract",
  //   name: "Contract",
  //   component: () => import("../components/Admin/Contract/ContractView.vue"),
  // },
  // {
  //   path: "/Employee/profile",
  //   name: "profile",
  //   component: () => import("../components/Employee/ProfileView.vue"),
  // },

  {
    path: "/home/lawyer",
    name: "home-lawyer",
    component: () => import("../components/Employee/Lawyer/LawyerHome.vue"),
  },
  {
    path: "/CalendarHome",
    name: "CalendarHome",
    component: () => import("../components/Employee/Calendar/CalendarHome.vue"),
  },
  {
    path: "/RequesttoLeave",
    name: "RequesttoLeave",
    component: () =>
      import("../components/Employee/HeadSupervisor/RequesttoLeave.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
