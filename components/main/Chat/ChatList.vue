<template>
  <MainChatListItem v-for="(item,index) in users" :id="item.id" :key="index" :avatar="item.avatar" :name="item.id.toString() === myid.toString()?`${item.name}(我)`:item.name"
                    @click="openChat(item)"/>
  <span v-if="searchList.length>0" class="font-deyi text-sm ms-4">网络用户</span>
  <UserSearchListItem v-for="(item,index) in searchList" :id="item.id" :key="index" :avatar="item.avatar"
                      :name="item.name" @click="openChat(item)"/>
</template>

<script lang="ts" setup>
import UserSearchListItem from "./UserSearchListItem.vue";
import User from "../../../types/User/User";

defineProps(["searchList", "users"]);
const emits = defineEmits(['onSelectChat'])
const {setChatUser} = useAppStore();
const supabase = useSupabaseClient();
const myid = ref('');
onMounted(async ()=>{
  const {data,error} = await supabase.auth.getUser();
  myid.value = data.user?.id;
})
function openChat(user:User) {
  setChatUser({...user} as User);
  emits('onSelectChat');
}

</script>
