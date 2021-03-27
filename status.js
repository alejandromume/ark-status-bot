const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
const Gamedig = require('gamedig');
const bot = new Discord.Client();
const config = require("./config.json")

bot.login(config.token)

bot.on('message', msg => {
    if (msg.content.startsWith('/status')) {
    
        var ip = config.ip; //Server IP
        var port = config.queryport; //Query port

        //Module for get the info about the ARK server
        Gamedig.query({
          type: 'arkse',
          host: ip,
          port: port
      }).then((state) => {
    
          const mensaje = new Discord.MessageEmbed()
          .setColor("#24fc03")
          .setTitle("**Server Online!**")
          .setDescription("**Name: ** "+ state["name"] +" \n**Players: **"+ state["raw"]["numplayers"] + "\n **Map: **" + state["map"] + "\n**Ping: **"+state["ping"])
      
            msg.channel.send(mensaje);
      }).catch((error) => {
    
        const mensaje = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("**Server Offline**")
    
        msg.channel.send(mensaje);
      });

    }

})