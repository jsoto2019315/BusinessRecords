import Admin from "../Admin/admin.model.js";

export const mainAdmin = async(userAdmin = '') => {
    const mainAdmin = await Admin.findOne({userAdmin});
    if (!mainAdmin) {
        throw new Error(`There can only be one main administrator. The main administrator is ${userAdmin}`);
    }
}