
var amqp = require('amqplib/callback_api');

const connectSocket =  (ws) => {

    amqp.connect('amqp://rabbitmq:5672', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'updatedResult';

            channel.assertQueue(queue, {
                durable: false
            });

            channel.consume(queue, function (data) {
                let message = JSON.parse(data.content.toString())
                console.log(" Received Notification:", message);
                //Socket Trigger All Clients
                ws.emit("updatedResult", message);
            }, {
                noAck: true
            });
        });
    });

};

module.exports = connectSocket;

 