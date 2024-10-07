<template>
  <div v-if="isTauri()&&(platformType!=='android'&&platformType!=='ios')"
       class="flex items-center justify-between gap-1 me-3 w-10" data-tauri-drag-region>
    <div
        :class="minisizeClass" class="w-3 h-3 rounded-full cursor-pointer bg-base-content opacity-30 transition"
        @click="()=>{minisizeClass = '' & getCurrentWindow().minimize()}"
        @mouseenter="()=>minisizeClass = 'hover:opacity-100 hover:bg-blue-400'"></div>
    <div
        class="w-3 h-3 rounded-full cursor-pointer bg-base-content opacity-30 hover:opacity-100 transition hover:bg-yellow-400"
        @click="getCurrentWindow().toggleMaximize()"></div>
    <div
        class="w-3 h-3 rounded-full cursor-pointer bg-base-content opacity-30 hover:opacity-100 transition hover:bg-red-400"
        @click="getCurrentWindow().close()"></div>
  </div>
</template>
<script lang="ts" setup>
import {getCurrentWindow} from "@tauri-apps/api/window";
import {isTauri} from '@tauri-apps/api/core';
import {platform} from '@tauri-apps/plugin-os';

const minisizeClass = ref("hover:opacity-100 hover:bg-blue-400");
const platformType = ref('');
onMounted(async () => {
  if (isTauri()) platformType.value = await platform();
})
</script>