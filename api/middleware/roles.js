const database = require('../models')

const roles = (listaRoles) => {
    return async (req, res, next) => {
        const { usuarioId } = req
        try {
            const usuario = await database.usuarios.findOne({
                include: [
                    {
                        model: database.roles,
                        as: 'usuario_roles',
                        attributes: ['id', 'nome', 'descricao'],
                    }
                ],
                where: {
                    id: usuarioId
                }
            })

            if (!usuario) {
                return res.status(401).send({message: 'Usuário não encontrado!'})
            }

            const rolesCadastradas = usuario.usuario_roles.map((role) => role.nome).some((role) => listaRoles.includes(role))

            if (!rolesCadastradas) {
                return res.status(401).send({message: 'Usuário sem permissão!'})
            }

            return next()
        } catch (error) {
            return res.status(401).send({message: 'Usuário não autorizado!'})
        }
    }
}

module.exports = roles