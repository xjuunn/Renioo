<template>
  <div class="w-full h-screen flex flex-col items-center justify-center font-deyi" data-tauri-drag-region>
    <div class="absolute top-7 left-4">
      <NuxtLink class="btn btn-ghost btn-xs opacity-20 hover:opacity-100" to="/login">
        <icon class="text-xl" name="weui:back-filled"/>
        Back
      </NuxtLink>
    </div>
    <div class="w-64">
      <div class="opacity-70 indent-6 text-sm">
        我们向 <span class="text-success">{{ route.query.email ?? '您的邮箱' }}</span> 发送了六位验证码，请检查邮件，10分钟后将会失效。
        <span class="link link-success" @click="resend">{{ printResend }}</span>
      </div>
      <div class="w-full mb-5 mt-5" data-tauri-drag-region>
        <div class="join">
          <label class="input border-none outline-none bg-base-300 flex items-center gap-2 rounded-r-none"
                 data-tauri-drag-region>
            <icon class="mr-2 text-xl" name="material-symbols:password"/>
            <input v-model="code" class="tracking-widest grow max-w-xs w-full" placeholder="xxx-xxx"
                   @input="formatInput">
          </label>
          <button :class="code.length===7?'':'btn-disabled'" class="btn rounded-l-none" @click="verify">
            <icon v-show="!isloading" class="text-xl" name="mingcute:right-fill"/>
            <span v-show="isloading" class="loading loading-spinner loading-xs"></span>
          </button>
        </div>
        <div class="label h-10" data-tauri-drag-region>
          <div class="label-text-alt block tracking-widest w-full">{{ print }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'clean-layout',
})
const route = useRoute();
const isloading = ref(false);
const print = ref("");
const printResend = ref('')
const code = ref('');
const supabase = useSupabaseClient();
const allowResend = ref(false);
let resendTimeout;
const time = ref(64);
const formatInput = (event) => {
  const input = event.target.value.replace(/-/g, '');
  const validInput = input.replace(/\D/g, '').slice(0, 6);
  if (validInput.length > 0) code.value = validInput.replace(/(\d{3})(?=\d)/g, '$1-');
  else code.value = '';
  event.target.value = code.value;
};
onMounted(() => {
  resendTimeing();
})

async function verify() {
  isloading.value = true;
  const {data, error} = await supabase.auth.verifyOtp({
    type: "email",
    email: route.query.email,
    token: code.value.replace(/-/g, ''),
  })
  isloading.value = false;
  if (error) {
    print.value = error.message;
    return;
  }
  clearInterval(resendTimeout);
  const {setLogged} = useUserStore();
  setLogged(true);
  navigateTo('/check');
}

async function resend() {
  if (time.value > 0) {
    return;
  }
  printResend.value = '正在发送';
  const {error} = await supabase.auth.signInWithOtp({
    email: route.query.email
  })
  if (error) {
    printResend.value = '发送失败';
    print.value = error.message;
    return;
  }
  printResend.value = '已发送';
  resendTimeing();
}

function resendTimeing() {
  time.value = 64;
  clearTimeout(resendTimeout);
  allowResend.value = false;
  resendTimeout = setInterval(() => {
    if (time.value > 0) {
      time.value--;
      printResend.value = time.value + '秒后可重发';
    } else {
      allowResend.value = true;
      clearTimeout(resendTimeout);
      printResend.value = "重发？";
    }
  }, 1000)
}
</script>
<style scoped>
.outline-none {
  outline: none !important;
}
</style>