<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Device List</h2>

    <!-- Loading state -->
    <div v-if="loading" class="text-gray-500">Loading devices...</div>

    <!-- Table -->
    <table v-else class="table-auto border-collapse border border-gray-300 w-full">
      <thead>
      <tr class="bg-gray-100">
        <th class="border border-gray-300 px-4 py-2">ID</th>
        <th class="border border-gray-300 px-4 py-2">Name</th>
        <th class="border border-gray-300 px-4 py-2">Contact ID</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="device in devices" :key="device.id">
        <td class="border border-gray-300 px-4 py-2">{{ device.id }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ device.name }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ device.contact_id }}</td>
      </tr>
      </tbody>
    </table>

    <!-- Error message -->
    <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DeviceTable',
  data() {
    return {
      devices: [],
      loading: false,
      error: null
    };
  },
  methods: {
    async fetchDevices() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:5000/api/devices');
        this.devices = response.data;
      } catch (err) {
        this.error = 'Failed to load devices';
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchDevices();
  }
};
</script>

<style>
/* Optional: basic table styling */
</style>
