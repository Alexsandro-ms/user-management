class HomeController {

    async index(req, res) {
        res.send("Servidor rodando");
    }

}

module.exports = new HomeController();