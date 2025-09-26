<template>
    <div class="p-4 h-full flex flex-col">
        <h2 class="text-2xl font-bold mb-4">Device Table</h2>

        <!-- Loading state -->
        <div v-if="loading" class="text-gray-500 text-center py-6">
            Loading devices...
        </div>

        <!-- Table -->
        <div class="flex-1 overflow-auto relative">
            <div class="min-w-full">
                <table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
                    <thead>
                    <tr class="bg-gray-100 text-gray-700">
                        <th class="px-6 py-3 text-left text-sm font-semibold border-b border-gray-200">ID</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold border-b border-gray-200">Mac</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold border-b border-gray-200">IP</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold border-b border-gray-200">Name</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold border-b border-gray-200">Status</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold border-b border-gray-200">Type</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold border-b border-gray-200">Vendor</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold border-b border-gray-200">Model</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold border-b border-gray-200">First Seen</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold border-b border-gray-200">Last Changed</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="device in devices"
                        :key="device.id"
                        class="hover:bg-gray-50 transition-colors"
                    >
                        <td class="px-6 py-4 border-b border-gray-100 text-sm text-gray-800">{{ device.id }}</td>
                        <td class="px-6 py-4 border-b border-gray-100 text-sm text-gray-800 font-mono">{{ device.mac }}</td>
                        <td class="px-6 py-4 border-b border-gray-100 text-sm text-gray-800 font-mono">
                            <div class="flex flex-wrap gap-2">
                            <span
                                v-for="ip in device.ip.split(',')"
                                :key="ip"
                                class="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded"
                            >
                              {{ ip.trim() }}
                            </span>
                            </div>
                        </td>
                        <td class="px-6 py-4 border-b border-gray-100 text-sm text-gray-800">{{ device.name }}</td>
                        <td class="px-6 py-4 border-b border-gray-100 text-sm text-gray-800">
                            <span
                                v-if="device.state === 1"
                                class="bg-green-500 text-white inline-block w-full text-center px-2 py-1 rounded text-xs font-bold"
                            >
                            UP
                            </span>
                            <span
                                v-else-if="device.state === 0"
                                class="bg-red-500 text-white inline-block w-full text-center px-2 py-1 rounded text-xs font-bold"
                            >
                            DOWN
                            </span>
                            <span
                                v-else
                                class="bg-gray-100 text-gray-700 inline-block w-full text-center px-2 py-1 rounded text-xs font-bold"
                            >
                            UNKNOWN
                          </span>
                        </td>
                        <td class="px-6 py-4 border-b border-gray-100 text-sm text-gray-800">{{ device.type }}</td>
                        <td class="px-6 py-4 border-b border-gray-100 text-sm text-gray-800">{{ device.vendor }}</td>
                        <td class="px-6 py-4 border-b border-gray-100 text-sm text-gray-800">{{ device.model }}</td>
                        <td class="px-6 py-4 border-b border-gray-100 text-sm text-gray-800">
                            {{ new Date(device.firstSeen * 1000).toLocaleString() }}
                        </td>
                        <td class="px-6 py-4 border-b border-gray-100 text-sm text-gray-800">
                            {{ new Date(device.lastChanged * 1000).toLocaleString() }}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Horizontal scrollbar container -->
        <div class="absolute bottom-0 left-0 right-0 overflow-x-auto">
            <div class="w-[200%] h-0"></div> <!-- Match table width -->
        </div>

        <!-- Error message -->
        <div v-if="error" class="text-red-500 mt-4 text-center font-medium">
            {{ error }}
        </div>
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
                const response = await axios.get('http://localhost:5222/api/devices');
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
