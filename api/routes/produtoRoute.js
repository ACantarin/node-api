const { Router } = require('express')
const ProdutoController = require('../controllers/produtoController')
const autenticado = require('../middleware/autenticado')  
const roles = require('../middleware/roles')
const permissoes = require('../middleware/permissoes')

const router = Router()

router
  .post('/produto', autenticado, roles(['Admin']), ProdutoController.cadastrarProduto)
  .get('/produto', autenticado, permissoes(["Listar"]),ProdutoController.buscarTodosProdutos)
  .get('/produto/id/:id', ProdutoController.buscarProdutoPorId)
  .delete('/produto/id/:id', ProdutoController.deletarProdutoPorId)
  .put('/produto/id/:id', ProdutoController.editarProduto)

module.exports = router