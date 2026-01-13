"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

/* ===========================================
  1. IMPORT MODEL
  Memasukkan definisi tabel dari file terpisah
  ===========================================
*/
db.User = require("./User")(sequelize, Sequelize.DataTypes);
db.ApiKey = require("./ApiKey")(sequelize, Sequelize.DataTypes);
db.Note = require("./Note")(sequelize, Sequelize.DataTypes);

/* ===========================================
  2. DEFINISI RELASI (ASSOCIATIONS)
  Menghubungkan antar tabel (Foreign Key)
  ===========================================
*/

// --- Relasi: User dan ApiKey ---
// Satu User bisa punya banyak API Key
db.User.hasMany(db.ApiKey, {
  foreignKey: "userId",
  as: "apiKeys", // Cara panggil: user.apiKeys
});

// Satu API Key dimiliki oleh satu User
db.ApiKey.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user", // Cara panggil: apiKey.user
});

// --- Relasi: ApiKey dan Note ---
// Satu API Key bisa menampung banyak Catatan
db.ApiKey.hasMany(db.Note, {
  foreignKey: "apiKeyId",
  as: "notes", // Cara panggil: apiKey.notes
});

// Satu Catatan milik satu API Key
db.Note.belongsTo(db.ApiKey, {
  foreignKey: "apiKeyId",
  as: "apiKey", // Cara panggil: note.apiKey
});

/* ===========================================
  3. EXPORT MODULE
  ===========================================
*/
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
