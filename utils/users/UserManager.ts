import {User} from "../../.nuxt/imports";


export class UserManager {

    async findUserByID(id: string, save: false): User {
        const supabase = useSupabaseClient();
        const {data, error} = await supabase.from('user').select().eq('id', id);
        if (error) throw error;
        const user = data[0] as User
        if (save) this.saveUser(user);
        return user;
    }

    async saveUser(user: User) {
        const db = new ReniooDB();
        const data = await db.users.get(user.id)
        if (!data) {
            db.users.add(user).catch(e => console.error("错误", e));
        } else {
            db.users.update(user.id, data);
        }

    }


}