const Discord = require("discord.js");
const bot = new Discord.Client();
bot.on("message", (message) => {
    let kocham = message.content; //
    if (kocham == "kocham misia") {
        var Adrian = "448178987806490624";
        var Julia = "691633731936452609";
        if (message.author.id == Adrian) {
            message.channel.send(
                "<@" + Julia + ">! Adrian Cię kocha i to mocno!"
            );
        }
        if (Julia == message.author.id) {
            message.channel.send(
                "<@" + Adrian + ">! Julia Cię kocha i to mocno!"
            );
        }
    }
});
