<template>
  <div class="flex h-screen">
    <div ref="chatListRef" class="relative border-opacity-20 border-base-content border-r flex flex-col z-50"
         style="width: 230px">
      <div class="p-2">
        <div class="font-deyi ms-3 pt-3 text-lg cursor-default" data-tauri-drag-region>私 信</div>
        <label class="input input-sm bg-base-200 border-none w-full flex items-center gap-2 mt-3 rounded-sm relative">
          <input v-model="searchValue" class="grow" placeholder="搜索" type="search" @keyup.enter="search"/>
          <button class="btn btn-sm btn-square absolute right-0" @click="search">
            <svg
                class="h-4 w-4 opacity-70"
                fill="currentColor"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg">
              <path
                  clip-rule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  fill-rule="evenodd"/>
            </svg>
          </button>
        </label>
      </div>
      <div class="flex-1 min-h-0 h-32 overflow-y-scroll">
        <MainChatList :searchList="searchList" :users="users" @onSelectChat="selectChat"/>
      </div>
      <div ref="resizeRef" class="absolute w-1 h-full right-0 top-0 hover:cursor-e-resize"></div>
    </div>
    <div class="flex-1 h-full overflow-y-auto">
      <MainChatPanel/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import User from "../types/User/User";

definePageMeta({
  layout: 'main-layout',
})
const chatListRef = ref(null);
const resizeRef = ref(null);
const searchValue = ref('');
const searchList:Ref<User> = ref([]);
const users:Ref<User> = ref([]);
onMounted(() => {
  initUserList();
  resizeChatList();
})
watch(searchValue,()=>{
  if (searchValue.value.length <=0) {
    initUserList();
    searchList.value = [];
  }
})
async function initUserList(){
  const db = new ReniooDB();
  users.value = await db.users.orderBy("id").toArray();
}
async function filterUserList(){
  const db = new ReniooDB();
  users.value = await db.users.orderBy("id").filter(item=> item.name.includes(searchValue.value)).toArray();
}
function resizeChatList() {
  let isMouseDown = false;
  resizeRef.value.addEventListener("mousedown", () => {
    if (isMouseDown) return;
    isMouseDown = true;
  });
  document.addEventListener("mouseup", () => {
    if (!isMouseDown) return;
    isMouseDown = false;
  })
  document.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    let w = e.x - (resizeRef.value.getBoundingClientRect().right - resizeRef.value.offsetLeft) + 5;
    if (w > 300) w = 300;
    if (w < 200) w = 200;
    chatListRef.value.style.width = w + 'px';
  })
}
async function search(){
  if (searchValue.value.length <= 0) return;
  filterUserList();
  const supabase = useSupabaseClient();
  const {data,error} = await supabase.from('user').select('*').like('name',`%${searchValue.value}%`)
  if (error) return;
  searchList.value = data as User[];
}
function selectChat(){
  searchValue.value = "";
}
</script>
