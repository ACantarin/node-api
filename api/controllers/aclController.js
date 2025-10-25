const AclService = require('../services/aclService')

const aclService = new AclService()

class AclController {
    static async cadastrar(req, res) {
        const { usuarioId, roles, permissoes } = req.body
        
        try {
            const acl = await aclService.cadastrar({ roles, permissoes, usuarioId })
            return res.status(201).json(acl)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async cadastrarPermissoesRoles(req, res) {
        const { roleId, permissoes } = req.body
        
        try {
            const permissoesRole = await aclService.cadastrarPermissoesRoles({ roleId, permissoes })
            return res.status(201).json(permissoesRole)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = AclController