import {isTauri} from '@tauri-apps/api/core'
import {platform} from '@tauri-apps/plugin-os'
import {defineStore} from "pinia";

export const useAppStore = defineStore('app', () => {
    /** 当前环境是否为Tauri桌面端 用来检测是否需要显示任务栏和是否可以窗口多开等功能 */
    const isTauriDesktop = ref(false);
    const _chatUserID = ref('');
    if (isTauri()) {
        const platformType = platform();
        isTauriDesktop.value = isTauri() && (platformType === 'windows' || platformType === 'linux' || platformType === 'macos')
    }
    /** 获取当前聊天窗口的用户ID **/
    const getChatUserID = () => _chatUserID;
    /** 设置聊天窗口正在打开的用户ID **/
    function setChatUserID(id: string) {
        _chatUserID.value = id;
        console.log(id)
    }

    return {
        isTauriDesktop,getChatUserID,setChatUserID
    }
})