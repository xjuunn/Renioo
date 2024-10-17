
export const useUserStore = defineStore('user', () => {
    const _islogged = ref(false);
    const islogged = computed(() => _islogged);
    function setLogged(bool: boolean) {
        _islogged.value = bool;
    }

    return {
        islogged,setLogged
    }
})