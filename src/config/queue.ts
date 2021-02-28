export const rabbitMQConfig = {
    connectionString: process.env.MANAGED_QUEUE_CONNECTION_STRING || "amqp://localhost",
    queueName: "FRONTIER"
}
