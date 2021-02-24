import amqp, { Channel, Connection } from "amqplib/callback_api";

amqp.connect(
  "amqp://localhost",
   (conError: unknown, connection: Connection) => {
    if (conError) {
      throw conError;
    }

    //Create Channel
    connection.createChannel(
      (channelError, channel: Channel) => {
        if (channelError) {
          throw channelError;
        }

        //Assert Queue
        channel.assertQueue("testqueue");

        //Send message to Queue
        channel.sendToQueue("testqueue", Buffer.from("hello world"));
        console.log("Message sent");
      }
    );
  }
);
