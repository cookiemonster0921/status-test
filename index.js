const express = require('express');
const { Client } = require('discord.js');

const app = express();
const port = 3000;
const request = require('request')
const client = new Client({ intents: ["Guilds", "GuildMessages", "GuildMembers", "GuildPresences"] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.token);
var webhook = process.env.webhook
app.use(express.json());
app.get('/', (req, res) => {
  res.status(403).send('forbidden')
})
app.head('/getdata', (req, res) => {
  console.log('yes')
  client.guilds.fetch('1175007754881073162').then(guild => {
  //console.log(guild.members)
  guild.members.fetch({user: '750640430416265267', withPresences: true}).then(member => {
    console.log(member.presence)
    var options = {
      'method': 'POST',
      'url': webhook,
      'headers': {
      },
      formData: {
        'content': member.presence?.status || 'offline'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      //console.log(member.presence.status);
    });
    //console.log(member.presence.status)
    //console.log(member.presence.activities)
  })
})
res.send('ok')
});

app.listen(port, () => {
    console.log(`Express server is running on ${port}`);
});
