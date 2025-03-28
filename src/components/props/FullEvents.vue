<template>
  <div class="bg-white rounded p-3 flex flex-col items-center">
    <div class="flex justify-between items-center py-2 w-full">
      <p class="m-0 text-lg font-bold">
        นัดหมาย
        <span class="px-2">{{ new Date().toLocaleDateString("th") }}</span>
      </p>
    </div>
    <div class="w-full flex">
      <ButtonP
        label="เพิ่มนัดหมาย"
        class="bg-blue-700 px-3 py-2 rounded hover:shadow-md text-white"
        icon="pi pi-plus"
        iconPos="right"
        @click="openEventHandle"
      />
    </div>
    <a-calendar v-model:value="dates" @select="onSelect">
      <template #dateCellRender="{ current }">
        <ul class="events flex flex-col gap-y-1">
          <li
            v-for="item in getListData(current)"
            :key="item.content"
            :class="[
              'rounded border-l-[4px] pl-1 flex items-center justify-between',
              'hover:shadow-md hover:opacity-50',
              item.type === 'ประชุม'
                ? 'bg-sky-200 border-l-sky-500'
                : item.type === 'อีเวนต์'
                ? 'bg-pink-200 border-l-pink-500'
                : 'border-l-orange-500 bg-yellow-200',
            ]"
          >
            <div>
              <p class="m-0 text-gray-600 max-w-[60%] text-ellipsis">
                {{ item.content }}
              </p>
              <small class="max-w-[60%] text-clip"
                >{{
                  item.startTime
                    ? convertTimestamp(item.startTime)
                    : "ไม่ระบุเวลา"
                }}
                {{
                  item.endTime ? " - " + convertTimestamp(item.endTime) : null
                }}</small
              >
            </div>
            <i
              v-if="item.remind"
              class="pi pi-star-fill text-yellow-500 drop-shadow"
            ></i>
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
  </div>

  <Dialog
    v-model:visible="openEvent"
    modal
    header=" "
    :style="{ width: '50vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="flex flex-col gap-1 mb-3 text-sm">
      <label for="eventType" class="font-semibold w-6rem">ประเภทนัดหมาย</label>
      <Dropdown
        v-model="event.eventType"
        :options="eventTypes"
        placeholder="เลือกประเภท"
        class="w-full md:w-14rem border"
      />
    </div>
    <div class="flex items-center gap-x-2 text-sm">
      <div class="flex flex-col gap-1 mb-3">
        <label for="startDate" class="font-semibold w-6rem">วันที่เริ่ม</label>
        <CalendarP
          showButtonBar
          placeholder="วว/ดด/ปปปป"
          v-model="event.startDate"
          iconDisplay="input"
          inputId="startDate"
          inputClass="border text-sm py-2 text-center"
          dateFormat="dd/mm/yy"
        />
      </div>
      <div class="flex flex-col gap-1 mb-3">
        <label for="endDate" class="font-semibold w-6rem"
          >วันที่สิ้นสุด (ถ้ามี)</label
        >
        <CalendarP
          showButtonBar
          placeholder="วว/ดด/ปปปป"
          v-model="event.endDate"
          iconDisplay="input"
          inputId="endDate"
          inputClass="border py-2 text-sm text-center"
          dateFormat="dd/mm/yy"
        />
      </div>
    </div>
    <div class="flex items-center gap-x-2 text-sm">
      <div class="flex flex-col gap-1 mb-3">
        <label for="startTime" class="font-semibold w-6rem">เวลา</label>
        <CalendarP
          v-model="event.startTime"
          iconDisplay="input"
          inputId="startTime"
          inputClass="border py-2 text-center"
          timeOnly
          hourFormat="24"
        />
      </div>
      <div class="flex flex-col gap-1 mb-3">
        <label for="endTime" class="font-semibold w-6rem">ถึง</label>
        <CalendarP
          v-model="event.endTime"
          iconDisplay="input"
          inputId="endTime"
          inputClass="border py-2 text-center"
          timeOnly
          hourFormat="24"
        />
      </div>
    </div>
    <div class="flex flex-col gap-1 mb-3 text-sm">
      <label for="title" class="font-semibold w-6rem">หัวข้อ</label>
      <input
        id="title"
        type="text"
        class="p-2 border rounded focus:outline-blue-500"
        placeholder="เพิ่มหัวข้อนัดหมาย"
        v-model="event.title"
      />
    </div>
    <div class="flex flex-col gap-1 mb-3 text-sm">
      <label for="detail" class="font-semibold w-6rem"
        >รายละเอียดเพิ่มเติม</label
      >
      <textarea
        id="detail"
        v-model="event.detail"
        class="border p-2 min-h-[200px] focus:outline-blue-500"
        placeholder="เพิ่มรายละเอียดนัดหมาย"
      >
      </textarea>
    </div>

    <div class="flex justify-between items-center gap-x-5">
      <div class="flex flex-col gap-1 mb-3 text-sm w-full">
        <label for="location" class="font-semibold w-6rem">สถานที่</label>
        <input
          id="location"
          type="text"
          class="p-2 border rounded focus:outline-blue-500"
          placeholder="เพิ่มสถานที่นัดหมาย"
          v-model="event.location"
        />
      </div>
      <div class="flex flex-col items-end gap-1 mb-3 text-sm w-full">
        <label for="location" class="font-semibold w-6rem">สำคัญ</label>
        <InputSwitch v-model="event.remind" />
      </div>
    </div>
    <div class="flex justify-content-end gap-x-5 pt-3">
      <ButtonP
        v-if="!onEdit"
        type="button"
        class="bg-green-700 px-4 py-2 rounded text-white hover:bg-green-500"
        :loading="isLoading"
        label="บันทึก"
        @click="createEvent"
      ></ButtonP>
      <ButtonP
        v-else
        type="button"
        class="bg-orange-700 px-4 py-2 rounded text-white hover:bg-orange-500"
        :loading="isLoading"
        label="แก้ไข"
        @click="updateEvent"
      ></ButtonP>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="openEventDetail"
    modal
    :header="`วันที่ ${selectedDate.date}/${selectedDate.month}/${
      selectedDate.year + 543
    }`"
    :style="{ width: '50vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="border-t pt-2 w-full">
      <p>
        <span v-if="selectedDate.listData.length" class="px-2 text-gray-600"
          >{{ selectedDate.listData.length }} รายการ</span
        >
        <span v-else class="px-2 text-gray-600">ไม่มีรายการ</span>
      </p>
      <div class="flex flex-col gap-y-2">
        <div
          class="text-gray-600"
          v-for="(item, index) in selectedDate.listData"
          :key="index"
        >
          <div
            :class="[
              item.type == 'ประชุม'
                ? 'bg-sky-200 border-l-4 border-sky-500'
                : item.type == 'อีเวนต์'
                ? 'bg-pink-200 border-l-4 border-pink-500'
                : 'bg-yellow-200 border-l-4 border-yellow-500',
              'px-2 py-3 rounded relative',
            ]"
          >
            <i
              v-if="item.remind"
              class="pi pi-star-fill text-yellow-500 drop-shadow text-3xl absolute -right-1 -bottom-1 cursor-pointer"
              @click="updateRemindEvent(item, false)"
            ></i>
            <i
              v-else
              class="pi pi-star text-yellow-500 drop-shadow text-3xl absolute -right-1 -bottom-1 cursor-pointer"
              @click="updateRemindEvent(item, true)"
            ></i>
            <div class="flex absolute right-2 top-1 gap-x-5">
              <div v-if="item.menu" class="flex gap-x-2">
                <i
                  @click="deleteEvent(item)"
                  class="pi pi-trash bg-white rounded-full p-2 cursor-pointer hover:text-red-500"
                ></i>
                <i
                  @click="editEventHandle(item)"
                  class="pi pi-pencil bg-white rounded-full p-2 cursor-pointer hover:text-orange-500"
                ></i>
              </div>
              <i
                class="pi pi-ellipsis-v pl-5 cursor-pointer p-2"
                @click="
                  () => {
                    item.menu = !item.menu;
                  }
                "
              ></i>
            </div>
            <p class="m-0 font-bold pb-1">{{ item.content }}</p>
            <p>
              {{
                item.startDate
                  ? new Date(item.startDate).toLocaleDateString("th")
                  : null
              }}
              {{
                item.endDate
                  ? " - " + new Date(item.endDate).toLocaleDateString("th")
                  : null
              }}
              <span class="opacity-80 px-2"
                >{{
                  item.startTime
                    ? `เวลา (${convertTimestamp(
                        new Date(item.startTime).getTime()
                      )}`
                    : null
                }}
                {{
                  item.endTime
                    ? " - " +
                      convertTimestamp(new Date(item.endTime).getTime()) +
                      ")"
                    : null
                }}</span
              >
            </p>
            <textarea
              class="m-0 w-full p-2 bg-white/80 rounded-lg"
              v-model="item.detail"
              :disabled="true"
            >
            </textarea>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import axios from "axios";
import { Dayjs } from "dayjs";

export default {
  data() {
    return {
      isLoading: false,
      events: [],
      event: {},
      openEventDetail: false,
      onEdit: false,
      openEvent: false,
      dates: Dayjs,
      onSelectedVal: null,
      selectedDate: {
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        listData: [],
      },
      eventTypes: ["ประชุม", "อีเวนต์", "อื่น ๆ"],
    };
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
    async createEvent() {
      this.isLoading = true;
      let payload = this.event;
      console.log(payload);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/event/create`,
          payload
        );
        if (data.status) {
          console.log(data);
          this.event = {};
          this.openEvent = false;
          this.fetchEvents();
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
        this.onEdit = false;
      }
    },
    async updateEvent() {
      this.isLoading = true;
      let payload = this.event;
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/event/${this.event._id}`,
          payload
        );
        if (data.status) {
          console.log(data);
          this.event = {};
          this.openEvent = false;
          this.onEdit = false;
          this.openEventDetail = false;
          this.fetchEvents();
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },

    async updateRemindEvent(item, remind) {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/event/${item._id}`,
          { remind: remind }
        );
        if (data.status) {
          item.remind = !item.remind;
          console.log(data);
          this.openEvent = false;
          this.onEdit = false;
          this.fetchEvents();
        }
      } catch (err) {
        console.log(err);
      }
    },

    async deleteEvent(item, remind) {
      this.isLoading = true;
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/event/${item._id}`
        );
        if (data.status) {
          item.remind = !item.remind;
          console.log(data);
          this.event = {};
          this.openEvent = false;
          this.onEdit = false;
          this.openEventDetail = false;
          this.fetchEvents();
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    openEventHandle() {
      this.openEvent = true;
      this.onEdit = false;
      this.event = {};
    },
    editEventHandle(val) {
      this.openEvent = true;
      this.onEdit = true;
      this.event = this.events.find((e) => e._id === val._id);
    },
    async fetchEvents() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/event`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data);
        if (response.data.status) {
          this.events = response.data.data.sort(
            (a, b) => new Date(a.startDate) - new Date(b.startDate)
          );
          this.$emit("event", this.events);
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
        .map(
          (employee) =>
            `https://drive.google.com/thumbnail?id=${employee.image}`
        );
      return imgs;
    },
    getListData(value) {
      let listData;
      const matchDate = this.events.filter(
        (event) =>
          new Date(event.startDate).getDate() === value.date() &&
          new Date(event.startDate).getMonth() === value.month()
      );
      if (matchDate.length) {
        listData = matchDate.map((list) => ({
          type: list.eventType,
          content: list.title,
          startTime: list.startTime,
          endTime: list.endTime,
          remind: list.remind,
          detail: list.detail,
          startDate: list.startDate,
          endDate: list.endDate,
          _id: list._id,
        }));
      }
      return listData || [];
    },

    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },

    onSelect(value) {
      this.selectedDate = {
        date: value.date(),
        month: value.month(),
        year: value.year(),
        listData: this.getListData(value),
      };
      this.onSelectedVal = value;
      this.openEventDetail = true;
    },

    convertTimestamp(timestamp) {
      const date = new Date(timestamp);
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      //const seconds = date.getUTCSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
  },
};
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
