<template>
  <div class="px-4 mt-6">
    <div class="flex flex-col items-center mb-4">
      <div
        class="flex flex-col md:flex-row md:justify-center items-center mb-4"
      >
        <h1 class="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
          ข้อมูลเวลางานของพนักงาน
        </h1>
      </div>
      <div class="relative w-full md:w-auto">
        <input
          type="text"
          v-model="searchText"
          placeholder="ค้นหาชื่อพนักงาน..."
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"
          @input="searchEmployeesByName"
        />

        <div
          class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      <div class="flex justify-center mb-4 w-full">
        <div
          class="flex flex-col md:flex-row items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto md:ml-4"
        >
          <span class="mr-2">เลือกตำแหน่งงาน:</span>
          <div class="relative">
            <select
              class="px-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              v-model="selectedPosition"
              @change="filterByPosition"
            >
              <option value="null">ทั้งหมด</option>
              <option
                v-for="position in uniquePositions"
                :key="position"
                :value="position"
              >
                {{ position }}
              </option>
            </select>
          </div>
          <span class="mr-2">เลือกวันที่:</span>
          <div class="relative">
            <input
              type="date"
              v-model="selectedDate"
              class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              @change="filterByDate"
            />
          </div>
          <span class="mr-2">เลือก time_line:</span>
          <div class="relative">
            <select
              class="px-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              v-model="selectedTimeline"
              @change="filterByTimeline"
            >
              <option value="null">ทั้งหมด</option>
              <option value="เข้างานช่วงเช้า">เข้างานช่วงเช้า</option>
              <option value="เข้างานช่วงบ่าย">เข้างานช่วงบ่าย</option>
              <option value="ลงเวลาออกงาน">ลงเวลาออกงาน</option>
              <option value="OT">OT</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto bg-white rounded-md shadow">
      <table class="w-full table-auto">
        <thead>
          <tr
            class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th class="py-3 px-6 text-left">ลำดับ</th>
            <th class="py-3 px-6 text-left">ชื่อพนักงาน</th>
            <th class="py-3 px-6 text-left">ตำแหน่ง</th>
            <th class="py-3 px-6 text-left">time_line</th>
            <th class="py-3 px-6 text-left">วัน-เดือน-ปี</th>
            <th class="py-3 px-6 text-left">เวลา</th>
            <th class="py-3 px-6 text-left">เวลาเข้า</th>
            <th class="py-3 px-6 text-left">เวลาออก</th>
            <th class="py-3 px-6 text-left">จัดการ</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr
            v-for="(employee, index) in paginatedEmployees"
            :key="index"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ index + 1 }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ employee.name || "-" }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ employee.position }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ employee.time_line }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ formatDate(employee.day, employee.mount, employee.year) }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ employee.time }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ employee.time_in }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ employee.time_out }}
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex justify-center items-center space-x-2">
                <button
                  @click="openDetailsPopup(employee)"
                  class="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    ></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <ViewEmployee
                  v-if="showViewPopup"
                  :employee="selectedEmployee"
                  @close="showViewPopup = false"
                />
                <button
                  @click="openEditModal(employee)"
                  class="text-yellow-500 hover:text-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  <svg
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    ></path>
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    ></path>
                  </svg>
                </button>
                <EditEmployee
                  v-if="showEditEmployeePopup"
                  :employee="employeeToEdit"
                  @close="showEditEmployeePopup = false"
                />
                <!-- ปุ่มลบ -->
                <button
                  @click="deleteEmployee(employee)"
                  class="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <svg
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path
                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    ></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="flex flex-col justify-center items-center mt-4 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row overflow-x-auto"
    >
      <!-- Showing X to Y of Z -->
      <div class="text-sm text-gray-600">
        Showing {{ (currentPage - 1) * perPage + 1 }} to
        {{ Math.min(currentPage * perPage, filteredEmployees.length) }} of
        {{ filteredEmployees.length }}
      </div>
      <!-- Previous Page Button -->
      <button
        v-if="currentPage > 1"
        @click="currentPage--"
        class="btn-pagination bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
      >
        &lt; Previous
      </button>
      <!-- Page Numbers -->
      <div class="flex space-x-4">
        <button
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          @click="currentPage = pageNumber"
          :class="{
            'bg-purple-500 text-white': pageNumber === currentPage,
            'bg-gray-200': pageNumber !== currentPage,
          }"
          class="btn-pagination px-4 py-2 rounded-md hover:bg-purple-600 hover:text-white"
        >
          {{ pageNumber }}
        </button>
      </div>
      <!-- Next Page Button -->
      <button
        v-if="currentPage < totalPages"
        @click="currentPage++"
        class="btn-pagination bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
      >
        Next &gt;
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddEmployee from "./Employee_TimeAdd.vue";
import EditEmployee from "./Employee_TimeEdit.vue";
import ViewEmployee from "./Employee_TimeView.vue";

export default {
  components: {
    AddEmployee,
    EditEmployee,
    ViewEmployee,
  },
  data() {
    return {
      employees: [],
      perPage: 10,
      currentPage: 1,
      searchText: "",
      showViewPopup: false,
      showAddEmployeePopup: false,
      showEditEmployeePopup: false,
      employeeToEdit: null,
      selectedEmployee: null,
      selectedPosition: null,
      selectedDate: null,
      selectedTimeline: null,
    };
  },

  computed: {
    filteredEmployees() {
      let filtered = this.employees;
      if (this.selectedPosition !== null && this.selectedPosition !== "null") {
        filtered = filtered.filter(
          (employee) => employee.position === this.selectedPosition
        );
      }
      if (this.selectedDate) {
        filtered = filtered.filter((employee) => {
          const employeeDate = new Date(
            `${employee.year}-${employee.mount}-${employee.day}`
          );
          return employeeDate.toISOString().split("T")[0] === this.selectedDate;
        });
      }
      if (this.selectedTimeline !== null && this.selectedTimeline !== "null") {
        filtered = filtered.filter(
          (employee) => employee.time_line === this.selectedTimeline
        );
      }
      return filtered;
    },
    totalPages() {
      return Math.ceil(this.filteredEmployees.length / this.perPage);
    },
    paginatedEmployees() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredEmployees.slice(start, end);
    },
    uniquePositions() {
      const positions = new Set(
        this.employees.map((employee) => employee.position)
      );
      return Array.from(positions);
    },
  },

  methods: {
    async fetchEmployees() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_EMPLOYEE}/time/admin/getall`
        );
        this.employees = response.data.data.reverse();
        console.log("employees", this.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },

    async fetchEmployeeData() {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_EMPLOYEE}/get`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log(localStorage.getItem("token"));
        if (Array.isArray(data.data)) {
          const employeeData = data.data;
          this.employees.forEach((employee) => {
            const employeeInfo = employeeData.find(
              (emp) => emp._id === employee.employee_id
            );
            if (
              employeeInfo &&
              employeeInfo.first_name &&
              employeeInfo.last_name
            ) {
              employee.name =
                employeeInfo.first_name + " " + employeeInfo.last_name;
              employee.position = employeeInfo.position;
            } else {
              employee.name = employeeInfo?.first_name || "-";
            }
          });
        } else {
          console.error("Invalid response format or empty data array:", data);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    },
    searchEmployeesByName() {
      if (this.searchText.trim() === "") {
        // ถ้าไม่มีข้อความค้นหา ให้แสดงข้อมูลทั้งหมด
        this.fetchEmployees();
      } else {
        // กรองข้อมูลจากข้อความค้นหา
        this.employees = this.employees.filter((employee) => {
          const fullName = `${employee.name || ""} ${
            employee.position || ""
          }`.toLowerCase();
          const searchQuery = this.searchText.trim().toLowerCase();
          return fullName.includes(searchQuery);
        });
      }
    },

    openDetailsPopup(employee) {
      this.selectedEmployee = employee;
      this.showViewPopup = true;
    },

    openEditModal(employee) {
      this.employeeToEdit = employee;
      this.showEditEmployeePopup = true;
    },
    deleteEmployee(employee) {
      // Add your delete employee logic here
      console.log("Deleting employee:", employee);
    },

    filterByPosition() {
      this.currentPage = 1; // Reset to first page when filtering
    },

    filterByDate() {
      this.currentPage = 1; // Reset to first page when filtering
      const filteredEmployees = this.employees.filter((employee) => {
        // Debug logging
        console.log(
          "Employee date components:",
          employee.year,
          employee.mount,
          employee.day
        );
        // Create Date object
        const employeeDate = new Date(
          `${employee.year}-${employee.mount}-${employee.day}`
        );
        // Check if the date is valid
        if (isNaN(employeeDate)) {
          // Handle invalid dates
          return false; // Skip this employee
        }
        // Convert to ISO string and compare with selectedDate
        return employeeDate.toISOString().split("T")[0] === this.selectedDate;
      });
      this.$emit("update:filtered-employees", filteredEmployees); // Emit the event to update the computed property
    },

    filterByTimeline() {
      this.currentPage = 1; // Reset to first page when filtering
    },

    formatDate(day, month, year) {
      const date = new Date(`${year}-${month}-${day}`);
      if (isNaN(date)) {
        return "-";
      }
      return `${day} - ${month} - ${year}`;
    },
  },
  mounted() {
    this.fetchEmployees();
    this.fetchEmployeeData();
  },
};
</script>
