<template>
  <MainChatListItem v-for="(item,index) in users" :id="item.id" :key="index" :avatar="item.avatar" :name="item.name"
                    @click="openChat(item.id)"/>
  <span v-if="searchList.length>0" class="font-deyi text-sm ms-4">网络用户</span>
  <UserSearchListItem v-for="(item,index) in searchList" :id="item.id" :key="index" :avatar="item.avatar"
                      :name="item.name" @click="openChat(item.id)"/>
</template>

<script lang="ts" setup>
import UserSearchListItem from "./UserSearchListItem.vue";

defineProps(["searchList", "users"]);
const emits = defineEmits(['onSelectChat'])
const {setChatUserID} = useAppStore();

function openChat(id) {
  setChatUserID(id)
  emits('onSelectChat')
}

</script>
