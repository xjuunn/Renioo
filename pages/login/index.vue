<template>
  <div class="w-full font-deyi h-screen flex items-center justify-center flex-col" data-tauri-drag-region>
    <div class="w-64 mb-5" data-tauri-drag-region>
      <div class="join">
        <label class="input border-none outline-none bg-base-300 flex items-center gap-2 rounded-r-none" data-tauri-drag-region>
          <svg
              class="h-5 w-5 opacity-70"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
            <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
          </svg>
          <input v-model="email" class="grow max-w-xs w-full" placeholder="输入邮箱" type="text"/>
        </label>
        <button class="btn rounded-l-none" @click="login">
          <icon v-show="!isloading" class="text-xl" name="mingcute:right-fill"/>
          <span v-show="isloading" class="loading loading-spinner loading-xs"></span>
        </button>
      </div>
      <div class="label h-10" data-tauri-drag-region>
        <div class="label-text-alt block tracking-widest w-full">{{ print }}</div>
      </div>
    </div>
    <div class="divider me-16 ms-16" data-tauri-drag-region>OR</div>
    <div class="w-full flex items-center justify-center flex-row" data-tauri-drag-region>
      <div class="tooltip tooltip-bottom" data-tip="离线">
        <button class="btn btn-ghost btn-circle">
          <icon class="text-2xl" name="ant-design:disconnect-outlined"/>
        </button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Github">
        <button class="btn btn-ghost btn-circle">
          <icon class="text-2xl" name="mdi:github"/>
        </button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Google">
        <button class="btn btn-ghost btn-circle">
          <icon class="text-2xl" name="mingcute:google-fill"/>
        </button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Discord">
        <button class="btn btn-ghost btn-circle">
          <icon class="text-2xl" name="ic:baseline-discord"/>
        </button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Microsoft">
        <button class="btn btn-ghost btn-circle">
          <icon class="text-2xl" name="mdi:microsoft"/>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'clean-layout',
})
const isloading = ref(false);
const supabase = useSupabaseClient();
const email = ref("");
const print = ref("");

async function login() {
  if (email.value === '') {
    print.value = '请输入邮箱';
    return;
  }
  if (email.value.length > 60) {
    print.value = "真的这么长吗😦"
  }
  const regex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!regex.test(email.value)) {
    print.value = "这看起来不是一个邮箱,请检查并重新输入";
    return;
  }
  isloading.value = true;
  const {data, error} = await supabase.auth.signInWithOtp({
    email: email.value,
  })
  isloading.value = false;
  if (error) {
    print.value = error.message;
    return;
  }
  navigateTo('/login/verifyOtp?email='+email.value);
}


</script>
<style scoped>
.outline-none {
  outline: none !important;
}
</style>