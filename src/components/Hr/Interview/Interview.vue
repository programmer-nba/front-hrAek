<template>
  <div class="p-2 max-w-screen-2xl mx-auto">
    <div class="md:px-1 md:py-2">
      <h1 class="text-2xl font-bold mb-4 text-center">รายการสัมภาษณ์</h1>
      <section class="container mx-auto px-4">
        <div class="mb-2 flex flex-wrap justify-between">
          <div class="mb-2 flex flex-wrap justify-center items-center">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ค้นหาชื่อ"
              class="border border-gray-300 rounded-md px-4 py-2 mr-2 sm:mb-0"
            />
            <button
              @click="showDateRangeModal = true"
              class="btn-primary mr-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
            >
              กรองตามวันที่
            </button>
            <button
              @click="clearFilters"
              class="btn-secondary mr-4 rounded-md px-4 py-2 border border-red-300 text-gray-900 hover:bg-red-200 transition-colors duration-300"
            >
              ล้าง
            </button>
          </div>
          <div class="mb-4 flex flex-wrap justify-center items-center">
            <button
              @click="showContractHistory = true"
              class="btn-secondary px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-300"
            >
              ประวัติการอนุมัติ
            </button>
          </div>
        </div>
        <div class="mb-4 flex flex-wrap justify-center gap-2">
          <button
            v-for="position in uniquePositions"
            :key="position"
            @click="filterByPosition(position)"
            class="btn-primary px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
            :class="{ 'bg-blue-600': selectedPosition === position }"
          >
            {{ position }}
          </button>
          <button
            @click="filterByPosition(null)"
            class="btn-secondary px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-300"
            :class="{ 'bg-gray-600': selectedPosition === null }"
          >
            ทั้งหมด
          </button>
          <button
            @click="refreshData"
            class="btn-primary px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300"
          >
            รีเฟรช
          </button>
        </div>

        <div class="overflow-x-auto bg-white rounded-md shadow">
          <table class="w-full table-auto">
            <thead>
              <tr
                class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
              >
                <th class="p-4 text-left">ลำดับ</th>
                <th class="p-4 text-left">ชื่อ</th>
                <th class="p-4 text-left">ตำแหน่งที่สมัคร</th>
                <th class="p-4 text-left">สถานะ</th>
                <th class="p-4 text-left">วันที่นัดหมาย</th>
                <th class="p-4 text-left">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <!-- {{
                console.log(filteredInterviews)
              }} -->
              <tr
                v-for="(interview, i) in paginatedInterviews"
                :key="i"
                class="border-b border-gray-200 hover:bg-gray-100"
              >
                <td class="p-2 text-left">
                  {{ filteredInterviews.indexOf(interview) + 1 }}
                </td>
                <td class="p-2 text-left">
                  {{ interview.userInfo.name }}
                </td>
                <td class="p-2 text-left">
                  {{ interview.Position_applied }}
                </td>
                <td class="p-2 text-left">
                  <div
                    class="px-3 py-1 inline rounded"
                    :class="{
                      'bg-teal-500 text-white':
                        interview.userInfo.status === 'ผ่านสัมภาษณ์',
                      'bg-red-500 text-white':
                        interview.userInfo.status === 'ไม่ผ่านสัมภาษณ์',
                      'bg-yellow-500 text-white':
                        interview.userInfo.status === 'รอการตอบรับ',
                      'bg-blue-500 text-white':
                        interview.userInfo.status === 'New',
                    }"
                  >
                    {{ interview.userInfo.status }}
                  </div>
                </td>
                <td class="p-2">
                  {{ formattedMeetingDate(interview) }}
                </td>
                <td class="p-2 text-center">
                  <div class="flex flex-wrap justify-start items-center gap-2">
                    <button
                      @click="openResumeModal(interview)"
                      class="btn-primary px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                    >
                      เรซูเม่
                    </button>
                    <button
                      @click="openModal(interview)"
                      class="btn-primary px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                    >
                      รายละเอียด
                    </button>
                    <button
                      @click="openContractModal(interview)"
                      class="btn-success px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
                    >
                      สัญญาร่าง
                    </button>
                    <!-- <button
                      @click="approveInterview(interview)"
                      class="btn-warning px-4 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-300"
                    >
                      อนุมัติ
                    </button> -->
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
      </section>
    </div>
    <div
      v-if="showNotification"
      class="fixed bottom-0 right-0 m-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
    >
      มีข้อมูลใหม่
    </div>

    <!-- Resume Modal -->
    <div
      v-if="showResumeModal"
      class="fixed inset-0 flex items-center justify-center z-10 overflow-y-auto"
      @click.self="closeResumeModal"
    >
      <div
        class="bg-white rounded-lg overflow-hidden shadow-xl p-8 max-w-lg mx-auto"
      >
        <Resume
          :applicantInfo="selectedInterview.userInfo"
          :interview="selectedInterview"
          @close="closeResumeModal"
        />
      </div>
    </div>

    <!-- Interview Details Modal -->
    <div
      v-if="showPopup"
      class="fixed inset-0 flex items-center justify-center z-10 overflow-y-auto"
      @click.self="showPopup = false"
    >
      <div
        class="bg-white rounded-lg overflow-hidden shadow-xl p-8 max-w-lg mx-auto"
      >
        <View :interview="selectedInterview" @close="showPopup = false" />
      </div>
    </div>

    <!-- Contract Draft Modal -->
    <div
      v-if="showContractModal"
      class="fixed inset-0 flex items-center justify-center z-20 overflow-y-auto"
      @click.self="closeContractModal"
    >
      <div
        class="bg-white rounded-lg fixed z-50 overflow-hidden shadow-xl p-8 max-w-lg mx-auto"
      >
        <ContractDraft
          :applicantInfo="selectedInterview.userInfo"
          :position="selectedInterview.Position_applied"
          :showModal="showContractModal"
          @close="closeContractModal"
        />
      </div>
    </div>

    <!-- Contract History Modal -->
    <div
      v-if="showContractHistory"
      class="fixed inset-0 flex items-center justify-center z-30 overflow-x-auto"
      @click.self="showContractHistory = false"
    >
      <ContractHistory
        :filteredInterviews="filteredInterviews"
        @close="showContractHistory = false"
        @viewDetails="openModal"
      />
    </div>

    <!-- Date Range Modal -->
    <div
      v-if="showDateRangeModal"
      class="fixed inset-0 flex items-center justify-center z-40 overflow-y-auto"
      @click.self="closeDateRangeModal"
    >
      <div
        class="bg-white rounded-lg overflow-hidden shadow-xl p-8 max-w-lg mx-auto"
      >
        <h2 class="text-2xl font-bold mb-4">กรองตามช่วงวันที่</h2>
        <div class="flex flex-col">
          <label for="startDate" class="mb-2">วันที่เริ่มต้น</label>
          <input
            id="startDate"
            v-model="startDate"
            type="date"
            class="border border-gray-300 rounded-md px-4 py-2 mb-4"
          />

          <label for="endDate" class="mb-2">วันที่สิ้นสุด</label>
          <input
            id="endDate"
            v-model="endDate"
            type="date"
            class="border border-gray-300 rounded-md px-4 py-2 mb-4"
          />
        </div>
        <div class="flex justify-end mt-4">
          <button
            @click="closeDateRangeModal"
            class="btn-secondary mr-4 rounded-md px-4 py-2 border border-gray-300 text-gray-900 hover:bg-gray-200 transition-colors duration-300"
          >
            ยกเลิก
          </button>
          <button
            @click="applyDateRangeFilter"
            class="btn-primary rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
          >
            ตกลง
          </button>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
// Import necessary dependencies and components
import dayjs from "dayjs";
import "dayjs/locale/th";
import axios from "axios";
import Resume from "./Resume.vue";
import View from "./InterviewDetails.vue";
import ContractDraft from "./ContractDraft.vue";
import ContractHistory from "./ContractHistory.vue";

export default {
  name: "Interview",
  components: {
    Resume,
    View,
    ContractDraft,
    ContractHistory,
  },
  data() {
    return {
      loading: true,
      currentPage: 1, //  หน้าปัจจุบัน
      pageSize: 10, //  จำนวนรายการต่อหน้า

      passedInterviews: [],
      agreements: [],
      showPopup: false,
      selectedInterview: null,
      showResumeModal: false,
      showContractModal: false,
      selectedPosition: null,
      showNotification: false,
      showContractHistory: false,
      searchQuery: "",
      startDate: null,
      endDate: null,
      showDateRangeModal: false,
      hasNewData: false,
    };
  },
  mounted() {
    this.fetchPassedInterviews();
  },
  methods: {
    async fetchArguments() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/agreement/getall`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log("agreement", response);
        if (response.data.status) {
          this.agreements = response.data.data;

          this.passedInterviews.forEach((interview) => {
            const agreement = this.agreements.find(
              (agreement) => agreement.user_id === interview.User_id
            );

            if (agreement) {
              interview.status = agreement.argument_status;

              if (
                agreement.argument_status === "รอการตอบรับ" &&
                !this.hasNewData
              ) {
                this.hasNewData = true;
                this.showNotification = true;
                setTimeout(() => {
                  this.showNotification = false;
                }, 5000);
              }
            }
          });
        }
      } catch (error) {
        console.error("Error fetching arguments:", error);
      }
    },

    async fetchPassedInterviews() {
      try {
        this.loading = true;
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/examresults`
        );
        if (response.status === 200 && Array.isArray(response.data.data)) {
          const passedInterviews = (
            await Promise.all(
              response.data.data.map(async (interview) => {
                try {
                  const userInfoResponse = await axios.get(
                    `${import.meta.env.VITE_VUE_APP_DECCAN}/user_info/byid/${
                      interview.User_id
                    }`
                  );

                  if (
                    userInfoResponse.status === 200 &&
                    userInfoResponse.data
                  ) {
                    interview.userInfo = userInfoResponse.data.data;
                    // ตรวจสอบสถานะการตอบรับเพื่อกำหนดค่า disabled ของปุ่ม "สัญญาร่าง"
                    if (interview.userInfo.status === "รอการตอบรับ") {
                      interview.disableContractButton = true;
                    } else {
                      interview.disableContractButton = false;
                    }
                    return interview;
                  } else {
                    console.warn(
                      `No user info found for user ID: ${interview.User_id}`
                    );
                    return null;
                  }
                } catch (error) {
                  console.error("Error fetching user info:", error);
                  console.warn(
                    `Error fetching user info for user ID: ${interview.User_id}`
                  );
                  return null;
                }
              })
            )
          ).filter((interview) => interview !== null);

          this.passedInterviews = passedInterviews;
          this.fetchArguments();
          this.hasNewData = true;
          this.showNotification = true;
          this.loading = false;
          setTimeout(() => {
            this.showNotification = false;
          }, 5000);
        } else {
          console.error(
            "Invalid response format or empty data array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching passed interviews:", error);
      }
    },

    openContractModal(interview) {
      this.selectedInterview = interview;
      this.showContractModal = true;
    },
    closeContractModal() {
      this.showContractModal = false;
    },
    openModal(interview) {
      this.selectedInterview = interview;
      this.showPopup = true;
    },
    openResumeModal(interview) {
      this.selectedInterview = interview;
      this.showResumeModal = true;
    },
    closeResumeModal() {
      this.showResumeModal = false;
    },
    filterByPosition(position) {
      this.selectedPosition = position;
    },
    approveInterview(interview) {
      const approvalEntry = {
        interviewId: interview._id,
        timestamp: new Date().toISOString(),
        status: "ยืนยัน",
      };
      this.approvalHistory.push(approvalEntry);
      interview.userInfo.status = "Accepted";
      alert(`อนุมัติการสัมภาษณ์สำหรับ ${interview.userInfo.name} แล้ว`);
    },
    rejectInterview(interview) {
      const approvalEntry = {
        interviewId: interview._id,
        timestamp: new Date().toISOString(),
        status: "ปฏิเสธ",
      };
      this.approvalHistory.push(approvalEntry);
      interview.userInfo.status = "Rejected";
      alert(`"ปฏิเสธการสัมภาษณ์สำหรับ" ${interview.userInfo.name} แล้ว`);
    },
    clearFilters() {
      this.startDate = null;
      this.endDate = null;
      this.selectedPosition = null;
      this.fetchPassedInterviews();
    },
    filterByDateRange() {
      this.showDateRangeModal = true;
      this.startDate = null;
      this.endDate = null;
    },
    closeDateRangeModal() {
      this.showDateRangeModal = false;
      this.startDate = null;
      this.endDate = null;
    },
    applyDateRangeFilter() {
      if (this.startDate && this.endDate) {
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);
        this.passedInterviews = this.filteredInterviews.filter((interview) => {
          const meetingDate = new Date(interview.Meeting.meeting_date);
          return meetingDate >= startDate && meetingDate <= endDate;
        });
      } else {
        this.passedInterviews = this.filteredInterviews;
      }

      this.closeDateRangeModal();
    },
    shouldHighlightRow(interview) {
      return interview.argument_status === "ตอบรับแล้ว";
    },
    refreshData() {
      this.fetchPassedInterviews();
      this.fetchArguments();
      this.hasNewData = false;
      this.showNotification = false;
      this.showContractHistory = false;

      // ตรวจสอบสถานะการตอบรับเพื่อกำหนดค่า disabled ของปุ่ม "สัญญาร่าง"
      this.passedInterviews.forEach((interview) => {
        if (interview.userInfo.status === "รอการตอบรับ") {
          interview.disableContractButton = true;
        } else {
          interview.disableContractButton = false;
        }
      });
    },
  },
  computed: {
    groupedInterviews() {
      return this.passedInterviews.reduce((acc, interview) => {
        const position = interview.Position_applied;
        if (!acc[position]) {
          acc[position] = [];
        }
        acc[position].push(interview);
        return acc;
      }, {});
    },
    formattedMeetingDate() {
      return (interview) => {
        if (
          !interview ||
          !interview.Meeting ||
          !interview.Meeting.meeting_date
        ) {
          return "(ผู้สัมภาษณ์ไม่ระบุวันและเวลา)";
        }
        const meetingDate = interview.Meeting.meeting_date;
        return dayjs(meetingDate).locale("th").format("DD/MM/YY HH:mmน.");
      };
    },
    interviewColor() {
      return (interview) => {
        if (
          interview.status === "รอการตอบรับ" ||
          interview.userInfo.status === "รอการสัมภาษณ์" ||
          interview.userInfo.status === "New"
        ) {
          return "bg-yellow-200";
        } else if (
          interview.status === "ปฏิเสธ" ||
          interview.userInfo.status === "ไม่ผ่านสัมภาษณ์"
        ) {
          // return "bg-red-200";
        } else if (
          interview.status === "ยอมรับ" ||
          interview.userInfo.status === "ผ่านสัมภาษณ์"
        ) {
          // return "bg-green-200";
        } else {
          // return "bg-blue-200";
        }
      };
    },
    uniquePositions() {
      const positions = new Set(
        this.passedInterviews.map((interview) => interview.Position_applied)
      );
      return Array.from(positions);
    },
    filteredInterviews() {
      let interviews = this.passedInterviews;
      if (this.searchQuery) {
        this.currentPage = 1;
        interviews = interviews.filter((interview) =>
          interview.userInfo.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.selectedPosition !== null) {
        interviews = interviews.filter(
          (interview) => interview.Position_applied === this.selectedPosition
        );
      }

      if (this.startDate && this.endDate) {
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);

        interviews = interviews.filter((interview) => {
          const meetingDate = new Date(interview.Meeting.meeting_date);
          return meetingDate >= startDate && meetingDate <= endDate;
        });
      }

      interviews.sort(
        (a, b) => new Date(b.Create_date) - new Date(a.Create_date)
      );
      return interviews;
    },
    paginatedInterviews() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredInterviews.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredInterviews.length / this.pageSize);
    },
  },
};
</script>

<style>
.has-new-data td {
  animation: newDataAnimation 1s infinite;
}

@keyframes newDataAnimation {
  0% {
    background-color: inherit;
  }
  50% {
    background-color: #ffeeba;
  }
  100% {
    background-color: inherit;
  }
}
</style>
