import {type} from "@tauri-apps/plugin-os"
export const useEnvInfo = defineStore('EnvInfo', () => {
    if (import.meta.server) return;
    const {isAndroid, isMacOS, isIos, isWindows} = useDevice();
    let isLinux = false;
    const isTauri = !!window.__TAURI_INTERNALS__;
    if (isTauri) isLinux = type() === 'linux';

    return {
        isTauri,
        isAndroid,
        isMacOS,
        isIos,
        isWindows,
        isLinux,
    }
})
