<template>
  <div class="bg-white rounded p-3 flex flex-col items-center shadow-md">
    <div class="flex justify-between items-center py-2 w-full">
      <p class="m-0 text-lg font-bold">
        นัดหมาย
        <span class="px-2 hidden">{{ new Date().toLocaleDateString("th") }}</span>
      </p>
      <p class="text-center text-sm m-0">
        ทั้งหมด {{ events.length }}
        <span
          ><ButtonP
            icon="pi pi-arrow-right text-xs"
            class="focus:outline-0 focus:ring-0"
            @click="$router.push('/event')"
        /></span>
      </p>
    </div>
    <a-calendar v-model:value="dates" :fullscreen="false" @select="onSelect" class="max-w-[300px]">
      <template #dateCellRender="{ current }">
        <ul class="events relative">
          <li v-for="item in getListData(current)" :key="item.content" class="absolute -top-7 -right-1 w-2 h-2 rounded-full bg-orange-500 z-1">
          </li>
        </ul>
      </template>
      <template #monthCellRender="{ current }">
        <div v-if="getMonthData(current)" class="notes-month">
          <section>{{ getMonthData(current) }}</section>
          <span>Backlog number</span>
        </div>
      </template>
    </a-calendar>
    <div class="text-sm self-start w-full pt-2">
      <p class="m-0">
        <span class="px-2 bg-sky-200">{{ selectedDate.date }}/{{ selectedDate.month }}/{{ selectedDate.year + 543 }}</span>
        <span v-if="selectedDate.listData.length" class="text-xs px-2 text-gray-600">{{ selectedDate.listData.length }} รายการ</span>
        <span v-else class="text-xs px-2 text-gray-600">ไม่มีรายการ</span>
      </p>
      <div class="flex overflow-hidden gap-x-2">
        <small class="text-xs text-gray-600" v-for="(item, index) in selectedDate.listData" :key="index">
          <span class="pr-1 text-orange-400 text-sm">•</span>{{ item.content }}
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Dayjs } from 'dayjs';

export default {
  data() {
    return {
      isLoading: false,
      events: [],
      dates: Dayjs,
      selectedDate: {
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        listData: []
      }
    }
  },
  props: {
    employees: {
      type: Array,
      default: [],
    },
  },
  computed: {},
  mounted() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        this.isLoading = true;
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/event`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        })
        console.log(response.data)
        //console.log(new Date(response.data.data[1].startDate).getDate())
        if (response.data.status) {
          this.events = response.data.data.sort(
            (a, b) => new Date(a.startDate) - new Date(b.startDate)
          )
          this.$emit('event', this.events)
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        this.isLoading = false;
      }
    },
    getEmployeesImage(employeeId) {
      const imgs = this.employees
        .filter((em) => employeeId.includes(em._id))
        .map((employee) => `https://drive.google.com/thumbnail?id=${employee.image}`);
      return imgs;
    },
    getListData (value) {
      let listData;
      const matchDate = this.events.filter(event => new Date(event.startDate).getDate() === value.date() && new Date(event.startDate).getMonth() === value.month())
      if (matchDate.length) {
        listData = matchDate.map(list => ({ type: 'warning', content: list.title }))
      }
      return listData || [];
    },

    getMonthData (value) {
      if (value.month() === 8) {
        return 1394;
      }
    },

    onSelect (value) {
      this.selectedDate = {
        date: value.date(),
        month: value.month(),
        year: value.year(),
        listData: this.getListData(value)
      }
    }
  },
}
</script>

<style scoped>
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
