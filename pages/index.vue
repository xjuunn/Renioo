<template>
  <div class="flex h-screen">
    <div class="w-56 border-opacity-20 border-base-content border-r flex flex-col">
      <div class="p-2">
        <div class="font-deyi ms-3 pt-3 text-lg cursor-default" data-tauri-drag-region>私 信</div>
        <label class="input input-sm bg-base-200 border-none w-full flex items-center gap-2 mt-3 rounded-sm">
          <input type="text" class="grow" placeholder="搜索" />
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70">
            <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd" />
          </svg>
        </label>
      </div>
      <div class="flex-1 min-h-0 h-32 overflow-y-scroll">
        <MainChatList/>
      </div>
    </div>
    <div class="flex-1 h-full overflow-y-auto">
      <MainChatPanel/>
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'main-layout',
})
</script>
