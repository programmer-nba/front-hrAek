<template>
  <div>
    <div v-if="showModal" class="fixed z-50 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div
          class="bg-white w-full max-w-lg rounded-lg overflow-hidden shadow-xl mx-auto"
          @click.self="closeModal"
        >
          <div class="p-8">
            <h2 class="text-xl font-bold mb-4 text-center">สัญญาร่าง</h2>
            <form @submit.prevent="validateForm">
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="user_id"
                  >ID</label
                >
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="user_id"
                  type="text"
                  v-model="formData.user_id"
                  readonly
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="position"
                  >ชื่อ</label
                >
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="position"
                  type="text"
                  v-model="formData.name"
                  readonly
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="position"
                  >อีเมล</label
                >
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="position"
                  type="text"
                  v-model="formData.email"
                  readonly
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="position"
                  >ตำแหน่งงาน</label
                >
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="position"
                  type="text"
                  v-model="formData.argument_position"
                  readonly
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="salary"
                  >เงินเดือน</label
                >
                <div class="flex">
                  <input
                    class="shadow appearance-none border rounded-l w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="salary"
                    type="number"
                    v-model.number="formData.argument_salary"
                    :class="{ 'border-red-500': salaryError }"
                    @blur="validateSalary"
                  />
                  <span
                    class="inline-flex items-center px-3 text-gray-700 bg-gray-200 border border-r-0 border-gray-300 rounded-r"
                  >
                    บาท
                  </span>
                </div>
                <p v-if="salaryError" class="text-red-500 text-sm">
                  {{ salaryError }}
                </p>
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="salaryType"
                  >ประเภท</label
                >
                <select
                  v-model="formData.argument_type"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  @change="handleAgreementTypeChange"
                >
                  <option value="" disabled>เลือกประเภทสัญญา</option>
                  <option
                    v-for="item in agreementTypes.filter(
                      (item) => item.active && item.standard
                    )"
                    :key="item._id"
                    :value="item.code"
                  >
                    {{ item.title }}
                  </option>
                </select>
              </div>
              <div class="mb-4">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >รายละเอียด</label
                >
                <Editor
                  v-model="formData.argument_detail"
                  name="description"
                  id="description"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                ></Editor>
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="startDate"
                  >วันหมดอายุ</label
                >
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="startDate"
                  type="date"
                  v-model="formData.argument_timeout"
                />
              </div>
              <div class="flex justify-end">
                <button
                  type="button"
                  class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
                  @click="closeModal"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  :disabled="submitDisabled"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      v-if="showModal"
    ></div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import emailjs from "emailjs-com"; // ตรวจสอบว่าคุณได้導入 EmailJS ถูกต้อง

export default {
  name: "ContractDraft",
  emits: ["close"],
  props: {
    applicantInfo: {
      type: Object,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      salaryError: "",
      submitDisabled: false,
      formData: {
        user_id: "",
        name: "",
        email: "",
        argument_position: "",
        argument_salary: "",
        argument_type: "",
        argument_detail: "",
        argument_timeout: "",
        argument_status: "รอยอมรับ",
      },
      agreementTypes: [],
      selectedAgreementContent: "",
    };
  },
  created() {
    this.formDataInit();
    this.fetchAgreementTypes();
  },
  methods: {
    formDataInit() {
      this.formData = {
        user_id: this.applicantInfo._id,
        name: this.applicantInfo.name,
        email: this.applicantInfo.email,
        argument_position: this.position,
      };
    },

    async fetchAgreementTypes() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/lawyer/all`
        );
        console.log("agreementTypes", response);
        this.agreementTypes = response.data.data;
      } catch (error) {
        console.error("Error fetching agreement types:", error);
      }
    },

    handleAgreementTypeChange() {
      const selectedAgreement = this.agreementTypes.find(
        (item) => item.code === this.formData.argument_type
      );
      this.selectedAgreementContent = selectedAgreement
        ? selectedAgreement.content
        : "";
      this.formData.argument_detail = this.selectedAgreementContent; // อัปเดตค่า argument_detail
    },

    validateForm() {
      // ตรวจสอบว่าได้กรอกข้อมูลที่จำเป็นหรือไม่
      if (
        !this.formData.argument_salary ||
        !this.formData.argument_type ||
        !this.formData.argument_timeout
      ) {
        Swal.fire({
          title: "กรุณากรอกข้อมูลให้ครบถ้วน",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
        return;
      }

      this.confirmSubmit();
    },

    async submitForm() {
      this.submitDisabled = true;
      try {
        await axios.post(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/agreement/Insert/`,
          this.formData,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        await this.sendEmail(); // Call the sendEmail method here
        Swal.fire({
          title: "ส่งข้อมูลสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถส่งข้อมูลได้ โปรดลองอีกครั้ง",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        console.error("Error submitting form:", error);
      }
      this.submitDisabled = false;
    },

    async sendEmail() {
      const templateParams = {
        to_email: this.formData.email,
        from_name: this.formData.name,
        subject: "ข้อตกลงร่างถูกส่งให้คู่สัญญา",
        body: `สวัสดี ${this.formData.name},\n\nข้อตกลงร่างถูกสร้างขึ้นเรียบร้อยแล้ว เราได้ส่งข้อตกลงถึงคุณผ่านระบบอีเมลแล้ว โปรดตรวจสอบและดำเนินการตอบรับหรือปฏิเสธตามความเหมาะสม\n\nขอบคุณ\nทีมงาน`,
      };

      // ใส่ Service ID และ Template ID ของคุณที่นี่
      const serviceId = "service_zofbsv8";
      const templateId = "template_lekn2lr";

      try {
        await emailjs.send(serviceId, templateId, templateParams, {
          publicKey: "RuKpQlH3r9TsQH38W", // ถ้าจำเป็น
        });

        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
        // จัดการข้อผิดพลาดที่เกิดขึ้นในการส่งอีเมล
      }
    },

    validateSalary() {
      if (this.formData.argument_salary < 0) {
        this.salaryError = "เงินเดือนต้องมากกว่า 0";
      } else {
        this.salaryError = "";
      }
    },

    handleSubmit() {
      this.submitDisabled = true;
      this.confirmSubmit();
    },

    confirmSubmit() {
      Swal.fire({
        title: "Confirm submission",
        text: "Are you sure you want to submit this agreement draft to the candidate?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, submit",
        cancelButtonText: "Cancel",
        customClass: {
          confirmButton: "bg-green-500 text-white",
          cancelButton: "bg-red-500 text-white",
        },
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.submitDisabled = true;
            await this.submitForm();
          }
        })
        .finally(() => {
          this.closeModal();
        });
    },

    closeModal() {
      this.$emit("close");
    },
  },
  watch: {
    showModal(newVal) {
      if (newVal) {
        this.resetForm();
      }
    },
    "formData.argument_type": function (newValue) {
      this.handleAgreementTypeChange();
    },
  },
};
</script>

<style>
/* Responsive Styles */

/* สำหรับอุปกรณ์มือถือ */
@media (max-width: 767px) {
  .max-w-lg {
    max-width: 90%;
  }

  .flex-col {
    flex-direction: column;
  }

  .justify-center {
    justify-content: center;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  label {
    font-size: 0.875rem;
  }
}

/* สำหรับแท็บเล็ต */
@media (min-width: 768px) and (max-width: 1023px) {
  .max-w-lg {
    max-width: 80%;
  }
}

/* สำหรับจอคอมพิวเตอร์ */
@media (min-width: 1024px) {
  .max-w-lg {
    max-width: 50%;
  }

  .flex-row {
    flex-direction: row;
  }

  .justify-end {
    justify-content: flex-end;
  }

  .mb-4 {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  label {
    font-size: 1rem;
  }
}
</style>
