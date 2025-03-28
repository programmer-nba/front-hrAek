import { createRouter, createWebHistory } from "vue-router";

let routes = [
  {
    path: "/",
    name: "HR",
    component: () => import("../components/Hr/HomeView.vue"),
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import("../components/Hr/Profile/Profile.vue"),
  },
  {
    path: "/Exam",
    name: "Exam",
    component: () => import("../components/Hr/Exam/Exam.vue"),
  },
  {
    path: "/Post",
    name: "Post",
    component: () => import("../components/Hr/Post/Post.vue"),
  },
  {
    path: "/ExamResults",
    name: "ExamResults",
    component: () => import("../components/Hr/ExamResults/ExamResults.vue"),
  },
  {
    path: "/Interview",
    name: "Interview",
    component: () => import("../components/Hr/Interview/Interview.vue"),
  },
  {
    path: "/Employee",
    name: "Employee",
    component: () => import("../components/Hr/Employee/Employee.vue"),
  },
  {
    path: "/Employee_Time",
    name: "Employee_Time",
    component: () =>
      import("../components/Hr/Employee/Employee_Time/Employee_Time.vue"),
  },
  {
    path: "/Employee_ReTime",
    name: "Employee_ReTime",
    component: () =>
      import("../components/Hr/Employee/Employee_Time/Employee_ReTime.vue"),
  },
  {
    path: "/Work",
    name: "Work",
    component: () => import("../components/Hr/Work/Work.vue"),
  },
  {
    path: "/Project",
    name: "Projectview",
    component: () => import("../components/Hr/Project/Projectview.vue"),
  },
  // {
  //   path: "/FirstPage",
  //   name: "FirstPage",
  //   component: () => import("../components/Hr/FirstPage/FirstPage.vue"),
  // },
  {
    path: "/ProjectType",
    name: "ProjectType",
    component: () => import("../components/Hr/Project/ProjectType.vue"),
  },
  {
    path: "/Test",
    name: "Test",
    component: () => import("../components/Hr/Test.vue"),
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import("../components/Hr/Profile.vue"),
  },
  // {
  //   path: "/DocsLeave",
  //   name: "DocsLeave",
  //   component: () => import("../components/Employee/Record/DocsLeave.vue"),
  // },
  {
    path: "/approved",
    name: "approved",
    component: () => import("../components/Document/approved.vue"),
  },
  {
    path: "/DocumenType",
    name: "DocumenType",
    component: () => import("../components/Document/DocumenType.vue"),
  },
  {
    path: "/LeaveLetter",
    name: "LeaveLetter",
    component: () => import("../components/Document/LeaveLetter.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
