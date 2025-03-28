<template>
  <div class="">
    <div
      class="grid grid-cols gap-8 sm:grid-cols-2 lg:grid-cols-3 text-center mt-10 place-items-center"
    >
      <div
        @click="goToAddRecord"
        class="grid grid-col-2 gap-2 w-80 p-5 bg-gradient-to-r from-[#002E94] to-[#1746A2] text-white rounded-xl border-2 border-slate-100 shadow-lg transition duration-150 ease-in-out hover:scale-105 hover:drop-shadow-lg cursor-pointer"
      >
        <div class="col-span-2 pb-2"><i class="pi pi-book text-3xl"></i></div>
        <div class="col-span-2">บันทึกข้อความ</div>
      </div>
      <div
        @click="goToAddLeave"
        class="grid grid-col-2 gap-2 w-80 p-5 bg-gradient-to-r from-[#002E94] to-[#1746A2] text-white rounded-xl border-2 border-slate-100 shadow-lg transition duration-150 ease-in-out hover:scale-105 hover:drop-shadow-lg cursor-pointer"
      >
        <div class="col-span-2">
          <i class="pi pi-calendar-times text-3xl"></i>
        </div>
        <div class="col-span-2">ขอลางาน</div>
      </div>
      <div
        class="grid grid-col-2 gap-2 w-80 p-5 bg-gradient-to-r from-[#002E94] to-[#1746A2] text-white rounded-xl border-2 border-slate-100 shadow-lg transition duration-150 ease-in-out hover:scale-105 hover:drop-shadow-lg cursor-pointer"
      >
        <div class="col-span-2"><i class="pi pi-clock text-3xl"></i></div>
        <div class="col-span-2">ขอโอที</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },

  methods: {
    goToOTPage() {
      this.$router.push({ name: "OT" });
    },
    goToAddRecord() {
      this.$router.push({ name: "Record" });
    },
    goToAddLeave() {
      this.$router.push({ name: "AddLeave" });
    },
  },
};
</script>
<style></style>
