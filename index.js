const ListenerRabbitMQ = require("./src/queue/search_queue");

function consumer() {
  ListenerRabbitMQ.initListener();
}

consumer();
