import {getCurrentWindow, LogicalSize} from '@tauri-apps/api/window'

export default function useCheckStatus() {
    const supabase = useSupabaseClient();

    async function check(print: Function): string {
        const {data, error} = await supabase.auth.getSession();
        if (error) throw error;
        if (data.session === null) {
            navigateTo('/login')
            return;
        }
        const isFirst = await checkFirst(data.session.user);  // 第一次登录时，需要初始化密码，和用户名等信息
        if (isFirst) {
            navigateTo("/login/addPassword"); // 设置密码
            return;
        }
        pass();  // 检查通过
        return 'ok';
    }

    async function checkFirst(user) {
        const {data, error} = await supabase.from('user').select("*").eq('id', user.id);
        if (error) throw error;
        return !data?.length > 0;
    }

    async function pass() {
        const window = getCurrentWindow()
        await window.setSize(new LogicalSize(900, 600));
        await window.setMinSize(new LogicalSize(700, 500))
        await window.setMinimizable(true);
        await window.setMaximizable(true);
        await window.setFullscreen(false);
        await window.setResizable(true);
        navigateTo("/");
    }


    return {
        check
    }
}