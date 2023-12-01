const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");

const LogModel = sequelize.define("Log", {
  date: DataTypes.DATE,
  action: DataTypes.STRING,
  actorId: DataTypes.INTEGER,
  actorUsername: DataTypes.STRING,
});

module.exports = LogModel;
