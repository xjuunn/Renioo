<template>
  <div class="h-full border-t border-base-content border-opacity-10 flex min-h-10 items-end pb-2 pt-2">
    <button class="btn btn-ghost btn-square btn-md hover:bg-base-100 opacity-70 hover:opacity-100">
      <icon class="w-7 h-7" name="uis:paperclip"></icon>
    </button>
    <textarea
        ref="textarea"
        class="textarea resize-none textarea-ghost flex-1 h-full focus:border-none focus:outline-none focus:mt-0.5 max-h-36"
        placeholder="输入消息 . . ."
    ></textarea>
    <button class="btn btn-ghost btn-square btn-md hover:bg-base-100 opacity-70 hover:opacity-100">
      <icon class="w-7 h-7" name="mdi:microphone"></icon>
    </button>
    <button class="btn btn-ghost btn-square btn-md hover:bg-base-100 opacity-70 hover:opacity-100" @click="test">
      <icon class="w-7 h-7" name="mingcute:emoji-fill"></icon>
    </button>
  </div>
</template>
<script lang="ts" setup>
import {UserPublic} from "../../../types/User/UserPublic";

const supabase = useSupabaseClient();

async function test() {

  // const {data, error} = await supabase
  //     .from('user')
  //     .upsert({some_column: 'someValue'})
  //     .select()
  //
  // console.log(data,error)

  const {data,error} = await supabase.auth.getUser();
  let id = data.user?.id;
  if (!id) throw "用户ID为空";
  let userPublic:UserPublic = {
    id,name:id,last_sign:data.user?.last_sign_in_at,peer_id:id,public_key:"123",
  };
  const result = await supabase.from('user').upsert(userPublic).select();
  console.log(result);

}
</script>