<template>
  <div class="hover:bg-base-300 flex items-center cursor-default" style="height:70px">
    <div class="avatar online ms-4">
      <div class="w-9 h-9 rounded-full text-2xl text-center" :class="props.avatar?'':'border'">
        <img v-if="props.avatar" :src="props.avatar" />
        <span v-else>{{props.name.substr(0,1)}}</span>
      </div>
    </div>
    <div class="h-full flex-1 pt-3 ps-3 flex flex-col">
      <b class="text-sm line-clamp-1 break-all">{{props.name}}</b>
      <span class="w-full text-xs opacity-70 mt-1 line-clamp-1"><b>ID:</b> {{id}}</span>
    </div>
    <div class="flex flex-col text-xs items-start h-full pt-3 me-3">
<!--      <div class="opacity-70">1:16</div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['id','avatar','name','content'])
</script>