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
      //submit application form to frontier
      await submitToFrontier(requestPayload);

      //update token given to user
      await changeTokenStatus("complete", tokenPayload);

      //send notification to user email on completion of the job
      sendNotification(sendGridNotifier)(requestPayload);

      console.log("Processing Complete, URL updated");
    } catch (error) {
      console.log(error);
    }

    //Acknowledge message
    channel.ack(message);
  });
};

connect();
