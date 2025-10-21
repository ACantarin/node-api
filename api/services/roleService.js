const database = require('../models')
const uuid = require('uuid')

class RoleService {
    async cadastrar(dto) {
        const role = await database.roles.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (role) {
            throw new Error('Já existe um perfil cadastrado com esse nome')
        }

        try {
            const newRole = await database.roles.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            })

            return newRole
        } catch (error) {
            console.log('Message error: ', error.message)
            throw (error)
        }
    }

    async listar() {
        try {
            const roles = await database.roles.findAll({
                attributes: ['id', 'nome', 'descricao']
            })
            return roles
        } catch (error) {
            throw (error)
        }
    }

    async buscar(id) {
        try {
            const role = await database.roles.findOne({
                attributes: ['id', 'nome', 'descricao'],
                where: {
                    id: id
                }
            })

            if (!role) {
                throw new Error('Perfil nao encontrado!')
            }

            return role
        } catch (error) {
            throw (error)
        }
    }

    async atualizar(id, dto) {
        try {
            const role = await database.roles.findOne({
                where: {
                    id: id
                }
            })

            if (!role) {
                throw new Error('Perfil nao encontrado!')
            }

            await database.roles.update(dto, {
                where: {
                    id: id
                }
            })

            return await database.roles.findOne({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw (error)
        }
    }

    async deletar(id) {
        try {
            const role = await database.roles.findOne({
                where: {
                    id: id
                }
            })

            if (!role) {
                throw new Error('Perfil nao encontrado!')
            }

            await database.roles.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = RoleService