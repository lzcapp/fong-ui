<template>
  <div>
    <h1 class="text-2xl font-bold text-center my-4">Network Device Manager</h1>
    <DeviceTable />
  </div>
</template>

<script>
import DeviceTable from './components/DeviceTable.vue';

export default {
  name: 'App',
  components: {
    DeviceTable
  }
};
</script>
