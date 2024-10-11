<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
<script setup lang="ts">
window.addEventListener("contextmenu",e=>{
  e.preventDefault();
})
</script>

<style>
@font-face {
  font-family: deyi;
  src: url('/fonts/SmileySans-Oblique.ttf.woff2');
  font-display: swap;
}
.font-deyi {
  font-family: deyi,'Courier New', Courier, monospace;
}
.glass {
  background-image: none ;
  box-shadow: none;
}
body {
  overflow: hidden;
}
* {
  scrollbar-width: none;
  user-select: none;
}
</style>