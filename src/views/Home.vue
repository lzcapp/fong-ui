<template>
  <div class="flex">
    <Sidebar @select-page="currentPage = $event"/>
    <div class="flex-1">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import Sidebar from "../components/Sidebar.vue"
import DeviceTable from "../components/Device.vue"

const currentPage = ref("dashboard")

const currentComponent = computed(() => {
  switch(currentPage.value) {
    case "devices": return DeviceTable
    default: return { template: "<div class='p-4'>Dashboard Page</div>" }
  }
})
</script>
