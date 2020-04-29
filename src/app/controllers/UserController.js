import User from "../models/User";

class UserController {
    async store(req, res) {
        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res.status(400).json({ error: "user already exists" });
        }

        const { id, name, email, provide } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            provide,
        });
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;

        const user = await User.findOne({ where: req.userId });

        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email },
            });

            if (userExists) {
                return res.status(400).json({ error: "user already exists" });
            }
        }

        if (oldPassword && !(await user.checkPassword(password))) {
            return res.status(401).json({ error: "Password does not match" });
        }

        const { id, name, provide } = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            provide,
        });
    }
}

export default new UserController();
