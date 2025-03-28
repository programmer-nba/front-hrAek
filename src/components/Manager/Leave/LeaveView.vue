<template lang="">
  <!-- Start block -->
  <div class="bg-[#EAFDFC]">
    <section class="p-3 sm:p-5 antialiased text-lg">
      <div class="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-center space-y-3 md:space-y-0 md:space-x-4 p-4"
          >
            <div class="flex-1 flex justify-center space-x-2">
              <p>
                <span class="text-[#0002A1] font-bold text-3xl"
                  >บันทึกใบลาทั้งหมดของฉัน</span
                >
              </p>
            </div>
          </div>

          <!-- กล่องค้นหา -->
          <div
            class="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t"
          >
            <!-- กล่องค้นหา -->
            <div class="w-full md:w-1/2">
              <form class="flex items-center relative">
                <!-- เพิ่ม relative -->
                <label for="simple-search" class="sr-only">ค้นหา</label>
                <div class="w-full">
                  <input
                    v-model="searchText"
                    type="text"
                    id="simple-search"
                    placeholder="ค้นหาบันทึกข้อความ"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                  />
                </div>

                <!-- ไอคอนค้นหา -->
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <!-- ใช้ absolute และจัดให้อยู่ด้านขวา -->
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    />
                  </svg>
                </div>
              </form>
            </div>

            <!-- จบกล่องค้นหา -->

            <div
              class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
            >
              <button
                @click="goToAddLeaves()"
                class="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 rounded-lg text-lg px-4 py-2 focus:outline-none"
              >
                <svg
                  class="h-5 w-5 mr-1.5 -ml-1"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                เพิ่มใบลา
              </button>
              <div class="flex items-center space-x-3 sm:w-[20rem]">
                <MultiSelect
                  v-model="selectedfilter"
                  :options="groupedfilter"
                  optionLabel="label"
                  optionGroupLabel="label"
                  optionGroupChildren="items"
                  display="chip"
                  placeholder="กรองข้อมูล"
                  class="w-full md:w-[20rem] bg-gray-200 hover:bg-gray-300"
                >
                  <template #optiongroup="slotProps">
                    <div class="flex align-items-center">
                      <i class="pi pi-list mr-2 text-lg"></i>
                      <div>{{ slotProps.option.label }}</div>
                    </div>
                  </template>
                </MultiSelect>
              </div>
              <!-- <div class="flex items-center space-x-3 w-full md:w-auto">
                <button
                  id="actionsDropdownButton"
                  data-dropdown-toggle="actionsDropdown"
                  class="w-full md:w-auto inline-flex justify-center items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-lg font-medium rounded-md hover:-translate-y-1 hover:scale-110"
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
              </div> -->
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-lg text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" class="p-4 text-center">สถานะ</th>
                  <th scope="col" class="p-4 text-center">เลขที่เอกสาร</th>
                  <th scope="col" class="p-4 text-center">ประเภท</th>
                  <th scope="col" class="p-4 text-center">รายละเอียด</th>
                  <th scope="col" class="p-4 text-center">วันที่ทำรายการ</th>
                  <th scope="col" class="px-6 py-3 text-center">ดำเนินการ</th>
                </tr>
              </thead>
              <tbody class="text-base">
                <tr
                  v-for="(leave, index) in filteredLeaves"
                  :key="index"
                  class="border-b hover:bg-gray-100"
                >
                  <td
                    class="px-4 py-3 text-center text-gray-900 whitespace-nowrap"
                  >
                    <div
                      :class="{
                        'items-center text-base font-bold drop-shadow-lg text-nowrap  text-center  p-3 rounded-xl': true,
                        'bg-yellow-200 text-yellow-900':
                          leave.status.status_name === 'Waiting',
                        'bg-green-200 text-green-900':
                          leave.status.status_name === 'รอตรวจสอบ',
                        'bg-red-200 text-red-900':
                          leave.status.status_name === 'รอตรวจสอบ',
                        'bg-orange-200 text-orange-900':
                          leave.status.status_name === 'รอตรวจสอบ',
                      }"
                    >
                      {{ leave.status.status_name }}
                    </div>
                  </td>
                  <td class="px-4 py-3 text-center text-gray-900">
                    <div class="flex items-center">
                      {{ leave.leave_id }}
                    </div>
                  </td>

                  <td
                    class="px-4 py-3 text-center text-gray-900 whitespace-nowrap"
                  >
                    <div
                    >
                      <!-- แสดง Type.leavetype_name หากมีการเปรียบเทียบได้ -->
                        {{ getLeaveTypeName(leave.leave_type) }}
                    </div>
                  </td>
                  <th
                    scope="row"
                    class="px-4 py-3 text-center text-gray-900 whitespace-nowrap flex flex-col"
                  >
                    <span
                      class="bg-primary-100 font-bold text-primary-800 text-xs px-2 py-0.5 rounded truncate"
                      >{{ leave.leave_head }}</span
                    >
                    <span
                      class="bg-primary-100 font-bold text-primary-800 text-xs px-2 py-0.5 rounded truncate"
                      v-html="leave.details"></span
                    >
                    <span>
                      ตั้งแต่วันที่
                      {{ formatDate(leave.date_start_leave) }} จนถึงวันที่
                      {{ formatDate(leave.date_end_leave) }}</span
                    >
                    <span>
                      ติดต่อได้ที่ {{ leave.contact }} {{ leave.Tel }}</span
                    >
                  </th>
                  <td
                    class="px-4 py-3 text-center text-gray-900 whitespace-nowrap overflow-auto"
                    style="max-width: 200px"
                  >
                    {{ formatDate(leave.leave_date) }}
                  </td>
                  <!-- <td
                v-bind="(ME, index)"
                :key="index"
                  class="px-4 py-3  text-center text-gray-900 whitespace-nowrap overflow-auto"
                  style="max-width: 200px"
                >
                {{ME._id }}
                </td> -->

                  <td
                    class="px-4 py-3 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div class="flex items-center space-x-4">
                      <button
                        @click="showLeave(leave)"
                        type="button"
                        data-drawer-target="drawer-read-product-advanced"
                        data-drawer-show="drawer-read-product-advanced"
                        aria-controls="drawer-read-product-advanced"
                        class="py-2 px-3 flex items-center text-base font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewbox="0 0 24 24"
                          fill="currentColor"
                          class="w-4 h-4 mr-2 -ml-0.5"
                        >
                          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                          />
                        </svg>
                        ดูเพิ่มเติม
                      </button>
                      <!-- <button
                        @click="editLeave(leave)"
                        type="button"
                        data-modal-target="drawer-update-product"
                        data-modal-toggle="drawer-update-product"
                        class="flex py-2 px-3 items-center text-base text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mr-2 -ml-0.5"
                          viewbox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        แก้ไข
                      </button> --->
                      <button
                        @click.prevent="confirmDelete(leave._id)"
                        type="button"
                        data-modal-target="delete-modal"
                        data-modal-toggle="delete-modal"
                        class="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-base px-3 py-2 text-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mr-2 -ml-0.5"
                          viewbox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        ลบ
                      </button>
                      <button
                        @click="generatePDF(leaves)"
                        class="pi pi-file-pdf text-2xl flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg px-3 py-2 text-center"
                      ></button>
                    </div>
                  </td>
                </tr>
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

    <!-- Update Modal -->
    <div
      v-show="isModalUpdateOpen"
      role="dialog"
      id="createProductModal"
      tabindex="-1"
      aria-hidden="true"
      aria-modal="true"
      class="bg-gray-500 bg-opacity-75 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full flex"
    >
      <div class="relative p-4 w-full max-w-3xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative p-4 bg-white rounded-lg shadowsm:p-5">
          <!-- Modal header -->
          <div
            class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
          >
            <h3 class="text-lg text-gray-900">แก้ไขเอกสาร</h3>
            <button
              @click="isModalUpdateOpen = false"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="createProductModal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <form action="#">
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label for="title" class="block mb-2 text-lg text-gray-900"
                  >เรื่อง</label
                >
                <input
                  v-model="selectedLeave.Leave_head"
                  type="text"
                  name="title"
                  id="title"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="ใส่เรื่อง"
                  required=""
                />
              </div>
              <div>
                <label for="amount" class="block mb-2 text-lg text-gray-900"
                  >ประเภท</label
                ><input
                  v-model="selectedLeave.Leave_Type"
                  type="text"
                  name="amount"
                  id="amount"
                  placeholder="ใส่จำนวน"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                />
              </div>

              <div>
                <label for="Text" class="block mb-2 text-lg text-gray-900"
                  >ตั้งแต่วันที่</label
                >
                <Calendar
                  showButtonBar
                  dateFormat="dd/mm/yy"
                  v-model="selectedLeave.Date_Start_leave"
                  type="text"
                  name="Text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5"
                  placeholder="ใส่วันที่ออก"
                  required=""
                />
              </div>
              <div>
                <label for="Text" class="block mb-2 text-lg text-gray-900"
                  >จนถึงวันที่</label
                >
                <Calendar
                  showButtonBar
                  dateFormat="dd/mm/yy"
                  v-model="selectedLeave.Date_End_leave"
                  type="text"
                  name="Text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5"
                  placeholder="ใส่เวลาเข้า"
                  required=""
                />
              </div>
              <div class="pb-2 sm:col-span-2">
                <label for="Text" class="block mb-2 text-lg text-gray-900"
                  >รายละเอียด</label
                >
                <textarea
                  v-model="selectedLeave.Details"
                  type="text"
                  name="Text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5"
                  placeholder="ใส่วันที่เข้า"
                ></textarea>
              </div>
            </div>

            <div
              class="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"
            >
              <button
                @click.prevent="updateRecord"
                type="submit"
                class="w-full sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-lg px-5 py-2.5 text-center"
              >
                ยืนยัน
              </button>

              <button
                @click="isModalUpdateOpen = false"
                data-modal-toggle="createProductModal"
                type="button"
                class="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-200 text-lg px-5 py-2.5 hover:text-gray-900 focus:z-10"
              >
                <svg
                  class="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="isModalShow"
      modal
      header="เอกสาร"
      :style="{ width: '40rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <p class="mb-5 text-lg font-bold text-center">
        หัวข้อ {{ selectedLeave.Leave_head }}
      </p>
      <p class="mb-5 text-lg text-center">
        ประเภท {{ selectedLeave.Leave_Type }}
      </p>
      <p class="mb-5 text-lg text-center">
        ติดต่อได้ที่ {{ selectedLeave.Contact }}
      </p>
      <p class="mb-5 text-lg text-center">
        วันที่ทำรายการ {{ formatDate(selectedLeave.Leave_date) }}
      </p>
      <p class="mb-5 text-lg text-center" v-html="selectedLeave.Details"></p>
    </Dialog>
  </div>
</template>
<script>
import axios from "axios";
import html2pdf from "html2pdf.js";
// import LogoImage from "../icons/Digital.webp";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Swal from "sweetalert2";
import LogoDDSC from "../../../assets/logoDDSC.jpg";

export default {
  data() {
    return {
      Type: [],
      ME: [],
      searchText: "",
      leaves: [],
      selectedLeave: [],
      selectedfilter: [],
      isModalOpen: false,
      isModalUpdateOpen: false,
      isModalShow: false,
      filterDropdownButton: false,
      currentPage: 1, // Default to the first page
      perPage: 5, // Items per page
      totalPages: 1, // Placeholder for total pages, calculate after fetching data
      groupedfilter: [
        {
          label: "ประเภท",

          items: [
            { label: "ลาป่วย", Leave_Type: "ลาป่วย" },
            { label: "ลากิจ", Leave_Type: "ลากิจ" },
            { label: "ลาคลอดบุตร", Leave_Type: "ลาคลอดบุตร" },
          ],
        },
        {
          label: "สถานะ",

          items: [{ label: "รออนุมัติ", Status_name: "Waiting" }],
        },
      ],
    };
  },
  computed: {
    filteredLeaves() {
      // If no filter is selected, return all leaves
      if (!this.selectedfilter.length) {
        return this.leaves.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        );
      }

      // Filter based on the selected filters
      const filtered = this.leaves.filter((leave) => {
        return this.selectedfilter.every((filter) => {
          const matchType =
            !filter.Leave_Type || leave.Leave_Type === filter.Leave_Type;
          const matchStatus =
            !filter.Status_name ||
            leave.Status.Status_name === filter.Status_name;

          // Return true if both type and status match when both filters are applied
          return matchType && matchStatus;
        });
      });

      // Update totalPages based on the filtered results
      this.totalPages = Math.ceil(filtered.length / this.perPage);

      // Return the filtered slice
      return filtered.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
  },
  created() {
    this.fetchDocuments();
    this.fetchGetme();
    this.fetchGetType();
  },
  methods: {
    getLeaveTypeName(leaveTypeId) {
      const foundType = this.Type.find((type) => type._id === leaveTypeId);
      return foundType ? foundType.leavetype_name : "ไม่พบ";
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--; // Move to the previous page
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++; // Move to the next page
      }
    },
    changePage(page) {
      this.currentPage = page; // Change to the selected page
    },
    async fetchDocuments() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/leave/byme/`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        this.leaves = response.data.data.reverse(); // Store the fetched data
        console.log("บันทึกใบลาทั้งหมด", this.leaves);

        // Calculate the total number of pages based on data
        this.totalPages = Math.ceil(this.leaves.length / this.perPage);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    },
    async addRecord() {
      try {
        //       if (
        //   !this.Leave_head ||
        //   !this.Details ||
        //   !this.Leave_Type ||
        //   !this.Date_Start_leave ||
        //   !this.Date_End_leave
        // )  {
        //   Swal.fire({
        //     title: 'แจ้งเตือน!',
        //     text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        //     icon: 'warning',
        //     confirmButtonText: 'ตกลง',
        //   });
        //   return; // หยุดการทำงานทันทีหากข้อมูลไม่ครบ
        // }

        const response = await axios.post(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/leave/insert`,
          {
            Leave_head: this.Leave_head,
            Leave_Type: this.Leave_Type.name,
            Details: this.Details,
            Date_Start_leave: this.Date_Start_leave,
            Date_End_leave: this.Date_End_leave,
            Contact: this.ME.address,
          },
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
        });
        this.fetchDocuments();
        this.isModalOpen = false;
      } catch (error) {
        console.error("Error adding document:", error);
      }
    },
    goToAddLeaves() {
      this.$router.push("/Leave/AddLeave");
    },
    async editLeave(leave) {
      this.selectedLeave = { ...leave };
      this.selectedLeave.Date_Start_leave = this.formatDate(
        this.selectedLeave.Date_Start_leave
      );
      this.selectedLeave.Date_End_leave = this.formatDate(
        this.selectedLeave.Date_End_leave
      );
      this.isModalUpdateOpen = true;
    },
    async updateRecord() {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/leave/update/${
            this.selectedLeave._id
          }`,

          this.selectedLeave
        );
        console.log(response.data.data);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "แก้ไขข้อมูลสำเร็จ",
        });
        this.fetchDocuments();
        this.isModalUpdateOpen = false;
      } catch (error) {
        console.error("Error adding document:", error);
      }
    },
    clearInputFields() {
      this.Leave_head = "";
      this.Leave_Type = "";
      this.Date_Start_leave = "";
      this.Date_End_leave = "";
      this.Details = "";
    },
    confirmDelete(id) {
      Swal.fire({
        title: "ต้องการจะลบข้อมูลหรือไม่ ?",
        text: "คุณต้องการจะลบข้อมูลเอกสารหรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ลบข้อมูล",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteRecord(id);
        }
      });
    },
    async deleteRecord(id) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/leave/delete/${id}  `,
          {}
        );
        // Notify that the deletion was successful
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ข้อมูลเอกสารถูกลบแล้ว!",
          showCancelButton: false,
          timer: 2000,
        });
        // Reload the employee data
        this.fetchDocuments();
      } catch (error) {
        // Notify if there's an error deleting
        console.error("Error deleting employee:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete employee. Please try again later.",
        });
      }
    },
    searchDocuments() {
      const searchText = this.searchText.toLowerCase();
      if (!searchText) {
        return this.fetchDocuments();
      } else {
        this.documents = this.documents.filter((doc) => {
          return (
            doc.title.toLowerCase().includes(searchText) ||
            doc.status.toLowerCase().includes(searchText)
          );
        });
      }
    },
    async showLeave(leave) {
      try {
        this.selectedLeave = { ...leave };
        this.selectedLeave.Date_Start_leave = this.formatDate(
          this.selectedLeave.Date_Start_leave
        );
        this.selectedLeave.Date_End_leave = this.formatDate(
          this.selectedLeave.Date_End_leave
        );
        this.isModalShow = true;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการแสดงข้อมูล:", error);
      }
    },
    formatDate(date) {
      dayjs.locale("th");
      return dayjs(date).format("DD MMMM YYYY");
    },
    async fetchGetme() {
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
    async fetchGetType() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/leavetype/getall`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log("getme", response.data.data);

        if (response.data.data) {
          this.Type = response.data.data;
          console.log(this.Type);
        } else {
          console.error("ไม่พบข้อมูลgetme");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    },
    generatePDF(leaves) {
      console.log(leaves);
      const opt = {
        html2canvas: { scale: 3 },
        margin: 0.1,
        filename: "my_file_name",
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait",
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
  <div class="px-20">
      <div class="grid grid-cols-4 gap-0">
        <div>
          <img src="${LogoDDSC}" class=" mt-8 mr-16 w-24 h-24 rounded-lg " alt="Logo">
        </div>
        <div class="col-span-2  mt-16">
          <h1 class=" text-center text-lg">
            แบบใบลาป่วย ลาคลอดบุตร ลากิจส่วนตัว 
          </h1>
          <div class="absolute w-80 mt-50 ml-48">
            <div class="">ทำที่ ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ </div>
            <div class="">103 หมู่ที่ 4 ตำบลสุเทพ อำเภอเมืองเชียงใหม่  จังหวัดเชียงใหม่ 50200</div>
          </div>
          
        </div>
        <div>
        
        </div>
      </div>
      <br>
    <div class="grid grid-cols-2">
    <div class="grid">
       
      </div>
      <div class="grid">
        <p class=" py-2 mt-2">
          วันที่ ${this.formatDate(leaves.doc_date)}
        </p>
      </div>
    </div>

    <div class="">
      <div class="grid grid-cols-8 gap-1"> 
        <div>
          เรื่อง
        </div>
        <div class="col-span-4">
          ขออนุญาต${ this.getLeaveTypeName(leaves.leave_type) }
        </div>
      </div>
      <div class="grid grid-cols-8 gap-1 mt-2"> 
        <div>
            เรียน
        </div>
        <div class="col-span-4">
          คณะกรรมการบริษัทฯ 
        </div>
      </div>

    </div>

    <div class="grid grid-col-2">
      <div class="grid justify-start mt-2">
        <p class="indent-32 text-base ">
          ข้าพเจ้า................................................................................ตำแหน่ง.................................................................
        </p>
      </div>
    </div>


    <div class="flex flex-col-3 gap-24">
      <div class="flex items-center">
          ขอลา
      </div>

      <div class="grid grid-col-3">
       <div class="flex gap-6 items-center">
        <input type="checkbox" id="checkbox1" class="bg-white border-black w-4 h-4 mt-4">
        <label for="checkbox1">ป่วย</label>
       </div>
       <div class="flex gap-6">
        <input type="checkbox" id="checkbox1" class="bg-white border-black w-4 h-4 mt-3">
        <label for="checkbox1">กิจส่วนตัว</label>
       </div>
       <div class="flex gap-6">
        <input type="checkbox" id="checkbox1" class="bg-white border-black w-4 h-4 mt-3">
        <label for="checkbox1">คลอดบุตร</label>
       </div>
      </div>
      
      <div class="flex items-center col-span-2">
          เนื่องจาก........................................................................................
      </div>
    </div>

    <div>
      <p class="mt-1">
        ตั้งแต่วันที่............................................................ถึงวันที่.................................................................................มีกำหนด.....................วัน
      </p>
    </div>
    <div>
  

</div>
<br>
  <div class="grid grid-col-3 ">
    <div class="col-end-3 ">
      <div class="flex justify-center">
      <p  class="pt-1">
        ขอแสดงความนับถือ
      </p>
    </div>
    <div class="flex justify-center">
      <p  class="">
        (ลงชื่อ)...........................................................
      </p>
    </div>
    <div class="flex justify-center indent-10	">
      <p class="">
        (...........................................................)
      </p>
    </div>
    </div>
  </div>

  <div class="">
      <p class=" text-left"> สถิติการลาในปีงบประมาณนี้ </p>
      <div class="grid grid-cols-2">

        <div class="flex flex-wrap border border-black max-w-md">
            <div class="w-1/4 p-1 border-r border-b border-black text-center">ประเภทลา</div>
            <div class="w-1/4 p-1 border-r border-b border-black text-center">ลามาแล้ว</div>
            <div class="w-1/4 p-1 border-r border-b border-black text-center">ลาครั้งนี้</div>
            <div class="w-1/4 p-1 border-b border-black text-center">รวมเป็น</div>

            <div class="w-1/4 p-1 flex flex-col border-r border-b border-black "> 
              <div class="text-center">ป่วย</div>
              <div class="text-center">(วันทำการ)</div>
              </div>
            <div class="w-1/4 p-1 border-r border-b border-black">  </div>
            <div class="w-1/4 p-1 border-r border-b border-black">  </div>
            <div class="w-1/4 p-1 border-b border-black">   </div>

            <div class="w-1/4 p-1 flex flex-col border-r border-b border-black">
              <div class="text-center">กิจส่วนตัว</div>
              <div class="text-center">(วันทำการ)</div>  
            </div>
            <div class="w-1/4 p-1 border-r border-b border-black"> </div>
            <div class="w-1/4 p-1 border-r border-b border-black"> </div>
            <div class="w-1/4 p-1 border-b border-black"> </div>

            <div class="w-1/4 p-2 border-r border-b border-black text-center">อื่นๆ</div>
            <div class="w-1/4 p-1 border-r border-b border-black"> </div>
            <div class="w-1/4 p-1 border-r border-b border-black"> </div>
            <div class="w-1/4 p-1 border-b border-black"> </div>
        </div>

        <div class="">

        </div>
      </div>
  </div>
  


<div class="grid grid-cols-2 gap-10">
    <div></div>

    <div>
        <div class="pt-2">
            <p class="font-medium">คำสั่ง</p>
            <div class="flex mb-2">
                <input type="checkbox" id="allow" class="w-4 h-4 ml-10">
                <label for="allow" class="ml-1 ">อนุญาต</label>
            </div>
            <div class="flex ">
                <input type="checkbox" id="allow" class="w-4 h-4 ml-10">
                <label for="allow" class="ml-1 ">ไม่อนุญาต</label>
            </div>
        </div>
    </div>
</div>

<div class="grid grid-cols-2 mt-4 gap-10">
    <div>
      <p>
        (ลงชื่อ)..............................................................ผู้ตรวจสอบ
      </p>  
      <p class="text-center">
        (นายกฤษณ์ฤทธิกอณ ศิริวัฒนะโสภน)
      </p>  
      <p>
        ตำแหน่ง หัวหน้าฝ่ายทรัพยากรมนุษย์
      </p>  
      <p>
        วันที่................./...................../.........................
      </p>  
    </div>
    
    <div class="mt-8">
      <p>
        (ลงชื่อนายศุภัคกิตต์      ใจเย็น)
      </p>  
      <p class="">
        กรรมการผู้จัดการบริษัทฯ
      </p>   
      <p>
        วันที่................./...................../.........................
      </p>  
    </div>
</div>
  
</div>

    `;
      const pdf = html2pdf().set(opt).from(content).toPdf().get("pdf");
      pdf.output("dataurlnewwindow");
    },
  },
};
</script>
