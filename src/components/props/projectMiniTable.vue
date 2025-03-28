<template>
  <div class="bg-white rounded p-3">
    <div class="flex justify-between items-center py-2">
      <p class="m-0 text-lg font-bold">
        งานประจำวันที่
        <span class="px-2">{{ new Date().toLocaleDateString("th") }}</span>
      </p>
      <p class="text-center text-sm m-0">
        ทั้งหมด {{ projects.length }} งาน
        <span
          ><ButtonP
            v-if="$store.getters.role === 'employee'"
            icon="pi pi-arrow-right text-xs"
            class="focus:outline-0 focus:ring-0"
            @click="$router.push('/Work')" /><ButtonP
            v-else
            icon="pi pi-arrow-right text-xs"
            class="focus:outline-0 focus:ring-0"
            @click="$router.push('/project')"
        /></span>
      </p>
    </div>
    <table class="table-fixed text-slate-600 border-neutral-200 border-collapse w-full">
      <thead class="bg-sky-100">
        <tr class="font-semibold text-sm text-black">
          <th class="text-center py-2 hidden md:block">รหัสงาน</th>
          <th class="text-center py-2">หัวข้อ</th>
          <th class="text-center py-2 hidden md:block">พนักงาน</th>
          <th class="text-center py-2">ครบกำหนด</th>
          <th class="text-center py-2">สถานะ</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="project in projects.slice(0, 5)"
          :key="project._id"
          class="border-b border-dashed last:border-b-0 text-sm md:text-lg"
        >
          <td class="py-2 hidden md:block">
            <p class="text-clip truncate m-0">
              {{ project.code.replace("undefined", "TSG") }}
            </p>
          </td>
          <td class="py-2">
            <p class="text-clip truncate m-0">{{ project.title || "-" }}</p>
          </td>
          <td class="py-2 hidden md:block">
            <div class="flex justify-center">
              <div
                v-for="(img, index) in getEmployeesImage(project.employees).slice(0, 2)"
                :key="index"
                class="-mx-2 flex items-center"
              >
                <Image
                  v-if="img"
                  :src="img"
                  imageClass="w-10 h-10 rounded-full border border-white"
                  preview
                />
                <div v-else class="w-10 h-10 rounded-full bg-purple-400"></div>
              </div>
              <p
                v-if="getEmployeesImage(project.employees).length"
                class="m-0 bg-black text-white h-fit p-0 rounded-full px-1 z-1 translate-y-1/2 text-xs"
              >
                {{
                  getEmployeesImage(project.employees).slice(2).length
                    ? `+${getEmployeesImage(project.employees).slice(2).length}`
                    : null
                }}
              </p>
              <p v-else class="m-0 text-xs">รอรับงาน</p>
            </div>
          </td>
          <td class="py-2">
            <p class="text-clip text-center truncate m-0">
              {{ new Date(project.dueDate).toLocaleDateString("th") }}
            </p>
          </td>
          <td class="py-2">
            <p class="text-clip truncate m-0 text-center text-xs md:text-sm">
              {{ project.status[project.status.length - 1]?.name || "งานใหม่" }}
            </p>
          </td>
        </tr>
        <tr v-if="projects.slice(5).length">
          <td colspan="5" class="pt-3">
            <p class="text-center text-sm m-0">
              และอีก {{ projects.slice(5).length }} งาน
            </p>
          </td>
        </tr>
      </tbody>
    </table>
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
  computed: {},
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
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        //console.log(response.data.data)
        this.projects = response.data.data.sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
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
  },
};
</script>

<style scoped></style>
