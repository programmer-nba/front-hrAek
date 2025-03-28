<template>
    <div>
      <h1>Upload PDF</h1>
      <div class="flex items-center">
        <input type="file" @change="onFileChange" class="w-52  mr-4"/>
        <button @click="uploadFile" class="">Upload</button>
      </div>
      <div v-if="uploadedFile">
        <h2>Edit PDF</h2>
        <form @submit.prevent="editPdf">
          <input v-model="formData.name" placeholder="Name" />
          <input v-model="formData.tel" placeholder="Tel" />
          <!-- Add more fields as needed -->
          <button type="submit">Submit</button>
        </form>
        <a :href="downloadLink" v-if="downloadLink">Download Edited PDF</a>
      </div>
      <h2>View PDF</h2>
      <div class="pt-3">
        {{ pdfUrl }}
        <PDFWithInput :pdfUrl="pdfUrl" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import PDFWithInput from "./PDFViewer.vue";
  
  export default {
    components: {
        PDFWithInput,
    },
    data() {
      return {
        file: null,
        uploadedFile: null,
        pdfUrl: null,
        formData: {
          name: '',
          tel: '',
        },
        downloadLink: null,
      };
    },
    methods: {
      onFileChange(e) {
        this.file = e.target.files[0];
      },
      async uploadFile() {
        try {
          const formData = new FormData();
          formData.append("file", this.file);
          const response = await axios.post(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/lawyer/pdf/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data) {
            this.uploadedFile = response.data.filename;
            this.pdfUrl = `${import.meta.env.VITE_VUE_APP_DECCAN}/uploads/pdf/${response.data.filename}`;
          }
        } catch (err) {
          console.error(err);
        }
      },
      async editPdf() {
        // Implement the logic to edit the PDF with form data and update the download link
      },
    },
  };
  </script>
  