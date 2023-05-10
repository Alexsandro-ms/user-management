const knex = require("../database/connection");
const User = require("./User")

class PasswordToken {
    async create(email) {
        const userEmail = await User.findByEmail(email)

        if (!userEmail) {
            return { status: false, err: "O email não está cadastrado." }
        }

        let token = Date.now()
        try {
            await knex.insert({
                user_id: userEmail.id,
                used: 0,
                token,
            }).table("passwordToken")

            return { status: true, token }
        } catch (error) {
            console.log(error)
            return { status: false, err: error }
        }
    }
    async validate(token) {
        try {
            const result = await knex.select("*").where({ token }).table("passwordToken")

            if (!result) {
                return false
            }

            const tk = result[0]


            if (tk.used !== 0) {
                return { status: false };
            } else {
                return { status: true, token: tk };
            }

        } catch (error) {
            console.log(error)
            return { status: false, err: error }
        }
    }
    async setUsed(token) {
        await knex.update({ used: 1 }).where({ token }).table("passwordToken")
    }
}

module.exports = new PasswordToken()