const LogModel = require("../models/log_model");

async function createLog(date, action, actorId, actorUsername) {
  try {
    const log = await LogModel.create({
      date,
      action,
      actorId,
      actorUsername,
    });

    return log;
  } catch (error) {
    return null;
  }
}

module.exports = {
  createLog,
};
