<template>
  <div id="calendar" @click="console.log(calendar.calendarApp)">
    <ScheduleXCalendar
      ref="calendar"
      v-if="calendarApp"
      :calendar-app="calendarApp"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { ScheduleXCalendar } from "@schedule-x/vue";
import axios from "axios";
import {
  createCalendar,
  viewDay,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createCurrentTimePlugin } from "@schedule-x/current-time";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";

const examResults = ref([]);
const calendarApp = ref(null);
const calendar = ref();
const calendarControls = createCalendarControlsPlugin();

const fetchExamResults = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/examresults`
    );
    examResults.value = response.data.data;
    console.log(examResults.value);
  } catch (error) {
    console.error(error.message);
  }
};

const createEvents = (results) => {
  if (!Array.isArray(results)) {
    console.error("Results is not an array:", results);
    return [];
  }

  return results.map((result) => {
    const meetingDateStr = result.Meeting.meeting_date;
    const meetingDate = new Date(meetingDateStr);
    const start = meetingDate.toISOString().slice(0, 16).replace("T", " "); // Format: YYYY-MM-DD HH:mm
    const end = new Date(meetingDate.getTime() + 60 * 45 * 1000)
      .toISOString()
      .slice(0, 16)
      .replace("T", " "); // Add one hour and format: YYYY-MM-DD HH:mm
    return {
      id: result._id,
      title: `${result.Position_applied} | ${result.Meeting_result} | ${result.Meeting.meeting_type}
      `,
      start: start,
      end: end,
    };
  });
};

onMounted(() => {
  fetchExamResults();
});

watch(examResults, (newVal) => {
  if (Array.isArray(newVal) && newVal.length > 0) {
    calendarApp.value = createCalendar({
      selectedDate: new Date(),
      views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
      defaultView: viewMonthGrid.name,
      events: createEvents(newVal),
      plugins: [
        createEventModalPlugin(),
        createCurrentTimePlugin(),
        calendarControls,
      ],
    });
    // เมื่อได้สร้าง calendarApp เรียบร้อยแล้ว ให้กำหนด calendarControls ให้กับ calendarApp
    calendarApp.value.controls = calendarControls;
  }
});
</script>

<style>
#calendar {
  width: 100%;
  max-height: 60vh;
  @media (min-width: 768px) {
    max-height: 60vh;
  }
  overflow-y: scroll;
}

#calendar .schedule-x-calendar {
  width: 100%;
  height: 100%;
}
</style>
