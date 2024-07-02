const express = require("express");
const { Client } = require("discord.js");

const app = express();
const port = 3000;
const request = require("request");
const client = new Client({
  intents: ["Guilds", "GuildMessages", "GuildMembers", "GuildPresences"],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.token);
var webhook = process.env.webhook;
app.use(express.json());
app.get("/", (req, res) => {
  res.status(403).send("forbidden");
});
app.head("/getdata", (req, res) => {
  var data = {};
  console.log("yes");
  client.guilds.fetch("1175007754881073162").then((guild) => {
    //console.log(guild.members)
    guild.members
      .fetch({ user: "586744957650468864", withPresences: true })
      .then((member) => {

        var date_time = new Date();
        console.log(date_time);
        var name = member.user.username;
        var list = []
        list.push(member.presence?.clientStatus || "offline")
        list.push(member.presence?.activities || 'no activity')
        list.push(date_time)
        data[member.user.username] = list
        //console.log(member.presence);
        console.log(data)
       /* var options = {
          method: "POST",
          url: webhook,
          headers: {},
          formData: {
            content: JSON.stringify(data),
          },
        };
         request(options, function (error, response) {
      if (error) throw new Error(error);
      //console.log(member.presence.status);
     });*/
        //console.log(member.presence.status)
        //console.log(member.presence.activities)
      });
    guild.members
      .fetch({ user: "749825729507754015", withPresences: true })
      .then((member) => {

        var date_time = new Date();
        console.log(date_time);
        var name = member.user.username;
        var list = []
        list.push(member.presence?.clientStatus || "offline")
        list.push(member.presence?.activities || 'no activity')
        list.push(date_time)
        data[member.user.username] = list
        //console.log(member.presence);
        console.log(data)
        var options = {
          method: "POST",
          url: webhook,
          headers: {},
          formData: {
            content: JSON.stringify(data),
          },
        };
         request(options, function (error, response) {
      if (error) throw new Error(error);
      //console.log(member.presence.status);
     });
        //console.log(member.presence.status)
        //console.log(member.presence.activities)
      });
  });
  
});

app.listen(port, () => {
  console.log(`Express server is running on ${port}`);
});
