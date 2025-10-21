const { Router } = require('express')
const autenticado = require('../middleware/autenticado')
const RoleController = require('../controllers/roleController')

const router = Router().use(autenticado)

router
    .post('/roles', RoleController.cadastrar)
    .get('/roles', RoleController.listar)
    .get('/roles/id/:id', RoleController.buscar)
    .delete('/roles/id/:id', RoleController.deletar)
    .put('/roles/id/:id', RoleController.atualizar)

module.exports = router