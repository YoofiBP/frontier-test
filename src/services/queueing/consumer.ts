import amqp, { Channel, Connection } from "amqplib";
import { changeTokenStatus, findToken } from "../databaseServices";
import { submitToFrontier } from "../rpa";
import "../../config/db";
import { sendNotification } from "../emailServices";
import { sendGridNotifier } from "../../config/mail";

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

    try {
      await submitToFrontier(requestPayload);
      await changeTokenStatus("complete", tokenPayload);
      sendNotification(sendGridNotifier)(requestPayload);
      console.log("Processing Complete, URL updated");
    } catch (error) {
      console.log(error);
    }

    channel.ack(message);
  });
};

connect();
