import amqp, { Channel, Connection } from "amqplib";

const createChannel = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue("FRONTIER");

  console.log("Queueing Channel created");

  return channel;
};

const channel = createChannel();

export default channel;
