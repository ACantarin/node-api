const UsuarioService = require('../services/usuarioService')

const usuarioService = new UsuarioService()

class UsuarioController {
    static async cadastrar(req, res) {
        const { nome, email, senha } = req.body

        try {
            const usuario = await usuarioService.cadastrar({ nome, email, senha })
            return res.status(201).json(usuario)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async listar(req, res) {
        try {
            const usuarios = await usuarioService.listar()
            res.status(200).json(usuarios)
        } catch (error) {
            res.status(error).send({ message: error.message })
        }
    }

    static async buscar(req, res) {
        const { id } = req.params

        try {
            const usuario = await usuarioService.buscar(id)
            res.status(200).json(usuario)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async atualizar(req, res) {
        const { id } = req.params
        const { nome, email, senha } = req.body

        try {
            const usuario = await usuarioService.atualizar(id, { nome, email, senha })
            res.status(200).json(usuario)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletar(req, res) {
        const { id } = req.params

        try {
            await usuarioService.deletar(id)
            res.status(200).send({ message: 'Usuário deletado com sucesso!' })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = UsuarioController
