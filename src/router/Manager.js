import { createRouter, createWebHistory } from "vue-router";

let routes = [
  {
    path: "/",
    name: "Manager",
    component: () => import("../components/Manager/DashboardView.vue"),
  },

  {
    path: "/Record/AddRecord",
    name: "Record",
    component: () => import("../components/Manager/Record/AddRecord.vue"),
  },
  {
    path: "/Record/RecordView",
    name: "RecordView",
    component: () => import("../components/Manager/Record/RecordView.vue"),
  },
  {
    path: "/Record/ApproveRecord",
    name: "ApproveRecord",
    component: () => import("../components/Manager/Record/ApproveRecord.vue"),
  },
  {
    path: "/Leave/AddLeave",
    name: "AddLeave",
    component: () => import("../components/Manager/Leave/AddLeave.vue"),
  },
  {
    path: "/Leave/Calendar",
    name: "Calendar",
    component: () => import("../components/Manager/Leave/Calendar.vue"),
  },
  {
    path: "/Leave/LeaveView",
    name: "LeaveView",
    component: () => import("../components/Manager/Leave/LeaveView.vue"),
  },
  {
    path: "/Time/HistoryTime",
    name: "HistoryTime",
    component: () => import("../components/Manager/Time/HistoryTime.vue"),
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import("../components/Manager/Profile.vue"),
  },
  {
    path: "/SubmitDocuments",
    name: "Submit-Documents",
    component: () =>
      import("../components/Manager/SubmitDocuments/DocumentsView.vue"),
  },
  {
    path: "/Statistics",
    name: "Submit-Statistics",
    component: () => import("../components/Manager/Statistics.vue"),
  },
  {
    path: "/Project",
    name: "Projectview",
    component: () => import("../components/Manager/Project/Projectview.vue"),
  },
  {
    path: "/SendBill",
    name: "SendBill",
    component: () => import("../components/Manager/SendBill/SendBill.vue"),
  },
  {
    path: "/ProjectType",
    name: "ProjectType",
    component: () => import("../components/Manager/Project/ProjectType.vue"),
  },
  {
    path: "/Event",
    name: "Event",
    component: () => import("../components/Manager/Project/Event.vue"),
  },
  {
    path: "/CalendarHome",
    name: "CalendarHome",
    component: () => import("../components/Manager/CalendarHome.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
