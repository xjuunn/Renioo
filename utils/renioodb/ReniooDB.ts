import Dexie, {EntityTable} from "dexie";
import User from "../../types/User/User";

let renioodb: ReniooDB;

export default class ReniooDB extends Dexie {
    users!: EntityTable<User, "id">;

    constructor() {
        // 单例模式
        if (renioodb) return renioodb;
        super("ReniooDB");
        renioodb = this;
        this.init();
    }

    init() {
        this.version(1).stores({users: "id, name, peer_id"});
    }
}

