<template>
  <div class="h-screen">
    <FullEvents  />
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Dialog from "primevue/dialog";
import Swal from "sweetalert2";
import Sidebar from "primevue/sidebar";
import FullEvents from "../props/FullEvents.vue";

export default {
  components: {
    Dialog,
    Sidebar,
    FullEvents
  },

  data() {
    return {
      
    }
  },
  computed: {
    
  },
  mounted() {
    
  },

  methods: {
    
  },
}
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
