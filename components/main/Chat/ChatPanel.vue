<template>
  <div class="flex flex-col h-full">
    <div class="pt-3 h-14 flex items-center ps-3 pe-20 border-b border-opacity-10 border-base-content"
         data-tauri-drag-region>
      <b class="cursor-default" data-tauri-drag-region>{{getChatUser().name}}</b>
      <div class="m-2 text-xs opacity-70 mt-3 text-green-500 cursor-default" data-tauri-drag-region>在线</div>
      <div class="flex-1 h-full flex justify-items-end items-end pb-2" data-tauri-drag-region>
        <div class="flex-1" data-tauri-drag-region></div>
        <icon class="mb-2 w-5 h-5 opacity-70 me-4 hover:opacity-100" name="ion:call"/>
        <icon class="mb-2 w-5 h-5 opacity-70 me-4 hover:opacity-100" name="fluent:desktop-cursor-28-filled"/>
        <icon class="mb-2 w-5 h-5 opacity-70 me-4 hover:opacity-100" name="weui:video-call-filled"/>
        <icon class="mb-2 w-5 h-5 opacity-70 me-4 hover:opacity-100" name="fluent:more-vertical-28-filled"/>
      </div>
    </div>
    <div class="flex-1 overflow-hidden">
      <MainChatMessageList/>
    </div>
    <div class="">
      <MainChatEditor/>
    </div>
  </div>
</template>

<script setup lang="ts">
const {getChatUser} = useAppStore();
watch(getChatUser,(v1,v2)=>{
  if (v1.id === v2.id) return;
  console.log("获取消息记录",v1.id,v2.id)
})
</script>
