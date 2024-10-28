import Peer from "peerjs";

export default class PeerConnectManager {
    private connectedPeers: Map<string, any> = new Map();

    /** 通过user id建立peer连接 **/
    async connectByUserID(id: string) {
        const {peer} = usePeerStore();
        const userManager = new UserManager();
        const user = await userManager.findUserByID(id);
        return new Promise<void>(async (resolve, reject) => {
            const connection = (await peer).connect(user.peer_id);
            connection.on('open', () => {
                this.connectedPeers.set(user.id, connection);
                resolve();
            });

            connection.on('error', (err: any) => {
                reject(err);
            });
        });
    }

    /** 通过user id查询连接对象 **/
    getConnectionByID(id: string) {
        return this.connectedPeers.get(id);
    }

    /**
     * 添加一个连接记录
     * @param id 用户ID
     * @param conn Peer连接对象
     */
    addConnection(id,conn) {
        this.connectedPeers.set(id, conn);
    }
}
