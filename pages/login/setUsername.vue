<template>
  <div class="w-full font-deyi h-screen flex items-center justify-center" data-tauri-drag-region>
    <div class="w-64">
      <!--      <div class="flex">-->
      <!--        <div class="text-sm w-14 flex items-center justify-end mr-2">设置头像</div>-->
      <!--        <label for="avatar" class="flex-1">-->
      <!--          <input id="avatar" class="input border-none outline-none bg-base-300 w-full" placeholder="输入头像URL"-->
      <!--                 type="text"/>-->
      <!--        </label>-->
      <!--      </div>-->
      <div class="flex mt-2">
        <div class="text-sm flex items-center justify-end mr-2">设置用户名</div>
        <label class="flex-1" for="username">
          <input v-model="username" id="username" class="input border-none outline-none bg-base-300 flex-1 w-full" placeholder="输入用户名"
                 type="text"/>
        </label>
      </div>
      <div class="flex justify-end text-sm mt-3">{{print}}</div>
      <div class="flex items-center justify-end mt-7">
        <button class="btn btn-ghost" @click="updateUsername">
          <span v-show="isloading" class="loading loading-spinner loading-xs"></span>
          <span v-show="!isloading">完成</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'clean-layout',
})
const print = ref('');
const isloading = ref(false);
const supabase = useSupabaseClient();
const username = ref('');
async function updateUsername() {
  if (isloading.value) return;
  if (username.value === '') {
    print.value = '请输入用户名';
    return;
  }
  if (username.value.length > 20) {
    print.value = "用户名太长了";
    return;
  }
  if (username.value.length <= 2) {
    print.value = "用户名太短";
    return;
  }
  isloading.value = true;
  const {data,error} = await supabase.auth.updateUser({
    data:{
      username: username.value,
    }
  })
  isloading.value = false;
  if (error) {
    print.value = error.message;
    return;
  }
  const {setLogged} = useUserStore();
  await setLogged(true);
  navigateTo("/check");
}
</script>
<style scoped>
.outline-none {
  outline: none !important;
}
</style>