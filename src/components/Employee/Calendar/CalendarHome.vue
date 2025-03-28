<template>
  <Sidebar v-model:visible="showEventDialog" header="ข้อมูลอีเว้นท์" position="right" class="w-full md:w-4/12">
    <div class="grid grid-cols-2 gap-8">
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">ชื่ออีเว้นท์</label>
        <p>{{ selectedEvent.content }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">เวลาเริ่มต้น</label>
        <p>{{ selectedEvent.time_start }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">เวลาสิ้นสุด</label>
        <p>{{ selectedEvent.time_out }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">สถานะ</label>
        <p>{{ selectedEvent.status }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">วันเวลานัดหมาย</label>
        <p>{{ new Date(selectedEvent.due_date).toLocaleDateString() }}</p>
      </div>
      <div class="col-span-2">
        <label class="block text-sm font-bold mb-2">รายละเอียดอีเว้นท์</label>
        <p>{{ selectedEvent.detail }}</p>
      </div>
    </div>
  </Sidebar>

  <!-- Dialog for project details -->
  <Sidebar v-model:visible="showProjectDialog" header="ข้อมูลเพิ่มเติม" position="right" class="w-full md:w-4/12">
    <div class="grid grid-cols-2 gap-8">
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">รหัสโปรเจค</label>
        <p>{{ selectedProject.project_id }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">ชื่อโปรเจค</label>
        <p>{{ selectedProject.content }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">รายละเอียด</label>
        <p>{{ selectedProject.detail }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">วันที่เริ่ม</label>
        <p>{{ new Date(selectedProject.start_date).toLocaleDateString() }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">วันที่ครบกำหนด</label>
        <p>{{ new Date(selectedProject.due_date).toLocaleDateString() }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">ความคืบหน้า</label>
        <p>{{ selectedProject.progress }}%</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">สถานะ</label>
        <p>{{ selectedProject.status_name }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">พนักงาน</label>
        <p>{{ selectedProject.nick_name }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">ลูกค้า</label>
        <p>{{ selectedProject.customer }}</p>
      </div>
      <div class="col-span-2">
        <label class="block text-sm font-bold mb-2">รายละเอียดเพิ่มเติม</label>
        <p>{{ selectedProject.detail }}</p>
      </div>
      <div class="col-span-2">
        <label class="block text-sm font-bold mb-2">หมายเหตุ</label>
        <p>{{ selectedProject.remark }}</p>
      </div>
    </div>
    <div>
      <h3>{{ selectedProject.content }}</h3>
      <!-- เพิ่มข้อมูลโปรเจคตามต้องการ -->
    </div>
  </Sidebar>

  <div class="h-screen">
    <!-- Header -->
    <header class="bg-cyan-200 text-blue-900 py-4 px-6 flex flex-col sm:flex-row items-center justify-between">
      <h1 class="text-2xl font-bold mb-2 sm:mb-0">
        <span class="mr-4">วันที่ปัจจุบัน {{ currentDateThai }}</span>
      </h1>
      <h1 class="text-4xl font-bold">
        <span class="mr-4">ปฏิทินนัดหมาย</span>
      </h1>
      <div class="flex items-center">
        <div class="flex items-center text-lg">
          <div class="mr-2 flex items-center">
            <div class="w-4 h-4 rounded-full bg-purple-500 mr-1"></div>
            <span>โปรเจค</span>
          </div>
          <div class="mr-2 flex items-center">
            <div class="w-4 h-4 rounded-full bg-yellow-500 mr-1"></div>
            <span>นัดหมาย</span>
          </div>
          <div class="mr-2 flex items-center">
            <div class="w-4 h-4 rounded-full bg-green-500 mr-1"></div>
            <span>ประชุม</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full bg-red-500 mr-1"></div>
            <span>งาน</span>
          </div>
        </div>
      </div>
    </header>

    <a-calendar v-model:value="value" class="w-full">
      <template #dateCellRender="{ current }">
        <ul class="events">
          <!-- Render events from getListData -->
          <li v-for="item in getListData(current)" :key="item.content" @click="showEventDetails(item)">
            <a-badge :status="item.type" :text="item.content" class="text-black font-bold py-2 rounded-md px-2 mt-2"
              :class="{
                'bg-amber-200': item.type === 'warning',
                'bg-lime-300': item.type === 'success',
                'bg-red-200': item.type === 'error',
              }" />
          </li>

          <li v-for="item in getListprojectData(current)" :key="item.content" @click="showProjectDetails(item)">
            <a-badge :text="`กำหนดส่งโปรเจค (${item.content}) `"
              class="text-violet-900 mt-2 font-bold bg-violet-300 rounded-md py-2 md:py-2 px-2 md:px-3 lg:px-4" />
          </li>
        </ul>
      </template>
    </a-calendar>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { Calendar } from "ant-design-vue";
import Dialog from "primevue/dialog";
import Swal from "sweetalert2";
import Sidebar from "primevue/sidebar";
import Calendar1 from "primevue/calendar";

export default {
  components: {
    aCalendar: Calendar,
    Dialog,
    Sidebar,
    Calendar1,
  },

  data() {
    return {
      showEventDialog: false,
      showProjectDialog: false,
      selectedEvent: {},
      selectedProject: {},
      searchQuery: "", // เพิ่ม searchQuery
      filterType: "All", // เพิ่ม filterType
      currentDateThai: "",
      currentPage: 1,
      perPage: 3, // จำนวนรายการต่อหน้า
      showEditDialog: false,
      Detailsvisible: false,
      eventData: [],

      showDialog: false,
      detailEmployee: {},
    };
  },
  computed: {
    paginatedData() {
      // กรองข้อมูลก่อนแบ่งหน้า
      const filteredData = this.eventData.filter((event) => {
        // กรองตามชื่อ content โดยให้ตัวอักษรในชื่อ content มีส่วนที่ตรงกับคำค้นหา
        const contentMatch = event.content
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        // กรองตามประเภท type
        const typeMatch =
          event.type === this.filterType || this.filterType === "All";
        // คืนค่า true เมื่อข้อมูลสอดคล้องกับทั้งเงื่อนไขการค้นหาทั้งสอง
        return contentMatch && typeMatch;
      });

      // นับจำนวนหน้า
      const totalPages = Math.ceil(filteredData.length / this.perPage);

      // คำนวณหน้าปัจจุบันโดยใช้ตัวแปร currentPage
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;

      // คืนค่าข้อมูลที่ถูกกรองและแบ่งหน้า
      return filteredData.slice(start, end);
    },
  },
  mounted() {
    this.getCurrentDateThai();
    this.fetchEventData();
    this.fetchProjects(); // เพิ่มเรียกใช้ฟังก์ชั่นนี้
    setInterval(this.getCurrentDateThai, 1000); // อัพเดทเวลาทุกๆ 1 วินาที
  },

  methods: {
    showEventDetails(event) {
      this.selectedEvent = event;
      this.showEventDialog = true;
    },
    showProjectDetails(project) {
      this.selectedProject = project;
      this.showProjectDialog = true;
    },
    getCurrentDateThai() {
      // ใช้ dayjs เพื่อดึงวันที่ปัจจุบันและเวลาเรียลทาม
      const thaiDate = dayjs().locale("th").format("DD MMMM YYYY");
      this.currentDateThai = thaiDate; // เอาเฉพาะวันที่และเดือนภาษาไทย
    },
    viewDetails(event) {
      this.detailEmployee = event; // กำหนดค่าให้กับ detailEmployee
      this.Detailsvisible = true;
    },
    async fetchEventData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/event/getevent`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        // Populate eventData with the fetched data
        this.eventData = response.data.events;
        this.eventData.forEach((event) => {
          event.due_date = dayjs(event.due_date)
            .locale("th")
            .format("YYYY-MM-DD");
        });
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    },
    async fetchProjects() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/requset/getall`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        this.projects = response.data.data;

        // แปลงเวลาในโซน UTC เป็นเวลาในโซนไทย
        this.projects.forEach((project) => {
          project.due_date = dayjs(project.due_date)
            .locale("th")
            .format("YYYY-MM-DD");
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  setup() {
    const value = ref(); // ตัวแปรสำหรับเก็บค่าวันที่ปัจจุบัน
    const eventData = ref([]); // ตัวแปรสำหรับเก็บข้อมูลอีเว้นท์
    const projects = ref([]); // ตัวแปรสำหรับเก็บข้อมูลโปรเจค

    const getListprojectData = (value) => {
      const dateString = dayjs(value).format("YYYY-MM-DD");
      const projectsOnDate = projects.value.filter(
        (project) => dayjs(project.due_date).format("YYYY-MM-DD") === dateString
      );
      const listData = projectsOnDate.map((project) => ({
        content: project.title, // แก้จาก projects.title เป็น project.title
        detail: project.detail, // แก้จาก projects.title เป็น project.title
        start_date: project.start_date, // แก้จาก projects.title เป็น project.title
        due_date: project.due_date, // แก้จาก projects.title เป็น project.title
        nick_name: project.nick_name, // แก้จาก projects.title เป็น project.title
        progress: project.progress, // แก้จาก projects.title เป็น project.title
        remark: project.remark, // แก้จาก projects.title เป็น project.title
        project_id: project.project_id, // แก้จาก projects.title เป็น project.title
        status_name: project.status.status_name, // แก้จาก projects.title เป็น project.title
        customer: project.customer, // แก้จาก projects.title เป็น project.title
        detail: project.detail, // แก้จาก projects.title เป็น project.title
      }));
      return listData || [];
    };

    console.log(projects);

    // ฟังก์ชั่นสำหรับการแสดงรายการอีเว้นท์ตามวันที่
    const getListData = (value) => {
      const dateString = dayjs(value).format("YYYY-MM-DD");
      const eventsOnDate = eventData.value.filter(
        (event) => dayjs(event.due_date).format("YYYY-MM-DD") === dateString
      );
      const listData = eventsOnDate.map((event) => ({
        type: event.type,
        content: event.content,
        time_start: event.time_start,
        time_out: event.time_out,
        due_date: event.due_date,
        status: event.status,
        detail: event.detail,
      }));
      return listData || [];
    };

    return { value, eventData, projects, getListData, getListprojectData };
  },
};
</script>

<style>
.aa {
  z-index: 9999;
  /* กำหนดค่า Z-Index ที่ต้องการ */
}

.events {
  list-style: none;
  margin: 0;
  padding: 0;
}

.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}

.notes-month {
  text-align: center;
  font-size: 28px;
}

.notes-month section {
  font-size: 28px;
}
</style>
