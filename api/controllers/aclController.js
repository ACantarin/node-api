const AclService = require('../services/aclService')

const aclService = new AclService()

class AclController {
    static async cadastrar(req, res) {
        const { roles, permissoes } = req.body
        const { usuarioId } = req
        
        try {
            const acl = await aclService.cadastrar({ roles, permissoes, usuarioId })
            return res.status(201).json(acl)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = AclController