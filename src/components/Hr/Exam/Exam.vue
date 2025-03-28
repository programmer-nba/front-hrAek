<template>
  <div class="px-4 py-2 w-full h-screen overflow-auto">
    <!-- {{ console.log(selectedExamTypes) }} -->
    <div class="text-2xl text-center font-bold my-2">ข้อมูลข้อสอบ</div>
    <div class="flex justify-between items-center my-2">
      <Dropdown
        v-model="departmentType"
        :options="positionType"
        filter
        optionLabel="extype_name"
        optionValue="extype_name"
        class="border"
        @change="fetchExams"
      />
      <button
        @click="visibleTypes = true"
        class="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-700"
      >
        เพิ่มข้อสอบ
      </button>
    </div>
    <!-- table -->
    <div class="w-full flex justify-center shadow my-2">
      <table class="w-full table-auto">
        <!-- Table Header -->
        <thead>
          <tr
            class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th class="py-3 px-6 text-left">ลำดับ</th>
            <th class="py-3 px-6 text-left">ประเภทข้อสอบ</th>
            <th class="py-3 px-6 text-left">คำถาม</th>
            <th class="py-3 px-6 text-left">สถานะข้อสอบ</th>
            <th class="py-3 px-6 text-center">จัดการ</th>
          </tr>
        </thead>
        <!-- Table Body -->
        <tbody class="text-gray-600 text-sm font-light">
          <tr
            v-for="(exam, index) in paginatedExams"
            :key="exam._id"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="py-3 px-6 text-left">
              {{ index + 1 }}
            </td>
            <td class="py-3 px-6 text-left">
              {{ exam.extype_id }}
            </td>
            <td class="py-3 px-6 text-left w-[60%]">
              <div>
                {{ exam.question_1 }}
              </div>
            </td>
            <td class="py-3 px-6 text-left">
              <label class="switch">
                <input
                  type="checkbox"
                  @click="togglePublish(exam)"
                  :checked="exam.statusquestion === 1"
                />
                <span class="slider round"></span>
              </label>
            </td>

            <td class="py-3 px-6 text-center">
              <div class="flex justify-center items-center space-x-2">
                <button
                  @click="openDetailsPopup(exam)"
                  class="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    ></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <View
                  v-if="ShowPopup"
                  :exam="selectedExam"
                  @close="ShowPopup = false"
                />
                <button
                  @click="openEditModal(exam)"
                  class="text-yellow-500 hover:text-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  <svg
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    ></path>
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    ></path>
                  </svg>
                </button>
                <Edit
                  v-if="EditPopup"
                  :exam="ExamToEdit"
                  @close="EditPopup = false"
                  @editedExam="fetchExams"
                />
                <button
                  @click="deletef(exam)"
                  class="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <svg
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path
                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    ></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination Section -->
    <div class="flex flex-wrap justify-center items-center mt-4">
      <div class="w-full sm:w-auto text-sm text-gray-600 mx-1">
        Showing {{ (currentPage - 1) * perPage + 1 }} to
        {{ Math.min(currentPage * perPage, filteredExams.length) }} of
        {{ filteredExams.length }}
      </div>
      <div class="w-full sm:w-auto flex justify-center space-x-2">
        <button
          v-if="currentPage > 1"
          @click="currentPage--"
          class="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 sm:ml-2"
        >
          Previous
        </button>
        <div class="flex flex-wrap space-x-2">
          <button
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            @click="currentPage = pageNumber"
            :class="{
              'bg-purple-600 text-white': pageNumber === currentPage,
              'bg-gray-200 text-gray-600 hover:bg-gray-300':
                pageNumber !== currentPage,
            }"
            class="px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 sm:w-auto"
          >
            {{ pageNumber }}
          </button>
        </div>
        <button
          v-if="currentPage < totalPages"
          @click="currentPage++"
          class="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 sm:mr-2"
        >
          Next
        </button>
      </div>
    </div>

    <Dialog
      v-model:visible="visibleTypes"
      modal
      header="ข้อสอบสำหรับ"
      style="min-width: 300px"
      @hide="selectedExamTypes = []"
    >
      <!-- {{ console.log(selectedTypes) }} -->
      <div class="w-full flex flex-col gap-3">
        <div
          v-for="(item, i) of examTypes"
          :key="i"
          class="flex align-items-center"
        >
          <Checkbox
            v-model="selectedExamTypes"
            :inputId="item.extype_id"
            name="category"
            :value="item.extype_name"
            class="border rounded shadow"
          />
          <label :for="item.extype_id" class="mx-2">
            {{ item.extype_name }}</label
          >
        </div>
      </div>
      <template #footer>
        <div class="w-full flex justify-center gap-2">
          <ButtonP
            @click="visibleTypeEmp = true"
            label="จัดการผู้ใช้งาน"
            class="px-2 py-1 text-blue-500 hover:text-white border-2 border-blue-500 hover:bg-blue-500 rounded"
          />
          <ButtonP
            @click="togglePopup"
            label="สร้างข้อสอบ"
            class="px-2 py-1 text-green-500 hover:text-white border-2 border-green-500 hover:bg-green-500 rounded"
          />
          <ButtonP
            @click="visibleTypes = false"
            label="ยกเลิก"
            class="px-2 py-1 border-2 border-gray-500 hover:text-white hover:bg-gray-500 rounded"
          />
        </div>
      </template>
    </Dialog>

    <Dialog
      v-model:visible="visibleTypeEmp"
      modal
      header="ตัวเลือกผู้ใช้ข้อสอบ"
      style="min-width: 320px"
      @hide="(menuEdit = 1), (positionVal.subpositions = [])"
    >
      <div class="flex justify-center mt-2 mb-3">
        <ButtonGroup class="bg-sky-500 text-white rounded">
          <ButtonP
            @click="menuEdit = 1"
            class="px-3 py-2 hover:text-gray-500"
            label="เพิ่ม"
          />
          <ButtonP
            @click="menuEdit = 2"
            class="px-3 py-2 hover:text-gray-500"
            label="แก้ไข"
          />
          <ButtonP
            @click="menuEdit = 3"
            key=""
            class="px-3 py-2 hover:text-gray-500"
            label="ลบ"
          />
        </ButtonGroup>
      </div>

      <div v-if="menuEdit === 1" class="text-center space-y-2">
        <div class="px-4 font-bold text-start">ตำแหน่งงานหลัก</div>
        <input
          v-model="positionVal.position"
          placeholder="ตำแหน่ง"
          class="px-2 py-2 border rounded"
        />
        <br />
        <div class="px-4 font-bold text-start mt-4">ตำแหน่งงานย่อย</div>
        <div
          v-for="(subposition, index) in positionVal.subpositions"
          :key="index"
        >
          <input
            v-model="positionVal.subpositions[index].position"
            :placeholder="`ตำแหน่งย่อย` + (index + 1)"
            class="px-2 py-2 border rounded"
          />
        </div>
        <br />
        <ButtonP
          @click="addSubposition(1)"
          class="pi pi-plus-circle text-center px-2 py-1 rounded"
          label="เพิ่มตำแหน่งย่อย"
        />
        <ButtonP
          @click="addSubposition(2, index)"
          class="pi pi-minus-circle text-center px-2 py-1 rounded"
          label="ลบ"
        />
      </div>

      <div v-if="menuEdit === 2" class="text-center space-y-2">
        <div class="px-4 font-bold text-start">เลือกตำแหน่งงานที่ต้องแก้ไข</div>
        <Dropdown
          v-model="menuEditDropType"
          :options="menuEditDrop"
          filter
          placeholder="เลือกตำแหน่ง"
          optionLabel="extype_name"
          class="border"
        />
        <!-- {{ console.log(menuEditDropType) }} -->
        <div v-if="menuEditDropType && menuEditDropType.extype_name">
          <div class="px-4 font-bold text-start my-2">ตำแหน่งงานหลัก</div>
          <input
            v-model="menuEditDropType.extype_name"
            class="px-2 py-2 border rounded"
            placeholder="ตำแหน่ง"
          />
          <div>
            <div class="px-4 font-bold text-start mt-4">ตำแหน่งงานย่อย</div>
            <div
              v-for="(sub, index) in menuEditDropType.extype_sub"
              :key="index"
            >
              <input
                v-model="menuEditDropType.extype_sub[index].position"
                class="px-2 py-2 border rounded mt-1"
                placeholder="ตำแหน่งย่อย"
              />
            </div>
            <ButtonP
              @click="addSubposition(3)"
              class="pi pi-plus-circle text-center px-2 py-1 rounded mt-2"
              label="เพิ่มตำแหน่งย่อย"
            />
            <ButtonP
              @click="addSubposition(4, menuEditDropType.extype_sub.length - 1)"
              class="pi pi-minus-circle text-center px-2 py-1 rounded"
              label="ลบ"
            />
          </div>
        </div>
      </div>

      <div v-if="menuEdit === 3" class="text-center space-y-2">
        <div class="px-4 font-bold text-start">เลือกตำแหน่งงานที่ต้องการลบ</div>
        <Dropdown
          v-model="menuEditDropType"
          :options="menuEditDrop"
          filter
          placeholder="เลือกตำแหน่ง"
          optionLabel="extype_name"
          class="border"
        />
      </div>

      <template #footer>
        <div class="w-full flex justify-center gap-2">
          <ButtonP
            v-if="menuEdit === 1 || menuEdit === 2"
            @click="saveposition"
            label="บันทึก"
            class="px-2 py-1 text-green-500 hover:text-white border-2 border-green-500 hover:bg-green-500 rounded"
          />
          <ButtonP
            v-if="menuEdit === 3"
            @click="saveposition"
            label="ลบ"
            class="px-2 py-1 text-red-500 hover:text-white border-2 border-red-500 hover:bg-red-500 rounded"
          />
          <ButtonP
            @click="visibleTypeEmp = false"
            label="ยกเลิก"
            class="px-2 py-1 border-2 border-gray-500 hover:text-white hover:bg-gray-500 rounded"
          />
        </div>
      </template>
    </Dialog>
    <!-- Add Exam Popup -->
    <Add
      v-if="AddPopup"
      :exam="AddPopup"
      :selectedExamType="selectedExamTypes.join(',')"
      @close="AddPopup = false"
      @addExam="fetchExams"
    />
  </div>
</template>

<script>
// import { onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import Add from "./ExamAdd.vue";
import Edit from "./ExamEdit.vue";
import View from "./ExamView.vue";

export default {
  components: {
    Add,
    Edit,
    View,
  },

  data() {
    return {
      departmentType: "Programmer",
      positionType: [
        // { label: "Programmer", val: "Programmer" },
        // { label: "Marketting", val: "Marketting" },
        // { label: "Admin", val: "Admin" },
        // { label: "Hr", val: "Hr" },
      ],
      positionVal: {
        position: "",
        subpositions: [], // เริ่มต้นเป็น array ว่าง
      },
      menuEditDropType: {
        position: "",
        subpositions: [], // เริ่มต้นเป็น array ว่าง
      },
      menuEditDrop: [],
      menuEdit: 1,
      visibleTypeEmp: false,
      visibleTypes: false,
      // selectedTypes: [],
      examTypes: [],
      selectedExamTypes: [],
      exams: [],
      originalExams: [],
      perPage: 10,
      currentPage: 1,
      searchText: "",
      ShowPopup: false,
      AddPopup: false,
      EditPopup: false,
      ExamToEdit: null,
      selectedExam: null,
    };
  },

  computed: {
    filteredExams() {
      if (this.selectedExamTypes.length === 0) {
        return this.exams.sort((a, b) =>
          a.extype_id.localeCompare(b.extype_id)
        );
      } else {
        return this.exams
          .filter((exam) => this.selectedExamTypes.includes(exam.extype_id))
          .sort((a, b) => a.extype_id.localeCompare(b.extype_id));
      }
    },

    totalPages() {
      return Math.ceil(this.filteredExams.length / this.perPage);
    },

    paginatedExams() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredExams.slice(start, end).reverse();
    },
  },

  methods: {
    async getEmployees() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/get`,
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        );

        this.employees = response.data.data;
        this.fetchExams();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async fetchExamTypes() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/exam-type`,
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        );
        console.log("exam type", response.data.data);
        this.examTypes = response.data.data;
        this.positionType = response.data.data;
        this.menuEditDrop = response.data.data;
      } catch (error) {
        console.error("Error fetching exam types:", error);
      }
    },

    async fetchExams() {
      try {
        const department = {
          department: this.departmentType,
          // position: this.departmentTypeSub,
        };
        const response = await axios.post(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/exam/get/exams`,
          department,
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        );
        console.log("exam", response);

        this.exams = response.data.data;
        this.originalExams = [...this.exams];
        this.exams.forEach((ex) => {
          ex.em_id = this.employees.find(
            (emp) => emp._id === ex.em_id
          )?.first_name;
        });
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    },

    async deletef(exam) {
      const confirmResult = await Swal.fire({
        title: "คุณแน่ใจหรือไม่?",
        text: "คุณต้องการลบข้อสอบนี้หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, ฉันต้องการลบ!",
        cancelButtonText: "ยกเลิก",
      });
      if (confirmResult.isConfirmed) {
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/exam/delete-exam/${
              exam._id
            }`
          );
          if (response.status === 200) {
            Swal.fire("ลบสำเร็จ!", "ข้อมูลข้อสอบถูกลบเรียบร้อยแล้ว", "success");
            this.fetchExams();
          } else {
            console.error("Invalid response format:", response.data);
          }
        } catch (error) {
          console.error("Error deleting exam:", error);
        }
      }
    },
    openDetailsPopup(exam) {
      this.ShowPopup = true;
      this.selectedExam = exam;
    },

    openEditModal(exam) {
      this.EditPopup = true;
      this.ExamToEdit = exam;
    },

    togglePopup() {
      if (this.selectedExamTypes.length > 0) {
        this.AddPopup = !this.AddPopup;
      } else {
        Swal.fire({
          title: "แจ้งเตือน",
          text: "โปรดเลือกตำแหน่งก่อนเพื่อเพิ่มข้อสอบ",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
      }
    },
    async togglePublish(exam) {
      const newStatus = exam.statusquestion === 1 ? 0 : 1;
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/exam/update-exam/${exam._id}`,
          {
            statusquestion: newStatus,
          }
        );
        if (response.status === 200) {
          exam.statusquestion = newStatus;
          Swal.fire(
            "สำเร็จ!",
            `ข้อสอบถูก${newStatus === 1 ? "เปิด" : "ปิด"}เรียบร้อยแล้ว`,
            "success"
          );
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error updating exam status:", error);
      }
    },

    searchExamById() {
      const searchText = this.searchText.trim();
      if (searchText === "") {
        this.exams = [...this.originalExams];
      } else {
        this.exams = this.originalExams.filter((exam) =>
          exam.exam_id.includes(searchText)
        );
      }
    },

    toggleExamType(type) {
      if (this.selectedExamTypes.includes(type)) {
        this.selectedExamTypes = this.selectedExamTypes.filter(
          (t) => t !== type
        );
      } else {
        this.selectedExamTypes.push(type);
      }
      this.fetchExams();
    },
    addSubposition(wid, index) {
      if (wid === 1) {
        this.positionVal.subpositions.push({ position: "" });
      }
      if (wid === 2) {
        this.positionVal.subpositions.splice(index, 1);
      }
      if (wid === 3) {
        this.menuEditDropType.extype_sub.push({ position: "" });
      }
      if (wid === 4) {
        this.menuEditDropType.extype_sub.splice(index, 1);
      }
    },
    async saveposition() {
      try {
        if (this.menuEdit === 1) {
          console.log(this.positionVal);
          const data = {
            extype_name: this.positionVal.position,
            extype_sub: this.positionVal.subpositions,
          };
          // return;
          const response = await axios.post(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/exam-type/insert-exam-type`,
            data,
            {
              headers: { "auth-token": `${localStorage.getItem("token")}` },
            }
          );
          Swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          console.log(response);
          this.positionVal = {
            position: "",
            subpositions: [],
          };
        }
        //edit
        if (this.menuEdit === 2) {
          const data = {
            extype_name: this.menuEditDropType.extype_name,
            extype_sub: this.menuEditDropType.extype_sub,
          };
          console.log("datadatadata", data);
          const response = await axios.put(
            `${
              import.meta.env.VITE_VUE_APP_DECCAN
            }/exam-type/update-exam-type/${this.menuEditDropType._id}`,
            data,
            {
              headers: { "auth-token": `${localStorage.getItem("token")}` },
            }
          );
          Swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          console.log(response);
        }

        if (this.menuEdit === 3) {
          const id = this.menuEditDropType._id;
          // console.log("datadatadata", id);
          // return;
          const response = await axios.delete(
            `${
              import.meta.env.VITE_VUE_APP_DECCAN
            }/exam-type//delete-exam-type/${id}`,
            {
              headers: { "auth-token": `${localStorage.getItem("token")}` },
            }
          );
          Swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          // this.menuEditDropType.position = "";
          this.menuEditDropType = {
            position: "",
            subpositions: [],
          };
        }
      } catch (error) {
        console.error("Error positionVal:", error);
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Okay",
        });
      } finally {
        this.fetchExamTypes();
      }
    },
  },
  async mounted() {
    await this.getEmployees();
    await this.fetchExamTypes();
  },
};
</script>

<style scoped>
/* Add your component's style here */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

.slider.round {
  border-radius: 20px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
