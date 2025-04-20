<template>
  <div class="space-y-6">
    <!-- Server Status Header -->
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-semibold text-gray-900">Server Status</h3>
    </div>
      
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- CPU Section -->
      <div class="bg-white p-4 rounded-lg border border-gray-200 w-full">
        <div class="flex flex-col space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-900">CPU Usage</span>
            <span class="text-sm font-medium text-gray-900">{{ Math.round(cpuUsage) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              class="bg-primary h-2.5 rounded-full" 
              :style="{ width: `${Math.round(cpuUsage)}%` }"
            ></div>
          </div>
          <span class="text-xs text-gray-600">8 Cores</span>
          
          <div class="flex flex-col space-y-1 mt-2">
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-600">CPU RAM</span>
              <span class="text-xs font-medium text-gray-900">{{ Math.round(cpuRamPercentage) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-primary h-2 rounded-full" 
                :style="{ width: `${Math.round(cpuRamPercentage)}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Storage Section -->
      <div class="bg-white p-4 rounded-lg border border-gray-200 w-full">
        <div class="flex flex-col space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-900">Storage</span>
          </div>
          <div class="flex flex-col space-y-3">
            <div class="flex flex-col space-y-1">
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-600">High Speed Storage</span>
                <span class="text-xs font-medium text-gray-900">{{ Math.round(highSpeedStoragePercentage) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-primary h-2 rounded-full" 
                  :style="{ width: `${Math.round(highSpeedStoragePercentage)}%` }"
                ></div>
              </div>
            </div>

            <div class="flex flex-col space-y-1">
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-600">Data Lake</span>
                <span class="text-xs font-medium text-gray-900">{{ Math.round(dataLakePercentage) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-primary h-2 rounded-full" 
                  :style="{ width: `${Math.round(dataLakePercentage)}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Network Section -->
      <div class="bg-white p-4 rounded-lg border border-gray-200 w-full">
        <div class="flex flex-col space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-900">Network</span>
            <div class="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
              <span class="text-xs text-gray-600">Clients</span>
              <span class="text-xs font-medium text-gray-900">{{ activeClients }}</span>
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-600">Download</span>
              <span class="text-xs font-medium text-gray-900">{{ formatSpeed(downloadSpeed) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-600">Upload</span>
              <span class="text-xs font-medium text-gray-900">{{ formatSpeed(uploadSpeed) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- GPU Section -->
      <div class="bg-white p-4 rounded-lg border border-gray-200 w-full">
        <div class="flex flex-col space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-900">GPU Usage</span>
            <span class="text-sm font-medium text-gray-900">{{ Math.round(gpuUsage) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              class="bg-primary h-2.5 rounded-full" 
              :style="{ width: `${Math.round(gpuUsage)}%` }"
            ></div>
          </div>
          <span class="text-xs text-gray-600">NVIDIA RTX 3080</span>
          
          <div class="flex flex-col space-y-1 mt-2">
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-600">GPU RAM</span>
              <span class="text-xs font-medium text-gray-900">{{ Math.round(gpuRamPercentage) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-primary h-2 rounded-full" 
                :style="{ width: `${Math.round(gpuRamPercentage)}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Mock data for now - we'll replace this with real data later
const cpuUsage = ref(45)
const gpuUsage = ref(30)
const cpuRamPercentage = ref(65)
const gpuRamPercentage = ref(40)
const highSpeedStoragePercentage = ref(25)
const dataLakePercentage = ref(15)
const downloadSpeed = ref(0)
const uploadSpeed = ref(0)
const activeClients = ref(12) // Mock number of connected clients

// Format network speed to appropriate units
const formatSpeed = (bytes: number) => {
  if (bytes < 1024) return `${bytes.toFixed(0)} B/s`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB/s`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB/s`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB/s`
}

// Update values periodically
let interval: NodeJS.Timeout

onMounted(() => {
  interval = setInterval(() => {
    // Simulate some variation in the values
    cpuUsage.value = Math.min(100, Math.max(0, cpuUsage.value + (Math.random() * 10 - 5)))
    gpuUsage.value = Math.min(100, Math.max(0, gpuUsage.value + (Math.random() * 10 - 5)))
    cpuRamPercentage.value = Math.min(100, Math.max(0, cpuRamPercentage.value + (Math.random() * 5 - 2.5)))
    gpuRamPercentage.value = Math.min(100, Math.max(0, gpuRamPercentage.value + (Math.random() * 5 - 2.5)))
    highSpeedStoragePercentage.value = Math.min(100, Math.max(0, highSpeedStoragePercentage.value + (Math.random() * 0.1 - 0.05)))
    dataLakePercentage.value = Math.min(100, Math.max(0, dataLakePercentage.value + (Math.random() * 0.1 - 0.05)))
    
    // Simulate network speeds (in bytes per second)
    downloadSpeed.value = Math.random() * 10 * 1024 * 1024 // Random value up to 10 MB/s
    uploadSpeed.value = Math.random() * 5 * 1024 * 1024 // Random value up to 5 MB/s
    
    // Simulate client connections (randomly between 8 and 15)
    activeClients.value = Math.floor(Math.random() * 8) + 8
  }, 2000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script> 