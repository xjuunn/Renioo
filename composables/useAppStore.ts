import {isTauri} from '@tauri-apps/api/core'
import {platform} from '@tauri-apps/plugin-os'
import {defineStore} from "pinia";
export const useAppStore = defineStore('app', () => {
    /** 当前环境是否为Tauri桌面端 用来检测是否需要显示任务栏和是否可以窗口多开等功能 */
    let isTauriDesktop = ref(false);
    if (isTauri()) {
        const platformType = platform();
        isTauriDesktop.value = isTauri() && (platformType === 'windows' || platformType === 'linux' || platformType === 'macos')
    }
    return {
        isTauriDesktop
    }
})