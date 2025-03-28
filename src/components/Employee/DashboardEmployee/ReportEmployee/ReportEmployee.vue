<template>
  <div>
    <div class="flex flex-wrap bg-cyan-200 md:h-[100vh] h-[130vh]">
      <div class="w-full px-3 mb-6 mx-auto">
        <div
          class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-zinc-100 m-5"
        >
          <div class="shadow-xl">
            <!-- card header -->
            <div
              class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <h3
                class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
              <!-- หัวข้อหลัก -->
                <span class="mr-3 font-semibold text-dark text-3xl">รายงานผลการทำงานนอกสถานที่</span> 
              </h3>
            </div>
        <div class="mx-10 py-2 space-y-2">
            <div class="flex sm:justify-start justify-center">
                <h4 class=" text-black  ">1. เพิ่มไฟล์สำรวจพื้นที่</h4>
              </div>
              <div class="mx-10 py-2 space-y-2">
                <input type="file" v-on="files.file1" required>
              </div>

              <div class="flex sm:justify-start justify-center">
                <h4 class=" text-black  ">2. เพิ่มภาพขั้นตอนการทำงาน</h4>
              </div>
              <div class="mx-10 py-2 space-y-2">
                <input type="file" v-on="files.file2" required>
              </div>

              <div class="flex sm:justify-start justify-center">
                <h4 class=" text-black  ">3. เพิ่มภาพการทดสอบ</h4>
              </div >
              <div class="mx-10 py-2 space-y-2">
                <input type="file" v-on="files.file3" required >
              </div>

              <div class="flex sm:justify-start justify-center">
                <h4 class=" text-black  ">4. เพิ่มภาพส่งมอบงาน</h4>
              </div>
              <div class="mx-10 py-2 space-y-2">
                <input type="file" v-on="files.file4"  required>
              </div>

              <!-- <div class="flex justify-end"> -->
              <div>
              <button @click="checkInputs" type="button"
                  class="bg-blue-500 text-white p-2 rounded  hover:bg-blue-700 s">
                  ยืนยัน
              </button>
              <!-- ปุ่มยืนยันการส่งเอกสาร -->
                <div v-if="errorMessage"    class="text-red-500 mt-2">
                {{ errorMessage }}
                </div>
              </div>
            </div>


             
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Dialog from "primevue/dialog";
import Swal from "sweetalert2";
import Sidebar from "primevue/sidebar";

export default {
  components: {
    Dialog,
    Sidebar,
  },
  data() {
    return {
      files: {
        file1: null,
        file2: null,
        file3: null,
        file4: null,
      },
      errorMessage: '',
      currentPage: 1, // เพิ่ม currentPage
      pageSize: 10, // เพิ่ม pageSize
      searchQuery: "", // เพิ่มตัวแปรสำหรับเก็บค่าการค้นหา
      Detailsvisible: false,
      projects: [],
      employees: [],
      isLoading: false,
      
      showEditProjectModal: false, // เพิ่มตัวแปรสำหรับแสดงกล่อง Dialog สำหรับแก้ไข
      newProject: {},
      editedProject: null, // เพิ่มตัวแปรสำหรับเก็บข้อมูลโปรเจคที่แก้ไข
      detailEmployee: null,
      groupedRoles: [
        {
          label: "Germany",
          code: "DE",
          items: [
            { label: "Berlin", value: "Berlin" },
            { label: "Frankfurt", value: "Frankfurt" },
            { label: "Hamburg", value: "Hamburg" },
            { label: "Munich", value: "Munich" },
          ],
        },
      ],
    };
  },
 methods: {
    checkInputs() {
      // Check if any file input is empty
      for (const key in this.files) {
        if (!this.files[key]) {
          this.errorMessage = `กรุณาเลือกไฟล์สำหรับข้อ ${key.slice(-1)}`;
          return;
        }
      }

      // If all inputs are valid, you can submit or process the form
      this.errorMessage = ''; // Clear any previous error message
      alert('ข้อมูลถูกต้อง! ส่งฟอร์ม');
      // Here you can send the form data to your server or perform other actions
    }
  },


  mounted() {
    this.fetchProjects();
    this.fetchEmployees();
  },
  computed: {
    filteredProjects() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      // กรองข้อมูลโปรเจคตามค่าค้นหา
      const filtered = this.projects.filter((project) => {
        return project.name
          ?.toLowerCase()
          .includes(this.searchQuery?.toLowerCase());
      });

      // คำนวณจำนวนหน้า
      this.totalPages = Math.ceil(filtered.length / this.pageSize);

      // แบ่งหน้า
      return filtered.slice(startIndex, endIndex);
    },
  },
  methods: {
    async fetchEmployees() {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/get`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (data.status) {
          console.log(data.data);
          this.employees = data.data;
          this.fetchRoles();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async fetchRoles() {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/role/getall`
        );
        if (data.status) {
          const originalRoles = data.data;
          console.log(originalRoles);
          this.groupedRoles = originalRoles
            .filter((r) => r.thai_position)
            .map((role) => {
              const result = {
                label: role.thai_position,
                code: role.position?.toLowerCase(),
                items: this.employees
                  .filter(
                    (ee) =>
                      ee.position &&
                      ee.position?.toLowerCase() ===
                        role.position?.toLowerCase()
                  )
                  .map((em) => {
                    return {
                      label: em.first_name,
                      value: em._id,
                    };
                  }),
              };
              return result;
            })
            .reduce((accumulator, current) => {
              if (!accumulator.some((item) => item.label === current.label)) {
                accumulator.push(current);
              }
              return accumulator;
            }, []);
          console.log(this.groupedRoles);
        }
      } catch (err) {
        console.log(err);
      }
    },
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

    async submitAddFileSurveyArea(event) {
      event.preventDefault();

      try {
        this.isLoading = true;
        const response = await axios.put(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/project-types/${
            this.editedProject._id
          }`,
          this.editedProject,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        // แสดง SweetAlert2 แจ้งเตือน
        await Swal.fire({
          icon: "success",
          title: "เพิ่มไฟล์สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            container: "project",
          },
        });
        // ปิดกล่อง Dialog สำหรับแก้ไข
        this.showEditProjectModal = false;
        // รีเฟรชรายการโปรเจค
        this.fetchProjects();
      } catch (error) {
        // แสดงข้อความแจ้งเตือนเมื่อมีข้อผิดพลาด
        console.error("Error Can't AddFile :", error);
        await Swal.fire({
          icon: "error",
          title: "ไม่สามารถเพิ่มไฟล์ได้",
          text: "กรุณาลองใหม่อีกครั้ง",
        });
      } finally {
        this.isLoading = false;
      }
    },//สิ้นสุดปุ่มยืนยัน


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
        title: "ยืนยันการลบ",
        text: "คุณต้องการที่จะลบโปรเจคนี้หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        // ถ้าผู้ใช้กดปุ่ม "ลบ"
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/project-types/${id}`,
            {
              headers: { "auth-token": `${localStorage.getItem("token")}` },
            }
          );
          // Notify that the deletion was successful
          await Swal.fire({
            icon: "success",
            text: "ลบประเภทงานสำเร็จ",
            showConfirmButton: false,
            timer: 2000,
          });
          // Reload the project data
          this.fetchProjects();
        } catch (error) {
          // Notify if there's an error deleting
          console.error("Error deleting project:", error);
          await Swal.fire({
            icon: "error",
            title: "ไม่สำเร็จ",
            text: "ไม่สามารถลบโปรเจคได้",
          });
        }
      }
    },

    async fetchProjects() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/project-types`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data);
        this.projects = response.data.data; // Change this line to assign to `this.projects`
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        this.isLoading = false;
      }
    },
  
    // handleFileChange(event) {
    //   this.selectedFile = event.target.files[0];
    // },
    // uploadFile() {
    //   if (!this.selectedFile) {
    //     return;
    //   }
    //   console.log('ไฟล์ที่เลือก:', this.selectedFile);
    //   // รีเซ็ตค่าเลือกไฟล์หลังจากอัปโหลด
    //   this.selectedFile = null;
    // },
    //functionจัดการกับไฟล์ที่อัปโหลด
    async submitProject(event) {
      event.preventDefault();
      try {
        this.isLoading = true;
        this.newProject.roles = this.newProject.roles?.map((p) => p.value);
        console.log(this.newProject);
        const response = await axios.post(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/project-types`,
          this.newProject,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        if (response.data.status) {
          this.newProject = {};
          // ปิดกล่อง popup
          this.showAddProjectModal = false;
          // แสดง SweetAlert2 แจ้งเตือน
          Swal.fire({
            icon: "success",
            title: "เพิ่มประเภทงานสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          // รีเฟรชรายการโปรเจค
          this.fetchProjects();
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "ไม่พบประเภทโครงการที่ระบุ"
        ) {
          // Handle specific error condition
          await Swal.fire({
            icon: "error",
            title: "เพิ่มโปรเจคไม่สำเร็จ",
            text: error.response.data.message,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              container: "project",
            },
          });
        } else {
          // Handle other errors
          console.error("Error submitting project:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
<style>
.project {
  z-index: 9999;

}
</style>
