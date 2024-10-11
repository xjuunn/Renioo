<template>
  <div id="menubar" class="flex h-full overflow-hidden">
    <div ref="menuBar" class="h-screen border-r border-opacity-20 border-base-content overflow-hidden" data-tauri-drag-region>
      <MainMenuBar></MainMenuBar>
    </div>
    <div ref="mainContainer" class="flex flex-col flex-1 border-opacity-20 border-base-content">
      <div class="flex-1">
        <slot/>
      </div>
    </div>
    <div v-show="false" class="h-screen border-opacity-20 border-base-content border-l">
      <!-- @TODO 最右侧面板 -->
    </div>
  </div>
  <Teleport to="body">
    <div class="absolute top-4 right-1">
      <MainWindowThreeButton/>
    </div>
  </Teleport>
</template>