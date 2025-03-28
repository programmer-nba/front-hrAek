<template>
    
    <Sidebar v-model:visible="Detailsvisible" header="ข้อมูลเพิ่มเติม" position="right" class="w-4/12">
      <div class="grid grid-cols-2 gap-8">
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">รหัสโปรเจค</label>
          <p>{{ detailEmployee.type_code }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">ชื่อโปรเจค</label>
          <p>{{ detailEmployee.type_name }}</p>
        </div>
      </div>
    </Sidebar>


    <Dialog v-model:visible="showAddProjectModal" :modal="true" class="w-7/12">
      <h1 class="text-left text-xl sm:text-2xl font-bold ml-4 sm:ml-10">เพิ่มโปรเจคใหม่</h1>
          <form class="px-4 sm:px-10 mt-2 sm:mt-5">
              <div class="grid gap-3 sm:gap-6 mb-3 sm:mb-6 md:grid-cols-2">
                  
                  <div>
                      <label for="projectTitle" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รหัสโปรเจค</label>
                      <input v-model="newProject.type_code" type="number" id="projectTitle" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5" placeholder="" required />
                  </div>
                  <div>
                      <label for="projectTitle" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่อโปรเจค</label>
                      <input v-model="newProject.type_name" type="text" id="projectTitle" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5" placeholder="" required />
                  </div>
                  
                  
              </div>
              <div class="mb-6">
                  <button @click="submitProject" class="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-900 focus:outline-none">เพิ่มโปรเจค</button>
              </div>
          </form>
    </Dialog>


    <Dialog v-model:visible="showEditProjectModal" :modal="true" class="w-4/12" header="แก้ไขโปรเจค">
      <form class="px-4 sm:px-10 mt-2 sm:mt-5">
          <div class="grid gap-3 sm:gap-6 mb-3 sm:mb-6 md:grid-cols-1">
              <div>
                  <label for="projectTitle" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่อโปรเจค</label>
                  <input v-model="editedProject.type_name" type="text" id="projectTitle" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5" placeholder="" required />
              </div>
          </div>
          <div class="mb-6">
              <button @click="submitEditProject" class="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-900 focus:outline-none">ยืนยันการแก้ไข</button>
          </div>
      </form>
    </Dialog>

    <div class="flex flex-wrap -mx-3  bg-cyan-200 h-full sm:h-screen">
    <div class="w-full max-w-full px-3 mb-6 mx-auto ">
      <div class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-zinc-100 m-5">
        <div class="shadow-xl">
          <!-- card header -->
          <div class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
            <h3 class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
              <span class="mr-3 font-semibold text-dark text-3xl">โปรเจคทั้งหมด</span>
            </h3>
          </div>

          <div class="ml-10 py-2 grid grid-cols-1 lg:grid-cols-3  gap-4">
            <div>
              <button @click="toggleAddProjectModal" class="cursor-pointer text-white font-bold shadow-md hover:scale-[0.9] shadow-purple-400 rounded-full px-5 py-2 bg-gradient-to-bl from-purple-500 to-purple-800">
                เพิ่มโปรเจค
              </button>
            </div>
            <div class="flex justify-between ">
              <div class="pt-2 relative mx-auto text-gray-600">
                <input v-model="searchQuery" class="border-2 border-gray-300 bg-white h-10 pr-1 lg:pr-16  rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search">
              </div>
            </div>
          </div>

          <div class="flex-auto block py-8 pt-6 px-9 rounded-2xl">
            <div class="overflow-x-auto">
              <table class="w-full my-0 align-middle text-slate-600 border-neutral-200">
                <thead class="align-bottom">
                  <tr class="font-semibold text-xl text-black">
                    <th class="pb-3 text-center min-w-[100px]">รหัสประเภทโปรเจค</th>
                    <th class="pb-3 text-center  min-w-[100px]">ชื่อประเภทโปรเจค</th>
                    <th class="pb-3  text-center min-w-[100px]">การจัดการ</th> <!-- เพิ่มหัวข้อใหม่ -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(projectTypes, index) in filteredProjects" :key="index" class="border-b border-dashed last:border-b-0">
                    <td class="pr-0 text-center">
                      <span class="font-semibold text-light-inverse text-md/normal">{{ projectTypes.type_code }}</span>
                    </td>
                    <td class="pr-0 text-center">
                      <span class="font-semibold text-light-inverse text-md/normal">{{ projectTypes.type_name }}</span>
                    </td>
                    <td class="pr-0 text-center">
                      <button @click="viewDetails(projectTypes)" class="px-3 py-2 m-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700">ดูรายละเอียด</button>
                      <button @click="editProject(projectTypes)" class="px-3 py-2 m-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700">แก้ไข</button>
                      <button @click="confirmDelete(projectTypes._id)" class="px-3 py-2 m-1 bg-red-500 text-white rounded-lg hover:bg-red-700">ลบ</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="flex justify-center mt-4">
                <button @click="previousPage" :disabled="currentPage === 1" class="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300 rounded">
                  ก่อนหน้า
                </button>
                <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300 rounded">
                  หน้าถัดไป
                </button>
              </div>
              <span class="px-4 py-2 flex justify-center">{{ currentPage }} จาก {{ totalPages }}</span>

              <div v-if="isLoading" class="text-center">Loading...</div>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import Dialog from 'primevue/dialog';
import Swal from 'sweetalert2';
import Sidebar from 'primevue/sidebar';


export default {
  components: {
    Dialog,
    Sidebar
  },
  data() {
  return {
    currentPage: 1, // เพิ่ม currentPage
    pageSize: 3, // เพิ่ม pageSize
    searchQuery: '', // เพิ่มตัวแปรสำหรับเก็บค่าการค้นหา
    Detailsvisible: false,
    projects: [],
    isLoading: false,
    showAddProjectModal: false,
    showEditProjectModal: false, // เพิ่มตัวแปรสำหรับแสดงกล่อง Dialog สำหรับแก้ไข
    newProject: {
      type_code: "",
      type_name: "",
    },
    editedProject: null, // เพิ่มตัวแปรสำหรับเก็บข้อมูลโปรเจคที่แก้ไข
    detailEmployee: null
  };
},
  mounted() {
    this.fetchProjects();
  },
  computed: {
  filteredProjects() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    // กรองข้อมูลโปรเจคตามค่าค้นหา
    const filtered = this.projects.filter(project => {
      return project.type_name.toLowerCase().includes(this.searchQuery.toLowerCase());
    });

    // คำนวณจำนวนหน้า
    this.totalPages = Math.ceil(filtered.length / this.pageSize);

    // แบ่งหน้า
    return filtered.slice(startIndex, endIndex);
  },
},
  methods: {
    previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  },
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  },
    async submitEditProject(event) {
      event.preventDefault();

  try {
    this.isLoading = true;
    const response = await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/project/update/${this.editedProject._id}`, this.editedProject, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    // แสดง SweetAlert2 แจ้งเตือน
    await Swal.fire({
      icon: 'success',
      title: 'แก้ไขโปรเจคสำเร็จ',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
              container: 'project',
            }
    });
    // ปิดกล่อง Dialog สำหรับแก้ไข
    this.showEditProjectModal = false;
    // รีเฟรชรายการโปรเจค
    this.fetchProjects();
  } catch (error) {
    // แสดงข้อความแจ้งเตือนเมื่อมีข้อผิดพลาด
    console.error("Error submitting edited project:", error);
    await Swal.fire({
      icon: 'error',
      title: 'ไม่สามารถแก้ไขโปรเจคได้',
      text: 'กรุณาลองใหม่อีกครั้ง',
    });
  } finally {
    this.isLoading = false;
  }
},
    editProject(project) {
  this.editedProject = { ...project };
  this.showEditProjectModal = true; // แสดงกล่อง Dialog สำหรับแก้ไข
},
    viewDetails(project) {
      this.detailEmployee = project;
      this.Detailsvisible = true;
    },
    async confirmDelete(id) {
  const result = await Swal.fire({
    title: 'ยืนยันการลบ',
    text: 'คุณต้องการที่จะลบโปรเจคนี้หรือไม่?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'ลบ',
    cancelButtonText: 'ยกเลิก'
  });

  if (result.isConfirmed) {
    // ถ้าผู้ใช้กดปุ่ม "ลบ"
    try {
      const response = await axios.delete(`${import.meta.env.VITE_VUE_APP_DECCAN}/project/delete/${id}`, {
        headers: { "auth-token": `${localStorage.getItem("token")}` },
      });
      // Notify that the deletion was successful
      await Swal.fire({
        icon: 'success',
        title: 'สำเร็จ',
        text: 'ลบโปรเจคสำเร็จ',
        showConfirmButton: false,
        timer: 2000
      });
      // Reload the project data
      this.fetchProjects();
    } catch (error) {
      // Notify if there's an error deleting
      console.error('Error deleting project:', error);
      await Swal.fire({
        icon: 'error',
        title: 'ไม่สำเร็จ',
        text: 'ไม่สามารถลบโปรเจคได้'
      });
    }
  }
},

async fetchProjects() {
  try {
    this.isLoading = true;
    const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/project/getall`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    this.projects = response.data.data; // Change this line to assign to `this.projects`
  } catch (error) {
    console.error("Error fetching projects:", error);
  } finally {
    this.isLoading = false;
  }
},
    toggleAddProjectModal() {
      this.showAddProjectModal = !this.showAddProjectModal;
    },
    
    async submitProject(event) {
      event.preventDefault();
      try {
        this.isLoading = true;
        const response = await axios.post(`${import.meta.env.VITE_VUE_APP_DECCAN}/project/add`, this.newProject, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        this.newProject = {
          type_code: "",
          type_name: "",
        };
        // ปิดกล่อง popup
        this.showAddProjectModal = false;
        // แสดง SweetAlert2 แจ้งเตือน
        await Swal.fire({
          icon: 'success',
          title: 'เพิ่มโปรเจคสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        });
        // รีเฟรชรายการโปรเจค
        this.fetchProjects();
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message === 'ไม่พบประเภทโครงการที่ระบุ') {
          // Handle specific error condition
          await Swal.fire({
            icon: 'error',
            title: 'เพิ่มโปรเจคไม่สำเร็จ',
            text: error.response.data.message,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              container: 'project',
            }
          });
        } else {
          // Handle other errors
          console.error("Error submitting project:", error);
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>
<style>
.project {
    z-index: 9999;
    /* กำหนดค่า Z-Index ที่ต้องการ */
}
</style>