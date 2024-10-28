<template>
  <div class="w-full h-screen" data-tauri-drag-region>
    <button class="btn btn-primary" @click="test" >test</button>
  </div>
</template>
<script lang="ts" setup>
import PeerConnectManager from "../utils/peer/PeerConnectManager";

async function test(){
 // const peerConnectManager = new PeerConnectManager();
 //  console.log(peerConnectManager.connect('test'))
  const {peer} = usePeerStore();
  console.log((await peer).id);

}
</script>