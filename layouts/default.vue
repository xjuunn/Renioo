<template>
  <div>
    <div class="h-8 flex">
      <div class="flex-1" data-tauri-drag-region></div>
      <div class="flex items-center justify-between gap-1 me-3" data-tauri-drag-region>
        <div @click="getCurrentWindow().minimize()" class="w-3 h-3 rounded-full cursor-pointer bg-base-content opacity-30 hover:opacity-100 transition hover:bg-blue-400"></div>
        <div @click="getCurrentWindow().maximize()" class="w-3 h-3 rounded-full cursor-pointer bg-base-content opacity-30 hover:opacity-100 transition hover:bg-yellow-400"></div>
        <div @click="getCurrentWindow().close()" class="w-3 h-3 rounded-full cursor-pointer bg-base-content opacity-30 hover:opacity-100 transition hover:bg-red-400"></div>
      </div>
    </div>
    <slot/>
  </div>
</template>

<script setup lang="ts">
import {getCurrentWindow} from "@tauri-apps/api/window"

</script>