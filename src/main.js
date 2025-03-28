import PrimeVue from "primevue/config";
import { createApp } from 'vue';
import App from './App.vue';


import jwtDecode from "jwt-decode";
import store from "./store";

import './style.css';
import './tailwind.css';
// import 'daisyui/dist/full.css'

import 'ant-design-vue/dist/reset.css';

import { QuestionCircleTwoTone } from '@ant-design/icons-vue';
import {Button, Calendar, Col, DatePicker, Modal, Progress, Result, Row, StatisticCountdown, TimePicker, Tooltip } from 'ant-design-vue';
import { Badge, Breadcrumb  } from 'ant-design-vue';

import "primeicons/primeicons.css"; //icons
import "primevue/resources/primevue.min.css"; //core css
import "primevue/resources/themes/lara-light-green/theme.css";

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from './assets/icons/index'
import ButtonGroup from 'primevue/buttongroup';
import CalendarP from 'primevue/calendar';
import SelectButton from 'primevue/selectbutton';
import Checkbox from "primevue/checkbox";
import ButtonP from "primevue/button";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Editor from 'primevue/editor';
import FileUpload from 'primevue/fileupload';
import Sidebar from 'primevue/sidebar';
import MultiSelect from 'primevue/multiselect';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Image from 'primevue/image';
const app = createApp(App);

app.use(store);

import router from "./router";
import AdminRouter from "./router/Admin";
import DepartmentHead from "./router/DepartmentHead";
import EmployeeRouter from "./router/Employee";
import Hr from "./router/Hr";
import Manager from "./router/Manager";
import Owner from "./router/Owner";
import InputText from 'primevue/inputtext'
import InputIcon from "primevue/inputicon";
import InputSwitch from 'primevue/inputswitch';
import RadioButton from "primevue/radiobutton";
import Timeline from "primevue/timeline";

try {
    const token = localStorage.getItem("token");
    const jwt_decode = jwtDecode(token); 
    // console.log("โรว",jwt_decode);
    if (jwt_decode.role === "employee") {
      app.use(EmployeeRouter);
      
    } else if (jwt_decode.role === "admin") {
      app.use(AdminRouter);
    } else if (jwt_decode.role === "manager") {
      app.use(Manager);
    } else if (jwt_decode.role === "head_department") {
      app.use(DepartmentHead);
    } else if (jwt_decode.role === "owner") {
      app.use(Owner);
    } else if (jwt_decode.role === "hr") {
      app.use(Hr);
    } else {
      app.use(router);
    }
    console.log('Role:', jwt_decode.role); 
  
  } catch (err) {
    app.use(router);
  }

app.use(CoreuiVue)
app.component('CIcon', CIcon)
app.provide('icons', icons)


app.use(PrimeVue);

app.use(ToastService);
app.use(DatePicker); //ant
app.use(TimePicker); //ant
app.use(Button); //ant
app.use(Modal); //ant
app.use(Progress); //ant
app.use(Col); //ant
app.use(Row);
app.use(Tooltip); 
app.use(Result); 
app.use(Breadcrumb);
app.component('a-calendar', Calendar); // ลงทะเบียนคอมโพเนนต์ a-calendar ให้ Vue รู้จัก
app.component("a-statistic-countdown", StatisticCountdown); 
app.component("question-circle-two-tone", QuestionCircleTwoTone); 
app.component('a-badge', Badge);
app.component("SelectButton", SelectButton);
app.component("RadioButton", RadioButton);
app.component("Toast", Toast);
app.component("Dropdown", Dropdown);
app.component("Dialog", Dialog);
app.component("CalendarP", CalendarP);
app.component("Editor", Editor);
app.component("FileUpload", FileUpload);
app.component("Sidebar", Sidebar);
app.component("MultiSelect", MultiSelect);
app.component("Image", Image);
app.component("InputSwitch", InputSwitch);
app.component("ButtonP", ButtonP);
app.component("ButtonGroup", ButtonGroup);
app.component("Checkbox", Checkbox);
app.component("InputText", InputText);
app.component("InputIcon", InputIcon);
app.component("Timeline", Timeline);

app.mount('#app');
