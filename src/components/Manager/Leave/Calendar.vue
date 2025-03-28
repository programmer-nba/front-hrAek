<template>
  <div>
    <div class="flex items-center justify-center mt-3">
      <h2 class="text-4xl font-semibold text-blue-950">
        ปฏิทินแสดงประวัติการลงเวลา
      </h2>
    </div>
    <a-calendar v-model:value="value">
      <template #dateCellRender="{ current }">
        <ul class="events">
          <li v-for="item in getListTimes(current)" :key="item.content">
            <a-badge
              @click="showDetails(item.detail)"
              class="bg-blue-300 rounded-lg"
              :text="item.content"
              :status="item.type"
            />
          </li>
        </ul>
      </template>
    </a-calendar>

    <Sidebar
      v-model:visible="test"
      :style="{ width: '30rem' }"
      position="right"
      header="แสดงรายละเอียด"
    >
      <div v-if="selectedTimeDetail">
        <!-- ตรวจสอบว่ามีข้อมูลไหม -->
        <p><strong>รายละเอียด:</strong> {{ selectedTimeDetail.content }}</p>
        <!-- แสดงรายละเอียด -->
      </div>
      <div v-else>
        <p>ไม่พบข้อมูล</p>
        <!-- หากไม่มีข้อมูล -->
      </div>
    </Sidebar>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/th";

export default {
  setup() {
    const value = ref();
    const times = ref([]);
    const selectedTimeDetail = ref(null);
    const test = ref();

    const showDetails = (time) => {
      selectedTimeDetail.value = time; // เก็บรายละเอียดที่ถูกคลิก
      test.value = true; // เปิด Sidebar
    };

    const fetchTimes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/getme`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        times.value = response.data.data;
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    const getListTimes = (current) => {
      const dateString = dayjs(current).format("YYYY-MM-DD");
      const timesOnDate = times.value.filter(
        (time) => dayjs(time.day).format("YYYY-MM-DD") === dateString
      );

      const listData = timesOnDate.map((time) => ({
        content: `เวลาเข้า: ${
          time.morningIn // เพิ่มตัวแปรหลังจากนี้
        } - เวลาออก:`, // แสดงตัวแปรเพิ่มเติม
        type: "success", // ประเภทประเภท
      }));

      return listData || [];
    };

    onMounted(fetchTimes);

    return {
      value,
      times,
      getListTimes,
      test,
      showDetails,
    };
  },
};
</script>

<style>
.p-sidebar-close :hover {
  background: #cfe0eb;
  border-radius: 6px;
  color: white;
}
</style>
