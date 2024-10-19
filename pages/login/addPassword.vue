<template>
  <div class="w-full h-screen flex items-center justify-center font-deyi" data-tauri-drag-region>
    <div>
      <div class="w-64 mb-4">
<!--        <icon name="fluent:password-24-regular" class="text-2xl"/>-->
        <b>设置密码</b>
      </div>
      <div class="w-64">
        <input v-model="pass1" class="input border-none outline-none bg-base-300 w-full" type="password" placeholder="输入密码"/>
        <input v-model="pass2" class="input border-none outline-none bg-base-300 w-full mt-2" type="password" placeholder="重复密码"/>
      </div>
      <div class="text-sm mt-2">{{print}}</div>
      <div class="w-full flex items-center flex-col mt-5">

          <button @click="next" class="btn btn-ghost">
            <span v-show="isloading" class="loading loading-spinner loading-xs"></span>
            <span v-show="!isloading">下一步</span>
          </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "clean-layout"
})
const supabase = useSupabaseClient();
const print = ref('');
const pass1 = ref('');
const pass2 = ref('');
const isloading = ref(false);
async function next(){
  if (pass1.value === '' || pass2.value === '') {
    print.value = '请输入密码';
    return;
  }
  if (pass1.value.length > 30) {
    print.value = "密码太长了";
    return;
  }
  if (pass1.value.length < 6) {
    print.value = "密码太短了";
    return;
  }
  if (pass2.value != pass1.value) {
    print.value = "两次密码输入不一致";
    return;
  }

  isloading.value = true;
  const {error} = await supabase.auth.updateUser({
    password:await hashPassword(pass1.value)
  })
  isloading.value = false;
  if (error) {
    print.value = error.message;
    return;
  }
  navigateTo("/login/setUsername")

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