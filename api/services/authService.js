const database = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret');

class AuthService {
    async login(dto) {
        const usuario = await database.usuarios.findOne({
            attributes: ['id', 'email', 'senha'],
            where: {
                email: dto.email
            }
        });

        if (!usuario) {
            throw new Error('Usuário nao encontrado')
        }

        const senhaCorreta = await compare(dto.senha, usuario.senha)

        if (!senhaCorreta) {
            throw new Error('Dados de login inválidos')
        }

        const accessToken = sign({
            id: usuario.id,
            email: usuario.email
        }, jsonSecret.secret, {
            expiresIn: 86400
        })

        return { accessToken: accessToken };
    }
}

module.exports = AuthService