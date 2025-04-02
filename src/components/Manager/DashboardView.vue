<template>
  <div class="bg-cyan-200 h-full">
    <div class="flex items-center justify-center text-[#9e9cb6]">
      <section class="w-full relative bg-[#79E0EE]/60 rounded-[6px]">
        <div
          class="absolute text-[#1D267D] bg-yellow-400 rounded-[4px] top-0 right-0 px-2 py-1 text-xs font-bold roll-in-blurred-right">
          {{ ME.employee_number }}
        </div>
        <div class="flex justify-center">
          <div class="flex items-center gap-x-5 px-3 w-fit">
            <img :src="getImageUrl(ME.image)"
              class="rounded-full w-[75px] h-[75px] mx-auto my-3 p-0 object-cover border-[#231f39] shadow-[0px_27px_16px_-11px_rgba(31,27,56,0.25)] transition-all duration-150 ease-in hover:scale-105 cursor-pointer slide-in-elliptic-top-fwd" />
            <div class="w-full">
              <h1 class="text-xl font-bold text-[#11009E]"> {{ ME.first_name }} {{ ME.last_name }}</h1>
              <p class="font-semibold text-[#11009E]"> {{ ME.position }}</p>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center gap-2 w-[80%] mx-auto">
          <button @click="logWorkTime('เข้างาน')"
            class="border border-[#231f39] rounded-[4px] py-3 px-5 text-white bg-[#231f39] transition-all duration-150 ease-in hover:bg-[#472e99]">
            ลงเวลาเข้างาน
          </button>
        </div>

        <div class="flex divide-x divide-gray-200 p-4 mb-3 mt-3 bg-[#11009E]">
          <div class="flex-1 w-0">
            <div class="flex flex-col justify-center items-center">
              <h4 class="text-xs font-semibold text-white"> เวลาเข้างานช่วงเช้า</h4>
              <h1 class="text-lg text-white"> {{ TimeToDay.morningIn ? TimeToDay.morningIn : "-" }}</h1>
            </div>


          </div>
          <div class="-ml-px flex w-0 flex-1">
            <div class="flex-1 w-0">

              <div class="flex flex-col justify-center items-center">
                <h4 class="text-xs font-semibold text-white"> เวลาออกงาน</h4>
                <h1 class="text-lg text-white"> {{ TimeToDay.afterOut ? TimeToDay.afterOut : "-" }}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <MiniDatas :projects="projects" :employees="employees" :events="events" />
    <div class="flex flex-wrap justify-center gap-x-2 items-start">
      <ProjectMiniTable class="my-3 max-w-2xl" @project="emitProjectHandle" />
      <MiniEvents class="my-3 max-w-2xl" :employees="employees" @event="emitEventHandle" />
    </div>
    <footer class="py-5 bg-black">
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Dialog from "primevue/dialog";
import Swal from "sweetalert2";
import Calendar from "primevue/calendar";
import Chart from "primevue/chart";
import ProjectMiniTable from "../props/projectMiniTable.vue";
import MiniDatas from "../props/MiniDatas.vue";
import MiniEvents from "../props/MiniEvents.vue";

export default {
  components: {
    Dialog,
    Calendar,
    Chart,
    ProjectMiniTable,
    MiniDatas,
    MiniEvents
  },
  data() {
    return {
      ME: {},
      TimeToWork: [],
      TimeToDay: {},
      deadline: new Date(),
      valueStyle: {
        color: "#146C94", // กำหนดสีข้อความเป็นสีขาว
        fontSize: "48px", // กำหนดขนาดข้อความใหญ่ขึ้น
      },
      timeinout: [],
      currentLocation: "",
      employeesData: [], // เก็บข้อมูลพนักงานทั้งหมดจาก API
      chartData: {
        labels: ["ยอมรับ", "ปฏิเสธ", "อยู่ระหว่างรอดำเนินการ"],
        datasets: [
          {
            data: [],
            backgroundColor: ["#a7f3d0", "#FF6384", "#FFCE56"],
            hoverBackgroundColor: ["#a7f3d0", "#FF6384", "#FFCE56"],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      currentPage: 1,
      pageSize: 6, // กำหนดจำนวนรายการที่แสดงในหนึ่งหน้า
      filterType: "", // เก็บค่าประเภทงานที่จะกรอง
      filterStatus: "", // เก็บค่าสถานะที่จะกรอง
      searchQuery: "", // เพิ่มตัวแปรสำหรับเก็บค่าการค้นหา
      projectPositions: [], // เพิ่ม array สำหรับเก็บตำแหน่งงาน
      showEditProjectModal: false,
      employees: [],
      employeeDropdownVisible: false,
      selectedEmployee: "",
      projects: [],
      events: [],
      locationError: '',
      hasCheckedInToday: false,
      hasCheckedOutToday: false,
      isLoggingTime: true,
      employeeId: localStorage.getItem("id"),
      isLoading: false,
      documents: [],
      Apporvedocuments: [],
    };
  },
  mounted() {
    this.getdata();
    this.fetchDocument();
    this.fetchDataApporveDocumemt();
    this.fetchTimeLogs()
    console.log(new Date());
    const currentTime = new Date();
    let startCountdown;

    if (currentTime.getHours() >= 18) {
      // นับถอยหลังจาก 09:00 ของวันถัดไป
      startCountdown = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate() + 1,
        9,
        0,
        0,
        0
      );
    } else if (currentTime.getHours() >= 12 && currentTime.getHours() <= 18) {
      // นับถอยหลังจาก 18:00 ของวันนี้
      startCountdown = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        18,
        0,
        0,
        0
      );
    } else if (currentTime.getHours() >= 9) {
      // นับถอยหลังจาก 12:00 ของวันนี้
      startCountdown = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        12,
        0,
        0,
        0
      );
    } else {
      // นับถอยหลังจาก 09:00 ของวันนี้
      startCountdown = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        9,
        0,
        0,
        0
      );
    }

    this.deadline = startCountdown;

  },
  computed: {
    workPeriodLabel() {
      const currentTime = new Date();
      if (currentTime.getHours() >= 18 || currentTime.getHours() < 9) {
        return "รอเข้างานช่วงเช้า";
      } else if (currentTime.getHours() >= 9 && currentTime.getHours() < 12) {
        return "รอออกงานช่วงเช้า";
      } else if (currentTime.getHours() >= 12 && currentTime.getHours() < 13) {
        return "รอเข้างานช่วงบ่าย";
      } else if (currentTime.getHours() >= 13 && currentTime.getHours() < 18) {
        return "รอออกงานช่วงบ่าย";
      } else {
        return "รอเข้างานช่วงเช้า";
      }
    },
    uniqueEmployeeCount() {
      const uniqueEmployeeIds = new Set();
      this.employeesData.forEach((employee) => {
        if (
          employee.time_line === "เข้างานช่วงเช้า" ||
          employee.time_line === "เข้างานช่วงบ่าย"
        ) {
          uniqueEmployeeIds.add(employee.employee_id);
        }
      });
      return uniqueEmployeeIds.size;
    },

  },
  methods: {
    emitEventHandle(val) {
      this.events = val
    },
    async fetchDocument() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/document/byMe`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        this.documents = response.data.data.filter(
          (document) => document._id && document.document_true === "ฉบับจริง"
        );
        this.documents.reverse();

        console.log("จำนวนเอกสาร:", this.documents.length); // การตรวจสอบใน console
        console.log(response.data); // ตรวจสอบข้อมูลใน console
      } catch (error) {
        console.error("Error fetching documents:", error); // แจ้งข้อผิดพลาดถ้ามี
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
          (document) =>
            document.status_document === "รอผู้จัดการอนุมัติ" &&
            document.document_true === "ฉบับจริง"
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
    goToOTPage() {
      this.$router.push({ name: "OT" });
    },
    redirectToTimeToWork() {
      this.$router.push("/TimeToWork");
    },
    getImageUrl(imageId) {
      return `https://drive.google.com/thumbnail?id=${imageId}`;
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString("th-TH");
    },

    formatDate(dateString) {
      const date = dayjs(dateString);
      const thaiDate = date.locale("th").format("D MMMM YYYY");
      return thaiDate;
    },

    async fetchTimeLogs() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/timeinout/employee/${this.employeeId}`);
        if (response.data.status) {
          this.timeinout = response.data.data;

          console.log('tineinout : ', this.timeinout)
        } else {
          this.timeinout = [];
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถโหลดข้อมูลได้",
          text: error.message || "โปรดลองอีกครั้ง",
        });
      }
    },

    async logWorkTime(timeType) {
      console.log('timeType', timeType)
      if (!navigator.geolocation) {
        Swal.fire({
          icon: "error",
          title: "อุปกรณ์ไม่รองรับการระบุตำแหน่ง",
          text: "ไม่สามารถดึงพิกัดได้",
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.post(
              `${import.meta.env.VITE_VUE_APP_DECCAN}/create/log`,
              {
                projectId: 'เข้างาน',
                projectCode: 'เข้างาน',
                employeeId: this.employeeId,
                timeType,
                latitude,
                longitude,
              }
            );

            if (response.data.status) {
              Swal.fire({
                icon: "success",
                title: "บันทึกเวลาสำเร็จ",
                showConfirmButton: false,
                timer: 1500,
              });

              await fetchTimeLogs();
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถบันทึกเวลาได้",
              text: error.message || "โปรดลองอีกครั้ง",
              showConfirmButton: true,
            });
          } finally {
            this.isLoggingTime = false;
          }
        },
        (error) => {
          this.locationError = error.message;
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถดึงพิกัดได้",
            text: error.message || "โปรดลองอีกครั้ง",
          });
          this.isLoggingTime = false;
        }
      );
    },

    isOnTime(time, timeLine) {
      const [hour, minute, second] = time.split(":").map(Number);
      if (timeLine === "เข้างานช่วงเช้า") {
        return (
          hour < 9 ||
          (hour === 9 && (minute < 10 || (minute === 10 && second === 0)))
        );
      } else if (timeLine === "เข้างานช่วงบ่าย") {
        return (
          hour < 13 ||
          (hour === 13 && (minute < 5 || (minute === 5 && second === 0)))
        );
      }
      return false; // สำหรับเวลาลงเวลาออกงาน
    },
    async getdata() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/get`,
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        );
        this.employees = response.data.data.reverse();

        console.log("asd : ", this.employees)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--; // ลดหน้าลง 1
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++; // เพิ่มหน้าขึ้น 1
      }
    },
    emitProjectHandle(val) {
      this.projects = val || []
    }
  },
};
</script>
<style></style>
