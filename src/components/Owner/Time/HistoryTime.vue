<template lang="">
  <!-- Start block -->
  <section class="p-3 sm:p-5 antialiased">
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
              <span class="pl-3 text-lg" v-bind="time in times" :key="index">
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
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none "
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
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 py-2 "
                />
              </div>
            </form>
          </div>
          <!-- จบกล่องค้นหา -->
          <div
            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
          >
            <div
              v-show="filterDropdownButton"
              id="filterDropdown"
              class="z-10 hidden px-3 pt-1 bg-white rounded-lg shadow w-80"
            >
              <div class="flex items-center justify-between pt-2">
                <h6 class="text-sm text-black">Filters</h6>
                <div class="flex items-center space-x-3"></div>
              </div>
              <div class="pt-3 pb-2">
                <label for="input-group-search" class="sr-only">Search</label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="input-group-search"
                    class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Search keywords..."
                  />
                </div>
              </div>
              <div
                id="accordion-flush"
                data-accordion="collapse"
                data-active-classes="text-black "
                data-inactive-classes="text-gray-500 "
              >
                <!-- Category -->
                <h2 id="category-heading">
                  <button
                    type="button"
                    class="flex items-center justify-between w-full py-2 px-1.5 text-sm text-left text-gray-500 border-b border-gray-200"
                    data-accordion-target="#category-body"
                    aria-expanded="true"
                    aria-controls="category-body"
                  >
                    <span>Category</span>
                    <svg
                      aria-hidden="true"
                      data-accordion-icon=""
                      class="w-5 h-5 rotate-180 shrink-0"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                  </button>
                </h2>
              </div>
            </div>
            <div class="flex items-center space-x-3 w-full md:w-auto">
              <button
                id="actionsDropdownButton"
                data-dropdown-toggle="actionsDropdown"
                class="w-full md:w-auto inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                type="button"
                @click="generatePDF(time, ME, index)"
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
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-all"
                      type="checkbox"
                      class="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600"
                    />
                    <label for="checkbox-all" class="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" class="p-4 text-center">ลำดับ</th>
                <th scope="col" class="p-4 text-center">วัน/เดือน/ปี</th>
                <th scope="col" class="p-4 text-center">เวลาเข้า(เช้า)</th>
                <th scope="col" class="p-4 text-center">เวลาออก(เช้า)</th>
                <th scope="col" class="p-4 text-center">เวลาเข้า(บ่าย)</th>
                <th scope="col" class="p-4 text-center">เวลาออก(บ่าย)</th>
                <th scope="col" class="p-4 text-center">หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(time, index) in times"
                :key="index"
                class="border-b hover:bg-gray-100"
              >
                <td class="p-4 w-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      onclick="event.stopPropagation()"
                      class="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500"
                    />
                    <label for="checkbox-table-search-1" class="sr-only"
                      >checkbox</label
                    >
                  </div>
                </td>

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
                  {{  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav
          class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation"
        >
          <span class="text-sm text-gray-500">
            Showing
            <span class="text-gray-900">1-10</span>
            of
            <span class="text-gray-900">1000</span>
          </span>
          <ul class="inline-flex items-stretch -space-x-px">
            <li>
              <a
                href="#"
                class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
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
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >1</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >2</a
              >
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700"
                >3</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >...</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >100</a
              >
            </li>
            <li>
              <a
                href="#"
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
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
  <!-- End block -->
</template>
<script>
import axios from "axios";
import html2pdf from "html2pdf.js";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Logo from "../../../assets/Logo+name.png";

export default {
  data() {
    return {
      ME: [],
      searchText: "",
      times: [],
    };
  },
  created() {
    this.fetchDocuments();
    this.fetchMe();
    // this.fetchLeave();
  },
  methods: {
    async fetchDocuments() {
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
    // searchTimes() {
    //   const searchText = this.searchText.toLowerCase();
    //   if (!searchText) {
    //     return this.fetchDocuments();
    //   } else {
    //     this.times = this.times.filter((doc) => {
    //       return doc.time.index.toLowerCase().includes(searchText);
    //     });
    //   }
    // },
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
    // async fetchLeave() {
    //   try {
    //     const response = await axios.get(
    //       `${import.meta.env.VITE_VUE_APP_DECCAN}/leave/getAll`,
    //       {
    //         headers: {
    //           "auth-token": localStorage.getItem("token"),
    //         },
    //       }
    //     );
    //     console.log("getme", response.data.data);

    //     if (response.data.data) {
    //       this.ME = response.data.data;
    //     } else {
    //       console.error("ไม่พบข้อมูลgetme");
    //     }
    //   } catch (error) {
    //     console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    //   }
    // },
    formatDate(date) {
      dayjs.locale("th");
      return dayjs(date).format("DD MMMM YYYY");
    },
    formatMonth(month) {
      dayjs.locale("th");
      return dayjs(month).format("MMMM");
    },

    async generatePDF(time, ME, index) {
      console.log(document);
      const opt = {
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "landscape",
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
    <div class="px-10">
      <div class="flex flex-row">
        <div class="flex  mt-10">
          <img src="${Logo}" class="w-full max-w-32 h-32">
        </div>
        <div class="flex flex-col items-center pt-10">
          <div class="flex ml-72">
              <p>แบบรายงานเวลาปฏิบัติงานพนักงาน</p>
          </div>
          <div class="flex ml-72">
              <p class="indent-5">บริษัท.....................................</p>
          </div>
          <div class="flex ml-72">
              <p class="indent-5">ประจำเดือน</p>
          </div>
          <div class="flex ml-72">
              <p class="indent-20">สาขา.............................................</p>
          </div>
        </div>
      </div>  
    <table class="w-full mt-2 border-2 border-solid border-black">
        <tr>
            <th class="border border-solid border-black w-10" rowspan="2">ลำดับ</th>  
            <th class="border border-solid border-black w-32" rowspan="2">รหัสพนักงาน</th>  
            <th class="border border-solid border-black w-44" rowspan="2">ชื่อ-สกุล</th>  
            <th class="border border-solid border-black w-14" rowspan="2">ชื่อเล่น</th>  
            <th class="border border-solid border-black w-32" rowspan="2">วัน-เดือน-ปี</th>  
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
                <td class="border border-solid border-black">${
                  ME.employee_number
                }</td>  
                <td class="border border-solid border-black">${ME.first_name} ${
                ME.last_name
              }</td>  
                <td class="border border-solid border-black">${
                  ME.nick_name
                }</td>  
                <td class="border border-solid border-black">${this.formatDate(
                  time.day
                )}</td>  
                <td class="border border-solid border-black">${
                  time.morningIn
                }</td>  
                <td class="border border-solid border-black">${
                  time.morningOut
                }</td> 
                <td class="border border-solid border-black">${
                  time.afterIn
                }</td>  
                <td class="border border-solid border-black">${
                  time.afterOut
                }</td> 
                <td class="border border-solid border-black"></td>      
            </tr>
            `
            )
            .join("")}
        </tbody>
      </table>
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
