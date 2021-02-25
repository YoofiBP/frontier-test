import amqp, { Channel, Connection } from "amqplib";
import { changeTokenStatus, findToken } from "../databaseServices";
import { submitToFrontier } from "../rpa";
import "../../config/db";

const connect = async () => {
  const connection = await amqp.connect("amqp://localhost");

  const channel = await connection.createChannel();

  await channel.assertQueue("FRONTIER");

  console.log("Consuming messages");

  channel.consume("FRONTIER", async (message) => {
    const { requestPayload, tokenPayload } = JSON.parse(
      message.content.toString()
    );
    console.log("Processing Message");
    await submitToFrontier(requestPayload);

    try {
      await changeTokenStatus("complete", tokenPayload);
      console.log("Processing Complete, URL updated");
    } catch (error) {
      console.log(error);
    }

    channel.ack(message);
  });
};

connect();
