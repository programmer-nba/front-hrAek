<template>
  <!-- head Section HeaderTitle, SearchFeild -->
  <section id="Title" class="text-center text-[35px] my-4 dark:text-white">
    <h1>คำขอลาหยุด</h1>

    <!-- search feild -->
    <div class="w-full flex flex-row items-center justify-center gap-10">
      <InputText
        v-model="titleSearch"
        class="border-gray-300 border-1 px-3 text-[20px] h-[42px]"
        placeholder="ค้นหา"
        @update:modelValue="findByTitle"
      />
      <Dropdown
        v-model="typeselect"
        :options="leavesType"
        optionLabel="leavetype_name"
        optionValue="leavetype_name"
        placeholder="เลือกประเภท"
        @change="findByType"
        class="border-gray-300 border-1"
      />

      <button
        class="border-gray-300 border-1 px-3 text-[20px] h-[42px] rounded-[10px] hover:bg-gray-200 transition-all"
        @click="findAllType"
      >
        ดูทุกประเภท
      </button>
    </div>
  </section>

  <!--section main table -->
  <section class="flex justify-center w-full">
    <!-- table area -->
    <div
      class="w-[1200px] bg-white relative shadow-md sm:rounded-lg overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="min-w-[1000px] sm:w-full text-sm text-left text-gray-500">
          <thead class="text-lg text-black uppercase bg-gray-700">
            <tr class="text-center bg-gray-300">
              <th
                v-for="title in headTable"
                :key="title.title"
                class="border border-white px-2 py-3 text-center"
              >
                {{ title.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(showItem, index) in showItems"
              :key="index"
              class="text-center bg-gray-100text-[20px] border"
            >
              <th class="py-3 text-[18px] border border-gray-300">
                {{ fristCountInPage + (index + 1) }}
              </th>
              <th class="py-3 text-[18px] border border-gray-300">
                {{ showItem.leave_type }}
              </th>
              <th class="py-3 text-[18px] border border-gray-300">
                {{ showItem.leave_head }}
              </th>
              <th class="py-3 text-[18px] border border-gray-300">
                {{ formatDate(showItem.createdAt) }}
              </th>
              <th class="py-3 text-[18px] border border-gray-300">
                {{ showItem.status_document }}
              </th>
              <th>
                <button
                  class="bg-green-300 px-4 py-2 rounded-[15px] hover:bg-green-200 hover:text-gray-700 transition-all active:bg-green-300"
                  @click="viewLeaveDetail(showItem)"
                >
                  ดูรายละเอียด
                </button>
              </th>
            </tr>
            <tr v-if="leavesItem.length === 0">
              <td colspan="6" class="py-4 px-2 text-center">ไมมีข้อมูล</td>
            </tr>
          </tbody>
        </table>
        <!-- Dialog for VeiwDetail -->
        <Dialog
          v-model:visible="leaveDetailDL"
          class="w-[90%] sm:w-[600px]"
          modal
          header="ลายละเอียดการลา"
        >
          <div>
            <div class="flex flex-col items-start">
              <ul class="pl-3">
                <li class="grid grid-cols-3">
                  <p>หัวเรื่อง</p>
                  <p class="col-span-2">: {{ detailData.leave_head }}</p>
                </li>
                <li class="grid grid-cols-3">
                  <p>ประเภท</p>
                  <p class="col-span-2">: {{ detailData.leave_type }}</p>
                </li>
                <li class="grid grid-cols-3">
                  <p>ลาวันที่ - ถึง</p>
                  <p class="col-span-2">
                    : {{ formatDate(detailData.date_start_leave) }} -
                    {{ formatDate(detailData.date_end_leave) }}
                  </p>
                </li>
              </ul>
              <p class="self-center text-[20px]">รายละเอียด</p>
              <div
                v-html="detailData.details"
                class="w-[90%] px-3 py-3 self-center bg-gray-200 text-start rounded-[15px]"
              ></div>
            </div>
            <div class="flex flex-row w-full justify-around mt-4">
              <button
                @click="addRemark(detailData._id, 'ไม่อนุมัติ')"
                class="bg-red-400 px-3 py-2 w-[150px] h-[45px] rounded-[15px] text-gray-100 hover:bg-red-300 hover:text-gray-700 transition-all active:bg-red-400"
              >
                {{ interacRequestType[0].put }}
              </button>
              <button
                @click="addRemark(detailData._id, 'แก้ไข')"
                class="bg-yellow-400 px-3 py-2 w-[150px] h-[45px] rounded-[15px] text-gray-100 hover:bg-yellow-300 hover:text-gray-700 transition-all active:bg-yellow-400"
              >
                {{ interacRequestType[1].put }}
              </button>
              <button
                @click="interacRequest(detailData._id, 'อนุมัติ')"
                class="bg-green-400 px-3 py-2 w-[150px] h-[45px] rounded-[15px] text-gray-600 hover:bg-green-300 hover:text-gray-500 transition-all active:bg-red-400"
              >
                {{ interacRequestType[2].put }}
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  </section>
  <!-- section ของปุ่มเปลี่ยนหน้า -->
  <section>
    <div class="flex flex-row w-full gap-2 justify-center my-4">
      <button
        @click="backToFristPage(fristPage)"
        class="bg-gray-200 px-2 rounded-[10px] hover:bg-gray-400 transition-all"
      >
        &#10094; &#10094;
      </button>
      <button
        @click="backPage(fristPage)"
        class="bg-gray-200 px-2 rounded-[10px] hover:bg-gray-400 transition-all"
      >
        &#10094;
      </button>
      <div class="bg-gray-200 px-4 py-1 rounded-[10px]">
        {{ currentPage }} / {{ lastPage }}
      </div>
      <button
        @click="nextPage(lastPage)"
        class="bg-gray-200 px-2 rounded-[10px] hover:bg-gray-400 transition-all"
      >
        &#x276F;
      </button>
      <button
        @click="skipTolastPage(lastPage)"
        class="bg-gray-200 px-2 rounded-[10px] hover:bg-gray-400 transition-all"
      >
        &#x276F;&#x276F;
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

// API Variable
const leavesType = ref([]);
const leavesItem = ref([]);

// Check Dialog Variable
const leaveDetailDL = ref(false);
const detailData = ref([]); //เก็บข้อมูลเพื่อแสดงใน detailDialog

// variable for find data
const leavesSearch = ref([]); // เก็บข้อมูลเพื่อใช้ในการค้นหา
const typeselect = ref("");
const titleSearch = ref("");

//calculate Variable
const fristPage = ref(1);
const currentPage = ref(0);
const lastPage = ref(0);
const itemPerpage = 10;
const showItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemPerpage;
  const lastIndex = startIndex + itemPerpage;
  return leavesItem.value.slice(startIndex, lastIndex);
});
const fristCountInPage = computed(() => {
  return (currentPage.value - 1) * itemPerpage;
});

const viewLeaveDetail = (item) => {
  detailData.value = item;
  leaveDetailDL.value = true;
};

onMounted(() => {
  getLeaveType();
  getLeaveItem();
  setCurrentPage();
  // interacRequest("667f78a6730be3bc5ae1daf2", "ไม่อนุมัติ");
});

const headTable = ref([
  { title: "ลำดับ" },
  { title: "ประเภท" },
  { title: "เรื่อง" },
  { title: "วันที่ส่งคำขอ" },
  { title: "สถานะ" },
  { title: "รายละเอียด" },
]);
const interacRequestType = ref([
  { put: "ไม่อนุมัติ" },
  { put: "แก้ไข" },
  { put: "อนุมัติ" },
]);

// get api leaveType
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
    leavesType.value = res.data.data;
  } catch (e) {
    console.log(e.res.data);
  }
};
// get api allleaveItem

const getLeaveItem = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/leave/get/role/position`,
      null,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    leavesItem.value = res.data.data;
    leavesSearch.value = res.data.data;

    findByType();
    //set Lastpage
    lastPage.value = Math.ceil(leavesItem.value.length / itemPerpage);
  } catch (e) {
    console.log("Error occurred:", e);
  }
};

//API put สถานะคำขอ
const interacRequest = async (id, interactype, remark) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/leave/update/${id}`,
      { statusApprove: interactype, remark: remark },
      {
        headers: {
          "auth-token": `${localStorage.getItem("token")}`,
        },
      }
    );
    Swal.fire({
      icon: "success",
      text: "อัพเดทข้อมูลสำเร็จ",
      timer: 1500,
      showConfirmButton: false,
    });
    getLeaveItem();
    leavesItem.value.splice();
    leaveDetailDL.value = false;
  } catch (e) {
    console.log("interacRequest", e);
    Swal.fire({
      icon: "error",
      text: "อัพเดทข้อมูลล้มเหลว",
      timer: 1500,
      showConfirmButton: false,
    });
  }
};
// หา ข้อมูลจาก datatype
const findByType = () => {
  if (typeselect.value) {
    leavesItem.value = leavesSearch.value.filter(
      (item) => item.leave_type === typeselect.value
    );
  }
};
//หาข้อมูลทุกประเถทการลา
const findAllType = () => {
  typeselect.value = "";
  getLeaveItem();
};
//หาข้อมูลจากหัวเรื่อง
const findByTitle = () => {
  let searchValue = [];
  if (titleSearch.value) {
    for (let i = 0; i < titleSearch.value.length; i++) {
      searchValue.push(titleSearch.value);
      leavesItem.value = leavesSearch.value.filter(
        (item) => item.leave_head.slice(0, i + 1) === searchValue[i]
      );
    }
  } else {
    getLeaveItem();
  }
};
//ใช้กด put สถาะคำขอ แต่จะเก็บข้อมูล remark ก่อนput
const addRemark = async (id, interactype) => {
  const { value: text } = await Swal.fire({
    input: "textarea",
    inputLabel: "เหตุผล",
    inputPlaceholder: "กรอกเหตุผล",
    inputAttributes: {
      "aria-label": "Type your message here",
    },
    showCancelButton: false,
  });
  if (!text) {
    Swal.fire({
      icon: "warning",
      text: "กรุณากรอกเหตุผล",
      timer: 1500,
      showConfirmButton: false,
    });
  }
  if (text) {
    interacRequest(id, interactype, text);
  }
};
//เปลี่ยนรูปแบบวันที่
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
//เปลี่ยนหน้าต่างไปหน้าถัดไป
const nextPage = (lastpage) => {
  if (currentPage.value === lastpage) {
    currentPage.value = lastPage.value;
  } else {
    currentPage.value++;
  }
};
//set currentPage
//set lastpage เกิดขึ้นใน Getleaveitem
const setCurrentPage = () => {
  currentPage.value = fristPage.value;
};

//ไปหน้าสุดท้าย
const skipTolastPage = (lastpage) => {
  currentPage.value = lastpage;
};
//ถอยหลังหนึงหน้า
const backPage = (firstpage) => {
  if (currentPage.value === firstpage) {
    currentPage.value = firstpage;
  } else {
    currentPage.value--;
  }
};
//ถอยกลับไปหน้าแรก
const backToFristPage = (firstpage) => {
  currentPage.value = firstpage;
};
</script>
<style scoped></style>
