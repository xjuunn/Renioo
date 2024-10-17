<template>
  <div ref="messageScrollbox" class="h-full pe-5 ps-5 overflow-y-scroll pb-24">
    <div class="chat chat-end">
      <div class="chat-image avatar">
        <div class="w-9 rounded-full">
          <img
              alt="Tailwind CSS chat bubble component"
              src="https://odmg.pages.dev/file/18c46734460af2a2c8d78.jpg"/>
        </div>
      </div>
      <div class="chat-header">
        Junshiun
        <time class="text-xs opacity-50">12:46</time>
      </div>
      <div class="chat-bubble">蜀道之难，难于上青天！</div>
      <div class="chat-footer opacity-50">Seen at 12:46</div>
    </div>

  </div>
</template>
<script lang="ts" setup>
const messageScrollbox = ref(null);

function scrollBottom() {
  messageScrollbox.value.scrollTo({
    top: messageScrollbox.value.scrollHeight,
    behavior: "smooth"
  });
}
</script>
