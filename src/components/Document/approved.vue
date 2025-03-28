<template>
  <div class="p-4 w-full h-screen overflow-auto bg-sky-100">
    <div class="text-center text-2xl font-bold text-blue-700 mb-4">
      รายการคำขออนุมัติ
    </div>
    <div class="w-full md:flex justify-center">
      <table class="shadow">
        <thead>
          <tr class="text-center border-b-4 border-blue-500 bg-sky-300">
            <th class="px-4 py-2">ลำดับ</th>
            <th class="px-4 py-2">ประเภท</th>
            <th class="px-4 py-2">เรื่อง</th>
            <th class="px-4 py-2">วันที่</th>
            <th class="px-4 py-2">สถานะ</th>
            <th class="px-4 py-2">รายละเอียด</th>
            <th class="px-4 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {{
            console.log("itemLeave", itemLeave)
          }}
          <tr
            v-for="(item, index) in paginated"
            :key="index"
            class="border-b-2 border-blue-500"
          >
            <td class="px-3 py-2">{{ index + 1 }}</td>
            <td class="px-3 py-2">{{ item.leave_type }}</td>
            <td class="px-3 py-2">{{ item.leave_head }}</td>
            <td class="px-3 py-2">
              {{ formatDate(item.date_start_leave) }} -
              {{ formatDate(item.date_end_leave) }}
            </td>
            <td class="px-3 py-2">
              {{
                item.status_detail[item.status_detail.length - 1]?.status || "-"
              }}
            </td>
            <td class="px-3 py-2">
              <ButtonP
                @click="viewDetail(item)"
                label="รายละเอียด"
                class="px-3 py-2 rounded text-white bg-green-500 hover:bg-green-700"
              />
            </td>
            <td class="px-3 py-2">
              <div class="flex flex-wrap gap-1">
                <ButtonP
                  @click="getApprove(item, 'อนุมัติ')"
                  label="อนุมัติ"
                  class="px-3 py-2 rounded text-white bg-blue-500 hover:bg-blue-700"
                />
                <ButtonP
                  @click="getApprove(item, 'ไม่อนุมัติ')"
                  label="ไม่อนุมัติ"
                  class="px-3 py-2 rounded text-white bg-red-500 hover:bg-red-700"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center mt-4">
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
        หน้า {{ currentPage || 1 }}/{{ totalPages || 1 }}
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
    <Dialog v-model:visible="detailVisible" header="รายละเอียด" modal>
      <!-- {{ console.log(itemDetail) }} -->
      <div class="p-2">
        <div class="flex flex-col gap-2">
          <div>
            <label class="font-bold">เรื่อง:</label>
            <span class="ml-2">{{ itemDetail.leave_head }}</span>
          </div>
          <div>
            <label class="font-bold">ประเภท:</label>
            <span class="ml-2">{{ itemDetail.leave_type }}</span>
          </div>
          <div>
            <label class="font-bold">วันที่:</label>
            <span class="ml-2">
              {{ formatDate(itemDetail.date_start_leave) }} -
              {{ formatDate(itemDetail.date_end_leave) }}
            </span>
          </div>
          <div>
            <label class="font-bold">รายละเอียด:</label>
            <div v-html="itemDetail.details" class="ml-2 custom-details"></div>
          </div>
          <div>
            <label class="font-bold">สถานะ:</label>
            <span class="ml-2">
              {{ itemDetail.status_document }}
            </span>
          </div>
          <div>
            <label class="font-bold">เวลาลา:</label>
            <span class="ml-2">{{ itemDetail.time_leave }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <ButtonP
          @click="getApprove(item, 'แก้ไข')"
          label="ส่งแก้ไข"
          class="px-3 py-2 rounded text-white bg-orange-500 hover:bg-orange-700"
        />
        <ButtonP
          @click="detailVisible = false"
          label="ปิด"
          class="px-3 py-2 rounded text-white bg-gray-500 hover:bg-gray-700"
        />
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

onMounted(async () => {
  await getMe();
  getLeaveAll();
});

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
    console.log("itemMe", itemMe.value);
  } catch (e) {
    console.log(e);
  }
};

const itemLeave = ref([]);
const getLeaveAll = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/leave/getall`,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("res", res);
    const leaveall = res.data.data;
    itemLeave.value = leaveall.slice().reverse();
  } catch (e) {
    console.log(e);
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

const detailVisible = ref(false);
const itemDetail = ref({});
const viewDetail = (item) => {
  itemDetail.value = item;
  detailVisible.value = true;
};

const getApprove = async (item, conf) => {
  try {
    let data;
    if (conf === "แก้ไข") {
      const { value: remark } = await Swal.fire({
        icon: "info",
        input: "text",
        inputLabel: "หมายเหตุ",
        inputPlaceholder: "ป้อนหมายเหตุ",
      });
      if (remark) {
        data = {
          statusApprove: conf,
          remark: remark,
        };
      } else return Swal.fire({ icon: "warning", text: "กรุณาป้อนหมายเหตุ" });
    } else {
      const check = await Swal.fire({
        icon: "warning",
        text: `ยืนยัน${conf}ใช่หรือไม่`,
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      });
      if (!check.isConfirmed) return;
      data = {
        statusApprove: conf,
        remark: "",
      };
    }
    // console.log("data", data);
    // return;
    const res = await axios.put(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/leave/update/${item._id}`,
      data,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("leave/update", res);
    Swal.fire({
      icon: "success",
      text: "ดำเนินการสำเร็จ",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (e) {
    console.log(e);
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
<style scoped></style>
<style>
.custom-details p {
  margin-bottom: 0em;
}
</style>
