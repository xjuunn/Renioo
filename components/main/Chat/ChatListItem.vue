<template>
  <div class="hover:bg-base-300 flex items-center cursor-default" :class="id?.toString()===getChatUser()?.id?.toString()?'bg-base-300':''" style="height:70px">
    <div class="avatar online ms-4">
      <div :class="props.avatar?'':'border'" class="w-9 h-9 rounded-full text-2xl text-center">
        <img v-if="props.avatar" :src="props.avatar"/>
        <span v-else>{{ props.name[0]}}</span>
      </div>
    </div>
    <div class="h-full flex-1 pt-3 ps-3 flex flex-col">
      <b class="text-sm line-clamp-1 break-all">{{ props.name }}</b>
      <span class="w-full text-xs opacity-70 mt-1 line-clamp-1">噫嘘唏，危呼高哉!蜀道之难，难于上青天！</span>
    </div>
    <div class="flex flex-col text-xs items-start h-full pt-3 me-3">
      <div class="opacity-70">1:16</div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps(['id', 'avatar', 'name', 'content', 'time'])
const {getChatUser} = useAppStore();

</script>
