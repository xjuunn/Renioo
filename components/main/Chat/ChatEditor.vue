<template>
  <div class="h-full border-t border-base-content border-opacity-10 flex min-h-10 items-end pb-2 pt-2">
    <button class="btn btn-ghost btn-square btn-md hover:bg-base-100 opacity-70 hover:opacity-100">
      <icon class="w-7 h-7" name="uis:paperclip"></icon>
    </button>
    <textarea
        ref="textarea"
        class="textarea resize-none textarea-ghost flex-1 h-full focus:border-none focus:outline-none focus:mt-0.5 max-h-36"
        placeholder="输入消息 . . ."
    ></textarea>
    <button class="btn btn-ghost btn-square btn-md hover:bg-base-100 opacity-70 hover:opacity-100">
      <icon class="w-7 h-7" name="mdi:microphone"></icon>
    </button>
    <button class="btn btn-ghost btn-square btn-md hover:bg-base-100 opacity-70 hover:opacity-100" @click="test">
      <icon class="w-7 h-7" name="mingcute:emoji-fill"></icon>
    </button>
  </div>
</template>
<script setup lang="ts">
  function test(){
    navigateTo('/test')
  }
</script>