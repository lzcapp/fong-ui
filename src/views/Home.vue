<template>
    <div class="flex h-screen">
        <!-- Sidebar: fixed width, full height -->
        <Sidebar @select-page="currentPage = $event" class="flex-shrink-0"/>

        <!-- Main content: fill remaining space, scrollable -->
        <div class="flex-1 overflow-auto">
            <component :is="currentComponent"/>
        </div>
    </div>
</template>

<script setup>
import {computed, ref} from "vue"
import Sidebar from "../components/Sidebar.vue"
import DevicesTable from "../components/Devices.vue"

const currentPage = ref("dashboard")

const currentComponent = computed(() => {
    switch (currentPage.value) {
        case "devices":
            return DevicesTable
        default:
            return {template: "<div class='p-4'>Dashboard Page</div>"}
    }
})
</script>
