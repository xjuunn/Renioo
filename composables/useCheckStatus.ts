import {getCurrentWindow, LogicalSize} from '@tauri-apps/api/window'

export default function useCheckStatus() {
    const supabase = useSupabaseClient();

    async function check(print: Function): string {
        const {data, error} = await supabase.auth.getSession();
        if (error) throw error;
        if (data.session === null) navigateTo('/login')

        const window = getCurrentWindow()
        await window.setSize(new LogicalSize(900, 600));
        await window.setMinSize(new LogicalSize(700, 500))
        await window.setMinimizable(true);
        await window.setMaximizable(true);
        await window.setFullscreen(false);
        await window.setResizable(true);
        navigateTo("/");
        return 'ok';
    }

    return {
        check,
    }
}