import Peer from "peerjs"
export const usePeerStore = defineStore('peer', () => {
    const supabase = useSupabaseClient()
    let peer = new Peer();
    peer.on("open", async (id) => {
        const {data: user, error} = await supabase.auth.getUser();
        const {error: metadataError} = await supabase.auth.updateUser({data: {peer_id: id,}})  // 更新metadata
        if (metadataError) throw metadataError;
        const {
            data,
            error: userError
        } = await supabase.from('user').update({'peer_id': id}).eq('id', user.user?.id).select();
        if (userError) throw userError;
    })
    peer.on("error", error => {throw error});
    return {
        peer
    }
})