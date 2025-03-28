<template>
  <!-- Modal body -->
  <div>
    <div class="bg-[#E0F4FF] h-full w-full p-4">
      <div class="flex gap-2 lg:hidden">
        <button @click="GoBack">
          <i
            class="pi pi-arrow-left bg-blue-500 rounded-md text-2xl text-white hover:bg-blue-600 p-2"
          ></i>
        </button>
        <button @click="GoHome">
          <i
            class="pi pi-home bg-blue-500 rounded-md text-2xl text-white hover:bg-blue-600 p-2"
          ></i>
        </button>
      </div>
      <div class="grid grid-cols justify-center overflow-y-scroll gap-2">
        <div class="md:col-span-2 text-center">
          <p class="text-2xl font-bold text-blue-700">เพิ่มบันทึกข้อความ</p>
        </div>
        <div class="md:col-span-2 text-center">
          <button
            @click="ShowDarft = true"
            type="button"
            class="w-fit sm:w-auto text-white inline-flex items-center bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-200 text-lg px-5 py-2.5 hover:text-gray-500 focus:z-10"
          >
            <i class="pi pi-search h-4 w-4 mr-2 -ml-0.5"> </i>
            ดูแบบร่าง
          </button>
        </div>
        <div class="grid grid-cols-2 items-center">
          <label for="title" class="text-xl font-bold">ประเภท</label>
        </div>
        <div class="">
          <Dropdown
            v-model="type"
            :options="Posttype"
            optionLabel="Posttype"
            optionValue="type"
            placeholder="เลือกประเภท"
            class="w-80 sm:w-96 flex text-sm text-gray-900 bg-white rounded-lg border-2 border-blue-500 hover:border-blue-600 hover:bg-blue-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          >
          </Dropdown>
        </div>
        <div class="grid grid-cols-2 items-center">
          <label for="title" class="text-xl font-bold">หัวเรื่อง</label>
        </div>
        <div>
          <InputText
            v-model="headers"
            type="text"
            class="bg-white border-2 border-double border-blue-500 text-gray-900 text-lg rounded-lg block w-80 sm:w-96 p-2 hover:border-blue-600 hover:bg-blue-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            placeholder="กรอกหัวเรื่อง"
            required=""
          />
        </div>

        <div class="grid grid-cols-2 items-center">
          <label for="title" class="text-xl font-bold">ส่งถึง</label>
        </div>
        <div>
          <input
            v-model="to"
            placeholder="ชื่อผู้รับ"
            row="5"
            class="bg-white border-2 border-double border-blue-500 text-gray-900 text-lg rounded-lg block w-80 sm:w-96 p-2 hover:border-blue-600 hover:bg-blue-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div v-if="type === 'OT'" class="grid grid-cols-2 items-center">
          <label for="title" class="text-xl font-bold">ตั้งแต่เวลา</label>
        </div>
        <div v-if="type === 'OT'">
          <Calendar1
            v-model="timein"
            showIcon
            iconDisplay="input"
            timeOnly
            inputId="templatedisplay"
            placeholder="กรอกเวลา"
            class="bg-white items-center border-2 border-double border-blue-500 text-gray-900 text-lg rounded-lg w-80 sm:w-96 p-2 hover:border-blue-600 hover:bg-blue-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          >
            <template #inputicon="{ clickCallback }">
              <InputIcon
                class="pi pi-clock cursor-pointer"
                @click="clickCallback"
              /> </template
          ></Calendar1>
        </div>
        <div v-if="type === 'OT'" class="grid grid-cols-2 items-center">
          <label for="title" class="text-xl font-bold">จนถึงเวลา</label>
        </div>
        <div v-if="type === 'OT'">
          <Calendar1
            v-model="timeout"
            showIcon
            iconDisplay="input"
            timeOnly
            inputId="templatedisplay"
            placeholder="กรอกเวลา"
            class="bg-white items-center border-2 border-double border-blue-500 text-gray-900 text-lg rounded-lg w-80 sm:w-96 p-2 hover:border-blue-600 hover:bg-blue-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            ><template #inputicon="{ clickCallback }">
              <InputIcon
                class="pi pi-clock cursor-pointer"
                @click="clickCallback"
              /> </template
          ></Calendar1>
        </div>

        <div class="grid grid-cols-2 items-center">
          <label for="title" class="text-xl font-bold">สิ่งที่แนบมาด้วย</label>
        </div>
        <div>
          <input
            class="bg-white border-2 border-double border-blue-500 text-gray-900 text-lg rounded-lg block w-80 sm:w-96 p-2 hover:border-blue-600 hover:bg-blue-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            placeholder="กรอกชื่อเอกสาร"
            v-model="file_name"
          />
        </div>
        <div class="grid grid-cols-2">
        
          <label class="text-xl font-bold">แนบเอกสาร</label>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-2">
          <!-- ส่วนของอินพุตไฟล์ -->
          <div
            v-for="(fileInput, index) in fileInputs"
            :key="index"
            class="mt-4 flex items-start relative"
          >
            <!-- ไอคอน SVG เพื่อแนบไฟล์ -->
            <label
              :for="`dropzone-file-${index}`"
              class="cursor-pointer bg-blue-500 rounded-xl border hover:bg-blue-700"
            >
              <svg
                class="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </label>
            <input
              type="file"
              :id="`dropzone-file-${index}`"
              @change="onFileChange(index, $event)"
              class="hidden"
            />

            <!-- แสดงตัวอย่างไฟล์ -->
            <div
              v-if="fileInput.selectedFile"
              class="ml-4 relative bg-blue-200 rounded-lg p-4"
            >
              <!-- ปุ่มลบไฟล์ในตำแหน่งที่เหมาะสม -->
              <button
                @click="removeFile(index)"
                class="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white rounded-full p-2 pi pi-times"
                aria-label="ลบไฟล์"
              ></button>

              <!-- ถ้าเป็นไฟล์รูปภาพ ให้แสดงตัวอย่าง -->
              <div v-if="isImageFile(fileInput.selectedFile)" class="my-4">
                <Image
                  :src="fileInput.previewImage"
                  preview
                  alt="ภาพตัวอย่าง"
                  width="250"
                  class="rounded-lg shadow-md hover:brightness-50"
                />
              </div>
              <!-- แสดงตัวอย่าง PDF -->
              <div v-else-if="isPDFFile(fileInput.selectedFile)" class="my-4">
                <iframe
                  :src="fileInput.previewImage"
                  width="250"
                  height="250"
                  frameborder="0"
                  class="rounded-lg shadow-md"
                ></iframe>
              </div>

              <!-- แสดงตัวอย่างวิดีโอ -->
              <div v-else-if="isVideoFile(fileInput.selectedFile)" class="my-4">
                <video
                  controls
                  :src="fileInput.previewImage"
                  width="250"
                  height="250"
                  class="rounded-lg shadow-md"
                ></video>
              </div>

              <!-- ตัวอย่าง Word -->
              <div
                v-else-if="isWordFile(fileInput.selectedFile)"
                class="my-4 text-center"
              >
                <i class="pi pi-file text-3xl text-gray-500"></i>
                <p>{{ fileInput.selectedFile.name }}</p>
              </div>

              <!-- ถ้าเป็นไฟล์อื่นๆ -->
              <div v-else class="text-center">
                <i class="pi pi-file text-3xl text-gray-500"></i>
                <p>{{ fileInput.selectedFile.name }}</p>
              </div>
            </div>
          </div>
          <!-- ปุ่มเพิ่มไฟล์ ถ้ามีการเลือกไฟล์ -->
          <div
            v-if="fileInputs.every((input) => input.selectedFile !== null)"
            class="mt-4"
          >
            <button
              @click="addFileInput"
              class="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
            >
              เพิ่มไฟล์
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2">
          <label for="detail" class="text-xl font-bold">รายละเอียด</label>
        </div>
        <div>
          <Editor
            editorStyle="height: 320px"
            v-model="detail"
            class="p-2.5 w-80 sm:w-96 text-lg text-gray-900 bg-gray-50 rounded-lg border-2 border-blue-500 focus:ring-blue-500 focus:border-blue-500"
            placeholder="ใส่รายละเอียดตรงนี้"
          ></Editor>
        </div>
      </div>

      <!-- ส่วนอื่น ๆ ของแบบฟอร์ม -->

      <div
        class="grid grid-cols justify-center mt-3 items-center space-y-4 gap-2 sm:flex sm:justify-center sm:space-y-0 sm:space-x-4 col-span-2"
      >
        <button
          @click="addRecord"
          type="submit"
          class="w-full sm:w-auto justify-center text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-lg px-5 py-2.5 text-center"
        >
          <i class="pi pi-book h-4 w-4 mr-2 -ml-0.5"> </i>
          เพิ่มเอกสาร
        </button>

        <button
          @click="GoBack"
          type="button"
          class="w-full justify-center sm:w-auto text-red-500 inline-flex items-center bg-white hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-red-200 text-lg px-5 py-2.5 hover:text-white focus:z-10">
          <i class="pi pi-times h-4 w-4 mr-2 -ml-0.5"> </i>
          ยกเลิก
        </button>

        <button
          @click="isDraftSelected ? saveDraft() : addDarft()"
          type="button"
          class="w-full justify-center sm:w-auto text-white inline-flex items-center bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-200 text-lg px-5 py-2.5 hover:text-gray-500 focus:z-10"
        >
          <i class="pi pi-clone h-4 w-4 mr-2 -ml-0.5"> </i>
          {{ isDraftSelected ? "บันทึกแบบร่าง" : "เพิ่มแบบร่าง" }}
        </button>
      </div>
    </div>

    <Dialog
      v-model:visible="ShowDarft"
      modal
      header="แบบร่างเอกสารทั้งหมด"
      :style="{ width: '40rem' }"
    >
      <div
        class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2"
        v-if="documents.length > 0"
      >
        <!-- แสดงรายการแบบร่างทั้งหมด -->
        <div
          v-for="(document, index) in documents"
          :key="index"
          @click="ShowSelectedDraft(document)"
          class="bg-blue-500 p-4 max-h-20 overflow-y-hidden items-center text-center rounded-xl text-white cursor-pointer hover:bg-blue-900 hover:scale-110 transition ease-in-out delay-100"
        >
          {{ document.headers }}
        </div>
      </div>
      <div v-else>
        <div
          class="flex flex-col gap-5 font-bold items-center justify-center h-96 text-3xl"
        >
          <i class="pi pi-info-circle text-5xl text-yellow-500"></i>
          <p class="">ยังไม่มีข้อมูลแบบร่าง</p>
        </div>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="ShowDarftById"
      modal
      header="แบบร่างเอกสาร"
      :style="{ width: '40rem' }"
    >
      <!-- แสดงรายละเอียดของแบบร่างที่เลือก -->
      <div>
        <p><strong>หัวเรื่อง:</strong> {{ selectedDraft.headers }}</p>
        <p><strong>ประเภท:</strong> {{ selectedDraft.type }}</p>
        <p><strong>ส่งถึง:</strong> {{ selectedDraft.to }}</p>
        <p v-if="selectedDraft.type == 'OT'">
          <strong>ตั้งแต่เวลา</strong>
          {{ formatTime(selectedDraft.ot.timein) }} <strong>จนถึงเวลา</strong>
          {{ formatTime(selectedDraft.ot.timeout) }}
        </p>
        <div class="flex flex-col gap-2">
          <p class="text-center"><strong>รายละเอียด:</strong></p>
          <p
            class="overflow-y-scroll max-h-96"
            v-html="selectedDraft.detail"
          ></p>
        </div>
        <!-- แสดงไฟล์ที่แนบมา -->
        <div v-if="selectedDraft.file && selectedDraft.file.length > 0">
          <p><strong>ไฟล์ที่แนบมา:</strong></p>
          <ul>
            <!-- ใช้ v-for เพื่อแสดงรายการไฟล์ -->
            <li
              v-for="file in selectedDraft.file"
              :key="file.file_doc"
              class="my-2"
            >
              <!-- แสดงตัวอย่างรูปภาพหากเป็นไฟล์ภาพ -->
              <div>
                <Image
                  :src="generateGoogleDriveImageURL(file.file_doc)"
                  width="250"
                  preview
                  alt="ภาพที่แนบมา"
                  class="w-32 h-auto"
                />
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          <p><strong>ไม่มีไฟล์ที่แนบมา</strong></p>
        </div>
        <div class="flex justify-end gap-2">
          <button
            @click="selectDrafById()"
            class="flex items-center text-white bg-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-lg px-3 py-2 text-center"
          >
            <i class="pi pi-check-circle h-4 w-4 mr-2 -ml-0.5"> </i>
            เลือก
          </button>

          <button
            @click="ShowDarftById = false"
            class="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-lg px-3 py-2 text-center"
          >
            <i class="pi pi-times-circle h-4 w-4 mr-2 -ml-0.5"> </i>
            ยกเลิก
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/th"; // สำหรับภาษาไทย
dayjs.locale("th"); // ตั้งค่า locale
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import Calendar1 from "primevue/calendar";
// import InputText from "primevue/inputtext";
export default {
  components: {
    Calendar1,
  },
  data() {
    return {
      documents: [],
      headers: "",
      to: "",
      detail: "",
      type: "Normal",
      timein: "",
      timeout: "",
      file_name: "",
      index: 1,
      ShowDarft: false,
      ShowDarftById: false,
      Record: [
        { name: "เอกสารทั้งหมด" },
        { name: "อนุมัติ", status_document: "อนุมัติ" },
        { name: "ไม่อนุมัติ", status_document: "ไม่อนุมัติ" },
      ],

      Posttype: [
        { Posttype: "โอที", type: "OT" },
        { Posttype: "เวลางาน", type: "JobTime" },
        { Posttype: "ใบลา", type: "LeaveLetter" },
        { Posttype: "ขอใช้สถานที่", type: "RequestLocation" },
        { Posttype: "ทั่วไป", type: "Normal" },
      ],
      selectDraft: null,
      isDraftSelected: false, // เพิ่มตัวแปรนี้
      currentPage: 1,
      perPage: 5,
      selectedImages: [], // เก็บภาพที่แยกออกมา
      fileInputs: [
        {
          selectedFile: null,
          previewImage: null,
        },
      ],
    };
  },
  created() {
    this.fetchDarftDocument();
  },
  methods: {
    generateGoogleDriveImageURL(imageId) {
      return `https://drive.google.com/thumbnail?id=${imageId}`;
    },
    addFileInput() {
      // เพิ่มอินพุตไฟล์ใหม่
      this.fileInputs.push({
        selectedFile: null,
        previewImage: null,
      });
    },
    removeFile(index) {
      this.fileInputs.splice(index, 1); // ลบไฟล์จากอาร์เรย์
    },
    onFileChange(index, event) {
      const file = event.target.files[0];
      if (file) {
        this.fileInputs[index].selectedFile = file;

        if (this.isImageFile(file)) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.fileInputs[index].previewImage = e.target.result;
          };
          reader.readAsDataURL(file);
        } else if (this.isPDFFile(file)) {
          this.fileInputs[index].previewImage = URL.createObjectURL(file);
        } else if (this.isVideoFile(file)) {
          this.fileInputs[index].previewImage = URL.createObjectURL(file);
        }
      }
    },
    isImageFile(file) {
      const imageTypes = ["image/jpeg", "image/png", "image/gif"];
      return imageTypes.includes(file.type);
    },

    isPDFFile(file) {
      return file.type === "application/pdf";
    },

    isVideoFile(file) {
      const videoTypes = ["video/mp4", "video/mkv", "video/avi"];
      return videoTypes.includes(file.type);
    },
    // ตรวจสอบว่าไฟล์เป็นไฟล์ Word หรือไม่
    isWordFile(file) {
      const wordTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      return wordTypes.includes(file.type);
    },
    formatTime(time) {
      return dayjs(time).format("HH:mm"); // จัดรูปแบบเป็นชั่วโมง:นาที
    },
    async fetchDarftDocument() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/document/byMe`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        // กรองเฉพาะเอกสารที่มี document_true เท่ากับ 'ฉบับร่าง'
        this.documents = response.data.data.filter(
          (document) => document.document_true === "ฉบับร่าง"
        );

        // ถ้ามีหลาย document และต้องการแสดงผลเอกสารล่าสุดก่อน
        this.documents.reverse();

        // คำนวณจำนวนหน้าทั้งหมด
        // console.log(this.documents);
        this.totalPages = Math.ceil(this.documents.length / this.perPage);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
    async addRecord() {
      const document_true = "ฉบับจริง"; // หรือกำหนดค่าอื่นตามความต้องการ
      if (this.headers === "") {
        Swal.fire({
          icon: "error",
          title: "กรอกข้อมูล",
          confirmButtonText: "ตกลง",
          timer: 1500,
        });
        return;
      }
      // ถ้ามีแบบร่างที่ถูกเลือก, จะทำการอัปเดตโดยใช้ `PUT`
      if (this.selectedDraft) {
        // สร้าง FormData สำหรับการอัปเดต
        const formData = new FormData();
        // เพิ่มข้อมูลส่วนต่าง ๆ ของเอกสารลงใน FormData
        formData.append("headers", this.headers);
        formData.append("to", this.to);
        formData.append("detail", this.detail);
        formData.append("type", this.type);
        formData.append("document_true", document_true); // กำหนดค่า `document_true` เมื่ออัปเดต

        // ถ้าเป็นประเภท `OT`, เพิ่มข้อมูล `ot` ลงใน FormData
        if (this.type === "OT") {
          const ot = {
            timein: this.timein,
            timeout: this.timeout,
          };
          formData.append("ot", JSON.stringify(ot)); // เนื่องจากเป็นออบเจ็กต์, ควรแปลงเป็น JSON
        }
        // เพิ่มไฟล์ที่เลือก
        this.fileInputs.forEach((fileInput) => {
          if (fileInput.selectedFile) {
            formData.append("image", fileInput.selectedFile); // เพิ่มไฟล์ที่เลือกลงใน FormData
          }
        });

        try {
          const response = await axios.put(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/document/update/${
              this.selectedDraft._id
            }`,
            formData, // ใช้ FormData
            {
              headers: {
                "auth-token": localStorage.getItem("token"),
                "Content-Type": "multipart/form-data", // ใช้เนื่องจากมีไฟล์
              },
            }
          );

          console.log("document/update", response);
          Swal.fire({
            icon: "success",
            title: "อัปเดตเอกสารสำเร็จ",
            confirmButtonText: "ตกลง",
            timer: 1500,
          });

          this.resetForm(); // รีเซ็ตค่าหลังจากอัปเดต
        } catch (error) {
          console.error("Error updating document:", error);
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาดในการอัปเดตเอกสาร",
            confirmButtonText: "ตกลง",
            timer: 1500,
          });
        }
      } else {
        // ถ้าไม่มี `selectedDraft`, ทำการเพิ่มใหม่โดยใช้ `POST`
        const formData = new FormData(); // ใช้ FormData สำหรับการอัปโหลดไฟล์
        formData.append("headers", this.headers);
        formData.append("type", this.type);
        formData.append("to", this.to);
        formData.append("detail", this.detail);
        formData.append("document_true", document_true); // กำหนด `document_true` เมื่อเพิ่มใหม่
        formData.append("file_name", this.file_name); // เพิ่มฟิลด์ document_true
        if (this.type === "OT") {
          formData.append(
            "ot",
            JSON.stringify({
              timein: this.timein,
              timeout: this.timeout,
            })
          );
        }

        // เพิ่มไฟล์ที่เลือก
        this.fileInputs.forEach((fileInput) => {
          if (fileInput.selectedFile) {
            formData.append("image", fileInput.selectedFile);
          }
        });

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/document/insert`,
            formData,
            {
              headers: {
                "auth-token": localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log("document/insert", response);
          Swal.fire({
            icon: "success",
            title: "เพิ่มเอกสารสำเร็จ",
            confirmButtonText: "ตกลง",
          });

          this.resetForm();
        } catch (error) {
          console.error("Error adding document:", error);
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาดในการเพิ่มเอกสาร",
            confirmButtonText: "ตกลง",
          });
        }
      }
    },
    resetForm() {
      // รีเซ็ตค่าหลังจากเพิ่มเอกสาร
      this.headers = "";
      this.to = "";
      this.detail = "";
      this.type = "Normal";
      this.timein = "";
      this.timeout = "";
      this.selectedFile = null;
      this.previewImage = null;
    },
    // เมื่อผู้ใช้คลิกที่แบบร่างในรายการ
    async ShowSelectedDraft(document) {
      try {
        this.selectedDraft = document;
        this.ShowDarftById = true; // เปิด Dialog ที่แสดงรายละเอียดของแบบร่าง
      } catch (error) {
        console.error("Error in ShowSelectedDraft:", error);
      }
      console.log("Selected draft:", this.selectedDraft);
      console.log("Files in draft:", this.selectedDraft.file); // ตรวจสอบว่ามีไฟล์หรือไม่
    },
    // เมื่อผู้ใช้คลิก "เลือก" ใน Dialog
    selectDrafById() {
      // ตรวจสอบว่า `selectedDraft` มีข้อมูลหรือไม่
      if (this.selectedDraft) {
        // ตั้งค่าค่า `v-model` ในฟอร์มตามข้อมูลของ `selectedDraft`
        console.log("Selected draft:", this.selectedDraft);
        console.log(
          "Time in (before):",
          this.selectedDraft.ot ? this.selectedDraft.ot.timein : "N/A"
        );
        console.log(
          "Time out (before):",
          this.selectedDraft.ot ? this.selectedDraft.ot.timeout : "N/A"
        );
        this.headers = this.selectedDraft.headers; // ใส่หัวเรื่อง
        this.to = this.selectedDraft.to; // ใส่ผู้รับ
        this.detail = this.selectedDraft.detail; // ใส่รายละเอียด
        this.type = this.selectedDraft.type; // ใส่ประเภท

        if (this.selectedDraft.type === "OT") {
          console.log("OT object:", this.selectedDraft.ot); // ตรวจสอบ `ot`
          const ot = this.selectedDraft.ot;
          this.timein = ot ? dayjs(ot.timein).format("HH:mm") : ""; // ถ้ามี `ot`, แปลง `timein` เป็น `HH:mm`
          this.timeout = ot ? dayjs(ot.timeout).format("HH:mm") : ""; // ถ้ามี `ot`, แปลง `timeout` เป็น `HH:mm`

          // หลังจากแปลงค่าแล้ว ให้ใช้ console.log เพื่อตรวจสอบ
          console.log("Time in (after format):", this.timein); // ควรแสดงผลในรูปแบบ `HH:mm`
          console.log("Time out (after format):", this.timeout); // ควรแสดงผลในรูปแบบ `HH:mm`
        }

        // ถ้ามีไฟล์ที่แนบมา, ตั้งค่า `fileInputs`
        if (this.selectedDraft.file && this.selectedDraft.file.length > 0) {
          this.fileInputs = this.selectedDraft.file.map((file) => ({
            selectedFile: file,
            previewImage: this.generateGoogleDriveImageURL(file.file_doc),
          }));
        } else {
          this.fileInputs = [{ selectedFile: null, previewImage: null }]; // ถ้าไม่มีไฟล์, รีเซ็ตเป็นค่าปกติ
        }

        // ปิด Dialog หลังจากตั้งค่าเสร็จ
        this.ShowDarftById = false;
      }
    },
    // ฟังก์ชันอื่น ๆ เช่น addFileInput, onFileChange, removeFile, ฯลฯ
    async addDarft() {
      const document_true = "ฉบับร่าง"; // หรือกำหนดค่าอื่นตามความต้องการ
      if (!this.headers || !this.to || !this.detail) {
        Swal.fire({
          icon: "warning",
          title: "กรุณากรอกข้อมูลให้ครบถ้วน",
          confirmButtonText: "ตกลง",
        });
        return;
      }
      // แยกการจัดการตามประเภท
      if (this.type === "OT") {
        const formData = new FormData(); // ใช้ FormData สำหรับการอัปโหลดไฟล์
        formData.append("headers", this.headers);
        formData.append("type", this.type);
        formData.append("to", this.to);
        formData.append("detail", this.detail);
        formData.append("document_true", document_true); // เพิ่มฟิลด์ document_true
        formData.append("file_name", this.file_name); // เพิ่มฟิลด์ document_true
        // สร้างออบเจ็กต์ `ot` เพื่อส่งเวลา
        const ot = {
          timein: this.timein,
          timeout: this.timeout,
        };
        formData.append("ot", JSON.stringify(ot));
        // เพิ่มไฟล์ทั้งหมดที่เลือกลงใน FormData

        // เพิ่มไฟล์ทั้งหมดที่เลือกลงใน FormData
        this.fileInputs.forEach((fileInput, index) => {
          if (fileInput.selectedFile) {
            formData.append(`image`, fileInput.selectedFile); // ใช้ชื่อที่ต่างกันสำหรับแต่ละไฟล์
          }
        });
        console.log("Data to be sent (OT):");
        for (const pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]); // แสดงข้อมูลใน FormData
        }

        try {
          await axios.post(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/document/insert`,
            formData,
            {
              headers: {
                "auth-token": localStorage.getItem("token"),
                "Content-Type": "multipart/form-data", // สำหรับการอัปโหลดไฟล์
              },
            }
          );

          Swal.fire({
            icon: "success",
            title: "เพิ่มเอกสารประเภท OT สำเร็จ",
            confirmButtonText: "ตกลง",
          });

          this.resetForm(); // รีเซ็ตค่าหลังจากเพิ่มเอกสาร
        } catch (error) {
          console.error("Error adding OT document:", error);
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาดในการเพิ่มเอกสารประเภท OT",
            confirmButtonText: "ตกลง",
          });
        }
      } else if (this.type === "Normal") {
        const formData = new FormData(); // ใช้ FormData สำหรับการอัปโหลดไฟล์
        formData.append("headers", this.headers);
        formData.append("type", this.type);
        formData.append("to", this.to);
        formData.append("detail", this.detail);
        formData.append("document_true", document_true); // เพิ่มฟิลด์ document_true
        formData.append("file_name", this.file_name); // เพิ่มฟิลด์ document_true
        // เพิ่มไฟล์ทั้งหมดที่เลือกลงใน FormData
        this.fileInputs.forEach((fileInput, index) => {
          if (fileInput.selectedFile) {
            formData.append(`image`, fileInput.selectedFile); // ใช้ชื่อที่ต่างกันสำหรับแต่ละไฟล์
          }
        });
        // console.log ข้อมูลใน FormData
        console.log("Data to be sent (Normal):");
        for (const pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]); // แสดงข้อมูลใน FormData
        }

        try {
          await axios.post(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/document/insert`,
            formData,
            {
              headers: {
                "auth-token": localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          );

          Swal.fire({
            icon: "success",
            title: "เพิ่มเอกสารประเภท Normal สำเร็จ",
            confirmButtonText: "ตกลง",
          });

          this.resetForm();
        } catch (error) {
          console.error("Error adding Normal document:", error);
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาดในการเพิ่มเอกสารประเภท Normal",
            confirmButtonText: "ตกลง",
          });
        }
      }
    },
    GoBack() {
      window.history.back();
    },
    GoHome() {
      this.$router.push({ name: "Manager" });
    },
    async saveDraft() {
      try {
        // สร้างออบเจ็กต์สำหรับการอัปเดตแบบร่าง
        const updatedDraft = {
          type: this.type, // เก็บประเภทของเอกสาร
          document_true: "ฉบับร่าง", // เพิ่มฟิลด์ document_true
        };

        // หาก `type` เป็น "Normal", เพิ่มข้อมูลเฉพาะที่ต้องการ
        if (this.type === "Normal") {
          updatedDraft.headers = this.headers; // กำหนดหัวข้อ
          updatedDraft.to = this.to; // กำหนดส่งถึง
          updatedDraft.detail = this.detail; // กำหนดรายละเอียด
        }

        const response = await axios.put(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/document/update/${
            this.selectedDraft._id
          }`,
          updatedDraft,
          {
            headers: {
              "auth-token": localStorage.getItem("token"), // ส่งโทเคนสำหรับการยืนยันตัวตน
            },
          }
        );

        Swal.fire({
          icon: "success",
          title: "บันทึกแบบร่างสำเร็จ",
          showConfirmButton: true,
          confirmButtonText: "ตกลง",
        });
        this.fetchDarftDocument();
        // หลังจาก saveDraft สำเร็จ
        this.headers = ""; // รีเซ็ตค่าหัวเรื่องเป็นข้อความว่าง
        this.to = ""; // รีเซ็ตค่าส่งถึงเป็นข้อความว่าง
        this.detail = ""; // รีเซ็ตค่ารายละเอียดเป็นข้อความว่าง
        this.type = "Normal"; // รีเซ็ตค่าประเภทเอกสารเป็น "Normal" หรือค่าที่ต้องการเริ่มต้น
        this.timein = ""; // รีเซ็ตค่าเวลาเริ่มต้นเป็นข้อความว่าง (หากมี)
        this.timeout = ""; // รีเซ็ตค่าเวลาสิ้นสุดเป็นข้อความว่าง (หากมี)
        this.imageUrl = null; // รีเซ็ตค่ารูปภาพเป็นค่าว่างหรือ null หากต้องการลบรูปภาพ
        this.selectedFile = null; // รีเซ็ตค่าไฟล์ที่เลือกเป็นค่าว่างหรือ null หากต้องการลบไฟล์ที่เลือก
        this.isDraftSelected = false; // รีเซ็ตค่าการเลือกแบบร่างเป็น false
      } catch (error) {
        console.error("Error saving draft:", error); // แจ้งข้อผิดพลาดในการ console
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดในการบันทึกแบบร่าง",
          text: "กรุณาลองอีกครั้ง",
          showConfirmButton: true,
          confirmButtonText: "ตกลง",
        });
      }
    },
  },
};
</script>
<style></style>
