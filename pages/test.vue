<template>
  <div class="grid grid-rows-7 p-10 items-center justify-center w-full h-screen" data-tauri-drag-region>
    <button class="btn btn-primary" @click="test">test</button>
  </div>
</template>
<script lang="ts" setup>
let id = 0;
async function test() {
  const userManager = new UserManager();
  const user = await userManager.findUserByID("dd70b1a9-1f74-4db1-af8c-cb4662a190ea",true)
  console.log(user)

}

</script>