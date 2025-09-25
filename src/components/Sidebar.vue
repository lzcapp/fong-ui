<template>
  <div class="h-screen w-64 bg-gray-800 text-white flex flex-col">
    <h1 class="text-xl font-bold p-4">Menu</h1>
    <ul class="flex-1">
      <li
        v-for="item in menu"
        :key="item.name"
        @click="$emit('select-page', item.page)"
        class="cursor-pointer px-4 py-2 hover:bg-gray-700"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const menu = [
  { name: "Dashboard", page: "dashboard" },
  { name: "Devices", page: "devices" },
  { name: "Settings", page: "settings" },
]
</script>
