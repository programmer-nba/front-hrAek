<template>
  <section class="bg-[#EAFDFC] p-3 sm:p-5 antialiased h-screen">
    <div class="mx-auto max-w-screen-2xl px-4 lg:px-12">
      <div
        class="bg-white dark:bg-slate-700 relative shadow-md sm:rounded-lg overflow-hidden"
      >
        <div
          class="flex mt-[60px] h-[90px] justify-center items-center text-center text-[20px] sm:text-2xl font-bold text-blue-700 mb-4"
        >
          เพิ่มบันทึกการลา
        </div>

        <div
          class="flex flex-col sm:flex-row justify-center items-center gap-2 mb-4"
        >
          <div class="flex flex-col sm:flex-row items-center gap-2">
            <div class="text-[15px] sm:text-xl font-bold">ค้นหา</div>
            <InputText
              v-model="searchLeave"
              class="sm:px-3 sm:py-[12px] sm:border-2 sm:text-[15px] border-blue-500 px-1 py-[5px] text-[12px] border-[1px]"
              placeholder="ค้นหา"
              @keyup="searchData"
            />
            <div class="text-[15px] sm:text-xl font-bold">ประเภท</div>
            <Dropdown
              v-model="typeselect"
              :options="leavetype"
              optionLabel="leavetype_name"
              optionValue="leavetype_name"
              placeholder="เลือกประเภท"
              class="min-w-[155px] h-[25px] items-center text-[12px] border-[1px] sm:border-2 sm:h-[45px] border-blue-500"
              @change="searchData"
            />
          </div>
          <div
            class="flex flex-row items-center justify-around w-[200px] mt-[20px] sm:mt-0"
          >
            <ButtonP
              @click="cleanSearch"
              icon="pi pi-replay"
              class="w-[30px] h-[25px] py-[14px] bg-blue-500 hover:bg-blue-700 text-white rounded-full sm:w-[40px] sm:h-[40px]"
            />
            <ButtonP
              @click="openLeave = true"
              label="เพิ่มใบลา"
              class="h-[35px] px-3 py-[12px] bg-blue-500 hover:bg-blue-700 text-white rounded sm:h-[40px]"
            />
          </div>
        </div>
        <div class="overflow-x-auto">
          <table
            class="min-w-[1000px] sm:w-full text-sm text-left text-gray-500"
          >
            <thead class="text-lg text-black uppercase bg-blue-700">
              <tr class="text-center bg-sky-300">
                <th class="px-2 py-3 text-center">ลำดับ</th>
                <th class="px-2 py-3 text-center">ประเภท</th>
                <th class="px-2 py-3 text-center">เรื่อง</th>
                <th class="px-2 py-3 text-center">วันที่</th>
                <th class="px-2 py-3 text-center">สถานะ</th>
                <th class="px-2 py-3 text-center">รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in paginated" :key="index">
                <td class="p-2 text-center">{{ index + 1 }}</td>
                <td class="p-2 text-center">{{ item.leave_type }}</td>
                <td class="p-2 text-center">{{ item.leave_head }}</td>
                <td class="p-2 text-center">
                  <div>{{ formatDate(item.date_start_leave) }}-</div>
                  <div>{{ formatDate(item.date_end_leave) }}</div>
                </td>
                <td class="p-2 text-center">
                  <button
                    @click="
                      buttonStatus(
                        item.status_detail[
                          getLastindexOnStatus(item.status_detail)
                        ].status,
                        index
                      )
                    "
                    class="py-1 rounded-[10px]"
                    :class="{
                      'bg-red-300 px-[20px] hover:bg-red-400 transition-all':
                        item.status_detail[
                          getLastindexOnStatus(item.status_detail)
                        ].status === 'ไม่อนุมัติ',
                      'bg-green-300 px-[25px] hover:bg-green-400 transition-all':
                        item.status_detail[
                          getLastindexOnStatus(item.status_detail)
                        ].status === 'อนุมัติ',
                      'bg-yellow-300 px-[28px] hover:bg-yellow-400 transition-all':
                        item.status_detail[
                          getLastindexOnStatus(item.status_detail)
                        ].status === 'แก้ไข',
                      'bg-gray-300 px-[20px] hover:bg-gray-400 transition-all':
                        item.status_detail[
                          getLastindexOnStatus(item.status_detail)
                        ].status === 'ยื่นคำขอ',
                      'bg-gray-300 px-[15px] hover:bg-gray-400 transition-all':
                        item.status_detail[
                          getLastindexOnStatus(item.status_detail)
                        ].status === 'ผู้ยื่นคำขอทำการแก้ไข',
                    }"
                  >
                    {{
                      item.status_detail[
                        getLastindexOnStatus(item.status_detail)
                      ].status
                    }}
                  </button>
                </td>
                <td class="p-2 text-center">
                  <ButtonP
                    @click="viewLeave(item)"
                    label="ดูรายละเอียด"
                    class="px-3 py-2 rounded text-white bg-blue-500 hover:bg-blue-700"
                  />
                </td>
              </tr>
              <tr v-if="paginated.length === 0">
                <td colspan="6" class="py-4 px-2 text-center">ไมมีข้อมูล</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-center my-4">
          <ButtonP
            @click="currentPage = 1"
            :disabled="currentPage < 2"
            icon="pi pi-angle-double-left"
            class="px-4 py-2 text-white border bg-sky-500 hover:bg-sky-700 rounded"
          />
          <ButtonP
            @click="currentPage--"
            :disabled="currentPage < 2"
            icon="pi pi-angle-left"
            class="px-4 py-2 text-white border bg-sky-500 hover:bg-sky-700 rounded"
          />
          <div class="px-2 py-2 text-white border bg-sky-500 rounded">
            หน้า {{ currentPage }}/{{ totalPages || 1 }}
          </div>
          <ButtonP
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            icon="pi pi-angle-right"
            class="px-4 py-2 text-white border bg-sky-500 hover:bg-sky-700 rounded"
          />
          <ButtonP
            @click="currentPage = totalPages"
            :disabled="currentPage === totalPages"
            icon="pi pi-angle-double-right"
            class="px-4 py-2 text-white border bg-sky-500 hover:bg-sky-700 rounded"
          />
        </div>
        <!-- remark Dailog -->
        <Dialog
          v-model:visible="remarkDialogView"
          class="w-[90%] sm:w-[600px]"
          modal
          header="เหตุผล"
        >
          <div class="flex justify-center w-full">
            <div class="flex w-full text-start bg-gray-200 p-4 rounded-[15px]">
              <p>{{ formatString(remarkDetail) }}</p>
            </div>
          </div>
          <div
            v-if="correctButton === true"
            class="flex justify-center items-center mt-4"
          >
            <button
              @click="correctFromView = true"
              class="px-4 py-2 rounded-[15px] bg-yellow-300 hover:bg-yellow-400 transition-all"
            >
              แก้ไขคำขอ
            </button>
          </div>
        </Dialog>
        <!-- Dialog แก้ไขคำขอลา -->
        <Dialog
          v-model:visible="correctFromView"
          class="w-[90%] sm:w-[600px]"
          modal
          header="แก้ไขใบคำขอ"
          @hide="resetValue"
        >
          <div class="flex flex-col">
            <!-- {{ console.log(leavetype) }} -->
            <div>
              <div class="px-2 flex flex-col justify-center gap-2">
                <div class="text-xl font-bold">หัวเรื่อง</div>
                <p class="pl-3 text-[20px]">{{ oldHeader.header }}</p>
                <div class="text-xl font-bold">วันที่-ถึง</div>
                <CalendarP
                  v-model="editLeaveData.date"
                  placeholder="วันที่"
                  dateFormat="dd/mm/yy"
                  selectionMode="range"
                  class="px-3 py-[12px] border-2 border-blue-500 rounded mb-1"
                />

                <div v-if="isSingleDay" class="text-xl font-bold">เวลา</div>
                <div v-if="isSingleDay" class="flex items-center gap-2">
                  <Checkbox
                    v-model="editLeaveData.fullday"
                    class="border-2 border-blue-500 text-blue-500 rounded-lg mb-1"
                    binary
                  />
                  <div>ทั้งวัน</div>
                </div>
                <div
                  v-if="isSingleDay && !editLeaveData.fullday"
                  class="flex items-center gap-2"
                >
                  <CalendarP
                    v-model="editLeaveData.time1"
                    placeholder="เวลา"
                    timeOnly
                    class="w-28 px-3 py-[12px] border-2 border-blue-500 rounded mb-1"
                  />
                  <a>ถึง</a>
                  <CalendarP
                    v-model="editLeaveData.time2"
                    placeholder="เวลา"
                    timeOnly
                    class="w-28 px-3 py-[12px] border-2 border-blue-500 rounded mb-1"
                  />
                </div>

                <div class="text-xl font-bold">แนบเอกสาร</div>
                <div class="flex flex-col gap-2">
                  <div
                    v-for="(file, index) in selectedFiles"
                    :key="index"
                    class="flex items-center gap-2"
                  >
                    <input
                      type="file"
                      :id="`fileInput-${index}`"
                      @change="handleFileUpload(index, $event)"
                      class="hidden"
                    />
                    <!-- //แสดงไฟล์ที่แนบมา -->
                    <label
                      :for="`fileInput-${index}`"
                      class="px-3 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded cursor-pointer"
                    >
                      เลือกไฟล์
                    </label>
                    <div v-if="file" class="break-words w-44">
                      {{ file.name }}
                    </div>
                    <button
                      @click="removeFileInput(index)"
                      class="px-3 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
                    >
                      ลบไฟล์
                    </button>
                  </div>
                  {{ console.log(selectedFiles.length) }}
                  <button
                    v-if="selectedFiles.length < 1"
                    @click="addFileInput"
                    class="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    เพิ่มไฟล์
                  </button>
                </div>

                <div class="text-xl font-bold">รายละเอียด</div>
                <div class="flex justify-center">
                  <Editor
                    editorStyle="height: 320px"
                    v-model="editLeaveData.details"
                    class="p-2 w-96 text-lg text-gray-900 bg-gray-50 rounded-lg border-2 border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ใส่รายละเอียดตรงนี้"
                  />
                </div>
              </div>
            </div>
            <!-- <div v-if="leaveCreate === 'ลาคลอด'">hhh</div>
        <div v-if="leaveCreate === 'ลากิจ'">dddd</div> -->
          </div>
          <template #footer>
            <div class="w-full flex flex-row justify-center gap-2 mt-[15px]">
              <ButtonP
                @click="putEditLeave(oldHeader.id)"
                icon="pi pi-send"
                label="แก้ไข"
                class="w-[30%] h-[30px] px-1 sm:px-4 sm:py-3 rounded text-white bg-green-500 hover:bg-green-700"
              />
              <ButtonP
                @click="correctFromView = false"
                label="ยกเลิก"
                class="w-[30%] h-[30px] px-2 sm:px-4 sm:py-3 rounded text-white bg-red-500 hover:bg-red-700"
              />
            </div>
          </template>
        </Dialog>

        <Dialog
          v-model:visible="openLeave"
          class="w-[90%] sm:w-[600px]"
          modal
          header="เพิ่มบันทึกการลา"
          @hide="resetValue"
        >
          <div class="flex flex-col">
            <!-- {{ console.log(leavetype) }} -->
            <div class="flex justify-center mb-3">
              <ButtonGroup class="bg-violet-500 text-white rounded">
                <ButtonP
                  v-for="(item, i) in leavetype"
                  :key="i"
                  @click="leaveCreate = item.leavetype_name"
                  class="px-3 py-3 hover:bg-violet-700 rounded"
                  :class="
                    leaveCreate === item.leavetype_name ? 'bg-violet-700' : ''
                  "
                  :label="item.leavetype_name"
                />
              </ButtonGroup>
            </div>
            <div>
              <div class="px-2 flex flex-col justify-center gap-2">
                <!-- {{ leaveData.title }} -->
                <div class="text-xl font-bold">หัวเรื่อง</div>
                <InputText
                  v-model="leaveData.leave_head"
                  placeholder="เพิ่มหัวเรื่อง"
                  class="px-3 py-[12px] border-2 border-blue-500 mb-1"
                />
                <div class="text-xl font-bold">วันที่-ถึง</div>
                <CalendarP
                  v-model="leaveData.date"
                  placeholder="วันที่"
                  dateFormat="dd/mm/yy"
                  selectionMode="range"
                  class="px-3 py-[12px] border-2 border-blue-500 rounded mb-1"
                />

                <div v-if="isSingleDay" class="text-xl font-bold">เวลา</div>
                <div v-if="isSingleDay" class="flex items-center gap-2">
                  <Checkbox
                    v-model="leaveData.fullday"
                    class="border-2 border-blue-500 text-blue-500 rounded-lg mb-1"
                    binary
                  />
                  <div>ทั้งวัน</div>
                </div>
                <div
                  v-if="isSingleDay && !leaveData.fullday"
                  class="flex items-center gap-2"
                >
                  <CalendarP
                    v-model="leaveData.time1"
                    placeholder="เวลา"
                    timeOnly
                    class="w-28 px-3 py-[12px] border-2 border-blue-500 rounded mb-1"
                  />
                  <a>ถึง</a>
                  <CalendarP
                    v-model="leaveData.time2"
                    placeholder="เวลา"
                    timeOnly
                    class="w-28 px-3 py-[12px] border-2 border-blue-500 rounded mb-1"
                  />
                </div>

                <div class="text-xl font-bold">แนบเอกสาร</div>
                <div class="flex flex-col gap-2">
                  <div
                    v-for="(file, index) in selectedFiles"
                    :key="index"
                    class="flex items-center gap-2"
                  >
                    <input
                      type="file"
                      :id="`fileInput-${index}`"
                      @change="handleFileUpload(index, $event)"
                      class="hidden"
                    />
                    <!-- //แสดงไฟล์ที่แนบมา -->
                    <label
                      :for="`fileInput-${index}`"
                      class="px-3 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded cursor-pointer"
                    >
                      เลือกไฟล์
                    </label>
                    <div v-if="file" class="break-words w-44">
                      {{ file.name }}
                    </div>
                    <button
                      @click="removeFileInput(index)"
                      class="px-3 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
                    >
                      ลบไฟล์
                    </button>
                  </div>
                  {{ console.log(selectedFiles.length) }}
                  <button
                    v-if="selectedFiles.length < 1"
                    @click="addFileInput"
                    class="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    เพิ่มไฟล์
                  </button>
                </div>

                <div class="text-xl font-bold">รายละเอียด</div>
                <div class="flex justify-center">
                  <Editor
                    editorStyle="height: 320px"
                    v-model="leaveData.details"
                    class="p-2 w-96 text-lg text-gray-900 bg-gray-50 rounded-lg border-2 border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ใส่รายละเอียดตรงนี้"
                  />
                </div>
              </div>
            </div>
            <!-- <div v-if="leaveCreate === 'ลาคลอด'">hhh</div>
        <div v-if="leaveCreate === 'ลากิจ'">dddd</div> -->
          </div>
          <template #footer>
            <div
              class="w-full flex flex-row justify-center sm:justify-end gap-2 mt-[15px]"
            >
              <ButtonP
                label="บันทึก"
                icon="pi pi-file"
                class="w-[30%] h-[30px] px-2 sm:px-4 sm:py-3 rounded text-white bg-sky-500 hover:bg-sky-700"
              />
              <ButtonP
                @click="addLeave"
                icon="pi pi-send"
                label="ส่งใบลา"
                class="w-[30%] h-[30px] px-1 sm:px-4 sm:py-3 rounded text-white bg-green-500 hover:bg-green-700"
              />
              <ButtonP
                @click="openLeave = false"
                label="ยกเลิก"
                class="w-[30%] h-[30px] px-2 sm:px-4 sm:py-3 rounded text-white bg-red-500 hover:bg-red-700"
              />
            </div>
          </template>
        </Dialog>

        <Dialog
          v-model:visible="openDetail"
          header="รายละเอียดบันทึกการลา"
          modal
          @hide="resetValue"
        >
          {{ console.log("leaveData", leaveData) }}
          <div class="px-2 w-full">
            <div class="mb-2">
              <span class="font-bold">ประเภท:</span>
              {{ leaveData.leave_type }}
            </div>
            <div class="mb-2">
              <span class="font-bold">หัวเรื่อง:</span>
              {{ leaveData.leave_head }}
            </div>
            <div class="mb-2">
              <span class="font-bold">ลาวันที่:</span>
              {{ formatDate(leaveData.date_start_leave) }}
            </div>
            <div class="mb-2">
              <span class="font-bold">ถึงวันที่:</span>
              {{ formatDate(leaveData.date_end_leave) }}
            </div>
            <div class="mb-2">
              <span class="font-bold">สถานะ:</span>
              {{
                leaveData.status_detail[leaveData.status_detail.length - 1]
                  .status
              }}
            </div>
            <div class="mb-2">
              <span class="font-bold">รายละเอียด:</span>
              <div v-html="leaveData.details"></div>
            </div>
          </div>
          <template #footer>
            <div class="w-full flex justify-end gap-2">
              <ButtonP
                @click="openDetail = false"
                label="ปิด"
                class="px-3 py-2 rounded text-white bg-gray-500 hover:bg-gray-700"
              />
            </div>
          </template>
        </Dialog>
        <div v-if="isloading" class="loader-container">
          <div class="loader"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

onMounted(async () => {
  await getMe();
  getLeaveType();
  getAllLeave();
  statusDetail();
});
const isloading = ref(false);
const leaveData = ref({}); //  เก็บข้อมูล
const selectedFiles = ref([]); //  เก็บข้อมูลไฟล์ที่เลือก

const itemMe = ref([]);

const getMe = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/getme`,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    itemMe.value = res.data.data;
    console.log("itemMe.value", itemMe.value);
  } catch (e) {
    console.log(e);
  }
};

const itemLeave = ref([]);
const itemLeaveOrigin = ref([]);
const getAllLeave = async () => {
  try {
    isloading.value = true;
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/leave/getall`,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const getdata = res.data.data.slice().reverse();
    itemLeave.value = getdata.filter(
      (item) => item.employees_id === itemMe.value._id
    );

    itemLeaveOrigin.value = getdata.filter(
      (item) => item.employees_id === itemMe.value._id
    );

    searchData();
    // console.log("itemLeave", getdata);
    // console.log("test", leaveData.value);
    // console.log(paginated.value[3].status_detail.length)
    // console.log("LogTest", paginated.value[3]);
    //loghere
    isloading.value = false;
  } catch (e) {
    console.log(e.message);
    if (e.message === "Request failed with status code 400") {
      Swal.fire({
        icon: "warning",
        text: "ไม่พบข้อมูลใบลา",
        timer: 1500,
        showConfirmButton: false,
      });
      isloading.value = false;
    }
  }
};
const currentPage = ref(1);
const itemsPerPage = 10;
const paginated = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return itemLeave.value.slice(startIndex, endIndex);
});
const totalPages = computed(() =>
  Math.ceil(itemLeave.value.length / itemsPerPage)
);

const leavetype = ref([]);
const getLeaveType = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/leavetype/getall`,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    leavetype.value = res.data.data;
  } catch (e) {
    console.error(e);
  }
};

const openDetail = ref(false);
const viewLeave = (item) => {
  leaveData.value = item;
  openDetail.value = true;
};

const isSingleDay = computed(() => {
  if (leaveData.value.date && leaveData.value.date.length === 2) {
    const startDate = leaveData.value.date?.[0]?.getTime(); //  ใช้  optional chaining
    const endDate = leaveData.value.date?.[1]?.getTime(); //  ใช้  optional chaining
    return startDate === endDate;
  }
  if (editLeaveData.value.date && editLeaveData.value.date.length === 2) {
    const startDate = editLeaveData.value.date?.[0]?.getTime(); //  ใช้  optional chaining
    const endDate = editLeaveData.value.date?.[1]?.getTime(); //  ใช้  optional chaining
    return startDate === endDate;
  }
  return false;
});

const openLeave = ref(false);
const leaveCreate = ref("ลากิจ");
const addFileInput = () => {
  selectedFiles.value.push(null); //  เพิ่ม  null  เข้าไปใน  array  เพื่อสร้าง  input  ใหม่
};
const handleFileUpload = (index, event) => {
  selectedFiles.value[index] = event.target.files[0]; //  บันทึกไฟล์ที่เลือก
};
const removeFileInput = (index) => {
  selectedFiles.value.splice(index, 1); // ลบไฟล์ที่ index
};
const convertString = (item) => {
  return JSON.stringify(item);
};
const addLeave = async () => {
  try {
    const data = {
      // Employees_id: itemMe.value._id,
      type_name: "บันทึกข้อความการลา",
      leave_type: leaveCreate.value,
      leave_head: leaveData.value.leave_head || "",
      details: leaveData.value.details || "",
      date_start_leave:
        leaveData.value.date && leaveData.value.date.length > 0
          ? convertDateToISO(leaveData.value.date[0])
          : "",
      date_end_leave:
        leaveData.value.date && leaveData.value.date.length > 1
          ? convertDateToISO(leaveData.value.date[1])
          : "",
      contact: itemMe.value.address,
      tel: itemMe.value.tel,
      picture: selectedFiles.value,
    };

    if (
      !data.leave_head ||
      !data.details ||
      !data.date_start_leave ||
      !data.date_end_leave
    ) {
      Swal.fire({
        icon: "warning",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    // console.log(data);
    // return;
    const check = await Swal.fire({
      text: "คุณต้องการส่งใบลาหรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    });
    if (!check.isConfirmed) return;

    const response = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/leave/insert`,
      data,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);
    Swal.fire({
      icon: "success",
      text: "ส่งใบลาสำเร็จ",
      timer: 1500,
      showConfirmButton: false,
    });
    openLeave.value = false;
    getAllLeave();

    // console.log(data);
    // console.log(leaveData.value);
    // console.log(selectedFiles.value);
  } catch (e) {
    console.log(e);
  }
};

const typeselect = ref("");
const searchLeave = ref("");
const searchData = () => {
  let fildata = itemLeaveOrigin.value;

  if (searchLeave.value) {
    fildata = fildata.filter((item) => item.leave_head);
    console.log("true", fildata);
    // fildata = fildata.filter(
    //   (item) =>
    //     item.leave_head
    //       .toLowerCase()
    //       .includes(searchLeave.value.toLowerCase()) ||
    //     item.details.toLowerCase().includes(searchLeave.value.toLowerCase()) ||
    //     item.leave_type.toLowerCase().includes(searchLeave.value.toLowerCase())
    // );
  }

  if (typeselect.value) {
    fildata = fildata.filter((item) => item.leave_type === typeselect.value);
  }

  itemLeave.value = fildata;
};

const remarkDialogView = ref(false);
const remarkDetail = ref("");
const oldHeader = ref({});
const editLeaveData = ref({});
const correctButton = ref(false);
const correctFromView = ref(false);

const putEditLeave = async (id) => {
  try {
    const editData = {
      details: editLeaveData.value.details || "",
      date_start_leave:
        editLeaveData.value.date && editLeaveData.value.date.length > 0
          ? convertDateToISO(editLeaveData.value.date[0])
          : "",
      date_end_leave:
        editLeaveData.value.date && editLeaveData.value.date.length > 1
          ? convertDateToISO(editLeaveData.value.date[1])
          : "",
      contact: itemMe.value.address,
      tel: itemMe.value.tel,
      picture: "selectedFiles.value",
    };
    if (!editData.details) {
      editData.details = oldHeader.value.detail;
    }
    if (!editData.date_start_leave) {
      editData.date_start_leave = oldHeader.value.start_Leave;
    }
    if (!editData.date_end_leave) {
      editData.date_end_leave = oldHeader.value.end_leave;
    }

    const res = await axios.put(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/leave/update/leave/${id}`,
      editData,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    getAllLeave();

    Swal.fire({
      icon: "success",
      text: "แก้ไขข้อมูลสำเร็จ",
      timer: 1500,
      showConfirmButton: false,
    });
    correctFromView.value = false;
    remarkDialogView.value = false;
  } catch (e) {
    console.error(e);
  }
};

const buttonStatus = (status, num) => {
  if (status === "ผู้ยื่นคำขอทำการแก้ไข") {
    Swal.fire({
      icon: "success",
      text: "คุณได้ยื่นแก้ไขรายการนี้เรียบร้อยแล้ว",
      timer: 1000,
      showConfirmButton: false,
    });
  }
  if (status === "อนุมัติ") {
    Swal.fire({
      icon: "success",
      text: "คุณได้รับการอนุมัติในรายการนี้เรียบร้อยแล้ว",
      timer: 1000,
      showConfirmButton: false,
    });
  }
  if (status === "ไม่อนุมัติ") {
    Swal.fire({
      icon: "error",
      text: "คุณไม่ได้รับการอนุมัติในรายการนี้",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.close) {
        remarkDialogView.value = true;
        correctButton.value = false;
      }
    });
  }
  if (status === "แก้ไข") {
    Swal.fire({
      icon: "warning",
      text: "กรุณาแก้ไขคำขอ",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.close) {
        correctButton.value = true;
        remarkDialogView.value = true;
      }
    });
  }
  if (status === "ยื่นคำขอ") {
    Swal.fire({
      icon: "success",
      text: "คุณได้ยื่นคำขอเรียบร้อบแล้ว",
      timer: 1000,
      showConfirmButton: false,
    });
  }

  remarkDetail.value =
    paginated.value[num].status_detail[
      getLastindexOnStatus(paginated.value[num].status_detail)
    ].remark;
  oldHeader.value = {
    detail: paginated.value[num].detail,
    header: paginated.value[num].leave_head,
    start_Leave: paginated.value[num].date_start_leave,
    end_leave: paginated.value[num].date_end_leave,
    detail: paginated.value[num].details,
    id: paginated.value[num]._id,
  };
  editLeaveData.value.details = oldHeader.value.detail;
  editLeaveData.value.date = `${new Date(
    oldHeader.value.start_Leave
  ).toLocaleDateString("th-TH")}- ${new Date(
    oldHeader.value.end_leave
  ).toLocaleDateString("th-TH")}`;
  // console.log(oldHeader.value);
};

const getLastindexOnStatus = (item) => {
  let status_detail = item.length - 1;
  return status_detail;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formattedTime = (date) => {
  return date.toLocaleTimeString("th-TH", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
const formatString = (inputString) => {
  inputString = inputString.trim();
  let formattedString = "";
  let currentIndex = 0;

  while (currentIndex < inputString.length) {
    let endIndex = currentIndex + 50;

    let line = inputString.substring(currentIndex, endIndex);

    formattedString += line + "\n";

    currentIndex = endIndex;
  }

  return formattedString.trim();
};

const resetValue = () => {
  leaveData.value = {};
  selectedFiles.value = [];
};
const cleanSearch = () => {
  typeselect.value = typeselect.value;
  searchLeave.value = "";
  searchData();
};

function convertDateToISO(dateString) {
  // แปลง string เป็น Date object
  const date = new Date(dateString);
  // สร้างรูปแบบ ISO 8601
  const isoDate = date.toISOString();
  return isoDate;
}
</script>

<style scope>
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid rgb(255, 255, 255);
  padding: 8px;
}

.p-checkbox {
  width: auto;
  height: auto;
}
/* .p-inputtext.p-component {
  width: 100%;
} */
</style>
