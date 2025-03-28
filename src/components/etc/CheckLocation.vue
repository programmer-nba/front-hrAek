<template>
    <div class="w-full flex justify-center my-3">
        <div :class="['text-white py-2 rounded-xl w-fit px-5 text-center flex justify-center items-center flex-col', inPlace ? 'bg-green-500' : 'bg-red-500']">
            <div class="flex" :class="hideTargetLocation ? 'hidden' : ''">
                <div class="flex gap-2 items-center">
                    <div class="hidden flex-col">
                        <p class="p-0 m-0 text-lg">บริษัทดิจิทัลเดเวอร์ลอปเปอร์</p>
                        <small class="text-center">{{ placeToCheck?.lat?.toFixed(2) }}, {{ placeToCheck?.lon?.toFixed(2)}}</small>
                        <small class="hidden">{{ Math.abs(placeToCheck?.lat-location?.lat).toFixed(2) }}, {{ Math.abs(placeToCheck?.lon-location?.lon).toFixed(2) }}</small>
                    </div>
                </div>
            </div>
            <div class="text-xl relative py-2 px-3 font-bold rounded-xl mt-3" :class="[hideInPlace ? 'hidden' : '', inPlace ? 'text-emerald-600 bg-white' : 'text-red-600 bg-white']">
                {{ inPlace ? 'อยู่ในพื้นที่' : 'อยู่นอกพื้นที่' }}
                <i class="pi pi-refresh hover:bg-white/50 p-2 rounded-full cursor-pointer absolute -right-9 top-1/2 -translate-y-1/2 text-white" @click="getLocation"></i>
            </div>
            <div :class="hideCurLocation ? 'hidden' : ''">
                <small>{{ location?.lat?.toFixed(2) }}, {{ location?.lon?.toFixed(2) }}</small>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import geoFindMe from "../../services/location";

onMounted(()=>{
    getLocation()
})

const { hideTargetLocation, hideCurLocation, hideInPlace } = defineProps(["hideTargetLocation", "hideCurLocation", "hideInPlace"])
const emits = defineEmits("check")

const placeToCheck = ref({
    lat: 18.76367668922103,
    lon: 98.94477079842608
})
const location = ref()
const safeAreaMin = ref(0.00)
const safeAreaMax = ref(0.02)

const getLocation = async () => {
    location.value = await geoFindMe()
}

const inPlace = computed(() => {
    const dlat = Math.abs(placeToCheck.value?.lat - location.value?.lat)
    const dlon = Math.abs(placeToCheck.value?.lon - location.value?.lon)
    return parseFloat(dlat.toFixed(2)) >= safeAreaMin.value && parseFloat(dlat.toFixed(2)) <= safeAreaMax.value 
    && parseFloat(dlon.toFixed(2)) >= safeAreaMin.value && parseFloat(dlon.toFixed(2)) <= safeAreaMax.value
})

watch((inPlace), (newval, oldVal) => {
    emits('check', inPlace.value)
})
        
</script>

<style scoped>

</style>