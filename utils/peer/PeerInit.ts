import Peer from "peerjs";


export default class PeerInit {
    init(): Promise<{ peer: Peer | undefined, error: any }> {
        return new Promise((resolve, reject) => {
            const peer = new Peer();
            peer.on("open", async (id) => {
                await this.peerOnOpen(id);
                resolve({peer})
            })
            peer.on('connection', async conn => {
                console.log(conn,1)
                await this.peerOnConnection(conn);
            });
            peer.on("error", error => {
                reject({error})
            });
        });
    }

    private async peerOnOpen(id: string) {
        console.log("peer_id初始化:", id)
        const supabase = useSupabaseClient();
        const {data: user, error} = await supabase.auth.getUser();
        const {error: metadataError} = await supabase.auth.updateUser({data: {peer_id: id,}})  // 更新metadata
        if (metadataError) throw metadataError;
        const {
            data,
            error: userError
        } = await supabase.from('user').update({'peer_id': id}).eq('id', user.user?.id).select();
        if (userError) throw userError;
    }

    private async peerOnConnection(conn) {
        const supabase = useSupabaseClient();
        const {data, error} = await supabase.from('user').select().eq('peer_id', conn.peer);
        if (error) throw error;
        const peerConnectManager = new PeerConnectManager();
        peerConnectManager.addConnection(data[0].id,conn)
    }

}