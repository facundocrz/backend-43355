import userModel from "../../models/user.js";

export default async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email, password});
        if (user) {
            req.session.user = user;
            res.redirect("/products")
        }
        else {
            res.status(404).json({error: "user not found"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};