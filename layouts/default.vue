<template>
  <div class="w-full h-screen">
    <slot/>
  </div>
  <Teleport to="body">
    <div class="absolute top-4 right-1">
      <MainWindowThreeButton/>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
</script>