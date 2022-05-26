const amqplib = require('amqplib');
const dotenv = require('dotenv');
const { queueHandler } = require('./queueHandler');
dotenv.config();

(async () => {
  const queue = process.env.QUEUE_NAME;
  const connection = await amqplib.connect(process.env.AMQP_CONNECTION_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);

  channel.consume(queue, async(msg) => {
    if (msg) {
      await queueHandler(msg)
      channel.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });
})();
