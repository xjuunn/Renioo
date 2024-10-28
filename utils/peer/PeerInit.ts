import Peer from "peerjs";


export default class PeerInit {
    init():Promise<{peer:Peer|undefined,error:any}> {
        return new Promise((resolve, reject) => {
            const peer = new Peer();
            const supabase = useSupabaseClient();
            peer.on("open", async (id) => {
                const {data: user, error} = await supabase.auth.getUser();
                const {error: metadataError} = await supabase.auth.updateUser({data: {peer_id: id,}})  // 更新metadata
                if (metadataError) throw metadataError;
                const {
                    data,
                    error: userError
                } = await supabase.from('user').update({'peer_id': id}).eq('id', user.user?.id).select();
                if (userError) throw userError;
                resolve({peer})
            })
            peer.on("error", error => {
                reject({error})
            });
        });
    }

}