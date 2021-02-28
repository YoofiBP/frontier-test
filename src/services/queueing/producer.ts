import amqp from "amqplib";
import {rabbitMQConfig} from "../../config/queue";

const createChannel = async () => {
  const connection = await amqp.connect(rabbitMQConfig.connectionString);
  const channel = await connection.createChannel();
  await channel.assertQueue(rabbitMQConfig.queueName);

  console.log("Queueing Channel created");

  return channel;
};

const channel = createChannel();

export default channel;
