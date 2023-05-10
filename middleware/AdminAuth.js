const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
    const authToken = req.headers["authorization"]

    if (!authToken) {
        return res.status(401).json({ message: "Não autorizado." })
    }

    try {
        const bearer = authToken.split(" ")
        const token = bearer[1]
        const decoded = jwt.verify(token, process.env.SECRETKEY)

        if (decoded.role != 1) {
            return res.status(401).json({ message: "Não autorizado." })
        }

        next()
    } catch (error) {
        return res.status(401).json({ message: "Não autorizado." })
    }

}