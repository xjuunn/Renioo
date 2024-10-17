<template>
  <div class="w-full h-screen font-deyi tracking-widest flex flex-col items-center justify-center"
       data-tauri-drag-region>
    {{ print }}
  </div>
</template>

<script lang="ts" setup>
import {getCurrentWindow, LogicalSize} from '@tauri-apps/api/window'

let {check} = useCheckStatus();
definePageMeta({layout: 'clean-layout'})
let window;
const print = ref('Loading . . .');
onMounted(async () => {
  window = getCurrentWindow();
  initConfig();
  const data = await check(msg => print.value = msg);

})

function initConfig() {
  window.setSize(new LogicalSize(500, 400));
  window.setMinimizable(false);
  window.setMaximizable(false);
  window.setFullscreen(false);
  window.setResizable(false);
}
</script>