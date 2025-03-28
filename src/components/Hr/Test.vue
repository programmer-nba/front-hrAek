<template>
 <div class="container mx-auto p-4">
   <h1 class="text-2xl font-bold mb-4">Task Management</h1>
   <div class="overflow-x-auto">
     <table class="table-auto w-full">
       <thead>
         <tr class="bg-gray-200">
           <th class="px-4 py-2">ID</th>
           <th class="px-4 py-2">Status</th>
           <th class="px-4 py-2">Details</th>
           <th class="px-4 py-2">Timestamp</th>
           <th class="px-4 py-2">Actions</th>
         </tr>
       </thead>
       <tbody>
         <tr v-for="task in tasks" :key="task.id" class="border-b">
           <td class="px-4 py-2">{{ task.id }}</td>
           <td class="px-4 py-2">{{ task.status }}</td>
           <td class="px-4 py-2">{{ task.details }}</td>
           <td class="px-4 py-2">{{ task.timestamp }}</td>
           <td class="px-4 py-2 flex justify-center">
             <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
               View
             </button>
             <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
               Confirm
             </button>
           </td>
         </tr>
       </tbody>
     </table>
   </div>
 </div>
</template>

<script>
import { ref } from 'vue'

export default {
 setup() {
   const tasks = ref([
     {
       id: '00076',
       status: 'Normal',
       details: 'asdfasdfasdfsadfsadfsadf',
       timestamp: '30 เมษายน 2024 14:27:27'
     },
     {
       id: '00075',
       status: 'Normal',
       details: 'asdfasdfasdfsadfsadfsadf',
       timestamp: '30 เมษายน 2024 14:27:10'
     },
     {
       id: '00074',
       status: 'Normal',
       details: 'asdfasdfasdfsadfsadfsadf',
       timestamp: '30 เมษายน 2024 14:27:03'
     },
     {
       id: '00073',
       status: 'Normal',
       details: 'asdfasdfasdfsadfsadfsadf',
       timestamp: '30 เมษายน 2024 14:27:00'
     }
   ])

   return {
     tasks
   }
 }
}
</script>