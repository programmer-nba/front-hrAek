<template>
  <div class="bg-cyan-200 h-full">
    <div class="flex items-center justify-center text-[#9e9cb6]">
      <section class="w-full relative bg-[#79E0EE]/60 rounded-[6px]">
        <div class="absolute text-[#1D267D] bg-yellow-400 rounded-[4px] top-0 right-0 px-2 py-1 text-xs font-bold roll-in-blurred-right"> {{ ME.employee_number }}
        </div>
        <div class="flex justify-center">
          <div class="flex items-center gap-x-5 px-3 w-fit">
            <img :src="getImageUrl(ME.image)" class="rounded-full w-[75px] h-[75px] mx-auto my-3 p-0 object-cover border-[#231f39] shadow-[0px_27px_16px_-11px_rgba(31,27,56,0.25)] transition-all duration-150 ease-in hover:scale-105 cursor-pointer slide-in-elliptic-top-fwd"/>
            <div class="w-full">
              <h1 class="text-xl font-bold text-[#11009E]"> {{ ME.first_name }} {{ ME.last_name }}</h1>
              <p class="font-semibold text-[#11009E]"> {{ ME.position }}</p>
            </div>
          </div>
        </div>
        
        <div class="flex items-center justify-center gap-2 w-[80%] mx-auto">
          <button @click="logWorkTime" class="border border-[#231f39] rounded-[4px] py-3 px-5 text-white bg-[#231f39] transition-all duration-150 ease-in hover:bg-[#472e99]"> ลงเวลาเข้างาน
          </button>
        </div>

        <div class="text-center flex justify-center">
          <p class="text-xs text-cyan-900 font-bold scale-50 origin-top">
            <a-statistic-countdown :value="deadline" :value-style="valueStyle"> {{ workPeriod }}</a-statistic-countdown>
          </p>
        </div>

        <div class="flex divide-x divide-gray-200 p-4 -mt-12 mb-3 bg-[#11009E]">
          <div class="flex-1 w-0">
            <div class="flex flex-col justify-center items-center">
              <h4 class="text-xs font-semibold text-white"> เวลาเข้างานช่วงเช้า</h4>
              <h1 class="text-lg text-white"> {{ TimeToDay.morningIn ? TimeToDay.morningIn : "-" }}</h1>
            </div>

            <!-- <div class="flex flex-col justify-center items-center">
              <h4 class="text-xs font-semibold text-white">
                เวลาออกงานช่วงเช้า
              </h4>
              <h1 class="text-lg text-white">
                {{ TimeToDay.morningOut ? TimeToDay.morningOut : "-" }}
              </h1>
            </div> -->

          </div>
          <div class="-ml-px flex w-0 flex-1">
            <div class="flex-1 w-0">

              <!-- <div class="flex flex-col justify-center items-center">
                <h4 class="text-xs font-semibold text-white">
                  เวลาเข้างานช่วงบ่าย
                </h4>
                <h1 class="text-lg text-white">
                  {{ TimeToDay.afterIn ? TimeToDay.afterIn : "-" }}
                </h1>
              </div> -->

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
      isLoading: false,
      documents: [],
      Apporvedocuments: [],
    };
  },
  mounted() {
    this.getdata();
    this.fetchEventData();
    this.fetchArguments();
    this.fetchTimeInOut();
    this.fetchTimeData();
    this.fetchTimeToDay();
    this.fetchMe();
    this.fetchDocument();
    this.fetchDataApporveDocumemt();
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

    setInterval(() => {
      if (this.deadline <= 0) {
        // เวลาหมดลง
        // กำหนดค่า deadline ใหม่
        if (currentTime.getHours() >= 18) {
          startCountdown = new Date(
            currentTime.getFullYear(),
            currentTime.getMonth(),
            currentTime.getDate() + 1,
            9,
            0,
            0,
            0
          );
        } else if (
          currentTime.getHours() >= 12 &&
          currentTime.getHours() <= 18
        ) {
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

        this.fetchTimeData();
      }
    }, 1000);
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
    onTimeMorning() {
      // นับจำนวนพนักงานที่เข้างานช่วงเช้าตรงเวลา
      return this.employeesData.filter((employee) => {
        return (
          employee.time_line === "เข้างานช่วงเช้า" &&
          this.isOnTime(employee.time, "เข้างานช่วงเช้า")
        );
      }).length;
    },
    lateMorning() {
      // นับจำนวนพนักงานที่เข้างานช่วงเช้าสาย
      return this.employeesData.filter((employee) => {
        return (
          employee.time_line === "เข้างานช่วงเช้า" &&
          !this.isOnTime(employee.time, "เข้างานช่วงเช้า")
        );
      }).length;
    },
    onTimeAfternoon() {
      // นับจำนวนพนักงานที่เข้างานช่วงบ่ายตรงเวลา
      return this.employeesData.filter((employee) => {
        return (
          employee.time_line === "เข้างานช่วงบ่าย" &&
          this.isOnTime(employee.time, "เข้างานช่วงบ่าย")
        );
      }).length;
    },
    lateAfternoon() {
      // นับจำนวนพนักงานที่เข้างานช่วงบ่ายสาย
      return this.employeesData.filter((employee) => {
        return (
          employee.time_line === "เข้างานช่วงบ่าย" &&
          !this.isOnTime(employee.time, "เข้างานช่วงบ่าย")
        );
      }).length;
    },
  },
  methods: {
    emitEventHandle (val) {
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
      // จัดรูปแบบวันที่เป็น "วัน เดือน ปี" แบบไทย
      const thaiDate = date.locale("th").format("D MMMM YYYY");
      return thaiDate;
    },

    isToday(date) {
      const today = new Date();
      const inputDate = new Date(date);

      return (
        today.getDate() === inputDate.getDate() &&
        today.getMonth() === inputDate.getMonth() &&
        today.getFullYear() === inputDate.getFullYear()
      );
    },

    /* getme */
    async fetchMe() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/getme`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log("getme", response.data.data);

        if (response.data.data) {
          this.ME = response.data.data;
        } else {
          console.error("ไม่พบข้อมูลgetme");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    },

    /* ประวัติการเข้างาน */
    async fetchTimeData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/getme`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log("ประวัติการเข้างาน", response.data.data);

        if (response.data.data) {
          this.TimeToWork = response.data.data.reverse();
        } else {
          console.error("ไม่พบข้อมูลเวลาเข้างาน");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    },

    /* ประวัติการเข้างานวันนี้ */
    async fetchTimeToDay() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/getday`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log("ประวัติการเข้างานวันนี้", response.data.data);

        if (response.data.data) {
          this.TimeToDay = response.data.data;
        } else {
          console.error("ไม่พบข้อมูลเวลาเข้างาน");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    },

    async logWorkTime() {
      try {
        await Swal.fire({
          icon: "info",
          title: "กำลังลงเวลาเข้างาน...",
          showConfirmButton: false,
          timer: 1500,
        });

        const response = await axios.post(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/morning/in`,
          {},
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        Swal.close();

        await Swal.fire({
          icon: "success",
          html: `
                <p>ลงเวลาสำเร็จ</p>
                <p>เวลา: ${response.data.data.time}</p>
                <p>ผู้ลงเวลา: ${this.ME.first_name} ${this.ME.last_name}</p>
            `,
        });

        this.fetchTimeData();

        this.fetchTimeToDay();
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
        console.error("เกิดข้อผิดพลาดในการบันทึกเวลาเข้างาน:", error);
      }
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
    async fetchTimeInOut() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/admin/getall`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        // เก็บข้อมูลพนักงานทั้งหมดจาก API
        this.employeesData = response.data.data;
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    },
    calculateMonthlyAppointments1() {
      if (!this.eventData) return 0; // ตรวจสอบว่า this.eventData มีค่า undefined หรือไม่
      const currentMonth = dayjs().month();
      const currentYear = dayjs().year();

      return this.eventData.filter((event) => {
        const eventMonth = dayjs(event.due_date).month();
        const eventYear = dayjs(event.due_date).year();
        const isScheduled = event.type === "success";

        return (
          eventMonth === currentMonth &&
          eventYear === currentYear &&
          isScheduled
        );
      }).length;
    },
    calculateMonthlyAppointments() {
      if (!this.eventData) return 0; // ตรวจสอบว่า this.eventData มีค่า undefined หรือไม่
      const currentMonth = dayjs().month();
      const currentYear = dayjs().year();

      return this.eventData.filter((event) => {
        const eventMonth = dayjs(event.due_date).month();
        const eventYear = dayjs(event.due_date).year();
        const isScheduled = event.type === "warning";

        return (
          eventMonth === currentMonth &&
          eventYear === currentYear &&
          isScheduled
        );
      }).length;
    },
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

        // Count the number of each status
        const data = response.data.data;
        const acceptedCount = data.filter(
          (argument) => argument.argument_status === "ยอมรับ"
        ).length;
        const rejectedCount = data.filter(
          (argument) => argument.argument_status === "ปฏิเสธ"
        ).length;
        const pendingCount = data.filter(
          (argument) => argument.argument_status === "รอการตอบรับ"
        ).length;

        // Update chartData with the counts
        this.chartData.datasets[0].data = [
          acceptedCount,
          rejectedCount,
          pendingCount,
        ];
      } catch (error) {
        console.error("Error fetching arguments:", error);
      }
    },

    async fetchEventData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/event/getevent`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        )
        this.eventData = response.data.events;
        this.eventData.forEach((event) => {
          event.due_date = dayjs(event.due_date)
            .locale("th")
            .format("YYYY-MM-DD");
        });
      } catch (error) {
        console.error("Error fetching events:", error);
      }
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--; // ลดหน้าลง 1
      }
    },
    // ฟังก์ชันเมื่อคลิกที่ปุ่มหน้าถัดไป
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++; // เพิ่มหน้าขึ้น 1
      }
    },

    async fetchEmployeesForEditedProject() {
      // Reset employees array and selectedEmployee
      this.employees = [];
      this.selectedEmployee = "";

      // Get the selected job position from editedProject
      const selectedPosition = this.editedProject.position;

      if (selectedPosition === "GRP" || selectedPosition === "DEV") {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/get`,
            {
              headers: { "auth-token": localStorage.getItem("token") },
            }
          );
          // Filter employees based on selected job position
          if(!response.data.data) {
            return this.employees = []
          }
          this.employees = response.data.data.filter((employee) =>
            employee.employee_number.startsWith(selectedPosition)
          );
          // Show the dropdown if there are employees available
          this.employeeDropdownVisible = this.employees.length > 0;

          // Set the selected employee if it matches the edited project's employee ID
          if (
            this.employees.find(
              (employee) => employee._id === this.editedProject.employee_id
            )
          ) {
            this.selectedEmployee = this.editedProject.employee_id;
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        // Hide the dropdown if no job position is selected
        this.employeeDropdownVisible = false;
      }
    },

    calculateRemainingDays(dueDate, statusName, startDate, finishDate) {
      // Check if status_name is "โปรเจ็คเสร็จลุล่วง"
      if (statusName === "โปรเจ็คเสร็จลุล่วง") {
        // Parse startDate and finishDate using dayjs
        const start = dayjs(startDate);
        const finish = dayjs(finishDate);

        // Calculate difference between finish date and start date
        const projectDuration = finish.diff(start, "day");

        return `ใช้เวลาทำ${projectDuration} วัน`;
      }

      // Parse dueDate using dayjs
      const due = dayjs(dueDate);

      // Calculate difference between due date and current date
      const diffDays = due.diff(dayjs(), "day");

      // Check if past due
      if (diffDays < 0) {
        // Calculate number of days overdue
        const daysOverdue = Math.abs(diffDays);
        return `เกินกำหนด ${daysOverdue} วัน`;
      } else {
        // Return number of days left or 'ครบกำหนด' if due today
        return diffDays > 0 ? `${diffDays} วัน` : "ครบกำหนดวันนี้";
      }
    },
    calculateProjectDuration(project) {
      // Check if the project status is "โปรเจ็คเสร็จลุล่วง"
      if (project.status.status_name === "โปรเจ็คเสร็จลุล่วง") {
        // Parse start_date and finnish_date using dayjs
        const startDate = dayjs(project.start_date);
        const finnishDate = dayjs(project.finnish_date);

        // Calculate difference in days between start_date and finnish_date
        const projectDuration = finnishDate.diff(startDate, "day");

        return `โปรเจ็คใช้เวลา ${projectDuration} วัน`;
      } else {
        return "โปรเจ็คยังไม่เสร็จลุล่วง";
      }
    },
   
    emitProjectHandle(val) {
      this.projects = val || []
    }
  },
};
</script>
<style>

</style>
