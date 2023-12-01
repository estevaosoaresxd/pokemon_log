const listener = require("./listener_rabbitmq");
const { createLog } = require("../controllers/log_controller");

const initListener = () => {
  listener.consumer(
    "SystemLog",
    "search_pokemons_queue",
    "search_pokemons_log",
    (payload) => {
      createLog(
        payload.date,
        payload.action,
        payload.actorId,
        payload.actorUsername
      );
    }
  );
};

module.exports = { initListener };
