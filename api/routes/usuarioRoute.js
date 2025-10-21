const { Router } = require('express')
const UsuarioController = require('../controllers/usuarioController')

const router = Router()

router
    .post('/usuarios', UsuarioController.cadastrar)
    .get('/usuarios', UsuarioController.listar)
    .get('/usuarios/id/:id', UsuarioController.buscar)
    .delete('/usuarios/id/:id', UsuarioController.deletar)
    .put('/usuarios/id/:id', UsuarioController.atualizar)

module.exports = router
