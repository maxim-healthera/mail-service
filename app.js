const amqplib = require('amqplib');
const dotenv = require('dotenv');
const { queueHandler } = require('./queueHandler');
dotenv.config();

(async () => {
  const queue = process.env.QUEUE_NAME;
  const connection = await amqplib.connect(process.env.AMQP_CONNECTION_URL);
  const channel = await connection.createChannel();
  console.log('connected to rabbitMQ')
  await channel.assertQueue(queue);

  channel.consume(queue, (msg) => {
    if (msg) {
      await queueHandler(msg)
      channel.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });
})();
