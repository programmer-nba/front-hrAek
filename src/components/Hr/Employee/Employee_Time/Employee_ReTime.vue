<template>
  <div class="p-4 w-full h-screen overflow-auto bg-gray-100">
    <div class="text-4xl text-center">จัดการเวลางาน</div>
    <div class="my-4 flex justify-start items-center">
      <input
        v-model="search"
        placeholder="ค้นหา"
        class="px-2 h-10 border rounded hover:shadow-lg outline-none"
        @keyup="searchEmp"
      />
    </div>

    <div class="flex justify-center w-full rounded">
      <table>
        <thead>
          <tr class="text-center text-white bg-gray-900">
            <th class="p-4">ที่</th>
            <th class="p-4">รหัสพนักงาน</th>
            <th class="p-4">ชื่อ</th>
            <th class="p-4">วันที่</th>
            <th class="p-4">ช่วงเวลางาน</th>
            <th class="p-4">เนื่องจาก</th>
            <th class="p-4">เวลาที่ขอแก้ไข</th>
            <th class="p-4">สถานะ</th>
            <th class="p-4">จัดการ</th>
            <!-- <th class="p-3">สถานะ</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in paginated" :key="i">
            <td class="p-2">{{ i + 1 }}</td>
            <td class="p-2">
              <div>{{ item.employee_number }}</div>
            </td>
            <td class="p-2">
              <div>{{ item.firstname }} {{ item.lastname }}</div>
            </td>
            <td class="p-2">
              <div>{{ item.day }}/{{ item.mount }}/{{ item.year }}</div>
            </td>
            <td class="p-2">
              <div>{{ item.time_line }}</div>
            </td>
            <td class="p-2">
              <div>{{ item.remark }}</div>
            </td>
            <td class="p-2">
              <div>{{ item.time }}</div>
            </td>
            <td class="p-2 text-center">
              <div
                :class="
                  item.status === 'อนุมัติ'
                    ? 'px-2 py-1 bg-teal-200 rounded'
                    : 'px-2 py-1 bg-yellow-200 rounded'
                "
              >
                {{ item.status }}
              </div>
            </td>
            <!-- {{
              console.log(item)
            }} -->
            <td class="p-2">
              <div
                v-if="item.status === 'รออนุมัติ'"
                class="flex flex-wrap justify-center gap-2"
              >
                <ButtonP
                  label="อนุมัติ"
                  @click="editTime(1, item)"
                  class="px-3 py-2 bg-green-500 border-green-500 text-white border rounded hover:bg-green-700"
                />
                <ButtonP
                  label="ไม่อนุมัติ"
                  @click="confirm(2, item)"
                  class="px-3 py-2 bg-red-500 border-red-500 text-white border rounded hover:bg-red-700"
                />
              </div>
              <div
                v-else-if="item.status === 'อนุมัติ'"
                class="text-center bg-blue-300 px-3 py-2 rounded"
              >
                แก้ไขแล้ว
              </div>
              <div v-else class="text-center bg-red-300 px-2 py-1 rounded">
                ปฎิเสธคำขอนี้
                <!-- <ButtonP
                  label="แก้ไขเวลา"
                  @click="editTime(1, item)"
                  class="px-2 py-1 bg-blue-500 border-blue-500 text-white border rounded hover:bg-blue-700"
                /> -->
              </div>
            </td>
          </tr>
          <tr v-if="paginated.length === 0">
            <td colspan="9" class="py-4 px-2 text-center">ไมมีข้อมูล</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="totalPages > 1" class="flex justify-center items-center my-3">
      <ButtonP
        @click="currentPage = 1"
        :disabled="currentPage < 2"
        icon="pi pi-angle-double-left"
        class="px-4 py-2 text-white border bg-gray-800 hover:bg-gray-950 rounded"
      />
      <ButtonP
        @click="currentPage--"
        :disabled="currentPage < 2"
        icon="pi pi-angle-left"
        class="px-4 py-2 text-white border bg-gray-800 hover:bg-gray-950 rounded"
      />
      <div class="px-2 py-2 text-white border bg-gray-800 rounded">
        หน้า {{ currentPage }}/{{ totalPages || 1 }}
      </div>
      <ButtonP
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        icon="pi pi-angle-right"
        class="px-4 py-2 text-white border bg-gray-800 hover:bg-gray-950 rounded"
      />
      <ButtonP
        @click="currentPage = totalPages"
        :disabled="currentPage === totalPages"
        icon="pi pi-angle-double-right"
        class="px-4 py-2 text-white border bg-gray-800 hover:bg-gray-950 rounded"
      />
    </div>

    <Dialog
      v-model:visible="timeSetting"
      modal
      header="แก้ไขเวลา"
      @hide="timeNew = ''"
    >
      <div class="w-full">
        <div class="flex flex-col justify-start items-start gap-3">
          <div>
            <a class="font-semibold">รหัสพนักงาน : </a
            >{{ timeItems.employee_number }}
          </div>
          <div>
            <a class="font-semibold">ชื่อ : </a>{{ timeItems.firstname }}
            {{ timeItems.lastname }}
          </div>
          <div>
            <a class="font-semibold">แก้ไขเวลาของวันที่ : </a
            >{{ timeItems.day }}/{{ timeItems.mount }}/{{ timeItems.year }}
          </div>
          <div>
            <a class="font-semibold">ช่วงเวลา : </a>{{ timeItems.time_line }}
          </div>
          <div>
            <ButtonP
              @click="openTimenew = !openTimenew"
              label="เพิ่มเวลาเอง !"
              class="py-2 px-3 text-white bg-blue-500 hover:bg-blue-700 rounded"
            />
          </div>
          <div v-if="!openTimenew">
            <a class="font-semibold">เวลาที่ขอแก้ไข : </a
            ><a class="py-1 px-2 bg-yellow-200 rounded">{{ timeItems.time }}</a>
          </div>
          <div v-if="openTimenew" class="space-x-2">
            <a class="font-semibold">ลงเวลาเอง :</a>
            <CalendarP
              v-model="timeNew"
              showTime
              timeOnly
              placeholder="ลงเวลา"
              class="h-8 w-16 border-2 rounded"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="w-full flex justify-center gap-2">
          <ButtonP
            label="ยืนยัน"
            @click="editTime(2)"
            class="px-3 py-2 rounded text-white bg-green-500 hover:bg-green-700"
          />
          <ButtonP
            label="ยกเลิก"
            @click="timeSetting = false"
            class="px-3 py-2 rounded text-white bg-red-500 hover:bg-red-700"
          />
        </div>
      </template>
    </Dialog>
    <div v-if="isloading" class="loader-container">
      <div class="loader"></div>
    </div>
    <!-- {{ console.log("itemMe", itemMe) }} -->
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const isloading = ref(false);

onMounted(async () => {
  await getMe();
  questTimeAll();
});

const itemMe = ref([]);
const getMe = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/getme`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    // console.log(res);
    itemMe.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const dataQuest = ref([]);
const dataQuestOrigin = ref([]);
const questTimeAll = async () => {
  try {
    isloading.value = true;
    const response = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/request/time/getAll`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(response);
    const data = response.data.data;

    dataQuest.value = data.slice().reverse();
    dataQuestOrigin.value = data.slice().reverse();
    isloading.value = false;
  } catch (e) {
    console.log(e);
  }
};
const currentPage = ref(1);
const itemsPerPage = 10;
const paginated = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return dataQuest.value.slice(startIndex, endIndex);
});
const totalPages = computed(() =>
  Math.ceil(dataQuest.value.length / itemsPerPage)
);

const timeSetting = ref(false);
const openTimenew = ref(false);
const timeItems = ref([]);
const timeNew = ref("");
const editTime = async (wid, items) => {
  try {
    if (wid === 1) {
      timeItems.value = items;
      timeSetting.value = true;
      return;
    }
    if (wid === 2) {
      if (timeItems.value.time_line === "เวลาออกงานเช้า") {
        timeItems.value.time_line = "พักเที่ยง";
      } else if (timeItems.value.time_line === "เวลาออกงานบ่าย") {
        timeItems.value.time_line = "ลงเวลาออกงาน";
      } else if (timeItems.value.time_line === "เวลาเข้างานบ่าย") {
        timeItems.value.time_line = "เข้างานช่วงบ่าย";
      }

      let timeup = timeItems.value.time;
      if (openTimenew.value) {
        if (timeNew.value === "") {
          timeup = "";
        } else {
          timeup = formattedTime(timeNew.value);
        }
      }

      const data = {
        approve_by: {
          _id: itemMe.value._id,
          employee_number: itemMe.value.employee_number,
          first_name: itemMe.value.first_name,
          last_name: itemMe.value.last_name,
        },
        employee_id: timeItems.value.employee_id,
        time: timeup,
        day: timeItems.value.day,
        mount: timeItems.value.mount,
        year: timeItems.value.year,
        time_line: timeItems.value.time_line, //เข้างานช่วงเช้า, พักเที่ยง, เข้างานช่วงบ่าย, ลงเวลาออกงาน
        remark: "ลงเวลางานย้อนหลัง",
      };
      // console.log("datadatadata", data);
      if (data.time === "Invalid Date" || data.time === "") {
        Swal.fire({
          title: "โปรดลงเวลาก่อน",
          icon: "error",
          confirmButtonText: "ตกลง",
          timer: 2500,
        });
        return;
      }
      // return;
      const response = await axios.put(
        `${import.meta.env.VITE_VUE_APP_DECCAN}/time/update/time`,
        data,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      await confirm(1, timeItems.value);
      questTimeAll();
      console.log("แก้ไขเวลาเรียบร้อย", response);
      Swal.fire({
        title: "แก้ไขเวลาเรียบร้อย",
        icon: "success",
        confirmButtonText: "ตกลง",
        timer: 2500,
      });
      timeSetting.value = false;
    }
  } catch (e) {
    console.log(e);
    Swal.fire({
      title: "error",
      icon: "error",
      confirmButtonText: "ตกลง",
      timer: 2500,
    });
  }
};

const confirm = async (wid, item) => {
  try {
    if (wid === 1) {
      const data = {
        status: "อนุมัติ",
      };
      const response = await axios.put(
        `${import.meta.env.VITE_VUE_APP_DECCAN}/request/time/uptime/${
          item._id
        }`,
        data,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log("อนุมัติ", response);
      questTimeAll();
      Swal.fire({
        title: "อนุมัติสำเร็จ",
        icon: "success",
        confirmButtonText: "ตกลง",
        timer: 2500,
      });
    }
    if (wid === 2) {
      const quest = await Swal.fire({
        title: "คุณไม่อนุมัติ?",
        text: "ยืนยันการไม่อนุมัติขอแก้ไข!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่!",
        cancelButtonText: "ไม่!",
      });
      if (!quest.isConfirmed) return;

      const data = {
        status: "ไม่อนุมัติ",
      };
      const response = await axios.put(
        `${import.meta.env.VITE_VUE_APP_DECCAN}/request/time/uptime/${
          item._id
        }`,
        data,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log("ไม่อนุมัติ", response);
      questTimeAll();
      Swal.fire({
        title: "ไม่อนุมัติสำเร็จ",
        icon: "success",
        confirmButtonText: "ตกลง",
        timer: 2500,
      });
    }
  } catch (e) {
    console.log(e);
    Swal.fire({
      title: "error",
      icon: "error",
      confirmButtonText: "ตกลง",
      timer: 2500,
    });
  }
};

const search = ref("");
function searchEmp() {
  currentPage.value = 1;
  let fildata = dataQuestOrigin.value;

  let searchKey = search.value.toLowerCase();
  if (searchKey) {
    fildata = fildata.filter((item) => {
      return (
        item.employee_number.toLowerCase().includes(searchKey) ||
        item.firstname.toLowerCase().includes(searchKey) ||
        item.lastname.toLowerCase().includes(searchKey) ||
        item.time_line.toLowerCase().includes(searchKey) ||
        item.time.toLowerCase().includes(searchKey) ||
        item.remark.toLowerCase().includes(searchKey)
      );
    });
  }
  dataQuest.value = fildata;
  console.log(search.value);
}

const formattedTime = (date) => {
  return date.toLocaleTimeString("th-TH", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
</script>
<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid rgb(255, 255, 255);
  padding: 8px;
}
</style>
