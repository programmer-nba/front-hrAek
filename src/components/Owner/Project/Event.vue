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
import FullEvents from "../../props/FullEvents.vue";

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

</style>