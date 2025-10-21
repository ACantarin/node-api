const RoleService = require('../services/roleService')

const roleService = new RoleService()

class RoleController {
    static async cadastrar(req, res) {
        const { nome, descricao } = req.body

        try {
            const role = await roleService.cadastrar({ nome, descricao })
            return res.status(201).json(role)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
    
    static async listar(req, res) {
        try {
            const roles = await roleService.listar()
            res.status(200).json(roles)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscar(req, res) {
        const { id } = req.params

        try {
            const role = await roleService.buscar(id)
            res.status(200).json(role)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async atualizar(req, res) {
        const { id } = req.params
        const { nome, descricao } = req.body

        try {
            const role = await roleService.atualizar(id, { nome, descricao })
            res.status(200).json(role)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletar(req, res) {
        const { id } = req.params

        try {
            await roleService.deletar(id)
            res.status(200).send({ message: 'Perfil deletado com sucesso!' })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = RoleController