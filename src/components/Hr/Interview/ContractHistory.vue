<template>
  <div class="p-4">
    <div class="max-w-6xl mx-auto">
      <div
        class="bg-white rounded-lg shadow-lg overflow-hidden overflow-y-scroll"
        style="max-height: 80vh"
      >
        <div class="px-6 py-4">
          <h2 class="text-2xl font-bold mb-4 text-gray-800 text-center">
            ประวัติการอนุมัติ
          </h2>
        </div>
        <div class="overflow-x-auto">
          <!-- Desktop View -->
          <table class="w-full table-auto hidden md:table">
            <thead>
              <tr class="bg-gray-200">
                <th class="px-4 py-2 text-left text-gray-800">ชื่อ</th>
                <th class="px-4 py-2 text-left text-gray-800">
                  ตำแหน่งที่สมัคร
                </th>
                <th class="px-4 py-2 text-left text-gray-800">สถานะ</th>
                <th class="px-4 py-2 text-left text-gray-800">วันที่นัดหมาย</th>
                <th class="px-4 py-2 text-left text-gray-800">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="interview in displayedInterviews"
                :key="interview._id"
                :class="[
                  interviewColor(interview),
                  { hidden: !interview.Meeting },
                ]"
                class="hover:bg-gray-100 transition-colors duration-300"
              >
                <td class="border px-4 py-2 text-gray-800">
                  {{ interview.userInfo.name }}
                </td>
                <td class="border px-4 py-2 text-gray-800">
                  {{ interview.Position_applied }}
                </td>
                <td class="border px-4 py-2 text-gray-800">
                  {{ interview.status }}
                  <template v-if="interview.status === 'รอการตอบรับ'">
                    <span class="text-yellow-600">(รอยอมรับ)</span>
                  </template>
                  <template
                    v-else-if="
                      interview.status === 'ยอมรับ' ||
                      interview.status === 'Accepted'
                    "
                  >
                    <span class="text-green-600">(ยอมรับ)</span>
                  </template>
                  <template
                    v-else-if="
                      interview.status === 'ปฏิเสธ' ||
                      interview.status === 'ไม่ผ่านสัมภาษณ์' ||
                      interview.status === 'Failed'
                    "
                  >
                    <span class="text-red-600">(ปฏิเสธ)</span>
                  </template>
                </td>
                <td class="border px-4 py-2 text-gray-800">
                  {{ formattedMeetingDate(interview) }}
                </td>
                <td class="border px-4 py-2">
                  <button
                    @click="
                      () => {
                        $emit('viewDetails', interview);
                        $emit('close');
                      }
                    "
                    class="btn-primary px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 flex items-center"
                  >
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    ดูรายละเอียด
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Mobile View -->
          <div class="md:hidden">
            <div
              v-for="interview in displayedInterviews"
              :key="interview._id"
              :class="[
                interviewColor(interview),
                { hidden: !interview.Meeting },
                'p-4 rounded-lg mb-4 flex items-center',
              ]"
            >
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-800">
                  {{ interview.userInfo.name }}
                </h3>
                <p class="text-gray-600">
                  {{ interview.Position_applied }}
                </p>
                <p class="text-gray-600">
                  {{ interview.status }}
                  <template v-if="interview.status === 'รอการตอบรับ'">
                    <span class="text-yellow-600">(รอยอมรับ)</span>
                  </template>
                  <template
                    v-else-if="
                      interview.status === 'ยอมรับ' ||
                      interview.status === 'Accepted'
                    "
                  >
                    <span class="text-green-600">(ยอมรับ)</span>
                  </template>
                  <template
                    v-else-if="
                      interview.status === 'ปฏิเสธ' ||
                      interview.status === 'ไม่ผ่านสัมภาษณ์' ||
                      interview.status === 'Failed'
                    "
                  >
                    <span class="text-red-600">(ปฏิเสธ)</span>
                  </template>
                </p>
                <p class="text-gray-600">
                  {{ formattedMeetingDate(interview) }}
                </p>
              </div>
              <button
                @click="$emit('viewDetails', interview)"
                class="btn-primary ml-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 flex items-center"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="text-center py-4" v-if="filteredInterviews.length > 10">
          <button
            @click="toggleViewAll"
            class="text-blue-500 hover:underline focus:outline-none transition-colors duration-300"
          >
            {{ viewAll ? "ซ่อน" : "ดูทั้งหมด" }}
          </button>
        </div>
        <div class="px-6 py-4">
          <button
            @click="$emit('close')"
            class="btn-primary w-full px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import "dayjs/locale/th";

export default {
  name: "ApprovalHistory",
  props: {
    filteredInterviews: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      viewAll: false,
    };
  },
  computed: {
    displayedInterviews() {
      return this.viewAll
        ? this.filteredInterviews
        : this.filteredInterviews.slice(0, 10);
    },
  },
  methods: {
    formattedMeetingDate(interview) {
      if (!interview || !interview.Meeting || !interview.Meeting.meeting_date) {
        return "(ไม่ระบุวันและเวลา)";
      }
      const meetingDate = interview.Meeting.meeting_date;
      return dayjs(meetingDate)
        .locale("th")
        .format("ddd ที่ DD MMMM ปี YYYY เวลา HH:mmน.");
    },
    interviewColor(interview) {
      if (
        interview.status === "รอการตอบรับ" ||
        interview.status === "รอการอนุมัติ" ||
        interview.status === "รอยอมรับ"
      ) {
        return "bg-yellow-200";
      } else if (
        interview.status === "ยอมรับแล้ว" ||
        interview.status === "Accepted" ||
        interview.status === "ยอมรับ" ||
        interview.status === "Passed"
      ) {
        return "bg-green-200";
      } else if (
        interview.status === "ปฏิเสธ" ||
        interview.status === "ไม่ผ่านสัมภาษณ์" ||
        interview.status === "Failed"
      ) {
        return "bg-red-200";
      } else {
        return "bg-gray-200";
      }
    },
    toggleViewAll() {
      this.viewAll = !this.viewAll;
    },
  },
};
</script>
