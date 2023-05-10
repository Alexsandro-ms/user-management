const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class User {
    async findAll() {
        const users = await knex.select(["id", "email", "role", "name"]).table("users")
        return users;
    }
    async findById(id) {
        const user = await knex.select(["id", "name", "email", "role"]).where({ id }).table("users")

        if (!user) {
            return undefined
        }

        return user[0]
    }
    async findByEmail(email) {
        const userEmail = await knex.select(["id", "name", "email", "password", "role"]).where({ email }).table("users")

        if (!userEmail) {
            return undefined
        }

        return userEmail[0]
    }
    async new(email, password, name) {
        try {
            var hash = await bcrypt.hash(password, 10);
            await knex.insert({ email, password: hash, name, role: 0 }).table("users");
        } catch (err) {
            console.log(err);
        }
    }
    async findEmail(email) {
        try {
            const result = await knex.select("*").from("users").where({ email })

            if (result.length === 0) {
                return false
            }

            return true

        } catch (error) {
            return false
        }
    }
    async update(id, name, email, role) {
        let updateUser = {}

        if (!id) {
            return { status: false, error: "ID não informado" }
        }

        const findEmailUpdate = await this.findEmail(email)

        if (!findEmailUpdate) {
            updateUser.email = email
        }

        if (name) {
            updateUser.name = name
        }

        if (role) {
            updateUser.role = role
        }

        try {
            const update = await knex.update(updateUser).table("users").where({ id })

            return { status: true, error: false }
        } catch (error) {
            return { status: false, error: "Erro ao atualizar usuário" }
        }
    }
    async delete(id) {
        const user = await this.findById(id);

        if (!user) {
            return { status: false, message: "O usuário não existe." }
        }


        try {
            await knex.delete().where({ id }).table("users")
            return { status: true }
        } catch (error) {
            return { status: false, message: error }
        }

    }
    async changePassword(newPassword, id, token) {
        const hash = await bcrypt.hash(newPassword, 10)
        await knex.update({ password: hash }).where({ id }).table("users")
        await PasswordToken.setUsed(token)
    }
}

module.exports = new User();