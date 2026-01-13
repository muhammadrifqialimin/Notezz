"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Notes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT, // Pakai TEXT biar muat panjang
        allowNull: false,
      },
      // FOREIGN KEY KE APIKEYS
      apiKeyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ApiKeys", // Nama tabel yang dirujuk
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // Kalau key dihapus, note ikut terhapus
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Notes");
  },
};
