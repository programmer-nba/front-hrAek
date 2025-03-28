<template>
  <div>
    <EmployeeRoles />
  </div>
</template>
<script>
import EmployeeRoles from "./settings/EmployeeRoles.vue";

export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    EmployeeRoles,
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>
<style scoped></style>
