<template>
    <!-- express boxes -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 w-full items-center justify-center">
        <div class="h-16 sm:h-24 flex justify-around items-center p-2 bg-white rounded-md shadow-xl border-l-4 border-blue-300">
          <svg class="h-10 w-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p class="font-bold text-center text-sm m-0">
            พนักงาน
          </p>
          <div class="font-bold text-center text-xl">
            {{ employees.length }}
          </div>
        </div>

        <div class="h-16 sm:h-24 flex justify-around items-center p-2 bg-white rounded-md shadow-xl border-l-4 border-purple-300">
          <svg class="h-10 w-10 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <p class="font-bold text-sm m-0">
            งาน
          </p>
          <div class="font-bold text-xl text-center">
            {{ filterOngoingProjects.length }}
          </div>
        </div>

        <div class=" h-16 sm:h-24 flex justify-around items-center p-2 bg-white rounded-md shadow-xl border-l-4 border-amber-300">
          <svg class="h-10 w-10 text-yellow-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
            stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <rect x="4" y="5" width="16" height="16" rx="2" />
            <line x1="16" y1="3" x2="16" y2="7" />
            <line x1="8" y1="3" x2="8" y2="7" />
            <line x1="4" y1="11" x2="20" y2="11" />
            <rect x="8" y="15" width="2" height="2" />
          </svg>
          <p class="font-bold text-sm m-0">
            นัดหมาย
          </p>
          <div class="font-bold text-xl text-center">
            {{ calculateMonthlyAppointments }}
          </div>
        </div>

        <div class="h-16 sm:h-24 flex justify-around items-center p-2 bg-white rounded-md shadow-xl border-l-4 border-green-300">
          <svg class="h-10 w-10 text-green-400" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
            stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
            <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
          </svg>
          <p class="font-bold text-sm m-0">
            ประชุม
          </p>
          <div class="font-bold text-xl text-center">
            {{ calculateMonthlyAppointments1 }}
          </div>
        </div>
      </div>
</template>
<script>
import dayjs from 'dayjs'
import 'dayjs/locale/th'
export default {
    data() {
        return {
            
        }
    },
    props: {
        projects: {
            type: Array,
            default: []
        },
        employees: {
            type: Array,
            default: []
        },
        events: {
            type: Array,
            default: []
        }
    },
    computed: {
        filterOngoingProjects() {
            return this.projects
        },
        calculateMonthlyAppointments1() {
            if (!this.events.length) return this.events.length
            const currentMonth = dayjs().month()
            const currentYear = dayjs().year()
            return this.events.filter(event => {
                const eventMonth = dayjs(event.due_date).month()
                const eventYear = dayjs(event.due_date).year()
                return eventMonth === currentMonth && eventYear === currentYear
            }).length
        },
        calculateMonthlyAppointments() {
        if (!this.events.length) return this.events.length
            const currentMonth = dayjs().month();
            const currentYear = dayjs().year();
            return this.events.filter(event => {
                const eventMonth = dayjs(event.dueDate).month()
                const eventYear = dayjs(event.dueDate).year()
                return eventMonth === currentMonth && eventYear === currentYear
            }).length
        },
    },
    mounted() {
        
    },
    methods: {
        
    }
}
</script>
<style>
    
</style>