export default class PeerConnectManager {

    connect(peerid: string): Promise<void> {
        const {peer} = usePeerStore();
        return peer
    }
}