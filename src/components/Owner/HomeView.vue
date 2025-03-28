<template>
  <div class="bg-cyan-800 !h-[140vh] mobileL:h-[100vh] py-10 px-2">
    <MiniDatas :projects="projects" :employees="employees" :events="events" />
    <div class="flex justify-center">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <ProjectMiniTable class="my-3 max-w-2xl h-[450px]" @project="emitProjectHandle" />
        <MiniEvents class="my-3 w-full max-w-2xl h-[450px]" :employees="employees" @event="emitEventHandle" />
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import 'dayjs/locale/th';
import MiniEvents from '../props/MiniEvents.vue'
import MiniDatas from '../props/MiniDatas.vue'
import ProjectMiniTable from '../props/projectMiniTable.vue'

export default {
  components: {
    MiniDatas,
    MiniEvents,
    ProjectMiniTable
  },
  data() {
    return {
      employees: [],
      projects: [],
      events: [],
      isLoading: false,
    };
  },
  mounted() {
    this.fetchEmployees();
  },
  computed: {

  },
  methods: {
    emitProjectHandle(val) {
      this.projects = val
    },
    emitEventHandle(val) {
      this.events = val
    },
    async fetchEmployees() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/get`, {
          headers: { "auth-token": `${localStorage.getItem("token")}` }
        });
        this.employees = response.data.data.reverse();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    getEmployeesImage(employeeId) {
      const imgs = this.employees.filter(em => employeeId.includes(em._id)).map(employee => `https://drive.google.com/thumbnail?id=${employee.image}`)
      return imgs
    },
  }
}
</script>
<style>
.project {
  z-index: 9999;
  /* กำหนดค่า Z-Index ที่ต้องการ */
}
</style>