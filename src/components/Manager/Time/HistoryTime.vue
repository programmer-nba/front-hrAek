<template lang="">
  <!-- Start block -->
  <section v-if="SwitchTable" class="p-3 sm:p-5 antialiased">
    <div class="mx-auto max-w-screen-2xl px-4 lg:px-12">
      <div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
          <div class="flex-1 flex items-center space-x-2">
            <h5>
              <span class="text-gray-500 text-lg"
                >ประวัติการลงเวลาทั้งหมดมี</span
              >
              <span class="pl-3 text-lg">
                {{ times.length }}
              </span>
              <span class="pl-3 text-lg"> ข้อมูล </span>
            </h5>
          </div>
        </div>

        <!-- กล่องค้นหา -->
        <div
          class="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t"
        >
          <div class="w-full md:w-1/2">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    />
                  </svg>
                </div>
                <input
                  v-model="searchText"
                  @input="searchTimes"
                  type="text"
                  id="simple-search"
                  placeholder="ค้นหาประวัติการลงเวลา"
                  required=""
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                />
              </div>
            </form>
          </div>
          <!-- จบกล่องค้นหา -->
          <div
            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-between md:space-x-3 flex-shrink-0"
          >
            <div class="">
              <label class="text-xl font-semibold"
                >เลือกวันที่ที่ต้องการดู
              </label>
              <Calendar1
                v-model="selectedDate"
                @date-select="handleDateSelect"
                view="month"
                dateFormat="mm/yy"
                placeholder="เลือกวันที่"
                inputId="birth_date"
                class="ml-3 h-10 border-3 rounded-md"
              />
            </div>
            <div class="inline-flex rounded-md shadow-sm">
              <button
                @click="
                  SwitchTable = true;
                  SwitchCalendar = false;
                "
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-red-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
              >
                <i class="pi pi-table w-3 me-2 text-lg text-center"> </i>
              </button>
              <button
                @click="
                  SwitchCalendar = true;
                  SwitchTable = false;
                "
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
              >
                <i class="pi pi-calendar w-3 me-2 text-lg text-center"> </i>
              </button>
            </div>

            <div class="flex items-center space-x-3 w-full md:w-auto">
              <button
                id="actionsDropdownButton"
                data-dropdown-toggle="actionsDropdown"
                class="w-full md:w-auto justify-center inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-lg font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                type="button"
                @click="generatePDF(selectedDate.getMonth() + 1, ME)"
              >
                Export PDF
                <img
                  src="../../../assets/Export-Icon.png"
                  class="-mr-1 ml-1.5 w-5 h-5"
                  style="filter: invert(1)"
                  alt="Arrow Image"
                />
              </button>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-lg text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="p-4 text-center">ลำดับ</th>
                <th scope="col" class="p-4 text-center">วัน/เดือน/ปี</th>
                <th scope="col" class="p-4 text-center">เวลาเข้า(เช้า)</th>
                <th scope="col" class="p-4 text-center">เวลาออก(เช้า)</th>
                <th scope="col" class="p-4 text-center">เวลาเข้า(บ่าย)</th>
                <th scope="col" class="p-4 text-center">เวลาออก(บ่าย)</th>
                <th scope="col" class="p-4 text-center">หมายเหตุ</th>
              </tr>
            </thead>
            <tbody v-if="times.length > 0">
              <tr
                v-for="(time, index) in times"
                :key="index"
                class="border-b hover:bg-gray-100"
              >
                <td
                  class="px-4 py-3 text-center text-gray-900 whitespace-nowrap"
                >
                  <div class="text-lg">
                    {{ index + 1 }}
                  </div>
                </td>
                <td
                  class="px-4 py-3 text-center text-gray-900 whitespace-nowrap"
                >
                  <div class="text-lg">
                    {{ formatDate(time.day) }}
                  </div>
                </td>
                <td
                  scope="row"
                  class="px-4 py-3 text-center text-lg text-gray-900 whitespace-nowrap overflow-auto"
                >
                  {{ time.morningIn }}
                </td>
                <td
                  class="px-4 py-3 text-center text-lg text-gray-900 whitespace-nowrap overflow-auto"
                  style="max-width: 200px"
                >
                  {{ time.morningOut }}
                </td>
                <td
                  class="px-4 py-3 text-center text-lg text-gray-900 whitespace-nowrap overflow-auto"
                  style="max-width: 200px"
                >
                  {{ time.afterIn }}
                </td>
                <td
                  class="px-4 py-3 text-center text-lg text-gray-900 whitespace-nowrap overflow-auto"
                  style="max-width: 200px"
                >
                  {{ time.afterOut }}
                </td>
                <td
                  class="px-4 py-3 text-center text-lg text-gray-900 whitespace-nowrap overflow-auto"
                  style="max-width: 200px"
                >
                  {{}}
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <td class="text-center overflow-hidden" colspan="6">
                <div>
                  <label class="font-bold text-2xl text-black"
                    >ยังไม่มีรายการลงเวลาเข้างาน</label
                  >
                </div>
              </td>
            </tbody>
          </table>
        </div>
        <nav
          class="flex flex-col pb-10 sm:pb-2 md:flex-row justify-center items-center md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation"
        >
          <ul class="inline-flex items-stretch -space-x-px">
            <li>
              <button
                @click="prevPage"
                class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                :disabled="currentPage === 1"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </li>
            <li v-for="page in totalPages" :key="page">
              <button
                @click="changePage(page)"
                class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                {{ page }}
              </button>
            </li>
            <li>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
  <!-- End block -->
  <!-- แสดงหน้าปฏิทิน -->
  <div v-if="SwitchCalendar" class="mx-3 border-gray-500 border-2 rounded-lg">
    <div class="flex items-center justify-center mt-3">
      <h2 class="text-4xl font-semibold text-blue-950">
        ปฏิทินแสดงประวัติการลงเวลา
      </h2>
    </div>
    <div class="flex rounded-md shadow-sm justify-end" role="group">
      <button
        @click="
          SwitchTable = true;
          SwitchCalendar = false;
        "
        type="button"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
      >
        <i class="pi pi-table w-3 me-2 text-lg text-center"> </i>
      </button>
      <button
        @click="
          SwitchCalendar = true;
          SwitchTable = false;
        "
        type="button"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
      >
        <i class="pi pi-calendar w-3 me-2 text-lg text-center"> </i>
      </button>
    </div>
    <a-calendar v-model:value="value">
      <template #dateCellRender="{ current }">
        <ul class="events">
          <li v-for="item in getListTimes(current)" :key="item.content">
            <a-badge
              @click="handleBadgeClick(item)"
              s
              class="bg-blue-300 rounded-lg"
              :text="item.content"
              :status="item.type"
            />
          </li>
        </ul>
      </template>
    </a-calendar>

    <Sidebar
      v-model:visible="showtimes"
      :style="{
        width: '30rem',
        background: '#F3F4F6',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }"
      position="right"
      header="แสดงรายละเอียด"
    >
      <div v-if="selectedTimeDetail" class="px-4 py-2">
        <!-- Display details if available -->
        <p class="text-lg font-semibold mb-2">รายละเอียด:</p>
        <p>{{ selectedTimeDetail.content }}</p>
      </div>
      <div v-else class="px-4 py-2">
        <!-- Display message if no data -->
        <p class="text-lg font-semibold mb-2">ไม่พบข้อมูล</p>
        <p>ไม่มีข้อมูลที่สามารถแสดงได้ในขณะนี้</p>
      </div>
    </Sidebar>
  </div>
</template>
<script>
import axios from "axios";
import html2pdf from "html2pdf.js";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Logo from "../../../assets/Logo+name.png";
import Calendar1 from "primevue/calendar";
export default {
  components: {
    Calendar1,
  },
  data() {
    return {
      ME: [],
      searchText: "",
      times: [],
      SwitchTable: true,
      SwitchCalendar: false,
      showtimes: false,
      selectedDate: null,
      currentPage: 1,
      perPage: 10,
      totalPages: 1,
      selectedTimeDetail: null,
    };
  },
  created() {
    this.fetchLeave();
    this.fetchMe();
  },
  computed: {
    paginatedTimes() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.filteredTimes.slice(startIndex, endIndex);
    },
    filteredTimes() {
      if (!this.selectedDate) {
        return this.times;
      }
      const selectedMonth = dayjs(this.selectedDate).month() + 1;
      const selectedYear = dayjs(this.selectedDate).year();
      return this.times.filter((time) => {
        const timeMonth = dayjs(time.day).month() + 1;
        const timeYear = dayjs(time.day).year();
        return timeMonth === selectedMonth && timeYear === selectedYear;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredTimes.length / this.perPage);
    },
  },
  methods: {
    handleBadgeClick(item) {
      this.selectedTimeDetail = item;
      this.showtimes = true; // Show the Sidebar
    },
    async fetchLeave() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/getme`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        this.times = response.data.data;
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },

    async handleDateSelect(date) {
      // Extract the selected month and year from the date
      const selectedMonth = dayjs(date).month() + 1; // Month is zero-based in dayjs
      const selectedYear = dayjs(date).year();

      try {
        // Fetch the times data from the server again
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/getme`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        // Filter the times data based on the selected month and year
        this.times = response.data.data.filter((time) => {
          const timeMonth = dayjs(time.day).month() + 1;
          const timeYear = dayjs(time.day).year();
          return timeMonth === selectedMonth && timeYear === selectedYear;
        });

        // Recalculate the total pages for pagination
        this.totalPages = Math.ceil(this.times.length / this.perPage);

        // Reset the current page to the first page
        this.currentPage = 1;
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
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

    formatDate(date) {
      dayjs.locale("th");
      return dayjs(date).format("DD MMMM YYYY");
    },
    formatMonth(month) {
      dayjs.locale("th");
      return dayjs(month).format("MMMM");
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    changePage(page) {
      this.currentPage = page;
    },
    getListTimes(current) {
      const dateString = dayjs(current).format("YYYY-MM-DD");
      const timesOnDate = this.times.filter(
        (time) => dayjs(time.day).format("YYYY-MM-DD") === dateString
      );

      const listData = timesOnDate.map((time) => {
        // If any field is null, replace it with "ไม่ได้ลงเวลาไว้"
        const afterIn = time.afterIn ? time.afterIn : "ไม่ได้ลงเวลาไว้";
        const afterOut = time.afterOut ? time.afterOut : "ไม่ได้ลงเวลาไว้";
        const morningIn = time.morningIn ? time.morningIn : "ไม่ได้ลงเวลาไว้";
        const morningOut = time.morningOut
          ? time.morningOut
          : "ไม่ได้ลงเวลาไว้";

        return {
          content: `เวลาเข้า(เช้า): ${afterIn} - เวลาออก(เช้า): ${afterOut} - เวลาเข้า(บ่าย): ${morningIn} - เวลาออก(บ่าย): ${morningOut}`,
          type: "success",
          // Add click event to set selectedTimeDetail
          onClick: () => {
            this.selectedTimeDetail = time;
          },
        };
      });

      return listData || [];
    },

    async generatePDF(month, ME) {
      function getPrintedTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const formattedTime = `${hours}:${minutes}`;
        return formattedTime;
      }
      // Filter the times data based on the selected month
      const filteredTimes = this.times.filter((time) => {
        const timeMonth = dayjs(time.day).month() + 1;
        return timeMonth === month;
      });
      // Convert the month number to its corresponding name
      const monthName = dayjs()
        .month(month - 1)
        .format("MMMM YYYY");

      const opt = {
        html2canvas: { scale: 3 },
        margin: 0.1,
        filename: "my_file_name",
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "landscape",
          qulity: "1",
        },
      };

      const content = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Sans+Thai+Looped:wght@100;200;300;400;500;600;700;800;900&family=Noto+Sans+Thai:wght@100..900&family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

    body {
      font-family: "Sarabun", sans-serif;
      font-weight: 300;
      font-style: normal;
      font-size: 16px;
    }
  </style>
  <body>
    <div class="px-5">
                    <div class="flex flex-row">
                        <div class="flex ">
                            <img src="${Logo}" class="w-full max-w-32 h-32">
                        </div>
                        <div class="flex flex-col items-center ">
                            <div class="flex ml-52">
                                <p>แบบรายงานเวลาปฏิบัติงานพนักงาน</p>
                            </div>
                            <div class="flex ml-52">
                                <p class="indent-5">บริษัท ดิจิตอลดิเวลล็อปเปอร์เซอร์วิสเซ็นเตอร์จำกัด</p>
                            </div>
                            <div class="flex ml-52">
                                <p class="indent-5">ประจำเดือน ${monthName}</p>
                            </div>
                            <div class="flex ml-52">
                            </div>
                        </div>
                    </div>
                    <div>
                      <div>
                    <p>
                        <span class=" ml-2"> รหัสพนักงาน <span> ${
                          ME.employee_number
                        } </span> </span>
                        <span class=" ml-2"> ชื่อ <span> ${ME.name_title}${
        ME.first_name
      } ${ME.last_name}  </span> </span>
                        <span class="ml-2"> ชื่อเล่น <span> ${
                          ME.nick_name
                        } </span> </span>
                        <span class=" ml-2"> ตำแหน่ง <span> ${
                          ME.position
                        } </span> </span>
                    </p>
                    </div>
    <table class="w-full mt-2 border-2 border-solid border-black text-center">
        <tr>
            <th class="border border-solid border-black w-10" rowspan="2">ลำดับ</th>
            <th class="border border-solid border-black w-32" rowspan="2">วัน</th>
            <th class="border border-solid border-black py-2" colspan="2">เช้า</th>
            <th class="border border-solid border-black py-2" colspan="2">บ่าย</th>
            <th th class="border border-solid border-black" rowspan="2">หมายเหตุ</th>
        </tr>
        <tr>
            <th class="border border-solid border-black py-2">เวลาเข้า</th>
            <th class="border border-solid border-black py-2">เวลาออก</th>
            <th class="border border-solid border-black py-2">เวลาเช้า</th>
            <th class="border border-solid border-black py-2">เวลาออก</th>
            
        </tr>
        <tbody>
          ${this.times
            .map(
              (time, index) => `
            <tr class="text-center">
                <td class="border border-solid border-black py-2">${
                  index + 1
                }</td>
                <td class="border border-solid border-black">${dayjs(time.day)
                  .locale("th")
                  .format("วันdddd ที่ DD")}</td>
                <td class="border border-solid border-black">${
                  time.morningIn || "-"
                }</td>
                <td class="border border-solid border-black">${
                  time.morningOut || "-"
                }</td>
                <td class="border border-solid border-black">${
                  time.afterIn || "-"
                }</td>
                <td class="border border-solid border-black">${
                  time.afterOut || "-"
                }</td> 
                <td class="border border-solid border-black"></td>
            </tr>
            `
            )
            .join("")}
        </tbody>
      </table>
    </div>
    <div class="footer flex justify-end bg-white">
                    <p>ผู้พิมพ์: ${ME.name_title}${ME.first_name} ${
        ME.last_name
      } เวลาพิมพ์: ${getPrintedTime()}</p>
                </div>
  </body>

    `;
      const pdf = html2pdf().set(opt).from(content).toPdf().get("pdf");
      pdf.output("dataurlnewwindow");
    },
  },
};
</script>
<style lang=""></style>
