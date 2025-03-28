<template>
  <div
    class="absolute inset-0 flex items-center justify-center overflow-y-auto z-[2000]"
  >
    <!-- Background Overlay -->
    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>

    <!-- Modal Container -->
    <div
      class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
    >
      <!-- Modal Header -->
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6">
        <div class="sm:flex sm:items-start">
          <!-- Applicant's Image -->
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            <img
              :src="interview.userInfo.image"
              alt=""
              class="h-10 w-10 rounded-full"
            />
          </div>

          <!-- Interview Details -->
          <div class="p-2">
            <h3 class="text-lg font-medium text-gray-900">รายละเอียดการสอบ</h3>
            <div class="mt-4 space-y-2">
              <p class="text-sm text-gray-500">
                <a class="font-bold">ผลการสอบ:</a> {{ interview.Result }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">คะแนน:</a> {{ interview.Score }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">ตำแหน่งที่สมัคร:</a>
                {{ interview.Position_applied }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">วันที่นัดหมาย:</a>
                {{ interview.Meeting_result }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">สถานะนัดหมาย:</a>
                {{ interview.Meeting.meeting_type }}
              </p>
            </div>
          </div>

          <!-- Applicant Details -->
          <div class="p-2">
            <h3 class="text-lg font-medium text-gray-900">
              รายละเอียดผู้สมัคร
            </h3>
            <div class="mt-4 space-y-2">
              <p class="text-sm text-gray-500">
                <a class="font-bold">ชื่อ: </a>{{ interview.userInfo.name }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">เพศ:</a> {{ interview.userInfo.gender }}
              </p>
              <!-- <p class="text-sm text-gray-500">
                <a class="font-bold">วันเกิด:</a> {{ interview.userInfo.birth }}
              </p> -->
              <p class="text-sm text-gray-500">
                <a class="font-bold">เบอร์โทร:</a> {{ interview.userInfo.tel }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">ประเทศ:</a> {{ interview.userInfo.country }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">ศาสนา:</a> {{ interview.userInfo.religion }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">ส่วนสูง:</a> {{ interview.userInfo.height }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">น้ำหนัก:</a> {{ interview.userInfo.weight }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">สถานภาพสมรส:</a> {{ interview.userInfo.marry }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">สถานภาพทางการทหาร:</a> {{ interview.userInfo.soldier }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">ที่อยู่:</a> {{ interview.userInfo.address }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">จังหวัด:</a> {{ interview.userInfo.province }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">รหัสไปรษณีย์:</a> {{ interview.userInfo.postal_code }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">ไลน์ไอดี:</a> {{ interview.userInfo.line_id }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">ตำแหน่งงาน:</a> {{ interview.userInfo.job_title }}
              </p>
              <p class="text-sm text-gray-500">
                <a class="font-bold">เงินเดือนที่ต้องการ:</a> {{ interview.userInfo.desired_salary }}
              </p>
            </div>

            <!-- Approve/Reject Buttons -->
            <div
              v-if="interview.userInfo.status === 'New'"
              class="mt-4 text-lg font-medium text-gray-900"
            >
              สถานะสัมภาษณ์
              <div class="flex">
                <button
                  @click="
                    approveApplicant(interview.userInfo._id, 'ผ่านสัมภาษณ์')
                  "
                  class="btn-approve"
                >
                  ผ่านสัมภาษณ์
                </button>
                <button
                  @click="
                    approveApplicant(interview.userInfo._id, 'ไม่ผ่านสัมภาษณ์ ')
                  "
                  class="btn-reject"
                >
                  ไม่ผ่านสัมภาษณ์
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="w-full px-4 py-3 sm:flex sm:flex-row-reverse">
        <button
          @click="$emit('close')"
          class="w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          ปิด
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Data_Interview",
  props: { interview: { type: Object, required: true } },

  methods: {
    async approveApplicant(applicantId, status) {
      const title = status === "ผ่านสัมภาษณ์" ? "อนุมัติ" : "ปฏิเสธ";
      const confirmButtonText = status === "ผ่านสัมภาษณ์" ? "ใช่" : "ปฏิเสธ";
      const successMessage = status === "ผ่านสัมภาษณ์" ? "อนุมัติ" : "ปฏิเสธ";

      const result = await Swal.fire({
        title: `คุณแน่ใจหรือไม่ที่จะ ${title} ผู้สมัครรายนี้?`,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        try {
          await axios.put(
            `${
              import.meta.env.VITE_VUE_APP_DECCAN
            }/user_info/update/${applicantId}`,
            { status }
          );
          this.interview.userInfo.status = status;
          Swal.fire(`${successMessage}สำเร็จ!`, "", "success");
        } catch (error) {
          console.error(error);
          Swal.fire("อัปเดตสถานะไม่สำเร็จ!", "", "error");
        }
      }
      this.showInterviewStatus = false; // Hide the interview status text
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* Custom Styles */
.btn-approve {
  @apply inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500;
}
.btn-reject {
  @apply inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500;
}
</style>
