const { Router } = require('express')
const AclController = require('../controllers/aclController')

const router = Router()

router
    .post('/acl', AclController.cadastrar)
    .post('/acl/permissoes/roles', AclController.cadastrarPermissoesRoles)

module.exports = router