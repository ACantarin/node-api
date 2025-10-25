const bodyParser = require('body-parser')
 
const auth = require('./authRoute')
const produto = require('./produtoRoute')
const usuario = require('./usuarioRoute')
const role = require('./roleRoute')
const permissao = require('./permissaoRoute')
const acl = require('./acl')

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    produto,
    usuario,
    role,
    permissao,
    acl
  )
}
