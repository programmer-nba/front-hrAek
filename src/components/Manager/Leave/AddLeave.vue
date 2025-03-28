<template>
  <!-- Modal body -->
  <div
    class="grid overflow-y-scroll sm:grid-cols-2 place-items-center bg-[#E0F4FF] h-screen"
  >
    <div class="m-2">
      <button @click="GoBack">
        <i
          class="pi pi-angle-left bg-blue-500 rounded-md text-4xl text-white hover:bg-blue-600"
        ></i>
      </button>
    </div>
    <div class="col-span-2">
      <p class="text-2xl font-bold text-blue-700">เพิ่มบันทึกใบลา</p>
    </div>

    <div class="col-span-2">
      <label for="title" class="block mb-2 text-lg text-gray-900"
        >หัวเรื่อง</label
      >
      <textarea
        v-model="leave_head"
        type="text"
        class="bg-white border-2 border-blue-500 drop-shadow-sm text-gray-900 text-lg rounded-lg block w-80 sm:w-96 p-2.5"
        placeholder="ใส่เรื่อง"
        required=""
      ></textarea>
    </div>
    <div class="col-span-2">
      <label for="title" class="block mb-2 text-lg text-gray-900">ประเภท</label>
      <Dropdown
        v-model="leave_type"
        :options="Posttype"
        optionLabel="Posttype"
        optionValue="leave_type"
        placeholder="เลือกประเภท"
        class="w-80 sm:w-96 flex text-sm text-gray-900 bg-white rounded-lg border-2 border-blue-500 hover:bg-gray-100"
      >
      </Dropdown>
    </div>
    <!-- <div class="col-span-2">
      <label for="title" class="block mb-2 text-lg text-gray-900">ส่งถึง</label>
      <textarea
        v-model="to"
        placeholder="ใส่ผู้รับ"
        row="5"
        class="bg-gray-50 border-2 border-blue-500 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 sm:w-96 p-2.5"
      ></textarea>
    </div> -->
    <div class="col-span-2">
      <div class="sm:flex sm:gap-24 sm:justify-center">
        <div>
          <label for="title" class="block mb-2 text-lg text-gray-900"
            >ตั้งแต่วันที่</label
          >
          <Calendar
            showButtonBar
            v-model="date_start_leave"
            class="bg-gray-50 border-2 border-blue-500 text-gray-900 text-lg rounded-lg w-full p-2.5"
            placeholder="ใส่วันที่"
          />
        </div>
        <div>
          <label for="title" class="block mb-2 text-lg text-gray-900"
            >จนถึงวันที่</label
          >
          <Calendar
            showButtonBar
            v-model="date_end_leave"
            class="bg-gray-50 border-2 border-blue-500 text-gray-900 text-lg rounded-lg w-full p-2.5"
            placeholder="ใส่วันที่"
          />
        </div>
      </div>
      <div class="col-span-2 w-80 sm:w-[50rem]">
        <label for="detail" class="block mb-2 text-lg text-gray-900"
          >รายละเอียด</label
        ><Editor
          editorStyle="height: 320px"
          v-model="details"
          rows="4"
          class="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border-2 border-blue-500 focus:ring-blue-500 focus:border-blue-500"
          placeholder="ใส่รายละเอียดตรงนี้"
        ></Editor>
      </div>
    </div>

    <div
      class="grid grid-cols justify-center mt-3 items-center space-y-4 gap-2 sm:flex sm:justify-center sm:space-y-0 sm:space-x-4 col-span-2"
    >
      <button
        @click.prevent="addLeave"
        type="submit"
        class="w-full sm:w-auto justify-center text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-lg px-5 py-2.5 text-center"
      >
        <i class="pi pi-book h-4 w-4 mr-2 -ml-0.5"> </i>
        เพิ่มเอกสาร
      </button>

      <button
        @click="GoBack"
        type="button"
        class="w-full justify-center sm:w-auto text-red-500 inline-flex items-center bg-white hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-red-200 text-lg px-5 py-2.5 hover:text-white focus:z-10"
      >
        <i class="pi pi-times h-4 w-4 mr-2 -ml-0.5"> </i>
        ยกเลิก
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
import Calendar from "primevue/calendar";
export default {
  components: {
    Calendar,
  },
  data() {
    return {
      selectedRecord: null,
      searchText: "",
      documents: [],
      selectedDocument: {},
      leave_head: "",
      detail: "",
      leave_type: null,
      date_start_leave: "",
      date_end_leave: "",
      index: 1,
      Record: [
        { name: "เอกสารทั้งหมด" },
        { name: "อนุมัติ", status_document: "อนุมัติ" },
        { name: "ไม่อนุมัติ", status_document: "ไม่อนุมัติ" },
      ],
      Posttype: [], // เริ่มต้นเป็นอาร์เรย์ว่าง

      currentPage: 1,
      perPage: 5,
      Type: [],
    };
  },
  async created() {
    await this.fetchGetType(); // เรียกใช้ fetchGetType() เมื่อคอมโพเนนต์ถูกสร้าง
    this.createPosttypeFromType(); // สร้าง Posttype จากข้อมูลที่ดึงมา
  },
  methods: {
    async addLeave() {
      const postData = {
        leave_head: this.leave_head,
        leave_type: this.leave_type,
        date_start_leave: this.date_start_leave,
        date_end_leave: this.date_end_leave,
        date_end_leave: this.date_end_leave,
        details: this.details,
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/leave/insert`,

          postData,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log("Inserted document data:", response.data); // แสดงข้อมูลที่ insert ออกมาใน console log
        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
          showConfirmButton: true,
          confirmButtonText: "ตกลง",
        }).then((result) => {
          if (result.isConfirmed) {
            // เมื่อผู้ใช้กดตกลง ให้สลับหน้า
            this.$router.push("/Leave/LeaveView");
          }
        });
      } catch (error) {
        console.error("Error adding document:", error);
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
        if (response.data.data) {
          this.Type = response.data.data; // ตั้งค่า Type จากข้อมูลที่ได้รับ
          console.log("Types:", this.Type);
        } else {
          console.error("ไม่พบข้อมูล leavetype");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    },
    createPosttypeFromType() {
      if (this.Type.length > 0) {
        this.Posttype = this.Type.map((item) => ({
          Posttype: item.leavetype_name, // กำหนด Label ที่ต้องการ
          leave_type: item._id, // กำหนด Value ที่ต้องการ
        }));
      }
    },
    GoBack() {
      window.history.back();
    },
  },
};
</script>
<style lang=""></style>
