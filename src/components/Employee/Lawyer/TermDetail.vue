<template>
    <div class="flex justify-center">
        <Button icon="pi pi-bars" @click="openDetailHandler" />
        <Dialog
            v-model:visible="open"
            position="bottom"
            modal
            header=" "
            :style="{ width: '50vw' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        >
            <h1 class="text-center font-bold bg-blue-100 py-2 rounded break-words">
                {{ term.title }}
            </h1>
            <article class="text-justify py-3">
                <p class="break-words" v-html="term.content"></p>
            </article>
            <div class="p-3">
                <div class="w-[10rem] h-auto flex flex-col gap-y-1 justify-center items-center" v-for="sig in term.signatures" :key="sig._id">
                    <img :src="sig.img" >
                    <p class="self-start">{{ sig.name }}</p>
                    <small>( {{ sig.position }} )</small>
                </div>
            </div>
            <template #footer>
                <div class="flex gap-x-5 py-2 justify-end">
                    <Button label="ลบสัญญา" class="px-2 text-red-500" :class="deleteHiddenCheck(term)" @click="deleteTerm" />
                    <OpenTerm :isEdit="true" label="แก้ไขสัญญา" :data="term" @editTerm="editTerm" />
                </div>
            </template>
        </Dialog>
    </div>
</template>
<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import OpenTerm from "./OpenTerm.vue";

const { term } = defineProps(["term"])
const emits = defineEmits(["edit", "delete"])

const open = ref(false);
const openDetailHandler = () => {
    open.value = true;
}
const editTerm = (val) => {
    open.value = false;
    emits("edit", val)
}
const deleteTerm = () => {
    open.value = false;
    emits("delete", term._id)
}
const deleteHiddenCheck = (val) => {
    const result = 
    !term.standard && term.status.length > 0 && term.status[term.status.length-1]?.name !== 'ฉบับร่าง'
    ? 'hidden'
    : ''
}
</script>
<style scoped></style>
