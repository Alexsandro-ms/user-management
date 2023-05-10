const User = require("../services/user")
const PasswordToken = require("../services/PasswordToken")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const dotenv = require("dotenv").config()

class UserController {
    async index(req, res) {
        try {
            const allUsers = await User.findAll()

            if (!allUsers) {
                return res.status(200).json({ message: "Nenhum usuário cadastrado!" })
            }

            console.log(allUsers)
            return res.status(200).json(allUsers)
        } catch (error) {
            console.log(error)

            return res.status(400).json(error)
        }
    }
    async findUser(req, res) {
        const { id } = req.params
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." })
        }

        return res.status(200).json(user)
    }
    async create(req, res) {
        const { email, name, password } = req.body

        if (!email || !name || !password) {
            return res.status(400).json({ message: "Preencha todos os campos!" })
        }

        const emailExist = await User.findEmail(email)

        if (emailExist) {
            return res.status(406).json({ message: "Email já cadastrado!" })
        }

        await User.new(email, password, name)

        res.status(200).send("Recebendo o body")
    }
    async edit(req, res) {
        const { id, name, email, role } = req.body

        const result = await User.update(id, name, email, role)

        if (!result) {
            return res.status(400)
        }

        if (result.status) {
            return res.status(200).json({ message: "Atualizado com sucesso!" })
        }

        return res.status(500).json(result.error)
    }
    async remove(req, res) {
        const { id } = req.params

        const result = await User.delete(id)

        if (!result.status) {
            return res.status(400).json(result.message)
        }

        return res.status(200).json({ message: "Usuário excluído com sucesso." })
    }
    async signIn(req, res) {
        const { email, password } = req.body

        const user = await User.findByEmail(email)

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Senha incorreta." })
        }

        const token = jwt.sign({ email: user.email, role: user.role }, process.env.SECRETKEY)

        return res.status(200).json({ message: "Usuário entrou com sucesso.", token })

    }
    async recoverPassword(req, res) {
        const { email } = req.body

        const result = await PasswordToken.create(email)

        if (!result.status) {
            return res.status(400).json({ message: result.err })
        }

        return res.status(200).json({ token: result.token })
    }
    async changePassword(req, res) {
        const { token, password } = req.body

        const isTokenValid = await PasswordToken.validate(Number(token))

        if (!isTokenValid.status) {
            return res.status(400).json({ message: "Token inválido" })
        }

        await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)

        return res.status(200).json({ message: "Senha alterada com sucesso!" })

    }
}

module.exports = new UserController()