<template>
  <div class="w-full h-screen flex items-center justify-center font-deyi flex-col" data-tauri-drag-region>
    <div class="absolute top-7 left-4">
      <NuxtLink class="btn btn-ghost btn-xs opacity-20 hover:opacity-100" to="/login">
        <icon class="text-xl" name="weui:back-filled"/>
        Back
      </NuxtLink>
    </div>
    <div class="w-64 grid grid-cols-12 gap-2">
      <label for="email" class="col-span-3 items-center place-content-center text-end">邮箱：</label>
      <input id="email" v-model="email" type="email" class="input border-none outline-none bg-base-300 col-span-9" placeholder="输入邮箱"/>
      <label for="email" class="col-span-3 items-center place-content-center text-end">密码：</label>
      <input id="password" v-model="pass" type="password" class="input border-none outline-none bg-base-300 col-span-9" placeholder="输入密码"/>
    </div>
    <div class="w-64 text-wrap min-h-9 text-end mt-2 text-sm">
      {{print}}
    </div>
    <button class="btn btn-ghost mt-2 w-64" @click="login">
      <span v-show="isloading" class="loading loading-spinner loading-md"></span>
      <span v-show="!isloading">登录</span>
    </button>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'clean-layout',
})
const print = ref('')
const email = ref('');
const pass = ref('');
const isloading = ref(false);
const supabase = useSupabaseClient();
async function login() {
  if (isloading.value) return;
  if (email.value === '') {
    print.value = '请输入邮箱';
    return;
  }
  if (pass.value == "") {
    print.value = "请输入密码";
    return;
  }
  if (pass.value.length > 100) {
    print.value = "真的这么长吗 ;-;";
    return;
  }
  if (email.value.length > 60) {
    print.value = "这好像不对吧...";
    return;
  }
  isloading.value = true;
  const {error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: await hashPassword(pass.value)
  })
  isloading.value = false;
  if (error) {
    print.value = error.message;
    return;
  }
  const {setLogged} = useUserStore();
  setLogged(true);
  navigateTo("/check");
}
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
</script>

<style scoped>
.outline-none {
  outline: none !important;
}
</style>