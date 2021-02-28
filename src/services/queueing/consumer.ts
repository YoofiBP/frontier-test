import dotenv from "dotenv";
dotenv.config();
import {Channel} from "amqplib";
import { changeTokenStatus } from "../databaseServices";
import { submitToFrontier } from "../rpa";
import "../../config/db";
import { sendNotification } from "../emailServices";
import { sendGridNotifier } from "../../config/mail";
import {rabbitMQConfig} from "../../config/queue";

export const consume = async (channel:Channel) => {
  await channel.consume(rabbitMQConfig.queueName, async (message) => {
    const {requestPayload, tokenPayload} = JSON.parse(
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

      console.log("Processing Complete, URL updated and e-mail sent");
    } catch (error) {
      console.log(error);
    }

    //Acknowledge message
    channel.ack(message);
  });
}


