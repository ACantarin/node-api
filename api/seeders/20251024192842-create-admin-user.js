"use strict"
const bcrypt = require("bcryptjs")
const uuid = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const senhaHash = await bcrypt.hash("admin123", 8)

    await queryInterface.bulkInsert(
      "usuarios",
      [
        {
          id: uuid.v4(),
          nome: "Administrador",
          email: "admin@admin.com",
          senha: senhaHash,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuarios", { email: "admin@admin.com" }, {})
  },
}
