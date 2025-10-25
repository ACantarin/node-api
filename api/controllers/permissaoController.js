const PermissaoService = require('../services/permissaoService')

const permissaoService = new PermissaoService()

class PermissaoController {
    static async cadastrar(req, res) {
        const { nome, descricao } = req.body

        try {
            const permissao = await permissaoService.cadastrar({ nome, descricao })
            return res.status(201).json(permissao)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
    
    static async listar(req, res) {
        try {
            const permissoes = await permissaoService.listar()
            res.status(200).json(permissoes)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscar(req, res) {
        const { id } = req.params

        try {
            const permissao = await permissaoService.buscar(id)
            res.status(200).json(permissao)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async atualizar(req, res) {
        const { id } = req.params
        const { nome, descricao } = req.body

        try {
            const permissao = await permissaoService.atualizar(id, { nome, descricao })
            res.status(200).json(permissao)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletar(req, res) {
        const { id } = req.params

        try {
            await permissaoService.deletar(id)
            res.status(200).send({ message: 'Permissão deletada com sucesso!' })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = PermissaoController