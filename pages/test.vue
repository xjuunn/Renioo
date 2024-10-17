<template>
  <div class="h-full w-full flex flex-col gap-2 items-center justify-center" data-tauri-drag-region>
    <div class="flex flex-col gap-2 justify-end items-end">
      <label for="email">
        邮箱：
        <input class="input input-primary" v-model="email" placeholder="输入邮箱"/>
      </label>
      <label for="pass">
        密码：
        <input v-model="pass" type="password" class="input input-primary" placeholder="输入密码"/>
      </label>
      <label for="code">
        验证码：
        <input v-model="code" class="input input-primary" type="text" placeholder="输入验证码">
      </label>
      <div class="gap-2 flex justify-around mt-5 w-full">
        <button class="btn btn-primary w-full" @click="signup">注册</button>
      </div>
    </div>
    <button class="btn btn-primary" @click="login">登录</button>
    <button class="btn btn-primary" @click="loginOPT">使用OTP登录</button>
    <button class="btn btn-primary" @click="vercode">验证</button>
    <button class="btn btn-primary" @click="getSession1">getSession</button>
    <button class="btn btn-primary" @click="updatePass">更新密码</button>
    <button class="btn btn-primary" @click="logout">登出</button>
  </div>
</template>

<script lang="ts" setup>

const supabase = useSupabaseClient();
const email = ref('');
const pass = ref('');
const code = ref('');
async function signup() {
  const data = await supabase.auth.signUp({
    email: email.value,
    password: pass.value,
    options:{
      data:{
        publicKey:'123123123123123123123123'
      }
    }
  });
  console.log(data);
}
async function login(){
  const data = supabase.auth.signInWithPassword({
    email: email.value,
    password: pass.value,
  })
  console.log(data)
}
async function getSession1(){
  const data = await supabase.auth.getSession();
  console.log(data)
}

async function loginOPT(){
  const data= await supabase.auth.signInWithOtp({
    email:email.value,
  })
  console.log(data)
}
async function vercode(){
  const data = await supabase.auth.verifyOtp({
    email:email.value,
    token:code.value,
    type:'email'
  })
  console.log(data)
}
async function logout(){
  const data = await supabase.auth.signOut();
  console.log(data)
}

async function updatePass(){
  const data = await supabase.auth.updateUser({
    password:pass.value,
  })
  console.log(data);
}
</script>
