import {Entity} from "dexie";
import ReniooDB from "../../utils/renioodb/ReniooDB";

export default class User extends Entity<ReniooDB>{
    id: string;
    peer_id: string;
    name: string;
    avatar: string;
    public_key: string;
    last_sign: Date;
    additional: Object;
}