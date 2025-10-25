const { Router } = require('express')
const autenticado = require('../middleware/autenticado')
const PermissaoController = require('../controllers/permissaoController')

const router = Router().use(autenticado)

router
    .post('/permissoes', PermissaoController.cadastrar)
    .get('/permissoes', PermissaoController.listar)
    .get('/permissoes/id/:id', PermissaoController.buscar)
    .delete('/permissoes/id/:id', PermissaoController.deletar)
    .put('/permissoes/id/:id', PermissaoController.atualizar)

module.exports = router