<!-- views/Dashboard.vue -->
<template>
  <div>
    <div class="rounded-b-xl bg-indigo-600 text-white">
      <div
        class="flex items-center justify-center md:justify-end pr-5 py-3 md:pr-10 gap-x-3"
      >
        <div class="flex items-center gap-x-3 w-fit">
          <img
            :src="getImageUrl(ME.image)"
            class="rounded-full w-[60px] h-[60px] border-[6px] object-cover border-[#231f39] shadow-[0px_27px_16px_-11px_rgba(31,27,56,0.25)] transition-all duration-150 ease-in cursor-pointer slide-in-elliptic-top-fwd"
            v-if="ME.image"
            alt="Profile Image"/>
          <span
            v-else
            class="flex items-center justify-center w-[60px] h-[60px] text-xl text-gray-400 bg-gray-200 rounded-full mx-auto"
          ></span>
          <p class="text-sm m-0 text-white text-ellipsis">
            {{ ME.first_name }} {{ ME.last_name }}
          </p>
          <p class="text-xs m-0 text-white">{{ ME.position }}</p>
        </div>
      </div>
    </div>
    
    <div class="min-h-screen bg-[#E0F4FF] pb-5">
      <div
        class="h-[3rem] flex justify-center items-center sticky top-9 z-[10] w-full bg-gradient-to-r from-orange-300 to-yellow-300 shadow-md mb-2 marquee-container"
      >
        <div class="marquee">{{ marquee }}</div>
      </div>

      <div class="pb-6 space-y-2 text-center pt-8 hidden">
        <span
          class="block w-max mx-auto px-3 py-1.5 border border-green-200 rounded-full bg-green-100 text-green-600">
          {{ workPeriodLabel }}</span>
        <h2 class="text-2xl text-cyan-900 font-bold">
          <a-statistic-countdown :value="deadline" :value-style="valueStyle" class="custom-statistic"> {{ workPeriod }}
          </a-statistic-countdown>
          <h1></h1>
        </h2>
      </div>

      <EventReminds :slides="remindEvents" />
      <main class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full pb-2">
        <div class="flex items-center justify-center text-[#9e9cb6]">
          <section class="w-full relative bg-[#79E0EE]/60 rounded-[6px]">
            <CheckLocation class="scale-75 origin-top" @check="onsiteHandle" />
            
            <div class="-mt-px flex divide-x divide-gray-200 p-4 bg-[#11009E]">
              <div class="flex-1 w-0">
                <div class="flex flex-col justify-center items-center gap-1 mb-2">
                  <div class="text-xs font-semibold text-white"> เข้างานเช้า</div>
                  <button v-if="!TimeToDay.morningIn" :class="!onsite ? '' : 'hover:bg-[#472e99]'" @click="logWorkTime" class="px-2 py-1 text-white bg-green-500 rounded"> ลงเวลา
                  </button>
                  <div v-else class="text-lg text-white"> {{ TimeToDay.morningIn ? TimeToDay.morningIn : "-" }}</div>
                </div>
                <div class="flex flex-col justify-center items-center gap-1">
                  <div class="text-xs font-semibold text-white">ออกงานเช้า</div>
                  <button v-if="!TimeToDay.morningOut" :class="!onsite ? '' : 'hover:bg-[#472e99]'" @click="logWorkTime" class="px-2 py-1 text-white bg-green-500 rounded"> ลงเวลา
                  </button>
                  <div v-else class="text-lg text-white"> {{ TimeToDay.morningOut ? TimeToDay.morningOut : "-" }}</div>
                </div>
              </div>
              <div class="-ml-px flex w-0 flex-1">
                <div class="flex-1 w-0">
                  <div
                    class="flex flex-col justify-center items-center gap-1 mb-2">
                    <div class="text-xs font-semibold text-white"> เข้างานบ่าย</div>
                    <button v-if="!TimeToDay.afterIn" :class="!onsite ? '' : 'hover:bg-[#472e99]'" @click="logWorkTime" class="px-2 py-1 text-white bg-green-500 rounded"> ลงเวลา
                    </button>
                    <div v-else class="text-lg text-white"> {{ TimeToDay.afterIn ? TimeToDay.afterIn : "-" }}</div>
                  </div>
                  <div class="flex flex-col justify-center items-center gap-1">
                    <div class="text-xs font-semibold text-white"> ออกงานบ่าย</div>
                    <button v-if="!TimeToDay.afterOut" :class="!onsite ? '' : 'hover:bg-[#472e99]'" @click="logWorkTime" class="px-2 py-1 text-white bg-green-500 rounded"> ลงเวลา
                    </button>
                    <div v-else class="text-lg text-white"> {{ TimeToDay.afterOut ? TimeToDay.afterOut : "-" }}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ProjectMiniTable :filter="true" :filterData="ME.position" />
      </main>
      <MiniEvents @event="eventEmitHanler" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Swal from "sweetalert2";
import CheckLocation from "../etc/CheckLocation.vue";
import ProjectMiniTable from "../props/projectMiniTable.vue";
import MiniEvents from "../props/MiniEvents.vue";
import EventReminds from "./../props/EventReminds.vue";

export default {
  components: {
    CheckLocation,
    ProjectMiniTable,
    MiniEvents,
    EventReminds,
  },
  data() {
    return {
      marquee: "",
      onsite: false,
      ME: {},
      TimeToWork: [],
      TimeToDay: {},
      deadline: new Date(),
      valueStyle: {
        color: "#146C94", // กำหนดสีข้อความเป็นสีขาว
        fontSize: "48px", // กำหนดขนาดข้อความใหญ่ขึ้น
      },
      currentLocation: "",
      remindEvents: [],
    };
  },

  mounted() {
    this.fetchTimeData();
    this.fetchTimeToDay();
    this.fetchMe();
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
  },

  methods: {
    eventEmitHanler(val) {
      this.remindEvents = val.filter((ev) => ev.remind);
    },
    onsiteHandle(e) {
      this.onsite = e;
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
          //   text: error.response.data.message,
          text: "ยังไม่ถึงเวลาลงงานขณะนี้",
        });
        console.error("เกิดข้อผิดพลาดในการบันทึกเวลาเข้างาน:", error);
      }
    },
  },
};
</script>

<style>
.kanit-font {
  font-family: "Kanit", sans-serif;
}

.custom-statistic .ant-statistic-content-value {
  color: #146c94;
  font-size: 48px;
  font-weight: bold;
}

.marquee-container {
  width: 100%; /* Full width of the container */
  overflow: hidden; /* Hide the overflowing text */
  background-color: #f1f1f1; /* Background color for better visibility */
  white-space: nowrap; /* Prevent the text from wrapping */
}

.marquee {
  display: inline-block; /* Ensure it takes up only as much width as necessary */
  padding-left: 100%; /* Push the text off screen to the right */
  animation: marquee 10s linear infinite; /* Apply the animation */
}

@keyframes marquee {
  0% {
    transform: translateX(
      0%
    ); /* Start the text at the full width of the container */
  }
  100% {
    transform: translateX(
      -100%
    ); /* Move the text to the left by its full width */
  }
}
</style>
