<template lang="">
  <!-- Start block -->
  <section class="bg-[#EAFDFC] p-3 sm:p-5 antialiased h-screen">
    <div class="mx-auto max-w-screen-2xl px-4 lg:px-12">
      <div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="m-2">
          <button @click="GoBack">
            <i
              class="pi pi-angle-left bg-blue-500 rounded-md text-4xl text-white hover:bg-blue-600"
            ></i>
          </button>
        </div>
        <div
          class="flex flex-col items-center md:items-center space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
          <h1>
            <span class="text-[#0002A1] font-bold text-3xl"
              >บันทึกข้อความของตัวเอง</span
            >
          </h1>
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
              @click="gotoAddRecord"
              class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-lg px-4 py-2 focus:outline-none"
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
              เพิ่มเอกสาร
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
            <thead class="text-lg text-white uppercase bg-blue-700">
              <tr>
                <th class="px-2 py-3 text-center">สถานะ</th>
                <th class="px-2 py-3 text-center">เลขที่เอกสาร</th>
                <th class="px-2 py-3 text-center">ประเภทเอกสาร</th>
                <th class="px-2 py-3 text-center">รายละเอียด</th>
                <th class="px-2 py-3 text-center">วันที่ทำรายการ</th>
                <th class="px-6 py-3 text-center">ดำเนินการ</th>
              </tr>
            </thead>
            <tbody v-if="documents.length > 0">
              <tr
                v-for="(document, index) in filteredDocuments"
                :key="index"
                class="border-b hover:bg-gray-100"
              >
                <td class="px-4 py-3 text-center text-gray-900">
                  <div
                    :class="{
                      'items-center text-base font-bold drop-shadow-lg text-nowrap  text-center  p-3 rounded-xl': true,
                      'bg-yellow-200 text-yellow-900':
                        document.status_document === 'รอผู้บริหารอนุมัติ',
                      'bg-green-200 text-green-900':
                        document.status_document === 'อนุมัติ',
                      'bg-red-200 text-red-900':
                        document.status_document === 'ไม่อนุมัติ',
                      'bg-orange-200 text-orange-900':
                        document.status_document === 'รอตรวจสอบ',
                    }"
                  >
                    {{ document.status_document }}
                  </div>
                </td>
                <td
                  class="px-4 py-3 text-center text-gray-900 whitespace-nowrap"
                >
                  <div class="text-base">
                    {{ document.document_id }}
                  </div>
                </td>
                <td
                  class="px-4 py-3 text-center text-base text-gray-900 whitespace-nowrap overflow-auto"
                  style="max-width: 200px"
                >
                  {{ document.type }}
                </td>
                <td
                  scope="row"
                  class="px-4 py-3 text-base text-gray-900 overflow-y-scroll"
                >
                  <p>หัวข้อ : {{ document.headers }}</p>
                  <p>ส่งถึง : {{ document.to }}</p>
                  <p
                    v-if="document.type === 'Normal'"
                    class="text-base py-0.5 w-80 max-h-20 sm:w-full break-words"
                    v-html="document.detail"
                  ></p>
                  <p
                    class="text-base py-0.5 w-80 max-h-20 sm:w-full break-words"
                    v-if="document.type === 'OT'"
                  >
                    <span v-html="document.detail"></span>
                    {{ formatTime(document.ot.timein) }} จนถึง
                    {{ formatTime(document.ot.timeout) }}<br />
                  </p>
                </td>
                <td
                  class="px-4 py-3 text-base text-center text-gray-900 text-nowrap"
                  style="max-width: 200px"
                >
                  {{ formatDateTime(document.doc_date) }}
                </td>
                <td
                  class="px-4 py-3 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div class="flex items-center space-x-4">
                    <button
                      @click="showDocument(document)"
                      type="button"
                      data-drawer-target="drawer-read-product-advanced"
                      data-drawer-show="drawer-read-product-advanced"
                      aria-controls="drawer-read-product-advanced"
                      class="py-2 px-3 flex items-center text-lg font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
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
                      ดูรายละเอียด
                    </button>

                    <!-- <button
                      @click.prevent="confirmDelete(document._id)"
                     
                      type="button"
                      data-modal-target="delete-modal"
                      data-modal-toggle="delete-modal"
                      class="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-lg px-3 py-2 text-center"
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
                    </button> -->
                    <button
                      id="actionsDropdownButton"
                      data-dropdown-toggle="actionsDropdown"
                      class="w-full md:w-full inline-flex justify-center items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-lg font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                      type="button"
                      @click="generatePDF(document, EM)"
                    >
                      Export PDF
                      <i
                        class="-mr-1 ml-1.5 w-5 h-5 pi pi-file-pdf text-2xl text-white"
                      />
                    </button>
                    <button
                      @click="editDocument(document)"
                      v-if="document.status_document === 'รอตรวจสอบ'"
                      type="button"
                      data-modal-target="drawer-update-product"
                      data-modal-toggle="drawer-update-product"
                      class="flex py-2 px-3 items-center text-lg text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-600"
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
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <td class="text-center overflow-hidden" colspan="6">
                <div>
                  <label class="font-bold text-2xl text-black"
                    >ยังไม่มีรายการบันทึกข้อความ</label
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

  <Dialog
    v-model:visible="isModalUpdateOpen"
    modal
    header="แก้ไขเอกสาร"
    :style="{ width: '50rem' }"
  >
    <!-- Modal body -->
    <form action="#">
      <div class="grid gap-4 mb-4 sm:grid-cols-2">
        <div class="col-span-2">
          <label class="text-red-500 text-2xl bg-red-50 rounded-lg p-2">
            หมายเหตุ :
            {{
              selectedDocument.status_detail[
                selectedDocument.status_detail.length - 1
              ].remark
            }}</label
          >
          <label for="title" class="block mb-2 text-lg text-gray-900"
            >หัวเรื่อง</label
          >
          <textarea
            v-model="selectedDocument.headers"
            type="text"
            class="bg-white border border-gray-200 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="ใส่เรื่อง"
            required=""
          ></textarea>
        </div>
        <div class="col-span-2">
          <label for="title" class="block mb-2 text-lg text-gray-900"
            >ประเภท</label
          >
          <Dropdown
            v-model="selectedDocument.type"
            :options="Posttype"
            optionLabel="Posttype"
            optionValue="type"
            placeholder="เลือกประเภท"
            class="w-full sm:w-auto flex text-sm text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
          >
          </Dropdown>
        </div>
        <div class="col-span-2">
          <label for="title" class="block mb-2 text-lg text-gray-900"
            >ส่งถึง</label
          >
          <textarea
            v-model="selectedDocument.to"
            placeholder="ใส่ผู้รับ"
            row="5"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          ></textarea>
        </div>
        <div v-if="selectedDocument.type == 'OT'">
          <label for="title" class="block mb-2 text-lg text-gray-900"
            >ตั้งแต่เวลา</label
          >
          <Calendar1
            timeOnly
            v-model="selectedDocument.timein"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg w-full p-2.5"
            placeholder="ใส่เวลา"
          />
        </div>
        <div v-if="selectedDocument.type == 'OT'">
          <label for="title" class="block mb-2 text-lg text-gray-900"
            >จนถึงเวลา</label
          >
          <Calendar1
            timeOnly
            v-model="selectedDocument.timeout"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg w-full p-2.5"
            placeholder="ใส่เวลา"
          />
        </div>
        <div class="col-span-2">
          <label for="detail" class="block mb-2 text-lg text-gray-900"
            >รายละเอียด</label
          ><Editor
            editorStyle="height: 320px"
            v-model="selectedDocument.detail"
            rows="4"
            class="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            placeholder="ใส่รายละเอียดตรงนี้"
          ></Editor>
        </div>
      </div>

      <div class="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
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
  </Dialog>

  <Dialog
    v-model:visible="isModalShow"
    modal
    header="รายละเอียดเอกสาร"
    :style="{ width: '40rem' }"
  >
    <!-- ข้อมูลทั่วไป -->
    <div class="text-left mb-6">
      <div class>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">
          หัวข้อ : {{ selectedDocument.headers }}
        </h2>
      </div>
      <p class="text-lg text-gray-600">ประเภท: {{ selectedDocument.type }}</p>
      <p class="text-lg text-gray-600">ส่งถึง: {{ selectedDocument.to }}</p>
      <p class="text-lg text-gray-600">
        วันที่ทำรายการ: {{ formatDate(selectedDocument.doc_date) }}
      </p>
      <p
        class="text-lg text-red-600"
        v-if="
          selectedDocument.status_detail[
            selectedDocument.status_detail.length - 1
          ].remark !== ''
        "
      >
        หมายเหตุ:
        {{
          selectedDocument.status_detail[
            selectedDocument.status_detail.length - 1
          ].remark
        }}
      </p>
    </div>

    <!-- รายละเอียด -->
    <h3 class="text-lg font-semibold mb-2 text-center">รายละเอียด</h3>
    <div class="bg-gray-100 rounded-lg p-5 mb-6 overflow-y-auto max-h-60">
      <p v-html="selectedDocument.detail"></p>
    </div>

    <!-- ส่วนของ OT -->
    <div v-if="selectedDocument.type === 'OT'" class="mb-6">
      <div class="flex justify-evenly mb-4">
        <div class="flex flex-col items-center">
          <p class="text-lg font-semibold text-gray-800">ตั้งแต่เวลา:</p>
          <span class="block text-lg text-white bg-blue-500 rounded px-3 py-1">
            {{ formatTime(selectedDocument.ot.timein) }} น.
          </span>
        </div>
        <div class="flex flex-col items-center">
          <p class="text-lg font-semibold text-gray-800">จนถึงเวลา:</p>
          <span class="block text-lg text-white bg-blue-500 rounded px-3 py-1">
            {{ formatTime(selectedDocument.ot.timeout) }} น.
          </span>
        </div>
      </div>

      <div class="text-center">
        <p class="text-lg font-semibold text-gray-800">ระยะเวลาทั้งหมด:</p>
        <span class="text-lg text-white bg-blue-500 rounded px-3 py-1">
          {{ selectedDocument.ot.total_ot.totaltime }}
        </span>
      </div>
    </div>
    <div class="text-left mb-6">
      <p v-if="selectedDocument.file_name" class="text-lg text-gray-600">
        ชื่อเอกสาร: {{ selectedDocument.file_name }}
      </p>
    </div>
    <!-- แสดงไฟล์ที่แนบมา -->
    <div v-if="selectedDocument.file && selectedDocument.file.length > 0">
      <p class="text-center"><strong>ไฟล์ที่แนบมา:</strong></p>
      <ul>
        <!-- ใช้ v-for เพื่อแสดงรายการไฟล์ -->
        <li
          v-for="file in selectedDocument.file"
          :key="file.file_doc"
          class="my-2 text-center"
        >
          <!-- แสดงตัวอย่างรูปภาพหากเป็นไฟล์ภาพ -->
          <div>
            <Image
              :src="generateGoogleDriveImageURL(file.file_doc)"
              width="250"
              preview
              alt="ภาพที่แนบมา"
              class="w-32 h-auto"
            />
          </div>
        </li>
      </ul>
    </div>
  </Dialog>
</template>
<script>
import axios from "axios";
import html2pdf from "html2pdf.js";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/th";
import LogoDDSC from "../../../assets/Logo_name.png";
import Calendar1 from "primevue/calendar";
export default {
  components: {
    Calendar1,
  },
  data() {
    return {
      selectedfilter: [],
      searchText: "",
      documents: [],
      selectedDocument: [],
      isModalUpdateOpen: false,
      isModalShow: false,
      currentPage: 1,
      perPage: 5,
      totalPages: 1,
      Posttype: [
        { Posttype: "OT", type: "OT" },
        { Posttype: "Normal", type: "Normal" },
      ],
      groupedfilter: [
        {
          label: "ประเภทบันทึกข้อความ",
          items: [
            { label: "Normal", type: "Normal" },
            { label: "OT", type: "OT" },
          ],
        },
        {
          label: "สถานะ",
          items: [
            { label: "อนุมัติ", status_document: "อนุมัติ" },
            { label: "ไม่อนุมัติ", status_document: "ไม่อนุมัติ" },
            { label: "รอตรวจสอบ", status_document: "รอตรวจสอบ" },
            {
              label: "รอผู้บริหารอนุมัติ",
              status_document: "รอผู้บริหารอนุมัติ",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.fetchDocuments();
    this.fetchME();
    this.fetchEmployeeName();
  },
  watch: {
    searchText() {
      this.currentPage = 1; // รีเซ็ตหน้าปัจจุบันเมื่อค้นหา
    },
  },
  computed: {
    filteredDocuments() {
      const searchTextLower = this.searchText.toLowerCase(); // แปลงข้อความค้นหาเป็นตัวพิมพ์เล็ก
      const filtered = this.documents.filter((document) => {
        // แปลงเอกสารเป็นสตริงเพื่อค้นหา
        const documentString = JSON.stringify(document).toLowerCase();

        // ตรวจสอบว่ามีข้อความค้นหาในเอกสารหรือไม่
        const matchesSearchText = documentString.includes(searchTextLower);

        // ตรวจสอบตัวกรองที่เลือก
        const matchesFilter = this.selectedfilter.every((filter) => {
          const matchType = !filter.type || document.type === filter.type;
          const matchStatus =
            !filter.status_document ||
            document.status_document === filter.status_document;

          return matchType && matchStatus; // Return true ถ้าตรงกับทั้ง type และ status
        });

        return matchesSearchText && matchesFilter; // คืนค่าถ้าตรงกับทั้งข้อความค้นหาและตัวกรอง
      });

      // ปรับจำนวนหน้าทั้งหมดตามข้อมูลที่กรอง
      this.totalPages = Math.ceil(filtered.length / this.perPage);

      // คืนค่าผลลัพธ์ที่แบ่งหน้า
      return filtered.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
  },
  methods: {
    generateGoogleDriveImageURL(imageId) {
      return `https://drive.google.com/thumbnail?id=${imageId}`;
    },
    async fetchDocuments() {
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
        this.totalPages = Math.ceil(this.documents.length / this.perPage);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
    async fetchME() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/getme`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        this.ME = response.data.data;
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
    async fetchEmployeeName() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/get`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        // กรองข้อมูลที่ status_detail มี employee_id ตรงกับ this.$store.getters.id และมี status === "อนุมัติ"
        this.EM = response.data.data;

        console.log(this.EM); // ตรวจสอบข้อมูลใน console
        console.log(response.data); // ตรวจสอบข้อมูลใน console
      } catch (error) {
        console.error("Error fetching documents:", error); // แจ้งข้อผิดพลาดถ้ามี
      }
    },

    async editDocument(document) {
      this.selectedDocument = { ...document };
      this.isModalUpdateOpen = true;
    },
    async updateRecord() {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/document/update/${
            this.selectedDocument._id
          }`,
          this.selectedDocument,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          },

          this.selectedDocument
        );
        console.log(response.data.data);

        const toast = Swal.mixin({
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
        toast.fire({
          icon: "success",
          title: "แก้ไขข้อมูลสำเร็จ",
        });
        this.fetchDocuments();
        this.isModalUpdateOpen = false;
      } catch (error) {
        console.error("Error adding document:", error);
      }
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
          `${import.meta.env.VITE_VUE_APP_DECCAN}/document/delete/${id}  `,
          {}
        );
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ข้อมูลเอกสารถูกลบแล้ว!",
          showCancelButton: false,
          timer: 2000,
        });
        this.fetchDocuments();
      } catch (error) {
        console.error("Error deleting employee:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete employee. Please try again later.",
        });
      }
    },

    async showDocument(document) {
      this.selectedDocument = { ...document };
      this.isModalShow = true;
      console.log(document);
    },
    formatDate(date) {
      dayjs.locale("th");
      return dayjs(date).format("DD MMMM YYYY HH:mm:ss");
    },
    formatDateTime(datetime) {
      return dayjs(datetime).locale("th").format("DD MMMM YYYY HH:mm:ss");
    },
    formatTime(time) {
      return dayjs(time).locale("th").format("HH:mm:ss");
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
    GoBack() {
      window.history.back();
    },
    gotoAddRecord() {
      this.$router.push("/Record/AddRecord");
    },
    getEmployeeName(employeeId) {
      const employee = this.EM.find((emp) => emp._id === employeeId);
      if (employee) {
        return `${employee.first_name} ${employee.last_name}`;
      }
      return ""; // หรือค่าเริ่มต้นที่ต้องการสำหรับกรณีที่ไม่พบข้อมูล
    },
    // ฟังก์ชันสำหรับดึง title, first_name และ last_name ของพนักงานจาก employee_id
    getEmployeeFullName(employeeId) {
      const employee = this.EM.find((emp) => emp._id === employeeId);
      if (employee) {
        return `${employee.name_title} ${employee.first_name} ${employee.last_name}`;
      }
      return ""; // หรือค่าเริ่มต้นที่ต้องการสำหรับกรณีที่ไม่พบข้อมูล
    },
    getPosition(position) {
      if (position) {
        if (position === "employee") {
          return "พนักงาน";
        } else if (position === "head_department") {
          return "หัวหน้าแผนก";
        } else if (position === "manager") {
          return "ผู้จัดการ";
        } else if (position === "owner") {
          return "ผู้บริหาร";
        } else if (position === "hr") {
          return "ฝ่ายบุคคล";
        }
      }
      return "ไม่พบตำแหน่ง"; // หรือค่าเริ่มต้นที่ต้องการสำหรับกรณีที่ไม่พบข้อมูล
    },
    getRole(role) {
      if (role) {
        if (role === "programmer") {
          return "โปรแกรมเมอร์";
        } else if (role === "graphic") {
          return "กราฟิก";
        } else if (role === "lawyer") {
          return "ทนาย";
        } else if (role === "accounting") {
          return "บัญชี";
        }
      }
      return "ไม่พบแผนก"; // หรือค่าเริ่มต้นที่ต้องการสำหรับกรณีที่ไม่พบข้อมูล
    },

    generatePDF(documents, EM) {
      const opt = {
        html2canvas: { scale: 3 },
        margin: 0.1,
        filename: "my_file_name.pdf",
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait",
        },
      };

      let content = `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');

    body {
      font-family: "Sarabun", sans-serif !important;
      font-weight: 300 !important;
      font-style: normal !important;
      font-size: 16px !important;
    }
    </style>

    <head>
      <div class="grid grid-cols-3 mt-5">
        <div class="flex justify-center items-center">
          <img src="${LogoDDSC}" class="w-fit h-24" alt="Logo">
        </div>
        <div class="flex justify-center items-center">
          <p class="text-2xl">บันทึกข้อความ</p>
        </div>
        <div class="flex justify-center items-center">
          <p class="text-red-500">( ${this.getPosition(
            documents.status_detail[0].position
          )} - ${this.getRole(documents.status_detail[0].position)})</p>
        </div>
      </div>
    </head>
    <body>
      <div class="px-10 pb-5 mt-2">
        <div class="grid grid-col-2 gap-3">
          <div class="flex justify-start">บริษัท ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ จำกัด</div>
          <div class="grid grid-cols-2">
            <div>ที่ ${documents.document_id}/2565</div>
            <div>วันที่ ${this.formatDate(documents.doc_date)}</div>
          </div>
          <div class="flex flex-row gap-3">
            <div>เรื่อง</div>
            <div>${documents.headers}</div>
          </div>
          <div class="w-full h-1 bg-black mt-3"></div>
          <div class="flex flex-row gap-3">
            <div>เรียน</div>
            <div>${documents.to}</div>
          </div>
          <div class="flex flex-col gap-3">
  <div class="flex flex-row gap-3">
    <div>สิ่งที่แนบมาด้วย</div>
    <div>${documents.file.length > 0 ? documents.file.length : "-"} ${
        documents.file.length > 0
          ? "รายการ " + "คือ " + documents.file_name
          : ""
      }</div>
</div>
        </div>
  `;

      if (documents.type === "OT") {
        content += `
      <div class="flex flex-row gap-2 mt-2">
        <ul class="list-none indent-14">
          <li>
            ${documents.detail} ตั้งแต่เวลา ${this.formatTime(
          documents.timein
        )} จนถึงเวลา ${this.formatTime(documents.timeout)}
          </li>
        </ul>
      </div>
    `;
      } else {
        content += `
      <div class="flex flex-col gap-2 mt-2">
        <ul>
          <li class="indent-14">
            ${documents.detail}
          </li>
        </ul>
      </div>
    `;
      }

      content += `
      <div class="grid grid-col-2">
        <div class="flex">
            <div class="flex ml-12">
              จึงเรียนมาเพื่อโปรดทราบและพิจารณาอนุมัติ
            </div>
        </div>
        <div class="flex justify-around  mt-2">
          <div class="flex flex-col gap-2 mt-6">
              <div class="flex">
                     ลงชื่อ <div class="ml-3">${this.getEmployeeName(
                       documents.status_detail[0].employee_id
                     )}</div>
              </div>
              <div class="flex justify-center">
                    (${this.getEmployeeFullName(
                      documents.status_detail[0].employee_id
                    )})
              </div>
              <div class="flex justify-center">
                     ${this.getPosition(documents.status_detail[0].position)}
              </div>
              <div class="flex">
                    วันที่ ${this.formatDate(documents.status_detail[0].date)}
              </div>
          </div> `;
      if (
        documents.status_detail[documents.status_detail.length - 1].status ===
        "อนุมัติ"
      ) {
        content += `
      <div class="flex flex-col gap-2 mt-6">
              <div class="flex">
                    ลงชื่อ <div class="ml-3">${this.getEmployeeName(
                      documents.status_detail[
                        documents.status_detail.length - 1
                      ].employee_id
                    )}</div>
              </div>
              <div class="flex justify-center">
                    (${this.getEmployeeFullName(
                      documents.status_detail[
                        documents.status_detail.length - 1
                      ].employee_id
                    )})
              </div>
              <div class="flex justify-center">
                    ${this.getPosition(
                      documents.status_detail[
                        documents.status_detail.length - 1
                      ].position
                    )}
              </div>
              <div class="flex">
                    วันที่ ${this.formatDate(
                      documents.status_detail[
                        documents.status_detail.length - 1
                      ].date
                    )}
              </div>
          </div>
        </div>
        </div>
    </div>
    </body>
    `;
      } else {
        content += `
      <div class="flex flex-col gap-2 mt-6">
              <div class="flex">
                    ลงชื่อ . . . . . .
              </div>
              <div class="flex justify-center">
                    (. . . . . .)
              </div>
              <div class="flex justify-center">
                    . . . . .
              </div>
              <div class="flex">
                    วันที่ . . . . .
              </div>
          </div>
        </div>
        </div>
    </div>
    </body>
    `;
      }

      const pdf = html2pdf().set(opt).from(content).toPdf().get("pdf");
      pdf.output("dataurlnewwindow");
    },
  },
};
</script>
<style>
.p-image-preview {
  width: 30rem;
}
</style>
