import dotenv from "dotenv";
import amqp from 'amqplib';

dotenv.config();

export const config = {
    port: process.env.APP_PORT,
    rabbit: {
        connectionString: `amqp://${process.env.USER_}:${process.env.PASS}@${process.env.HOST}/${process.env.VHOST}`,
        queue: process.env.QUEUE_NAME
    }
}

const publishToQueue = async (queue, message, durable = false) => {
    try {
        const cluster = await amqp.connect(config.rabbit.connectionString);
        const channel = await cluster.createChannel();
        await channel.assertQueue(queue, durable = false);
        await channel.sendToQueue(queue, Buffer.from(message));

        console.info(' [x] Sending message to queue', queue, message);

    } catch (error) {
        // handle error response
        console.error(error, 'Unable to connect to cluster!');
        process.exit(1);
    }

}

export default publishToQueue;
