<template>
    <img class="h-10" :src="logo" alt="logo" />
</template>
<script>
import { defineComponent } from 'vue'
import logo from '../../img/logo.png'

export default defineComponent({
    data() {
        return {
            logo: logo
        }
    }
})
</script>
