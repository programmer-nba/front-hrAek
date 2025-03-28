<script setup>
//import { ref } from 'vue'
import { UseDraggable } from '@vueuse/components'
//import PDF from "pdf-vue3";
import VuePdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";
const pdfUrl = defineProps(["pdfUrl"])

</script>

<template>
    <div class="border border-black relative overflow-hidden">
        <UseDraggable v-slot="{ x, y }" :initial-value="{ x: 10, y: 10 }"
        class="absolute cursor-move z-[1000] bg-slate-500"
        >
            Drag me! I am at {{ x }}, {{ y }}
        </UseDraggable>
        <!-- <div class="h-screen p-10">
            <PDF :src="pdfUrl.pdfUrl" pdfWidth="50%" />
        </div> -->
        <vue-pdf-app style="height: 100vh;" :pdf="pdfUrl"></vue-pdf-app>
    </div>
</template>