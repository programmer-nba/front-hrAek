<template>
  <div class="bg-white rounded-lg h-full shadow-md p-4 transition-all duration-300 hover:shadow-lg">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-center py-3 border-b border-gray-100 mb-3">
      <div class="mb-2 sm:mb-0">
        <h2 class="m-0 text-lg sm:text-xl font-bold text-gray-800 flex items-center">
          <i class="pi pi-calendar mr-2 text-sky-500"></i>
          งานประจำวันที่
          <span class="px-2 bg-sky-50 rounded mx-2 text-sky-700">{{ new Date().toLocaleDateString("th") }}</span>
        </h2>
      </div>
      <div class="flex items-center space-x-2">
        <span class="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-medium">
          ทั้งหมด {{ projects.length }} งาน
        </span>
        <ButtonP v-if="$store.getters.role === 'employee'" icon="pi pi-arrow-right"
          class="p-button-rounded p-button-sm p-button-outlined focus:outline-0 focus:ring-0 hover:bg-sky-50"
          @click="$router.push('/Work')" />
        <ButtonP v-else icon="pi pi-arrow-right"
          class="p-button-rounded p-button-sm p-button-outlined focus:outline-0 focus:ring-0 hover:bg-sky-50"
          @click="$router.push('/project')" />
      </div>
    </div>

    <!-- Table Section -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse text-slate-600">
        <thead>
          <tr class="bg-gradient-to-r from-sky-100 to-blue-50 text-sm sm:text-base">
            <th class="py-3 px-2 text-center hidden md:table-cell rounded-tl-lg md:w-1/6">รหัสงาน</th>
            <th class="py-3 px-2 text-center md:w-2/6 rounded-tl-lg md:rounded-none">หัวข้อ</th>
            <th class="py-3 px-2 text-center hidden md:table-cell md:w-1/6">พนักงาน</th>
            <th class="py-3 px-2 text-center w-1/4 md:w-1/6">ครบกำหนด</th>
            <th class="py-3 px-2 text-center w-1/4 md:w-1/6 rounded-tr-lg">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in projects.slice(0, 5)" :key="project._id"
            class="border-b border-dashed last:border-b-0 text-sm hover:bg-gray-50 transition-colors duration-150"
            :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
            <td class="py-3 px-2 hidden md:table-cell">
              <p class="m-0 text-center font-mono text-xs sm:text-sm">
                {{ project.code.replace("undefined", "TSG") }}
              </p>
            </td>
            <td class="py-3 px-2">
              <p class="text-clip text-center truncate m-0 font-medium">{{ project.title || "-" }}</p>
            </td>
            <td class="py-3 px-2 hidden md:table-cell">
              <div class="flex justify-center">
                <div v-if="project.employees.length">
                  <p v-for="(employee, index) in project.employees" :key="index" class="text-center m-0 font-medium">
                    {{ employee }}
                  </p>
                </div>
                <p v-else class="text-orange-500 text-sm flex items-center">
                  <i class="pi pi-clock mr-1"></i> รอรับงาน
                </p>
              </div>
            </td>
            <td class="py-3 px-2">
              <p class="text-center m-0">
                <span class="px-2 py-1 rounded text-xs sm:text-sm"
                  :class="isOverdue(project.endDate) ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'">
                  {{ new Date(project.endDate).toLocaleDateString("th") }}
                </span>
              </p>
            </td>
            <td class="py-3 px-2">
              <p class="m-0 text-center">
                <span class="px-2 py-1 rounded-full text-xs whitespace-nowrap"
                  :class="getStatusColor(project.status[project.status.length - 1]?.name || 'งานใหม่')">
                  {{ project.status[project.status.length - 1]?.name || "งานใหม่" }}
                </span>
              </p>
            </td>
          </tr>
          <tr v-if="projects.slice(5).length">
            <td colspan="5" class="pt-4 pb-2">
              <p class="text-center m-0">
                <span
                  class="inline-flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm hover:bg-blue-100 cursor-pointer transition-colors">
                  และอีก {{ projects.slice(5).length }} งาน
                  <i class="pi pi-chevron-right ml-1"></i>
                </span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-lg">
      <i class="pi pi-spin pi-spinner text-4xl text-sky-500"></i>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isLoading: false,
      projects: [],
      employees: [],

      embyid: []
    };
  },
  props: {
    filterData: {
      type: String,
      default: "",
    },
    filter: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.fetchProjects();
    this.fetchEmployees();
  },
  methods: {
    async fetchProjects() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/project`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );

        this.projects = response.data.data.sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        );

        // ดึงชื่อพนักงานจาก employeeId

        await Promise.all(
          this.projects.map(async (project) => {
            if (Array.isArray(project.employees) && project.employees.length) {
              // ขยาย array ซ้อนให้เป็น array ของ employeeId ทั้งหมด
              const employeeIds = project.employees.flat();

              // เรียก fetchEmployeeById สำหรับแต่ละ employeeId
              project.employees = await Promise.all(
                employeeIds.map((id) => this.fetchEmployeeById(id))
              );
            } else {
              project.employees = [];
            }
          })
        );

        this.$emit("project", this.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchEmployees() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/get`, {
          headers: { "auth-token": `${localStorage.getItem("token")}` },
        });
        this.employees = response.data.data?.reverse() || [];
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    getEmployeesImage(employeeId) {
      const imgs = this.employees
        .filter((em) => employeeId.includes(em._id))
        .map((employee) => `https://drive.google.com/thumbnail?id=${employee.image}`);
      return imgs;
    },
    isOverdue(date) {
      return new Date(date) < new Date();
    },
    getStatusColor(status) {
      switch (status) {
        case 'งานใหม่':
          return 'bg-blue-50 text-blue-600';
        case 'กำลังดำเนินการ':
          return 'bg-yellow-50 text-yellow-600';
        case 'เสร็จสิ้น':
          return 'bg-green-50 text-green-600';
        case 'ยกเลิก':
          return 'bg-red-50 text-red-600';
        default:
          return 'bg-gray-50 text-gray-600';
      }
    },
    async fetchEmployeeById(employeeId) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/getid/${employeeId}`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );
        const { first_name, last_name } = response.data.data || {};
        return `${first_name || ""} ${last_name || ""}`.trim() || "ไม่พบข้อมูล";
      } catch (error) {
        console.error(`Error fetching employee ${employeeId}:`, error);
        return "ไม่พบข้อมูล";
      }
    }
  },
};
</script>

<style scoped>
.p-button-sm {
  padding: 0.4rem !important;
  font-size: 0.875rem !important;
}
</style>