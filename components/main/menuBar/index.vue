<template>
  <div class="flex flex-col items-center pt-6 h-full" data-tauri-drag-region>

    <div class="avatar">
      <div class="ring-primary ring-offset-base-100 w-7 rounded-full ring ring-offset-1">
        <img alt="头像" src="https://odmg.pages.dev/file/18c46734460af2a2c8d78.jpg"/>
      </div>
    </div>
    <ul class="menu mt-3 gap-1" data-tauri-drag-region>
      <li>
        <a class="transition duration-100">
          <Icon class="w-6 h-6" name="ri:message-3-line"></Icon>
        </a>
      </li>
      <li>
        <a class="transition duration-100">
          <Icon class="w-6 h-6" name="material-symbols:person-outline"></Icon>
        </a>
      </li>
      <li>
        <a class="transition duration-100">
          <Icon class="w-6 h-6" name="tabler:stack"></Icon>
        </a>
      </li>
      <li>
        <a class="transition duration-100">
          <Icon class="w-6 h-6" name="mdi:app-notification-outline"></Icon>
        </a>
      </li>
      <li>
        <a class="transition duration-100">
          <Icon class="w-6 h-6" name="mingcute:device-line"></Icon>
        </a>
      </li>
    </ul>
    <div class="flex-1 w-full" data-tauri-drag-region></div>
    <div class="flex flex-col items-center w-full p-2 gap-2" data-tauri-drag-region>
      <button class="btn btn-ghost btn-md">
        <icon class="w-5 h-5" name="ph:microphone-bold"/>
      </button>
      <button class="btn btn-ghost btn-xs">
        <icon class="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100" name="ri:more-fill"/>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>

</script>

<style scoped>

</style>