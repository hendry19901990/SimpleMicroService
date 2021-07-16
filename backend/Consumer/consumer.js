let io = require('../Socket/socket');
var amqp = require('amqplib/callback_api');

const connectSocket =  () => {

    amqp.connect('amqp://localhost', function (error0, connection) {
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
                io.socket.emit("updatedResult", stock);
            }, {
                noAck: true
            });
        });
    });

};

module.exports = connectSocket;

 