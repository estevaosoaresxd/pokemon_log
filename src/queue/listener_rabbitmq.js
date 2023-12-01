const rabbitmq = require("amqplib/callback_api");

const ON_DEATH = require("death");

require("dotenv/config");

const consumer = (exchange, queueName, routerKey, ACK) => {
  rabbitmq.connect(process.env.RABBIT_MQ_URL, (connectError, connection) => {
    if (connectError) {
      throw connectError;
    }

    connection.createChannel((channelError, channel) => {
      if (channelError) {
        throw channelError;
      }

      channel.assertExchange(exchange, "direct", { durable: true });

      channel.assertQueue(queueName, { exclusive: false }, (error, q) => {
        channel.bindQueue(q.queue, exchange, routerKey);

        channel.consume(
          q.queue,
          (msg) => {
            ACK(JSON.parse(msg.content));

            ON_DEATH((signal, error) => {
              setTimeout(() => {
                connection.close();
                process.emit(0);
              }, 500);
            });
          },
          {
            noAck: true,
          }
        );
      });
    });
  });
};

module.exports = { consumer };
