import User from "../models/User";
import orphanagesView from "./orphanages_view";

export default {
    render(user: User) {
        return {
            id: user.id,
            email: user.email,
            // senha: user.senha,
            orphanages: orphanagesView.renderMany(user.orphanages)
        };
    },
    
    renderMany(users : User[]) {
        return users.map(user => this.render(user));
    }
};


