<template>
    <div>
        
    </div>
</template>
<script setup>
import axios from 'axios'

const fetchPartner = async () => {
    const url = import.meta.env.VITE_VUE_APP_PARTNER + '/partner'
    try {
        const { data } = await axios.get(url)
        if (data.status) {
            console.log(data.data)
        }
    }
    catch(err) {
        console.log(err)
    }
}
</script>