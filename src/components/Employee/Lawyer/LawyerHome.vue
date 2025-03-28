<template>
    <Toast />
    <div class="py-3">
        <h1 class="text-center font-bold text-xl text-blue-600">สัญญา</h1>
        <div class="w-full flex flex-wrap items-center gap-x-2 justify-center py-3">
            <p class="m-0 p-0">ตัวกรอง : </p>
            <div class="flex justify-center gap-x-2 border divide-x-2 rounded bg-gray-100">
                <div class="flex gap-x-2 items-center p-2">
                    <Checkbox name="active" v-model="filters" value="active" />
                    <label for="active" class="">เปิดใช้งาน</label>
                </div>
                <div class="flex gap-x-2 items-center p-2">
                    <Checkbox name="disActive" v-model="filters" value="disActive" />
                    <label for="disActive" class="">ปิดใช้งาน</label>
                </div>
            </div>
            <div class="flex justify-center gap-x-2 border divide-x-2 rounded bg-gray-100">
                <div class="flex gap-x-2 items-center p-2">
                    <Checkbox name="notStandard" v-model="filters" value="notStandard" />
                    <label for="notStandard" class="">สัญญาลูกค้า</label>
                </div>
                <div class="flex gap-x-2 items-center p-2">
                    <Checkbox name="isStandard" v-model="filters" value="standard" />
                    <label for="isStandard" class="">สัญญาแม่แบบ</label>
                </div>
            </div>
        </div>

        <div class="pb-2 px-2 flex mobileL:justify-start justify-center">
            <OpenTerm :isEdit="false" label="เพิ่มสัญญา" @createTerm="createTerm" />
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-[1000px] sm:w-full table-auto border-collapse border">
                <thead class="text-center bg-gray-100 border">
                    <tr>
                        <th class="py-2 flex justify-center">
                            <div class="w-2 h-2 relative">
                                <Checkbox class="absolute -left-[0.150rem] -top-[0.150rem]" name="termsSelected"
                                    v-model="termsSelected" :binary="true" />
                            </div>
                        </th>
                        <th class="py-2 w-16">ที่</th>
                        <th class="py-2 w-32">รหัส</th>
                        <th class="py-2 w-72" >หัวข้อสัญญา</th>
                        <th class="py-2 w-72">ผู้ทำสัญญา</th>
                        <th class="py-2 w-32">สถานะ</th>
                        <th class="py-2 w-72">ประเภท</th>
                        <th class="py-2 w-64">เปิดใช้งาน</th>
                        <th class="py-2 w-32"></th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-if="terms.length < 1">
                        <td class="border pt-2 bg-gray-100"></td>
                        <td class="border pt-2"></td>
                        <td class="border pt-2"></td>
                        <td class="border pt-2">ไม่มีข้อมูล</td>
                        <td class="border pt-2"></td>
                        <td class="border pt-2"></td>
                        <td class="border pt-2"></td>
                        <td class="border pt-2"></td>
                        <td class="border pt-2"></td>
                    </tr>
                    <tr v-else v-for="(contract, index) in terms" :key="contract._id">
                        <td class="border pt-4" style="background-color: rgb(243 244 246);">
                            <Checkbox v-model="terms[index].selected" :binary="true" />
                        </td>
                        <td class="border pt-4">{{ index + 1 }}</td>
                        <td class="border pt-4 max-w-[3rem]">{{ contract.code }}</td>
                        <td class="border pt-4 max-w-[6rem]">
                            <p class="line-clamp-2 p-0 m-0 text-center opacity-50">{{ contract.title }}</p>
                        </td>
                        <td class="border pt-4 max-w-[6rem]">
                            <p class="line-clamp-2 p-0 m-0 text-center">{{ contract.user?.name }}</p>
                        </td>
                        <td class="border pt-4 max-w-[2rem]">
                            <p v-if="!contract.standard" class="line-clamp-2 p-0 m-0 text-center"
                                :class="termStatus(contract.status[contract.status.length - 1]?.name || 'รอลงนาม')">{{
                                    contract.status[contract.status.length-1]?.name || 'รอลงนาม' }}</p>
                        </td>
                        <td class="border pt-4 max-w-[1rem]">
                            <p :class="[contract.standard ? 'text-blue-400' : '']">{{ contract.standard ? 'สัญญาแม่แบบ'
                                : 'สัญญาลูกค้า' }}</p>
                        </td>
                        <td class="border pt-3 max-w-[1rem]">
                            <InputSwitch v-model="terms[index].active"
                                @change="updateTerm({ _id: contract._id, active: contract.active })" />
                        </td>
                        <td class="border pt-4 max-w-[1rem]">
                            <div class="flex items-center justify-center text-center h-full">
                                <TermDetail @edit="updateTerm" @delete="deleteTerm" :term="contract" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>
<script setup>
import axios from "axios"
import Swal from "sweetalert2"
import { ref, onMounted, computed, watch } from "vue"
import Checkbox from 'primevue/checkbox'
import InputSwitch from 'primevue/inputswitch'
import OpenTerm from './OpenTerm.vue'
import TermDetail from './TermDetail.vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

onMounted(() => {
    fetchTerms()
})

// term
const openTermButton = ref()
const termsSelected = ref(false)
const loading = ref(false)
const isEditTerm = ref(false)
const termValidates = ref([])
const openTermDialog = ref(false)
const filters = ref([])
const term = ref({})
const originalTerms = ref([])

const termStatus = (status) => {
    switch (status) {
        case 'รอลงนาม':
            return 'text-yellow-500'
        default:
            return ''
    }
}

const termsFilterActive = computed(() => {
    const result =
        filters.value.includes('active') && !filters.value.includes('disActive') ? originalTerms.value.filter(t => t.active)
            : filters.value.includes('disActive') && !filters.value.includes('active') ? originalTerms.value.filter(t => !t.active)
                : filters.value.includes('disActive') && filters.value.includes('active') ? originalTerms.value
                    : originalTerms.value
    return result
})
const terms = computed(() => {
    const result =
        filters.value.includes('standard') ? termsFilterActive.value.filter(t => t.standard)
            : filters.value.includes('notStandard') ? termsFilterActive.value.filter(t => !t.standard)
                : termsFilterActive.value
    return result
})
watch(() => termsSelected.value, () => {
    if (termsSelected.value) {
        originalTerms.value.forEach(t => {
            let ot = terms.value.find(o => o === t)
            ot.selected = true
        })
    } else {
        originalTerms.value.forEach(t => {
            let ot = terms.value.find(o => o === t)
            ot.selected = false
        })
    }
})
const fetchTerms = async () => {
    loading.value = true
    const url = `${import.meta.env.VITE_VUE_APP_DECCAN}/lawyer/all`
    const headers = { 'auth-token': localStorage.getItem('token') }
    try {
        const { data } = await axios.get(url, { headers: headers })
        console.log('fetchTerms data:', data)
        if (data.data) {
            originalTerms.value = data.data
        }
    }
    catch (e) {
        console.log('fetchedTerms ERROR:', e)
    }
    finally {
        loading.value = false
    }
}

const createTerm = async (val) => {
    term.value = val
    if (!term.value.title || !term.value.code) {
        Swal.fire({
            icon: 'info',
            text: !term.value.title ? 'กรุณาเพิ่มหัวข้อสัญญา' : 'กรุณาเพิ่มรหัสสัญญา',
            showConfirmButton: false,
            timer: 1500,
        })
        if (!term.value.title) {
            termValidates.value.push('title')
        } else if (!term.value.code) {
            termValidates.value.push('code')
        } else {
            termValidates.value = []
        }
        return
    }
    loading.value = true
    const url = `${import.meta.env.VITE_VUE_APP_DECCAN}/lawyer/create`
    const payload = term.value
    const headers = { 'auth-token': localStorage.getItem('token') }
    try {
        const { data } = await axios.post(url, payload, { headers: headers })
        console.log('createTerm data:', data)
        if (data.status) {
            fetchTerms()
            openTermDialog.value = false
        }
    }
    catch (e) {
        console.log('createTerms ERROR:', e)
        Swal.fire({
            icon: 'error',
            text: e.response.data.message,
            showConfirmButton: false,
            timer: 1500,
        })
    }
    finally {
        loading.value = false
    }
}

const updateTerm = async (val) => {
    term.value = val
    loading.value = true
    const url = `${import.meta.env.VITE_VUE_APP_DECCAN}/lawyer/${term.value._id}`
    const payload = term.value
    console.log(payload)
    const headers = { 'auth-token': localStorage.getItem('token') }
    try {
        const { data } = await axios.put(url, payload, { headers: headers })
        console.log('updateTerm data:', data)
        if (data.status) {
            if (term.value.title) {
                Swal.fire({
                    icon: 'success',
                    text: 'อัพเดทสัญญาสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500,
                })
            } else {
                toast.add({ severity: 'success', summary: 'สำเร็จ', detail: 'อัพเดทสัญญาแล้ว', life: 3000 })
            }

            fetchTerms()
        }
    }
    catch (e) {
        console.log('updateTerms ERROR:', e)
        Swal.fire({
            icon: 'error',
            text: 'อัพเดทสัญญาล้มเหลว',
            showConfirmButton: false,
            timer: 1500,
        })
    }
    finally {
        loading.value = false
    }
}

const deleteTerm = async (id) => {
    loading.value = true
    const url = `${import.meta.env.VITE_VUE_APP_DECCAN}/lawyer/${id}`
    const headers = { 'auth-token': localStorage.getItem('token') }
    try {
        const { data } = await axios.delete(url, { headers: headers })
        console.log('deleteTerm data:', data)
        if (data.status) {
            Swal.fire({
                icon: 'success',
                text: 'ลบสัญญาสำเร็จ',
                showConfirmButton: false,
                timer: 1500,
            })
            fetchTerms()
        }
    }
    catch (e) {
        console.log('deleteTerm ERROR:', e)
        Swal.fire({
            icon: 'error',
            text: 'ลบสัญญาล้มเหลว',
            showConfirmButton: false,
            timer: 1500,
        })
    }
    finally {
        loading.value = false
    }
}

const openTermButtonHandler = () => {
    openTermButton.value.$el.click()
}
</script>
<style scoped></style>