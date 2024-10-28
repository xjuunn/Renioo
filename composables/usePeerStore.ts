import PeerInit from "../utils/peer/PeerInit";
import Peer from "peerjs";

export const usePeerStore = defineStore('peer', () => {
    let _peerState:Ref<'Initializing'|'ok'|'error'|'null'> = ref('null')
    let _peer = async () => {
        _peerState.value = 'Initializing';
        const {peer, error} = await new PeerInit().init();
        if (error) {
            _peerState.value = 'error';
            throw error
        }
        _peer = peer;
        _peerState.value = 'ok';
    }
    const peer = computed(async ():Peer => {
        if (typeof _peer === 'function') await _peer();
        return _peer;
    })
    const peerStatus = computed(():'Initializing'|'ok'|'error'|'null' => _peerState.value)
    return {
        peer,peerStatus
    }
})


// let peer: Ref<Peer> = ref({});
// let peerState: Ref<'ok' | 'error' | 'Initializing' | 'null'> = ref('Initializing');
// new PeerInit().init().then(value => {
//     peer.value = value.peer
//     peerState.value = 'ok';
// }).catch(error => {
//     console.log(error)
//     peerState.value = 'error';
// });
// const getPeer = computed(() => peer.value);
// return {
//     peer, getPeer, peerState
// }