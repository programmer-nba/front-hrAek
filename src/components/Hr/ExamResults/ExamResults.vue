<template>
  <div class="px-4 py-8">
    <div class="flex-col">
      <Calendar />
      <h1>ปฏิทิน</h1>
      <div
        class="border-indigo-500 border-b-2 border-t-2 w-32 md:w-16 rounded"
      ></div>
    </div>

    <div class="flex flex-col items-center mb-4">
      <div
        class="flex flex-col md:flex-row md:justify-center items-center mb-4"
      >
        <h1 class="text-2xl font-bold text-gray-800 mb-2 md:mb-0">ผลการสอบ</h1>

        <button
          @click="togglePopup"
          class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 md:ml-4"
        >
          เพิ่มวันสัมภาษณ์
        </button>
      </div>
      <div class="relative w-full md:w-auto">
        <input
          type="text"
          v-model="searchText"
          placeholder="ค้นหารายชื่อ..."
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"
          @input="searchPostById"
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
      <Add
        v-if="AddPopup"
        :results="AddPopup"
        @close="AddPopup = false"
        @addResults="fetchResults"
      />

      <div class="flex justify-center mb-4 w-full">
        <div
          class="flex flex-col md:flex-row items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto md:ml-4"
        >
          <span class="mr-2">วันที่เริ่มต้น</span>
          <div class="relative">
            <input
              type="date"
              v-model="startDate"
              placeholder="วันที่เริ่มต้น..."
              class="px-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
          <span class="mx-2">วันที่สิ้นสุด</span>
          <div class="relative">
            <input
              type="date"
              v-model="endDate"
              placeholder="วันที่สิ้นสุด..."
              class="px-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            <button
              @click="clearSelectedDates"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 ml-2"
            >
              ล้าง
            </button>
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
            <th class="p-4 text-left">ลำดับ</th>
            <th class="p-4 text-left">เบอร์โทร</th>
            <th class="p-4 text-left">ชื่อ</th>
            <th class="p-4 text-left">เพศ</th>
            <th class="p-4 text-left">ตำแหน่งที่สมัคร</th>
            <th class="p-4 text-left">คะแนน</th>
            <th class="p-4 text-left">ผลลัพธ์</th>
            <th class="p-4 text-left">วันที่นัดหมาย</th>
            <th class="p-4 text-left">สถานะนัดหมาย</th>
            <th class="p-4 text-left">จัดการ</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr
            v-for="(results, index) in (filteredResults.length > 0
              ? filteredResults
              : ExamResults
            ).slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            :key="index"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="p-3 text-left whitespace-nowrap">
              {{ index + 1 }}
            </td>
            <td class="p-3 text-left whitespace-nowrap">
              {{ results.userInfo.tel }}
            </td>
            <td class="p-3 text-left whitespace-nowrap">
              {{ results.userInfo.name }} {{ results.userInfo.lastname }}
            </td>
            <td class="p-3 text-left whitespace-nowrap">
              {{ results.userInfo.gender }}
            </td>
            <td class="p-3 text-left whitespace-nowrap">
              {{ results.Position_applied }}
            </td>
            <td class="p-3 text-left whitespace-nowrap">
              {{ results.Score }}
            </td>
            <td class="py -3 px-6 text-left whitespace-nowrap">
              {{ results.Result }}
            </td>
            <td class="p-3 text-left whitespace-nowrap">
              {{ formatDate(results.Meeting.meeting_date) }}
            </td>
            <td class="p-3 text-left whitespace-nowrap">
              {{ results.Meeting.meeting_type }}
            </td>
            <td class="p-3 text-center">
              <div class="flex justify-center items-center space-x-2">
                <button
                  @click="openDetailsPopup(results)"
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
                <View
                  v-if="ShowPopup"
                  :results="selectedPost"
                  @close="ShowPopup = false"
                />
                <button
                  @click="openEditModal(results)"
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
                <Edit
                  v-if="EditPopup"
                  :results="PostToEdit"
                  @close="EditPopup = false"
                  @editedResults="fetchResults"
                />
                <button
                  @click="deletef(results)"
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
    <div v-if="totalPages > 1" class="flex justify-center my-3 gap-2">
      <button
        @click="currentPage -= 1"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        ก่อนหน้า
      </button>
      <button
        disabled
        class="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        หน้า {{ currentPage }}/{{ totalPages || 1 }}
      </button>
      <button
        @click="currentPage += 1"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        ถัดไป
      </button>
    </div>
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Add from "./ResultAdd.vue";
import Edit from "./ResultEdit.vue";
import View from "./ResultView.vue";
import Calendar from "./Calendar.vue";

export default {
  components: {
    Add,
    Edit,
    View,
    Calendar,
  },
  data() {
    return {
      loading: false,
      currentPage: 1, //  หน้าปัจจุบัน
      pageSize: 10, //  จำนวนรายการต่อหน้า

      ExamResults: [],
      originalResults: [],
      searchText: "",
      ShowPopup: false,
      AddPopup: false,
      EditPopup: false,
      PostToEdit: null,
      selectedPost: null,
      startDate: null,
      endDate: null,
      selectedDates: [],
    };
  },
  mounted() {
    this.fetchResults();
  },
  methods: {
    async fetchResults() {
      try {
        this.loading = true;
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/examresults`
        );

        if (
          response.status === 200 &&
          response.data &&
          Array.isArray(response.data.data.reverse())
        ) {
          this.ExamResults = await Promise.all(
            response.data.data.map(async (result) => {
              try {
                // console.log('fdddddddsf',result.User_id);
                const userInfoResponse = await axios.get(
                  `${import.meta.env.VITE_VUE_APP_DECCAN}/user_info/byid/${
                    result.User_id
                  }`
                );
                if (userInfoResponse.status === 200 && userInfoResponse.data) {
                  result.userInfo = userInfoResponse.data.data || {}; // ถ้า userInfo เป็น undefined จะเซตเป็นออบเจกต์ว่างแทน
                } else {
                  console.warn(
                    `No user info found for user ID: ${result.User_id}`
                  );
                  return null; // Skip this result
                }
                console.log(userInfoResponse.data.data);
              } catch (error) {
                console.warn(
                  `Error fetching user info for user ID: ${result.User_id}`
                );
                return null; // Skip this result
              }
              return result;
            })
          );
          this.ExamResults = this.ExamResults.filter(
            (result) => result !== null
          ); // Filter out results with no user info
          console.log(`fdddddddsf`, this.ExamResults);
          this.originalResults = response.data.data;
          this.loading = false;
        } else {
          console.error(
            "Invalid response format or empty data array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching ExamResults:", error);
        this.ExamResults = [];
        this.originalResults = [];
      }
    },

    togglePopup() {
      this.AddPopup = !this.AddPopup;
    },
    openEditModal(results) {
      this.PostToEdit = results;
      this.EditPopup = true;
    },
    handleClose() {
      this.ShowPopup = false;
    },
    async deletef(results) {
      Swal.fire({
        title: "Confirm Delete",
        text: "Are you sure you want to delete this results?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(
              `${
                import.meta.env.VITE_VUE_APP_DECCAN
              }/examresults/delete-examsults/${results._id}`
            );
            Swal.fire("Deleted!", "The results has been deleted.", "success");
            this.ExamResults = this.ExamResults.filter(
              (item) => item._id !== results._id
            );
            this.originalResults = this.originalResults.filter(
              (item) => item._id !== results._id
            );
          } catch (error) {
            console.error("Error deleting ExamResults:", error);
            Swal.fire("Error!", "Failed to delete the results.", "error");
          }
        }
      });
    },

    searchPostById() {
      if (this.searchText.trim()) {
        this.currentPage = 1;
        const filteredResults = this.ExamResults.filter(
          (result) => result.userInfo._id === this.searchText
        );
        this.ExamResults = filteredResults;
      } else {
        this.ExamResults = [...this.originalResults];
      }
    },

    openDetailsPopup(results) {
      this.selectedPost = results;
      this.ShowPopup = true;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    clearSelectedDates() {
      this.startDate = null;
      this.endDate = null;
    },
  },
  computed: {
    totalPages() {
      const data =
        this.filteredResults.length > 0
          ? this.filteredResults
          : this.ExamResults;
      return Math.ceil(data.length / this.pageSize);
    },
    filteredResults() {
      let filtered = [...this.ExamResults];

      if (this.startDate && this.endDate) {
        filtered = filtered.filter((result) => {
          const meetingDate = new Date(result.Meeting.meeting_date);
          return (
            meetingDate >= new Date(this.startDate) &&
            meetingDate <= new Date(this.endDate + " 23:59:59")
          );
        });
      }

      return filtered;
    },
  },
};
</script>
