import dotenv from "dotenv";
dotenv.config();
import amqp from "amqplib";
import { changeTokenStatus } from "../databaseServices";
import { submitToFrontier } from "../rpa";
import "../../config/db";
import { sendNotification } from "../emailServices";
import { sendGridNotifier } from "../../config/mail";
import {rabbitMQConfig} from "../../config/queue";

const connect = async () => {
  try {
    const connection = await amqp.connect(rabbitMQConfig.connectionString);

    const channel = await connection.createChannel();

    await channel.assertQueue(rabbitMQConfig.queueName);

    console.log("Consuming messages");

    channel.consume(rabbitMQConfig.queueName, async (message) => {
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
        //sendNotification(sendGridNotifier)(requestPayload);

        console.log("Processing Complete, URL updated");
      } catch (error) {
        console.log(error);
      }

      //Acknowledge message
      channel.ack(message);
    });
  } catch (e) {
    console.log(e)
  }

};

connect();
