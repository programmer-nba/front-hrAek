<template>
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
          v-if="SwitchApproveRecord"
          class="flex flex-col items-center md:items-center space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
          <h1>
            <span class="text-[#0002A1] font-bold text-3xl"
              >หน้าอนุมัติเอกสาร</span
            >
          </h1>
        </div>

        <div
          v-if="SwitchHistoryApprove"
          class="flex flex-col items-center md:items-center space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
          <h1>
            <span class="text-[#0002A1] font-bold text-2xl"
              >หน้าประวัติการอนุมัติเอกสาร</span
            >
          </h1>
        </div>
        <!-- กล่องค้นหา -->
        <div
          class="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t"
        >
          <!-- กล่องค้นหา -->
          <div class="w-full md:w-1/2" v-if="SwitchApproveRecord">
            <form class="flex items-center relative">
              <!-- เพิ่ม relative -->
              <label for="simple-search" class="sr-only">ค้นหา</label>
              <div class="w-full">
                <input
                  v-model="searchApproveRecord"
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

          <!-- กล่องค้นหา -->
          <div class="w-full md:w-1/2" v-if="SwitchHistoryApprove">
            <form class="flex items-center relative">
              <!-- เพิ่ม relative -->
              <label for="simple-search" class="sr-only">ค้นหา</label>
              <div class="w-full">
                <input
                  v-model="searchHistoryApprove"
                  type="text"
                  id="simple-search"
                  placeholder="ค้นหาประวัติการอนุมัติ"
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

          <div class="inline-flex justify-center">
            <button
              @click="
                SwitchApproveRecord = true;
                SwitchHistoryApprove = false;
              "
              :class="{
                'bg-blue-500 text-white': SwitchApproveRecord,
                'bg-white text-gray-900': !SwitchApproveRecord,
                'border-gray-200': true, // ส่วนแบ่งปันสไตล์ที่เหมือนกัน
                'rounded-s-lg': true,
                'hover:bg-gray-100': true,
                'hover:text-green-500': true,
                'focus:z-10': true,
                'focus:ring-2': true,
                'focus:ring-blue-700': true,
                'focus:text-blue-700': true,
              }"
              class="inline-flex items-center py-3 px-4 text-sm font-medium"
            >
              <i
                class="pi pi-check-circle w-full h-full text-xl text-center"
              ></i>
            </button>
            <button
              @click="
                SwitchHistoryApprove = true;
                SwitchApproveRecord = false;
              "
              :class="{
                'bg-blue-500 text-white': SwitchHistoryApprove,
                'bg-white text-gray-900': !SwitchHistoryApprove,
                'border-gray-200': true, // ส่วนแบ่งปันสไตล์ที่เหมือนกัน
                'rounded-e-lg': true,
                'hover:bg-gray-100': true,
                'hover:text-red-500': true,
                'focus:z-10': true,
                'focus:ring-2': true,
                'focus:ring-blue-700': true,
                'focus:text-blue-700': true,
              }"
              class="inline-flex items-center py-3 px-4 text-sm font-medium"
            >
              <i class="pi pi-history w-full h-full text-xl"></i>
            </button>
          </div>

          <div
            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
          >
            <div
              v-if="SwitchApproveRecord"
              class="flex items-center space-x-3 sm:w-[20rem]"
            >
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
            <div v-else class="flex items-center space-x-3 sm:w-[20rem]">
              <MultiSelect
                v-model="selecteditems"
                :options="groupeditems"
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
          <table class="w-full text-left text-gray-500">
            <thead class="text-lg text-white uppercase bg-blue-700">
              <tr>
                <th class="p-4 text-center">สถานะ</th>
                <th class="p-4 text-center">เลขที่เอกสาร</th>
                <th class="p-4 text-center">ประเภทเอกสาร</th>
                <th class="p-4 text-center">รายละเอียด</th>
                <th class="p-4 text-center">วันที่ทำรายการ</th>
                <th class="px-6 py-3 text-center">ดำเนินการ</th>
              </tr>
            </thead>
            <tbody v-if="SwitchApproveRecord && filteredDocuments.length > 0">
              <tr
                v-for="(document, index) in filteredDocuments"
                :key="index"
                class="border-b hover:bg-gray-100"
              >
                <td
                  class="px-4 py-3 text-center text-gray-900 whitespace-nowrap"
                >
                  <div
                    class="items-center text-base font-bold drop-shadow-lg text-nowrap bg-[#FCCF55] text-center p-3 rounded-xl text-yellow-900"
                    v-if="document.status_document === 'รอหัวหน้าแผนกอนุมัติ'"
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
                  class="px-4 py-3 text-center text-base text-gray-900 overflow-y-scroll"
                >
                  <p>หัวข้อ : {{ document.headers }}</p>
                  <p>ส่งถึง : {{ document.to }}</p>
                  <p
                    v-if="status_document === 'รอตรวจสอบ'"
                    class="text-red-500"
                  >
                    ต้องแก้ไข : {{ document.remark }}
                  </p>
                  <p
                    v-if="document.type === 'Normal'"
                    class="text-base py-0.5 w-80 max-h-20 sm:w-full break-words"
                    v-html="document.detail"
                  ></p>
                  <p v-if="document.type === 'OT'" v-html="document.detail"></p>
                  <p v-if="document.type === 'OT'">
                    {{ formatTime(document.ot.timein) }} จนถึง
                    {{ formatTime(document.ot.timeout) }}
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
                  <div class="flex items-center justify-center space-x-4">
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
                    <button
                      @click="updateRecord(document)"
                      v-if="document.status_document === 'รอหัวหน้าแผนกอนุมัติ'"
                      class="flex py-2 px-3 items-center text-lg text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-600"
                    >
                      <i class="pi pi-check-circle h-4 w-4 mr-2 -ml-0.5"> </i>
                      อนุมัติ
                    </button>
                    <button
                      @click="ConfirmNotApprove(document)"
                      v-if="document.status_document === 'รอหัวหน้าแผนกอนุมัติ'"
                      class="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-lg px-3 py-2 text-center"
                    >
                      <i class="pi pi-times-circle h-4 w-4 mr-2 -ml-0.5"> </i>
                      ไม่อนุมัติ
                    </button>

                    <button
                      @click="handleEditClick(document)"
                      v-if="document.status_document === 'รอหัวหน้าแผนกอนุมัติ'"
                      class="flex items-center text-orange-700 hover:text-white border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-lg text-lg px-3 py-2 text-center"
                    >
                      <i class="pi pi-pencil h-4 w-4 mr-2 -ml-0.5"> </i>
                      แก้ไข
                    </button>

                    <!-- <button
                      v-if="document.Type === 'OT'"
                      id="actionsDropdownButton"
                      data-dropdown-toggle="actionsDropdown"
                      class="w-full md:w-auto inline-flex justify-center items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-lg font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                      type="button"
                      @click="generatePDFOT(document, ME)"
                    >
                      Export PDF
                      <img
                        src="../../../assets/Export-Icon.png"
                        class="-mr-1 ml-1.5 w-5 h-5"
                        style="filter: invert(1)"
                        alt="Arrow Image"
                      />
                    </button> -->
                    <!-- <button
                      v-if="document.Type === 'Normal'"
                      id="actionsDropdownButton"
                      data-dropdown-toggle="actionsDropdown"
                      class="w-full md:w-auto inline-flex justify-center items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-lg font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                      type="button"
                      @click="generatePDFNormal(document, ME)"
                    >
                      Export PDF
                      <img
                        src="../../../assets/Export-Icon.png"
                        class="-mr-1 ml-1.5 w-5 h-5"
                        style="filter: invert(1)"
                        alt="Arrow Image"
                      />
                    </button> -->
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-if="SwitchApproveRecord && filteredDocuments.length === 0">
              <td class="text-center overflow-hidden" colspan="6">
                <div>
                  <label class="font-bold text-2xl text-black"
                    >ยังไม่มีรายการที่ต้องอนุมัติ</label
                  >
                </div>
              </td>
            </tbody>
            <tbody v-if="SwitchHistoryApprove && ApproveMes.length > 0">
              <tr
                v-for="(document, index) in filteredApprove"
                :key="index"
                class="border-b hover:bg-gray-100"
              >
                <td
                  class="px-4 py-3 text-center text-gray-900 whitespace-nowrap"
                >
                  <div
                    :class="{
                      'items-center text-base font-bold drop-shadow-lg text-nowrap text-center p-3 rounded-xl': true,
                      'bg-green-200 text-green-900':
                        document.status_detail.some(
                          (detail) =>
                            detail.status === 'อนุมัติ' &&
                            detail.employee_id === this.$store.getters.id
                        ),
                      'bg-red-200 text-red-900': document.status_detail.some(
                        (detail) =>
                          detail.status === 'ไม่อนุมัติ' &&
                          detail.employee_id === this.$store.getters.id
                      ),
                      'bg-orange-200 text-orange-900':
                        document.status_detail.some(
                          (detail) =>
                            detail.status === 'แก้ไข' &&
                            detail.employee_id === this.$store.getters.id
                        ),
                    }"
                  >
                    <!-- ตรวจสอบ status_detail ที่ตรงกับ employee_id -->
                    <template v-for="detail in document.status_detail">
                      <template
                        v-if="detail.employee_id === this.$store.getters.id"
                      >
                        {{ detail.status }}
                      </template>
                    </template>
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
                  class="px-4 py-3 text-center text-base text-gray-900 overflow-y-scroll"
                >
                  <p>หัวข้อ : {{ document.headers }}</p>
                  <p>ส่งถึง : {{ document.to }}</p>
                  <p
                    v-if="document.type === 'Normal'"
                    class="text-base py-0.5 w-80 max-h-20 sm:w-full break-words"
                    v-html="document.detail"
                  ></p>
                  <p v-if="document.type === 'OT'" v-html="document.detail"></p>
                  <p v-if="document.type === 'OT'">
                    {{ formatTime(document.ot.timein) }} จนถึง
                    {{ formatTime(document.ot.timeout) }}
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
                  <div class="flex items-center justify-center space-x-4">
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
                      v-if="document.Type === 'OT'"
                      id="actionsDropdownButton"
                      data-dropdown-toggle="actionsDropdown"
                      class="w-full md:w-auto inline-flex justify-center items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-lg font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                      type="button"
                      @click="generatePDFOT(document, ME)"
                    >
                      Export PDF
                      <img
                        src="../../../assets/Export-Icon.png"
                        class="-mr-1 ml-1.5 w-5 h-5"
                        style="filter: invert(1)"
                        alt="Arrow Image"
                      />
                    </button> -->
                    <!-- <button
                      v-if="document.Type === 'Normal'"
                      id="actionsDropdownButton"
                      data-dropdown-toggle="actionsDropdown"
                      class="w-full md:w-auto inline-flex justify-center items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-lg font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                      type="button"
                      @click="generatePDFNormal(document, ME)"
                    >
                      Export PDF
                      <img
                        src="../../../assets/Export-Icon.png"
                        class="-mr-1 ml-1.5 w-5 h-5"
                        style="filter: invert(1)"
                        alt="Arrow Image"
                      />
                    </button> -->
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-if="SwitchHistoryApprove && ApproveMes.length === 0">
              <td class="text-center overflow-hidden" colspan="6">
                <div>
                  <label class="font-bold text-2xl text-black"
                    >ยังไม่มีประวัติการอนุมัติเอกสาร</label
                  >
                </div>
              </td>
            </tbody>
          </table>
        </div>
        <nav
          v-if="SwitchApproveRecord"
          class="flex flex-col pb-10 sm:pb-2 md:flex-row justify-center items-center md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation"
        >
          <!-- <span class="text-sm text-gray-500">
            Showing
            <span class="text-gray-900"
              >{{ perPage - 4 }} - {{ perPage }}
            </span>
            of
            <span class="text-gray-900">{{ totalPages }}</span>
          </span> -->
          <ul class="inline-flex items-stretch -space-x-px">
            <li>
              <button
                @click="filteredDocumentsPrevPage"
                class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                :disabled="filteredDocumentsCurrentPage === 1"
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
            <li v-for="page in filteredDocumentsTotalPages" :key="page">
              <button
                @click="filteredDocumentsChangePage(page)"
                class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                {{ page }}
              </button>
            </li>
            <li>
              <button
                @click="filteredDocumentsNextPage"
                :disabled="
                  filteredDocumentsCurrentPage === filteredDocumentsTotalPages
                "
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
        <nav
          v-if="SwitchHistoryApprove"
          class="flex flex-col pb-10 sm:pb-2 md:flex-row justify-center items-center md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation"
        >
          <!-- <span class="text-sm text-gray-500">
            Showing
            <span class="text-gray-900"
              >{{ perPage - 4 }} - {{ perPage }}
            </span>
            of
            <span class="text-gray-900">{{ totalPages }}</span>
          </span> -->
          <ul class="inline-flex items-stretch -space-x-px">
            <li>
              <button
                @click="filteredApprovePrevPage"
                class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                :disabled="filteredApproveCurrentPage === 1"
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
            <li v-for="page in filteredApproveTotalPages" :key="page">
              <button
                @click="filteredApproveChangePage(page)"
                class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                {{ page }}
              </button>
            </li>
            <li>
              <button
                @click="filteredApproveNextPage"
                :disabled="
                  filteredApproveCurrentPage === filteredApproveTotalPages
                "
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
    v-model:visible="isModalShow"
    modal
    header="รายละเอียดเอกสาร"
    :style="{ width: '40rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @show="fetchEmployeeName()"
  >
    <div class="text-gray-700">
      <!-- Header -->
      <div class="text-left mb-6">
        <h3 class="text-xl font-bold text-black">
          หัวข้อ : {{ selectedDocument.headers }}
        </h3>

        <p>ประเภท: {{ selectedDocument.type }}</p>
        <p>ส่งถึง: {{ selectedDocument.to }}</p>
      </div>
      <!-- Metadata -->
      <div class="mb-5 text-lg md:flex md:flex-col items-left gap-2">
        <div class="md:flex gap-6 p-6 bg-white shadow-md rounded-lg">
          <!-- Image -->
          <div class="flex justify-center mb-2">
            <img
              v-if="EM.image"
              :src="generateGoogleDriveImageURL(EM.image)"
              class="rounded-full w-[120px] h-[120px] object-cover border-[6px] border-[#231f39] shadow-[0px_27px_16px_-11px_rgba(31,27,56,0.25)]"
            />
            <p
              v-else
              class="flex items-center bg-red-500 text-white justify-center rounded-full w-[120px] h-[120px] object-cover border-[6px] border-red-500 shadow-[0px_27px_16px_-11px_rgba(31,27,56,0.25)] text-center"
            >
              ไม่มีรูปภาพ
            </p>
          </div>

          <!-- Information -->
          <div class="grid gird-cols-2 md:flex md:flex-col justify-center">
            <span>
              ผู้ทำรายการ: {{ EM.name_title }} {{ EM.first_name }}
              {{ EM.last_name }}
            </span>
            <span>ตำแหน่ง: {{ EM.role }}</span>
            <span v-if="EM.position"> แผนก: {{ EM.position }} </span>
            <span>
              วันที่ทำรายการ: {{ formatDate(selectedDocument.doc_date) }}
            </span>
          </div>
        </div>
        <span
          v-if="selectedDocument.status_document === 'รอตรวจสอบ'"
          class="text-red-600"
        >
          หมายเหตุ:
          {{
            selectedDocument.status_detail[
              selectedDocument.status_detail.length - 1
            ].remark
          }}
        </span>
      </div>
      <!-- Detail -->
      <h3 class="text-lg font-semibold mb-2 text-center">รายละเอียด</h3>
      <div class="bg-gray-100 rounded-lg p-5 mb-6 overflow-y-auto max-h-60">
        <p v-html="selectedDocument.detail"></p>
      </div>

      <!-- OT Information -->
      <div v-if="selectedDocument.type === 'OT'" class="mb-6">
        <div
          class="flex justify-between items-center px-4 py-3 bg-gray-200 rounded-lg shadow-md"
        >
          <div class="flex items-center gap-2">
            <span>ตั้งแต่:</span>
            <span
              class="text-lg text-blue-800 font-semibold rounded-lg px-3 py-1 bg-blue-100"
            >
              {{ formatTime(selectedDocument.ot.timein) }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span>จนถึง:</span>
            <span
              class="text-lg text-blue-800 font-semibold rounded-lg px-3 py-1 bg-blue-100"
            >
              {{ formatTime(selectedDocument.ot.timeout) }}
            </span>
          </div>
        </div>

        <div class="flex justify-center items-center gap-2 mt-4 text-base">
          <span>ระยะเวลาทั้งหมด:</span>
          <span
            class="bg-blue-100 text-blue-800 font-semibold rounded-lg px-3 py-1 text-center"
          >
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
    </div>
  </Dialog>
  <Dialog
    v-model:visible="EditModal"
    modal
    header="แก้ไขเอกสาร"
    :style="{ width: '40rem', zIndex: 2000 }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="min-h-56">
      <div class="flex flex-col">
        <div class="flex justify-center">
          <p class="text-base text-black">แก้ไขเอกสาร</p>
        </div>
        <div class="flex justify-center">
          <textarea
            v-model="remark"
            row="3"
            placeholder="ใส่สิ่งที่ต้องให้แก้ไข"
            class="bg-gray-300 h-24 w-full px-2 py-2 rounded-lg border text-black border-gray-500"
          ></textarea>
        </div>
        <div class="flex flex-row justify-center gap-5">
          <div class="flex">
            <button
              @click="ConfirmEdit(documentToEdit)"
              class="bg-green-500 border border-green-500 rounded-lg h-10 w-20 mt-10 text-white hover:bg-green-700 focus:border-green-600"
            >
              ตกลง
            </button>
          </div>
          <div class="flex">
            <button
              @click="EditModal = false"
              class="bg-red-500 border border-red-500 rounded-lg h-10 w-20 mt-10 text-white hover:bg-red-700 focus:border-red-600"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>
<script>
import axios from "axios";
import html2pdf from "html2pdf.js";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/th";

export default {
  data() {
    return {
      selectedRecord: null,
      selectedfilter: [],
      selecteditems: [],
      searchApproveRecord: "", // สำหรับค้นหาในบันทึกข้อความ
      searchHistoryApprove: "", // สำหรับค้นหาในประวัติการอนุมัติ
      documents: [],
      ApproveMes: [],
      EM: [],
      selectedDocument: [],
      To: "กรรมการผู้จัดการ บริษัท ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ จำกัด",
      isModalShow: false,
      EditModal: false,
      remark: "",
      SwitchApproveRecord: true,
      SwitchHistoryApprove: false,
      Record: [
        { name: "OT", type: "OT" },
        { name: "Normal", type: "Normal" },
      ],
      SelectTo: [{ SelectTo: "test", To: "test" }],
      PostType: [
        { PostType: "OT", type: "OT" },
        { PostType: "Normal", type: "Normal" },
      ],
      groupedfilter: [
        {
          label: "ประเภทบันทึกข้อความ",
          items: [
            { label: "Normal", type: "Normal" },
            { label: "OT", type: "OT" },
          ],
        },
      ],
      groupeditems: [
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
            { label: "อนุมัติ", status: "อนุมัติ" },
            { label: "ไม่อนุมัติ", status: "ไม่อนุมัติ" },
            { label: "แก้ไข", status: "แก้ไข" },
          ],
        },
      ],
      // ตัวแปรที่แยกกันสำหรับการแบ่งหน้าและการกรอง
      filteredDocumentsCurrentPage: 1,
      filteredDocumentsPerPage: 5,
      filteredDocumentsTotalPages: 1,
      filteredApproveCurrentPage: 1,
      filteredApprovePerPage: 5,
      filteredApproveTotalPages: 1,
    };
  },
  created() {
    this.fetchDocuments();
    this.fetchME();
    this.fetchApproveMe();
  },
  watch: {
    // รีเซ็ตกลับไปหน้าแรกเมื่อค้นหาเปลี่ยน
    searchApproveRecord() {
      this.filteredDocumentsCurrentPage = 1;
    },
    searchHistoryApprove() {
      this.filteredApproveCurrentPage = 1;
    },
    // รีเซ็ตกลับไปหน้าแรกเมื่อเปลี่ยนตัวกรอง
    selectedfilter() {
      this.filteredDocumentsCurrentPage = 1;
    },
    selecteditems() {
      this.filteredApproveCurrentPage = 1;
    },
  },
  computed: {
    // กรองและแบ่งหน้า `filteredDocuments`
    filteredDocuments() {
      let filtered = this.documents;

      // กรองตาม `selectedfilter` และ `searchApproveRecord`
      if (this.selectedfilter.length > 0) {
        filtered = filtered.filter((doc) => {
          return this.selectedfilter.every((filter) => {
            return (
              (!filter.type || doc.type === filter.type) &&
              (!filter.status_document ||
                doc.status_document === filter.status_document)
            );
          });
        });
      }

      // ใช้ `searchApproveRecord` เพื่อค้นหาใน `filteredDocuments`
      if (this.searchApproveRecord.trim()) {
        const searchLower = this.searchApproveRecord.toLowerCase();
        filtered = filtered.filter((doc) => {
          return Object.values(doc).some((value) => {
            if (Array.isArray(value)) {
              return value.some((item) =>
                JSON.stringify(item).toLowerCase().includes(searchLower)
              );
            } else if (typeof value === "object") {
              return Object.values(value).some((nestedValue) =>
                JSON.stringify(nestedValue).toLowerCase().includes(searchLower)
              );
            } else {
              // ใช้ `dayjs` เพื่อแปลงวันที่และเวลาเป็นสตริง
              const dateValue = dayjs(value).format("YYYY-MM-DD"); // รูปแบบที่ต้องการ
              return (
                dateValue.toLowerCase().includes(searchLower) ||
                String(value).toLowerCase().includes(searchLower)
              );
            }
          });
        });
      }

      // คำนวณจำนวนหน้า
      this.filteredDocumentsTotalPages = Math.ceil(
        filtered.length / this.filteredDocumentsPerPage
      );

      // แบ่งหน้า
      return filtered.slice(
        (this.filteredDocumentsCurrentPage - 1) * this.filteredDocumentsPerPage,
        this.filteredDocumentsCurrentPage * this.filteredDocumentsPerPage
      );
    },
    // กรองและแบ่งหน้า `filteredApprove`
    filteredApprove() {
      let filtered = this.ApproveMes;

      // การกรองตาม `selecteditems`
      if (this.selecteditems.length > 0) {
        filtered = filtered.filter((doc) => {
          return this.selecteditems.every((filter) => {
            const matchType = !filter.type || doc.type === filter.type; // ตรวจสอบ `type`
            const matchStatus =
              !filter.status ||
              doc.status_detail.some(
                (status) =>
                  status.status === filter.status &&
                  status.employee_id === this.$store.getters.id
              );

            return matchType && matchStatus; // ต้องตรงกับทั้ง `type` และ `status`
          });
        });
      }

      // ใช้ `searchHistoryApprove` เพื่อค้นหาใน `filteredApprove`
      if (this.searchHistoryApprove.trim()) {
        const searchLower = this.searchHistoryApprove.toLowerCase();
        filtered = filtered.filter((doc) => {
          return Object.values(doc).some((value) => {
            if (Array.isArray(value)) {
              return value.some((item) =>
                JSON.stringify(item).toLowerCase().includes(searchLower)
              );
            } else if (typeof value === "object") {
              return Object.values(value).some((nestedValue) =>
                JSON.stringify(nestedValue).toLowerCase().includes(searchLower)
              );
            } else {
              const dateValue = dayjs(value).format("YYYY-MM-DD");
              return (
                dateValue.toLowerCase().includes(searchLower) ||
                String(value).toLowerCase().includes(searchLower)
              );
            }
          });
        });
      }

      // คำนวณจำนวนหน้า
      this.filteredApproveTotalPages = Math.ceil(
        filtered.length / this.filteredApprovePerPage
      );

      return filtered.slice(
        (this.filteredApproveCurrentPage - 1) * this.filteredApprovePerPage,
        this.filteredApproveCurrentPage * this.filteredApprovePerPage
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
          `${import.meta.env.VITE_VUE_APP_DECCAN}/document/getAll/`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        this.documents = response.data.data.filter(
          (document) =>
            document.status_document === "รอหัวหน้าแผนกอนุมัติ" &&
            document.document_true === "ฉบับจริง"
        );
        this.documents.reverse();
        console.log(this.documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
    async fetchEmployeeName() {
      console.log(this.selectedDocument.status_detail[0].employee_id);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/getid/${
            this.selectedDocument.status_detail[0].employee_id
          }`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        // กรองข้อมูลที่ status_detail มี employee_id ตรงกับ this.$store.getters.id และมี status === "อนุมัติ"
        this.EM = response.data.data;

        switch (this.EM.role) {
          case "employee":
            this.EM.role = "พนักงาน";
            break;
          case "head_department":
            this.EM.role = "หัวหน้าแผนก";
            break;
          case "hr":
            this.EM.role = "ฝ่ายบุคคล";
            break;

          case "manager":
            this.EM.role = "ผู้จัดการ";
            break;
          case "owner":
            this.EM.role = "ผู้บริหาร";
            break;
          default:
            this.EM.role = "ไม่พบตำแหน่ง";
        }

        switch (this.EM.position) {
          case "programmer":
            this.EM.position = "โปรแกรมเมอร์";
            break;
          case "graphic":
            this.EM.position = "กราฟิก";
            break;
          case "lawyer":
            this.EM.position = "ทนาย";
            break;
          case "accounting":
            this.EM.position = "บัญชี";
            break;
          default:
            this.EM.position = "ไม่พบแผนก";
        }
        console.log(this.EM); // ตรวจสอบข้อมูลใน console
        console.log(response.data); // ตรวจสอบข้อมูลใน console
      } catch (error) {
        console.error("Error fetching documents:", error); // แจ้งข้อผิดพลาดถ้ามี
      }
    },
    async fetchApproveMe() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/document/approve/byMe`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        // กรองข้อมูลที่ status_detail มี employee_id ตรงกับ this.$store.getters.id และมี status === "อนุมัติ"
        this.ApproveMes = response.data.data.filter((document) =>
          document.status_detail.some(
            (status) =>
              (status.employee_id === this.$store.getters.id &&
                status.status === "อนุมัติ") ||
              (status.employee_id === this.$store.getters.id &&
                status.status === "ไม่อนุมัติ") ||
              (status.employee_id === this.$store.getters.id &&
                status.status === "แก้ไข")
          )
        );

        // เปลี่ยนทิศทางรายการเพื่อให้เป็นลำดับย้อนกลับ
        this.ApproveMes.reverse();
        console.log(this.ApproveMes); // ตรวจสอบข้อมูลใน console
        console.log(response.data); // ตรวจสอบข้อมูลใน console
      } catch (error) {
        console.error("Error fetching documents:", error); // แจ้งข้อผิดพลาดถ้ามี
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
    async updateRecord(document) {
      const result = await Swal.fire({
        title: "ยืนยันการอนุมัติเอกสาร",
        text: "คุณต้องการที่จะอนุมัติเอกสารนี้หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, อนุมัติ!",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        // หากผู้ใช้ยืนยันการไม่อนุมัติ
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/document/update/status/${
              document._id
            }`,
            { statusApprove: "อนุมัติ" },
            {
              headers: {
                "auth-token": localStorage.getItem("token"),
              },
            }
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
            title: "อนุมัติเอกสารสำเร็จ",
          });

          this.fetchDocuments(); // รีเฟรชรายการเอกสาร'
          this.fetchApproveMe();
        } catch (error) {
          console.error("Error updating document:", error);
        }
      }
    },

    async ConfirmNotApprove(document) {
      const result = await Swal.fire({
        title: "ยืนยันการไม่อนุมัติ",
        text: "คุณต้องการที่จะไม่อนุมัติเอกสารนี้หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, ไม่อนุมัติ!",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        // หากผู้ใช้ยืนยันการไม่อนุมัติ
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/document/update/status/${
              document._id
            }`,
            { statusApprove: "ไม่อนุมัติ" },
            {
              headers: {
                "auth-token": localStorage.getItem("token"),
              },
            }
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
            title: "ไม่อนุมัติเอกสารสำเร็จ",
          });

          this.fetchDocuments(); // รีเฟรชรายการเอกสาร'
          this.fetchApproveMe();
        } catch (error) {
          console.error("Error updating document:", error);
        }
      }
    },
    handleEditClick(document) {
      console.log("Document ID:", document._id); // Log the document ID
      this.EditModal = true; // Open the EditModal
      this.documentToEdit = document; // กำหนดค่า documentToEdit ด้วยข้อมูล document
    },
    async ConfirmEdit(document) {
      const result = await Swal.fire({
        title: "ยืนยันการส่งหมายเหตุ",
        text: "คุณต้องการที่จะให้แก้ไขเอกสารนี้หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, แก้ไขเอกสาร!",
        cancelButtonText: "ยกเลิก",
        customClass: {
          container: "swal2-popup-custom", // Custom class for Swal pop-ups
        },
      });

      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/document/update/status/${
              document._id
            }`,

            { statusApprove: "แก้ไข", remark: this.remark },
            {
              headers: {
                "auth-token": localStorage.getItem("token"),
              },
            }
          );

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
            title: "ส่งหมายเหตุเอกสารสำเร็จ",
          });

          this.fetchDocuments();
          this.fetchApproveMe();
          this.EditModal = false;
        } catch (error) {
          console.error("Error updating document:", error);
        }
      }
    },
    async showDocument(document) {
      this.selectedDocument = { ...document };
      this.isModalShow = true;
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
    // เพิ่มฟังก์ชั่น filterDocumentsByType()
    filterDocumentsByType(type) {
      // กำหนดเงื่อนไขในการกรองเอกสารตามประเภท
      if (type === "OT") {
        this.documents = this.documents.filter((doc) => doc.type === "OT");
      } else if (type === "Normal") {
        this.documents = this.documents.filter((doc) => doc.type === "Normal");
      } else {
        this.fetchDocuments(); // ดึงข้อมูลทั้งหมดในกรณีที่ไม่ได้เลือก OT หรือ Normal
      }
    },
    filteredDocumentsPrevPage() {
      if (this.filteredDocumentsCurrentPage > 1) {
        this.filteredDocumentsCurrentPage--;
        F;
      }
    },
    filteredDocumentsNextPage() {
      if (
        this.filteredDocumentsCurrentPage < this.filteredDocumentsTotalPages
      ) {
        this.filteredDocumentsCurrentPage++;
      }
    },
    filteredApprovePrevPage() {
      if (this.filteredApproveCurrentPage > 1) {
        this.filteredApproveCurrentPage--;
      }
    },
    filteredApproveNextPage() {
      if (this.filteredApproveCurrentPage < this.filteredApproveTotalPages) {
        this.filteredApproveCurrentPage++;
      }
    },
    filteredDocumentsChangePage(page) {
      this.filteredDocumentsCurrentPage = page;
    },
    filteredApproveChangePage(page) {
      this.filteredApproveCurrentPage = page;
    },
    GoBack() {
      window.history.back();
    },
    generatePDFOT(documents, ME) {
      console.log(document);
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
@import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

    body {
      font-family: "Sarabun", sans-serif;
      font-weight: 300;
      font-style: normal;
      font-size: 16px;
    }
  </style>
  <head>
    <h1 class="text-center mt-5">บันทึกข้อความ</h1>
  </head>
  <body>
    <div class="px-10 pb-5 mt-5">
      <div class="grid grid-col-2 gap-3">
        <div class="flex justify-start">
            บริษัท ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ จำกัด
        </div>
        <div class="flex justify-between">
           <div class="flex">
              ที่ ${documents.Document_id}/2565
            </div>
            <div class="flex mr-48">
              ${this.formatDate(documents.Doc_Date)}
            </div>
        </div>
        <div class="flex flex-row gap-3">
          <div class="flex">
              เรื่อง
          </div>
          <div class="felx">
              ${documents.Headers}
          </div>
        </div>
        <div class="w-full h-1 bg-black mt-3"></div>
        <div class="flex flex-row gap-3">
            <div class="flex">
              เรียน
            </div>
            <div class="flex">
              ${documents.To}
            </div>
        </div>
      </div>
      <div class="flex flex-row gap-2 mt-2">
          <ul class="list-none indent-14">
            <li>
              ${documents.Detail} ตั้งแต่เวลา ${this.formatTime(
        documents.Timein
      )} จนถึงเวลา ${this.formatTime(documents.Timeout)}
            </li>
          </ul>
      </div>
      <div class="grid grid-col-2">
        <div class="flex">
            <div class="flex ml-12">
              จึงเรียนมาเพื่อโปรดทราบและพิจารณาอนุมัติ
            </div>
        </div>
        <div class="flex justify-around  mt-2">
          <div class="flex flex-col gap-2 mt-6">
              <div class="flex">
                    ลงชื่อ ${ME.first_name} ${ME.last_name}
              </div>
              <div class="flex justify-center">
                    (${ME.name_title}${ME.first_name} ${ME.last_name})
              </div>
              <div class="flex justify-center">
                    ${ME.position}
              </div>
              <div class="flex">
                    วันที่ ${this.formatDate(documents.Doc_Date)}
              </div>
          </div>
          <div class="flex flex-col gap-2 mt-6">
              <div class="flex">
                    ลงชื่อ . . . . . . . . . . . . . . . . . .
              </div>
              <div class="flex justify-center">
                    (นางสาวสุภาพร ปารีเสน)
              </div>
              <div class="flex justify-center">
                    ผู้จัดการฝ่ายบัญชี
              </div>
              <div class="flex">
                    วันที่ . . . . . . . . . . . .
              </div>
          </div>
        </div>
        <div class="flex justify-around  mt-2">
          <div class="flex flex-col gap-2 mt-6">
              <div class="flex">
                    ลงชื่อ . . . . . . . . . . . . . . . . . .
              </div>
              <div class="flex justify-center">
                    (นางสาวสุภาพร ปารีเสน)
              </div>
              <div class="flex justify-center">
                    ผู้จัดการฝ่ายบัญชี
              </div>
              <div class="flex">
                    วันที่ . . . . . . . . . . . .
              </div>
          </div>
          <div class="flex flex-col gap-2 mt-6">
              <div class="flex">
                    ลงชื่อ . . . . . . . . . . . . . . . .
              </div>
              <div class="flex justify-center">
                    (นางสาวสุภาพร ปารีเสน)
              </div>
              <div class="flex justify-center">
                    ผู้จัดการฝ่ายบัญชี
              </div>
              <div class="flex">
                    วันที่ . . . . . . . . . . . .
              </div>
          </div>
        </div>
      </div>
    </div>
  </body>

    `;
      const pdf = html2pdf().set(opt).from(content).toPdf().get("pdf");
      pdf.output("dataurlnewwindow");
    },
    generatePDFNormal(documents, ME) {
      console.log(document);
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
@import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

    body {
      font-family: "Sarabun", sans-serif;
      font-weight: 300;
      font-style: normal;
      font-size: 16px;
    }
  </style>
  <head>
    <h1 class="text-center mt-5">บันทึกข้อความ</h1>
  </head>
  <body>
    <div class="px-10 pb-5 mt-5">
      <div class="grid grid-col-2 gap-3">
        <div class="flex justify-start">
            บริษัท ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ จำกัด
        </div>
        <div class="flex justify-between">
           <div class="flex">
              ที่ ${documents.Document_id}/2565
            </div>
            <div class="flex mr-48">
              ${this.formatDate(documents.Doc_Date)}
            </div>
        </div>
        <div class="flex flex-row gap-3">
          <div class="flex">
              เรื่อง
          </div>
          <div class="felx">
              ${documents.Headers}
          </div>
        </div>
        <div class="w-full h-1 bg-black mt-3"></div>
        <div class="flex flex-row gap-3">
            <div class="flex">
              เรียน
            </div>
            <div class="flex">
              ${documents.To}
            </div>
        </div>
      </div>
      <div class="flex flex-col gap-2 mt-2">
        <ul>
          <li class="indent-14">
            ${documents.Detail}
          </li>
        </ul>
      </div>
      <div class="grid grid-col-2">
        <div class="flex">
            <div class="flex ml-12">
              จึงเรียนมาเพื่อโปรดทราบและพิจารณาอนุมัติ
            </div>
        </div>
        <div class="flex justify-around  mt-2">
          <div class="flex flex-col gap-2 mt-6">
              <div class="flex">
                    ลงชื่อ ${ME.first_name} ${ME.last_name}
              </div>
              <div class="flex justify-center">
                    (${ME.name_title}${ME.first_name} ${ME.last_name})
              </div>
              <div class="flex justify-center">
                    ${ME.position}
              </div>
              <div class="flex">
                    วันที่ ${this.formatDate(documents.Doc_Date)}
              </div>
          </div>
          <div class="flex flex-col gap-2 mt-6">
              <div class="flex">
                    ลงชื่อ . . . . . . . . . . . . . . . . . .
              </div>
              <div class="flex justify-center">
                    (นางสาวสุภาพร ปารีเสน)
              </div>
              <div class="flex justify-center">
                    ผู้จัดการฝ่ายบัญชี
              </div>
              <div class="flex">
                    วันที่ . . . . . . . . . . . .
              </div>
          </div>
        </div>
        <div class="flex justify-around  mt-2">
          <div class="flex flex-col gap-2 mt-6">
              <div class="flex">
                    ลงชื่อ . . . . . . . . . . . . . . . . . .
              </div>
              <div class="flex justify-center">
                    (นางสาวสุภาพร ปารีเสน)
              </div>
              <div class="flex justify-center">
                    ผู้จัดการฝ่ายบัญชี
              </div>
              <div class="flex">
                    วันที่ . . . . . . . . . . . .
              </div>
          </div>
          <div class="flex flex-col gap-2 mt-6">
              <div class="flex">
                    ลงชื่อ . . . . . . . . . . . . . . . .
              </div>
              <div class="flex justify-center">
                    (นางสาวสุภาพร ปารีเสน)
              </div>
              <div class="flex justify-center">
                    ผู้จัดการฝ่ายบัญชี
              </div>
              <div class="flex">
                    วันที่ . . . . . . . . . . . .
              </div>
          </div>
        </div>
      </div>
    </div>
  </body>

    `;
      const pdf = html2pdf().set(opt).from(content).toPdf().get("pdf");
      pdf.output("dataurlnewwindow");
    },
  },
};
</script>
<style>
.swal2-popup-custom {
  z-index: 9999; /* Ensures Swal pop-ups appear above most other elements */
}
.p-image-preview {
  width: 30rem;
}
</style>
