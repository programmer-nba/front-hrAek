<template>
    <div>
        <Button @click="visible = true" :icon="!isEdit ? 'pi pi-plus text-white font-bold' : ''" 
        :class="['ring-0 outline-0 px-3 py-2 bg-gradient-to-r rounded transition-colors duration-150 ease-in-out',
            !isEdit ? 'from-blue-700 to-blue-400 text-blue-200 font-normal hover:from-blue-600 hover:to-blue-800 hover:text-white/80'
            : 'from-orange-700 to-orange-400 text-orange-200 font-normal hover:from-orange-600 hover:to-orange-800 hover:text-white/80'
        ]" 
        :label="label" 
        />
    </div>
    <Dialog
        v-model:visible="visible"
        modal
        :pt="{
            root: 'border-none w-full',
            mask: {
                style: 'backdrop-filter: blur(2px)'
            }
        }"
    >
        <template #container="{ closeCallback }">
            <div class="flex justify-center flex-wrap items-start overflow-y-auto w-full bg-gradient-to-br from-blue-700 to-blue-500" style="border-radius: 12px;">
                <div class="flex w-[100%] md:w-1/2 flex-col px-2 md:px-5 py-5 m-0 gap-4">
                    <div class="flex justify-between items-center w-full px-5">
                        <div class="w-20 h-9 rounded-full flex items-center justify-center" 
                            :class="[
                                page === 1 && 'ring-4 ring-white',
                                pageValCheck(1)
                            ]"
                        >1
                        </div>
                        <div class="w-[100%] h-1" :class="[page > 1 ? 'bg-sky-300' : 'bg-white']"></div>
                        <div class="w-20 h-9 rounded-full flex items-center justify-center" 
                            :class="[
                                page === 2 && 'ring-4 ring-white',
                                pageValCheck(2)
                            ]"
                        >2
                        </div>
                        <div class="w-[100%] h-1" :class="[page > 2 ? 'bg-sky-300' : 'bg-white']"></div>
                        <div class="w-20 h-9 rounded-full flex items-center justify-center" 
                            :class="[
                                page === 3 && 'ring-4 ring-white',
                                pageValCheck(3)
                            ]"
                        >3
                        </div>
                    </div>
                    <div class="flex items-center border max-w-xl px-2 py-3 rounded-xl bg-white/75" :class="page !== 1 && 'hidden'">
                        <div class="flex items-center gap-x-2">
                            <Checkbox :disabled="isEdit" id="standard" v-model="standard" :binary="true" />
                            <label for="standard">ตั้งค่าเป็นสัญญาพื้นฐาน</label>
                        </div>
                    </div>
                    <div class="inline-flex flex-col gap-2 max-w-xl" :class="page !== 1 && 'hidden'">
                        <label for="code" class="text-white/80">รหัสสัญญา</label>
                        <Dropdown v-if="!isEdit && !standard" v-model="term" 
                        :options="termOptions" filter optionLabel="name" placeholder="เลือกรหัสสัญญา" class="w-full md:w-14rem"
                        >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex items-center">
                                    <div>{{ slotProps.value.code }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex items-center">
                                    <div>{{ slotProps.option.code }}</div>
                                </div>
                            </template>
                        </Dropdown>
                        <InputText v-else :disabled="isEdit && !standard" id="code" class="border-none p-3 w-20rem" type="text" placeholder="PDPA, TSG, DDSC . . ." v-model="code"></InputText>
                    </div>
                    <div class="inline-flex flex-col gap-2 max-w-xl" :class="page !== 1 && 'hidden'">
                        <label for="title" class="text-white/80">หัวข้อสัญญา</label>
                        <InputText id="title" class="border-none p-3 w-20rem" placeholder="นโยบายเจ็ดเก็บข้อมูลส่วนบุคคล" v-model="title"></InputText>
                    </div>
                    <div v-if="!standard" class="flex flex-col gap-y-3 py-4 border-t border-b max-w-xl" :class="page !== 1 && 'hidden'">
                        <p class="text-lg m-0 p-0 font-semibold text-white">ผู้ทำสัญญา</p>
                        <div class="flex items-center gap-x-5 w-full bg-white/75 rounded-lg px-2 py-3">
                            <div class="flex items-center">
                                <RadioButton v-model="user.userType" inputId="user1" name="user" value="บุคคลธรรมดา" />
                                <label for="user1" class="ml-2">บุคคลธรรมดา</label>
                            </div>
                            <div class="flex items-center">
                                <RadioButton v-model="user.userType" inputId="user2" name="user" value="นิติบุคคล" />
                                <label for="user2" class="ml-2">นิติบุคคล</label>
                            </div>
                        </div>
                        <Dropdown v-if="!isEdit && !standard && user.userType === 'บุคคลธรรมดา'" v-model="selectedUser" 
                        :options="partners" filter optionLabel="partner_name" placeholder="เลือกผู้ทำสัญญา" class="w-full md:w-14rem"
                        @change="selectUser(selectedUser)"
                        >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex items-center">
                                    <div>{{ slotProps.value.partner_name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex items-center">
                                    <div>
                                        {{ slotProps.option.partner_name }}
                                    </div>
                                </div>
                            </template>
                        </Dropdown>
                        <Dropdown v-if="!isEdit && !standard && user.userType !== 'บุคคลธรรมดา'" v-model="selectedUser" 
                        :options="partners.filter(p => p.partner_company_name?.trim() !== '')" filter optionLabel="partner_name" placeholder="เลือกผู้ทำสัญญา" class="w-full md:w-14rem"
                        @change="selectUser(selectedUser)"
                        >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex items-center">
                                    <div>{{ slotProps.value.partner_company_name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex items-center">
                                    <div>
                                        {{ slotProps.option.partner_company_name }}
                                    </div>
                                </div>
                            </template>
                        </Dropdown>
                        <div class="inline-flex flex-col gap-2">
                            <label for="name" class="text-white/80">ชื่อ-สกุล / ชื่อบริษัท</label>
                            <InputText id="name" class="border-none p-3 w-20rem" type="text" placeholder="นายสมชาย ใจดี / บริษัทเอบีซี จำกัด สำนักงานใหญ่" v-model="user.name"></InputText>
                        </div>
                        <div class="inline-flex flex-col gap-2">
                            <label for="_id" class="text-white/80">_id ผู้ทำสัญญา</label>
                            <InputText disabled id="_id" class="border-none p-3 w-20rem" type="text" placeholder="_id" v-model="user._id"></InputText>
                        </div>
                        <div class="inline-flex flex-col gap-2">
                            <label for="username" class="text-white/80">username ผู้ทำสัญญา</label>
                            <InputText disabled id="username" class="border-none p-3 w-20rem" type="text" placeholder="username เข้าระบบผู้ทำสัญญา" v-model="user.username"></InputText>
                        </div>
                        <div class="inline-flex flex-col gap-2">
                            <label for="email" class="text-white/80">อีเมลล์</label>
                            <InputText id="email" class="border-none p-3 w-20rem" type="text" placeholder="example@gmail.com" v-model="user.email"></InputText>
                        </div>
                        <div class="inline-flex flex-col gap-2">
                            <label for="address" class="text-white/80">ที่อยู่ (ถ้ามี)</label>
                            <InputText id="address" class="border-none p-3 w-20rem" type="text" placeholder="ที่อยู่ของผู้ทำสัญญา หรือ ที่อยู่บริษัทผู้ทำสัญญา" v-model="user.address"></InputText>
                        </div>
                    </div>
                    
                    <div class="inline-flex flex-col gap-2 max-w-xl" :class="page !== 2 && 'hidden'">
                        <label for="content" class="text-white/80">รายละเอียดสัญญา</label>
                        <Editor id="content" v-model="content" editorStyle="height: 320px" />
                    </div>

                    <div class="flex items-center gap-x-5 w-full bg-white/75 rounded-lg px-2 py-3 max-w-xl" :class="page !== 3 && 'hidden'">
                        <div class="flex items-center">
                            <RadioButton v-model="requireSignature" inputId="isSignature" name="isSignature" :value="true" />
                            <label for="isSignature" class="ml-2">มีลายเซ็น</label>
                        </div>
                        <div class="flex items-center">
                            <RadioButton v-model="requireSignature" inputId="noSignature" name="noSignature" :value="false" />
                            <label for="noSignature" class="ml-2">ไม่มีลายเซ็น</label>
                        </div>
                    </div>
                    <Transition name="fade" mode="out-in" appear :class="page !== 3 && 'hidden'">
                        <div v-if="requireSignature" class="w-full max-w-xl bg-white grid grid-cols-2 justify-between justify-items-center py-2">
                            <div class="w-[10rem] h-auto flex flex-col gap-y-1 justify-center items-center" v-for="(sign, signIndex) in signatures" :key="sign._id">
                                <div class="self-start flex gap-x-3 items-center">
                                    <Checkbox :inputClass="!sign.selected ? 'bg-blue-300' : ''" v-model="signatures[signIndex].selected" :binary="true" />
                                    <small class="text-green-700" v-if="sign.selected">เลือกแล้ว</small>
                                </div>
                                <img :src="sign.img" >
                                <p class="self-start">{{ sign.name }}</p>
                                <small>( {{ sign.position }} )</small>
                            </div>
                        </div>
                    </Transition>

                    <div class="w-full flex justify-center gap-x-5">
                        <Button v-if="page === 2 || page === 3" label="ก่อนหน้า" @click="page--" class="text-white/75 py-2 px-3" />
                        <Button v-if="page === 1 || page === 2" label="ต่อไป" @click="page++" class="py-2 px-3 rounded text-white/75 hover:bg-sky-300 hover:text-sky-600 duration-150" />
                    </div>
                </div>
                <div class="w-[100%] md:w-1/2 h-full py-5 px-3">
                    <div class="bg-white p-3">
                        <p class="text-end">{{ standard ? 'ต้นแบบ' : '' }}</p>
                        <p class="text-lg font-bold text-center break-words">{{ title }}</p>
                    </div>
                    <div class="bg-white p-3">
                        <article class="text-wrap" >
                            <p class="break-words" v-html="content">
                            </p>
                        </article>
                    </div>
                    <div class="bg-white p-3">
                        <div class="w-[10rem] h-auto flex flex-col gap-y-1 justify-center items-center" v-for="sig in signatures.filter(sig=>sig.selected)" :key="sig._id">
                            <img :src="sig.img" >
                            <p class="self-start">{{ sig.name }}</p>
                            <small>( {{ sig.position }} )</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center w-full justify-center">
                <Button label="ยกเลิก" @click="closeCallback" text class="p-3 w-full text-red-600 bg-white rounded"></Button>
                <Button v-if="!isEdit" label="บันทึก" @click="createTerm()" text class="p-3 w-full bg-gradient-to-br from-sky-600 to-sky-400 rounded hover:text-white hover:shadow-xl duration-150 shadow-white border-2 border-dashed"></Button>
                <Button v-else label="บันทึกการแก้ไข" @click="editTerm()" text class="p-3 w-full bg-gradient-to-br from-orange-600 to-orange-400 rounded hover:text-white hover:shadow-xl duration-150 shadow-white border-2 border-dashed"></Button>
            </div>
        </template>
    </Dialog>
</template>
<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Editor from 'primevue/editor'
import Checkbox from 'primevue/checkbox'
import Dropdown from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton'
import { ref, onMounted, computed, watch } from 'vue'
import img1 from '../../../assets/signatures/ลายเซ็นบอส_0.png'
import img2 from '../../../assets/signatures/ลายเซ็นพี่บอล_0.png'
import axios from 'axios'

const { label, isEdit, data } = defineProps(["label", "isEdit", "data"])

onMounted(()=>{
    fetchTerms()
    if (isEdit) {
        title.value = data.title
        code.value = data.code
        content.value = data.content
        standard.value = data.standard
        requireSignature.value = data.requireSignature
        user.value = data.user || {}
        signatures.value.forEach(sig => {
            const existSig = data.signatures.find(sign => sign._id === sig._id)
            if (existSig) {
                sig.selected = existSig.selected
            }
        })
    }
})

const terms = ref([])
const term = ref()
const loading = ref(false)
const page = ref(1)
const title = ref()
const code = ref() 
const content = ref()
const standard = ref( false )
const requireSignature = ref( false )
const user = ref( { userType: "บุคคลธรรมดา" } )
const selectedUser = ref({})
const termOptions = ref([])
const partners = ref([])

const signatures = ref([
    {
        _id: "1",
        name: 'นาย.................................................',
        img: img1,
        position: "ผู้บริหาร",
        signation: "offer"
    },
    {
        _id: "2",
        name: 'นายศุภัคกิจ ใจเย็น',
        img: img2, // รูปลายเซ็น
        position: "กรรมการบริหาร",
        signation: "offer"
    }
])

const visible = ref(false)
const emits = defineEmits(["createTerm", "editTerm"])

const selectUser = (u) => {
    if (user.value.userType === 'บุคคลธรรมดา') {
        const address = `${u.partner_address || ""} ${u.partner_district || ""} ${u.partner_amphure || ""} ${u.partner_province || ""} ${u.partner_postcode || ""}`
        user.value.name = u.partner_name
        user.value._id = u._id
        user.value.username = u.username
        user.value.email = u.partner_email
        user.value.address = address
    } else {
        const address = `${u.partner_company_address || ""} ${u.partner_company_district || ""} ${u.partner_company_amphure || ""} ${u.partner_company_province || ""} ${u.partner_company_postcode || ""}`
        user.value.name = u.partner_company_name
        user.value._id = u._id
        user.value.username = u.username
        user.value.email = u.partner_email
        user.value.address = address
    }
}

const createTerm = () => {
    const data = {
        title: title.value,
        code: code.value,
        content: content.value,
        active: true,
        standard: standard.value,
        user: user.value,
        requireSignature: requireSignature.value,
        signatures: signatures.value.filter(sign => sign.selected),
    }
    emits("createTerm", data)
    visible.value = false
}

watch((term), (newVal, oldVal)=>{
    if (newVal !== oldVal) {
        title.value = newVal.title
        code.value = newVal.code
        content.value = newVal.content
        requireSignature.value = newVal.requireSignature
        user.value = newVal.user || { userType: "บุคคลธรรมดา" }
    }
})

watch((visible), (newVal, oldVal)=>{
    if (newVal) {
        fetchTerms()
    }
})

const editTerm = () => {
    const payload = {
        _id: data._id || null,
        title: title.value,
        code: code.value,
        content: content.value,
        active: true,
        standard: standard.value,
        user: user.value,
        requireSignature: requireSignature.value,
        signatures: signatures.value.filter(sign => sign.selected),
    }
    emits("editTerm", payload)
    visible.value = false
}

const pageValCheck = (num) => {
    if (num === 1) {
        if (title.value && code.value) {
            return 'bg-sky-300 text-white font-bold'
        } else {
            return 'bg-white'
        }
    } else if (num === 2) {
        if (content.value) {
            return 'bg-sky-300 text-white font-bold ring-white'
        } else {
            return 'bg-white'
        }
    } else {
        if (page.value === 3) {
            return 'bg-sky-300 text-white font-bold ring-white'
        } else {
            return 'bg-white'
        }
    }
}

const fetchTerms = async () => {
    loading.value = true
    const url = `${import.meta.env.VITE_VUE_APP_DECCAN}/lawyer/all`
    const headers = { 'auth-token' : localStorage.getItem('token') }
    try {
        const { data } = await axios.get(url, { headers: headers })
        //console.log('fetchTerms data:', data )
        if (data.status) {
            terms.value = data.data
            termOptions.value = data.data.filter(t => t.standard && t.active)
            fetchPartner()
        }
    }
    catch (e) {
        console.log('fetchedTerms ERROR:', e)
    }
    finally {
        loading.value = false
    }
}

const fetchPartner = async () => {
    const url = import.meta.env.VITE_VUE_APP_PARTNER + '/partner'
    try {
        const { data } = await axios.get(url)
        if (data.status) {
            //console.log(data.data)
            partners.value = data.data
        }
    }
    catch(err) {
        console.log(err)
    }
}

</script>
<style scoped>
    
</style>