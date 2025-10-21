const database = require('../models')
const { hash } = require('bcryptjs')
const uuid = require('uuid')

class UsuarioService {
    async cadastrar(dto) {
        const usuario = await database.usuarios.findOne({
            where: {
                email: dto.email
            }
        })

        if (usuario) {
            throw new Error('Usuário já cadastrado')
        }

        try {
            const newUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: await hash(dto.senha, 8)
            })

            return newUsuario;
        } catch (error) {
            throw error;
        }
        
    }

    async listar() {
        try {
            const usuarios = await database.usuarios.findAll()

            if (!usuarios) {
                throw new Error('Nenhum usuário cadastrado')
            }

            return usuarios
        } catch (error) {
            throw error
        }
    }

    async buscar(id) {
        try {
            const usuario = await database.usuarios.findOne({
                where: {
                    id: id
                }
            });

            if (!usuario) {
                throw new Error('Usuário não encontrado!')
            }

            return usuario;
        } catch (error) {
            throw error
        }
    }

    async atualizar(id, dto) {
        try {
            const usuario = await database.usuarios.findOne({
                where: {
                    id: id
                }
            });

            if (!usuario) {
                throw new Error('Usuário não encontrado!')
            }

            if (dto.email) {
                await this.validarEmailExistente(id, dto.email)
            }

            await database.usuarios.update(dto, {
                where: {
                    id: id
                }
            });

            return await database.usuarios.findOne({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error
        }
    }

    async deletar(id) {
        try {
            const usuario = await database.usuarios.findOne({
                where: {
                    id: id
                }
            });

            if (!usuario) {
                throw new Error('Usuário não encontrado!')
            }            

            await database.usuarios.destroy({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error
        }
    }

    async validarEmailExistente(id, email) {
        try {
            const usuario = await database.usuarios.findOne({
                where: {
                    email: email,
                    id: {
                        [database.Sequelize.Op.ne]: id
                    }
                }
            });

            if (usuario) {
                throw new Error('Usuário com esse e-mail ja cadastrado!')
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = UsuarioService