const database = require('../models')
const Sequelize = require('sequelize')

class AclService {
    async cadastrar(dto) {
        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome', 'descricao'],
                },
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                }              
            ],
            where: {
                id: dto.usuarioId
            }
        })

        if (!usuario) {
            throw new Error('Usuário nao encontrado')
        }

        const roles = await database.roles.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.roles
                }
            }
        })

        const permissoes = await database.permissoes.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.permissoes
                }
            }
        })

        await usuario.removeUsuario_roles(usuario.usuario_roles)
        await usuario.removeUsuario_permissoes(usuario.usuario_permissoes)

        await usuario.addUsuario_roles(roles)
        await usuario.addUsuario_permissoes(permissoes)

        const novoUsuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome', 'descricao'],
                },
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                }              
            ]
        })

        return novoUsuario
    }
}

module.exports = AclService