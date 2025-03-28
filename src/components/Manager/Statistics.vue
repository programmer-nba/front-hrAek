<template>
  <div>
    <p class="text-center text-4xl font-bold m-3">สถิติทั้งหมด</p>
    <div
      class="grid grid-cols gap-2 m-3 sm:grid-cols-4 text-center min-[400px]:place-items-center min-[400px]:grid-cols-2 sm:place-items-center"
    >
      <div
        class="w-full max-w-sm bg-blue-500 text-white border border-gray-200 rounded-lg shadow p-3"
      >
        <div>
          <i class="pi pi-book p-2 text-4xl"></i>
        </div>
        <div>
          <div>
            <h5 class="text-base font-semibold tracking-tight text-white">
              บันทึกข้อความ
            </h5>
          </div>
          <div class="sm:flex sm:justify-between sm:items-center">
            <div>
              <span class="text-base font-bold text-white"
                >จำนวน : {{ documents.length }}</span
              >
            </div>
            <div class="mt-2">
              <button
                @click="goToRecordPage"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center"
              >
                ดูทั้งหมด
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full max-w-sm bg-green-500 text-white border border-green-200 rounded-lg shadow p-3"
      >
        <div>
          <i class="pi pi-check-circle p-2 text-4xl"></i>
        </div>
        <div>
          <div>
            <h5 class="text-base font-semibold tracking-tight text-white">
              บันทึกข้อความที่ต้องอนุมัติ
            </h5>
          </div>
          <div class="sm:flex sm:justify-between sm:items-center">
            <div>
              <span class="text-base font-bold text-white"
                >จำนวน : {{ Apporvedocuments.length }}</span
              >
            </div>
            <div class="mt-2">
              <button
                @click="goToApproveRecord"
                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2 text-center"
              >
                ดูทั้งหมด
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full max-w-sm bg-red-500 text-white border border-red-200 rounded-lg shadow p-3"
      >
        <div>
          <i class="pi pi-calendar-times p-2 text-4xl"></i>
        </div>
        <div>
          <div>
            <h5 class="text-base font-semibold tracking-tight text-white">
              บันทึกใบลา
            </h5>
          </div>
          <div class="sm:flex sm:justify-between sm:items-center">
            <div>
              <span class="text-base font-bold text-white"
                >จำนวน : {{ leaves.length }}</span
              >
            </div>
            <div class="mt-2">
              <button
                @click="goToLeaveView"
                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2 text-center"
              >
                ดูทั้งหมด
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full max-w-sm bg-gray-500 text-white border border-gray-200 rounded-lg shadow p-3"
      >
        <div>
          <i class="pi pi-history p-2 text-4xl"></i>
        </div>
        <div>
          <div>
            <h5 class="text-base font-semibold tracking-tight text-white">
              การลงเวลา
            </h5>
          </div>
          <div class="sm:flex sm:justify-between sm:items-center">
            <div>
              <span class="text-base font-bold text-white"
                >จำนวน : {{ historytimes.length }}</span
              >
            </div>
            <div class="mt-2">
              <button
                @click="goToHistoryTime"
                class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2 text-center"
              >
                ดูทั้งหมด
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      documents: [], // เก็บข้อมูลเอกสารที่ดึงมา
      Apporvedocuments: [],
      leaves: [],
      historytimes: [],
    };
  },
  // ใช้ created เพื่อเรียกใช้ method เมื่อ component ถูกสร้างขึ้น
  created() {
    this.fetchDataDocument(); // เรียกใช้ method เพื่อดึงข้อมูลเมื่อ component ถูกสร้าง
    this.fetchDataApporveDocumemt();
    this.fetchDataLeave();
    this.fetchDataHistoryTime();
  },
  methods: {
    async fetchDataDocument() {
      // ใช้ async/await
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/document/byMe`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"), // ใช้ token สำหรับการรับรอง
            },
          }
        );

        this.documents = response.data.data.filter((document) => document._id); // กรองข้อมูลเพื่อให้แน่ใจว่ามี _id
        console.log("จำนวนเอกสาร:", this.documents.length); // การตรวจสอบใน console
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error); // ข้อผิดพลาดในการดึงข้อมูล
      }
    },
    async fetchDataApporveDocumemt() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/document/getAll/`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        this.Apporvedocuments = response.data.data.filter(
          (document) => document.status_document === "รอผู้จัดการอนุมัติ"
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
    async fetchDataLeave() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/leave/byme/`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        this.leaves = response.data.data;
        console.log("จำนวนเอกสาร:", this.leaves.length); // การตรวจสอบใน console
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
    async fetchDataHistoryTime() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/getme/`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        this.historytimes = response.data.data;
        console.log("จำนวนเอกสาร:", this.historytimes.length); // การตรวจสอบใน console
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
    goToRecordPage() {
      this.$router.push("/Record/RecordView");
    },
    goToApproveRecord() {
      this.$router.push("/Record/ApproveRecord");
    },
    goToLeaveView() {
      this.$router.push("/Leave/LeaveView");
    },
    goToHistoryTime() {
      this.$router.push("/Time/HistoryTime");
    },
  },
};
</script>
