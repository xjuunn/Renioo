import {UserPublic} from "../types/User/UserPublic";

const supabase = useSupabaseClient();
export const useUserStore = defineStore('user', () => {
    const _islogged = ref(false);
    const islogged = computed(() => _islogged);

    async function setLogged(bool: boolean) {
        if (bool) {
            const {data, error} = await supabase.auth.getSession();
            if (error) throw error;
            if (data && data.session === null) throw "用户未登录";

            const user = data.session.user
            let id = user.id
            if (!id) throw "用户ID为空";
            let userPublic: UserPublic = {
                id, name: user.user_metadata.username, last_sign: user.last_sign_in_at, peer_id: id, public_key: "1235",
            };
            const {error:error1} = await supabase.from('user').upsert(userPublic).select();
            if (error1) throw error;
        }

        _islogged.value = bool;
    }

    return {
        islogged, setLogged
    }
})