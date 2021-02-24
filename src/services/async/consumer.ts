import amqp, { Channel, Connection } from "amqplib/callback_api";

amqp.connect('amqp://localhost', (connError, connection) => {
    if(connError){
        throw connError;
    }

    connection.createChannel((channelError, channel) => {
        if(channelError){
            throw channelError;
        }

        //Assert Queue
        channel.assertQueue('testqueue')


        //Receive message
        channel.consume('testqueue', (message) => {
            console.log(`Message received ${message?.content}`)
        })
    })

    
})