import {isTauri} from '@tauri-apps/api/core'
import {platform} from '@tauri-apps/plugin-os'
import {defineStore} from "pinia";
import User from "../types/User/User";

export const useAppStore = defineStore('app', () => {
    /** 当前环境是否为Tauri桌面端 用来检测是否需要显示任务栏和是否可以窗口多开等功能 */
    const isTauriDesktop = ref(false);
    let chatUser:Ref<User> = ref({});
    if (isTauri()) {
        const platformType = platform();
        isTauriDesktop.value = isTauri() && (platformType === 'windows' || platformType === 'linux' || platformType === 'macos')
    }
    /** 设置聊天窗口正在打开的用户ID **/
    function setChatUser(user: User) {
        chatUser.value = user;
    }
    function getChatUser(){
        return chatUser.value;
    }

    return {
        isTauriDesktop,getChatUser,setChatUser
    }
})