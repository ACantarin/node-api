const database = require('../models')
const uuid = require('uuid')

class PermissaoService {
    async cadastrar(dto) {
        const permissao = await database.permissoes.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (permissao) {
            throw new Error('Já existe uma permissão cadastrada com esse nome')
        }

        try {
            const newPermissao = await database.permissoes.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            })

            return newPermissao
        } catch (error) {
            console.log('Message error: ', error.message)
            throw (error)
        }
    }

    async listar() {
        try {
            const permissoes = await database.permissoes.findAll({
                attributes: ['id', 'nome', 'descricao']
            })
            return permissoes
        } catch (error) {
            throw (error)
        }
    }

    async buscar(id) {
        try {
            const permissao = await database.permissoes.findOne({
                attributes: ['id', 'nome', 'descricao'],
                where: {
                    id: id
                }
            })

            if (!permissao) {
                throw new Error('Permissão não encontrada!')
            }

            return permissao
        } catch (error) {
            throw (error)
        }
    }

    async atualizar(id, dto) {
        try {
            const permissao = await database.permissoes.findOne({
                where: {
                    id: id
                }
            })

            if (!permissao) {
                throw new Error('Permissão não encontrada!')
            }

            await database.permissoes.update(dto, {
                where: {
                    id: id
                }
            })

            return await database.permissoes.findOne({
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
            const permissao = await database.permissoes.findOne({
                where: {
                    id: id
                }
            })

            if (!permissao) {
                throw new Error('Permissão não encontrada!')
            }

            await database.permissoes.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = PermissaoService