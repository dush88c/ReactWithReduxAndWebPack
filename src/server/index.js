const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('dist'));
app.use(express.bodyParser());

var inMemoryModel = [];

app.get('/api/channels', (req, res) => {
    let josnRes = fs.readFileSync("src/server/db.json");
    let channels = JSON.parse(josnRes);
    res.json(channels.channels);
    inMemoryModel = channels;
});

app.get('/api/messages/:channelId', (req, res) => {
    const selectedChannelId = +req.params.channelId;
    const selectedChannelMessages = inMemoryModel.messagesArray.find(mes => mes.channelId === selectedChannelId).messages;
    res.json(selectedChannelMessages);
});

app.post('/api/:channelId', (req, res) => {
    const selectedChannelId = +req.params.channelId;
    const newMessage = req.body.newMessage;    
    
    inMemoryModel.messagesArray.some((mes) => {
        if (mes.channelId === selectedChannelId) {
            mes.messages.push(newMessage);
            res.json(mes.messages);
            return true;
        }
    });

    res.status(500).end();
});

app.listen(process.env.PORT || 8080, () => console.log(`API Server is up and running on port ${process.env.PORT || 8080}!`));