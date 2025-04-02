import { createRouter, createWebHistory } from "vue-router";

let routes = [
  {
    path: "/",
    name: "Owner",
    component: () => import("../components/Owner/HomeView.vue"),
  },
  {
    path: "/SendBill",
    name: "SendBill",
    component: () => import("../components/Owner/SendBill/SendBill.vue"),
  },
  {
    path: "/contract/signature",
    name: "contract-signature",
    component: () =>
      import("../components/props/contracts/ContractSignature.vue"),
  }, // hold non responsive

  /* {
    path: "/contract/signature/:id",
    name: "contract-signature",
    component: () => import("../components/props/contracts/ContractSignature.vue"),
  }, */
  {
    path: "/Record/ApproveRecord",
    name: "ApproveRecord",
    component: () => import("../components/Owner/Record/ApproveRecord.vue"),
  },
  {
    path: "/addemployee",
    name: "addemployee",
    component: () => import("../components/Owner/addemployee.vue"),
  },
  {
    path: "/setting-employee",
    name: "setting-employee",
    component: () => import("../components/Owner/SettingEmployee.vue"),
  },
  {
    path: "/Time/HistoryTime",
    name: "HistoryTime",
    component: () => import("../components/Owner/Time/HistoryTime.vue"),
  },
  {
    path: "/Profile/Profile",
    name: "Profile",
    component: () => import("../components/Owner/Profile/Profile.vue"),
  },
  {
    path: "/Project",
    name: "Projectview",
    component: () => import("../components/Owner/Project/Projectview.vue"),
  },
  {
    path: "/FirstPage",
    name: "FirstPage",
    component: () =>
      import(
        "../components/Owner/DashboardEmployee/ReportEmployee/FirstPage.vue"
      ),
  },
  {
    path: "/ReportEmployee",
    name: "ReportEmployee",
    component: () =>
      import(
        "../components/Owner/DashboardEmployee/ReportEmployee/ReportEmployee.vue"
      ),
  },

  {
    path: "/ProjectType",
    name: "ProjectType",
    component: () => import("../components/Owner/Project/ProjectType.vue"),
  },

  {
    path: "/Event",
    name: "Event",
    component: () => import("../components/Owner/Project/Event.vue"),
  },
  {
    path: "/CalendarHome",
    name: "CalendarHome",
    component: () => import("../components/Owner/CalendarHome.vue"),
  },
  {
    path: "/Employee_Time",
    name: "Employee_Time",
    component: () =>
      import("../components/Owner/Employee_Time/Employee_Time.vue"),
  },
  {
    path: "/Table_Time",
    name: "Table_Time",
    component: () => import("../components/Owner/Employee_Time/Timetable.vue"),
  },
  {
    path: "/home/lawyer",
    name: "lawyer",
    component: () => import("../components/Employee/Lawyer/LawyerHome.vue"),
  },
  {
    path: "/partner",
    name: "partnerowner",
    component: () => import("../components/Owner/partner/PartnerOwnerView.vue"),
  },
  {
    path: "/emarket/approve",
    name: "emarketapprove",
    component: () => import("../components/Owner/emarket/EmarketOwnerView.vue"),
  },
  {
    path: "/shoppartner/approve",
    name: "shoppartnerapprove",
    component: () =>
      import("../components/Owner/shoppartner/ShoppartnerOwnerView.vue"),
  },
  {
    path: "/onestopservice/approve",
    name: "onestopserviceapprove",
    component: () =>
      import("../components/Owner/onestopservice/onestopserviceOwnerView.vue"),
  },
  {
    path: "/emarket/product/",
    name: "emarketproduct",
    component: () => import("../components/Owner/emarket/EmarketData.vue"),
  },
  {
    path: "/shoppartner/shop/",
    name: "shoppartnershop",
    component: () =>
      import("../components/Owner/shoppartner/ShoppartnerData.vue"),
  },
  {
    path: "/onestopservice/data/",
    name: "onestopservicedata",
    component: () =>
      import("../components/Owner/onestopservice/onestopservicedata.vue"),
  },
  {
    path: "/onestopshopdata/data/",
    name: "onestopshopdata",
    component: () =>
      import("../components/Owner/onestopshop/onestopshopdata.vue"),
  },
  {
    path: "/onestopshop/approve",
    name: "onestopstopsapprove",
    component: () =>
      import("../components/Owner/onestopshop/onestopshopOwnerView.vue"),
  },
  {
    path: "/expenses",
    name: "expenses",
    component: () =>
      import("../components/Owner/ExpensesView.vue"),
  },
  {
    path: "/invoice",
    name: "invoice",
    component: () =>
      import("../components/Owner/InvoiceView.vue"),
  },
  {
    path: "/deposit",
    name: "deposit",
    component: () =>
      import("../components/Owner/DepositView.vue"),
  },
  {
    path: "/receipt",
    name: "receipt",
    component: () =>
      import("../components/Owner/ReceiptView.vue"),
  },
  {
    path: "/timeinout/history",
    name: "timeinout-history",
    component: () =>
      import("../components/Owner/TimeinOut.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
