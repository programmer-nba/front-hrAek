<template lang="">
  <div class="flex h-screen justify-center items-center">
    <button
      class="bg-gray-200 px-3 py-2 rounded-[15px] hover:bg-gray-300"
      @click="onTableUp"
    >
      OpentestDialog
    </button>
  </div>
  <Dialog
    v-model:visible="showDialogTimeTable"
    class="w-[90%]"
    modal
    header="ตารางเวลาการทำงานรายเดือน"
  >
    <!-- ข้อมูลชื่อพนักงาน -->
    <section>
  <div class="flex flex-wrap gap-4 items-center">
    <h1 class=" ">ตารางเวลาของ Name</h1>
    <Dropdown
      v-model="monthSelected"
      :options="months"
      @change="onMonthChange"
      class="border-gray-300 border-1 px-4 flex-auto w-16 "
    />
    <h1 class="flex-auto w-full lg:w-auto">พ.ศ. {{ currentYear }}</h1>
  </div>
</section>

    <!-- main Table -->
    <section>
      <div class="flex justify-center w-full mt-4">
        <table class="text-center w-full overflow-x-auto">
          <tr>
            <th
              class="bg-gray-300 py-3 border-1 w-16"
              v-for="header in handleTable.header"
            >
              {{ header }}
            </th>
          </tr>
          <tr
            v-for="(date, index) in handleTable.dayInmonth"
            :key="index"
            class="bg-gray-100 py-2 border-1"
          >
            <th>{{ date }}</th>
            <th>{{}}</th>
          </tr>
        </table>
      </div>
    </section>
  </Dialog>
</template>
<script setup>
import { ref, onMounted } from "vue";
import dayjs from "dayjs";

const showDialogTimeTable = ref(false); //Variable for open dialog
// ใช้ควบคุม table
const handleTable = ref({
  header: [
    "วันที่",
    "วัน",
    "เข้าเช้า",
    "พักเที่ยง",
    "เข้าบ่าย",
    "ออกงาน",
    "OT",
    "รวมเวลาทำงาน",
    "รวมเวลาOT",
    "หมายเหตุ",
  ],
  dayInmonth: 0,
});
const day = ref(["จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.", "อา."]);
const months = ref([
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
]);
const monthSelected = ref(""); // เก็บค่าเดือนที่ถูกเปลี่ยนในตาราง
const currentYear = ref(""); //ปี พศ
const year = dayjs().year(); //ปี คศ ใช้เปลี่ยบเทียบ

onMounted(() => {
  getCurentMonth();
  getCurrentyear();
});
//set defalt on table up
const onTableUp = () => {
  getCurrentyear();
  getCurentMonth();
  showDialogTimeTable.value = true;
};
//change day per month when value change
const onMonthChange = () => {
  for (let i = 0; i < months.value.length; i++) {
    if (monthSelected.value === months.value[i]) {
      handleTable.value.dayInmonth = getDayinMonth(year, i);
    }
  }
};
//set curren when frist up
const getCurentMonth = () => {
  const getMonths = new Date().getMonth();
  monthSelected.value = months.value[getMonths];
  handleTable.value.dayInmonth = getDayinMonth(year, getMonths);
};
//หาปีปัจจุบัร แลพแปลงเป้น พศ.
const getCurrentyear = () => {
  const getYear = dayjs().add(543, "year").year();
  currentYear.value = getYear;
};
//หาจำนวนวันที่อยู่ภายในเดือนนั้นๆ
const getDayinMonth = (year, month) => {
  return dayjs(`${year}-${month + 1}-01`).daysInMonth();
};
</script>
<style lang=""></style>
