//require
const Discord = require("discord.js");
const { prefix, token, giphyToken } = require("./config.json");
const GphApiClient = require("giphy-js-sdk-core");
const ytdl = require("ytdl-core");
const mis = require("./fun");

// GIPHY API
const bot = new Discord.Client();
const giphyClient = GphApiClient(giphyToken);

bot.on("ready", function () {
    console.log("Im active");
});

function los(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const servers = {};

bot.on("message", (message) => {
    if (!message.content.startsWith(prefix)) return;
    const text = message.content.substring(prefix.length).split(" "); //
    mis;
    switch (text[0]) {
        case "ping":
            message.channel.send("pong!");
            break;
        case "clear":
            message.channel
                .bulkDelete("" + (Number(text[1]) + 1))
                .catch(function () {
                    console.error;
                    message.reply("Ty bucie");
                    message.channel.send(
                        "``` <br/> Pamiętaj nie możesz czyścić wiadomości z przed 14 dni jest to bardzo ważne! ```"
                    );
                });
            break;
        case "wypisz":
            var member2 = message.guild.members;
            var a = message.guild.channels;
            message.reply(a);
            break;
        case "help":
            message.reply("Nie mam czasu sp*****laj");
            break;
        case "jest":
            switch (text[1]) {
                case "głupi":
                    message.reply("Sam jesteś głupi");
                    break;
                case "fajny":
                    message.reply("No dzięki mordko");
                    break;
                default:
                    message.reply("No jaki, no?");
                    break;
            }
            break;
        case "podaj":
            if (!text[1]) message.reply("Co podać?");
            switch (text[1]) {
                case "piwo":
                    message.reply("Sam se podaj 🍺");
                    var msg = message;
                    setTimeout(() => {
                        msg.channel.send("Nie no już idę");
                    }, 10000);
                    break;
            }
            break;
        case "play":
            function play(connection, message) {
                var server = servers[message.guild.id];
                server.dispatcher = connection.play(
                    ytdl(server.queue[0], {
                        filter: "audioonly",
                    })
                );
                server.queue.shift();

                server.dispatcher.on("end", function () {
                    if (server.queue[0]) {
                        play(connection, message);
                    } else {
                        connection.disconnect();
                    }
                });
            }

            if (!text[1]) {
                message.channel.send("No co Ci zagrać?");
                return;
            }
            if (!message.member.voice.channel) {
                message.channel.send(
                    "Jak chcesz czegoś posłuchać to we bij na kanał głosowy!"
                );
                return;
            }
            if (!servers[message.guild.id]) {
                servers[message.guild.id] = {
                    queue: [],
                };
            }
            var server = servers[message.guild.id];

            server.queue.push(text[1]);
            if (!message.guild.voiceConnection) {
                message.member.voice.channel
                    .join()
                    .then(function (connection) {
                        play(connection, message);
                        // var url = "https://www.youtube.com/watch?v=2Vv-BfVoq4g";
                        // const dispatcher = connection.play(ytdl(url));
                    })
                    .catch(console.error);
            }
            break;
        case "kick":
            if (!text[1]) {
                message.reply("KICK?");
                return;
            }
            if (message.member.hasPermission(["KICK_MEMBERS"])) {
                console.log(autor);
                if (
                    !message.mentions.members.first().id ===
                    "448178987806490624"
                ) {
                    let who = message.mentions.members.first();
                    who.kick().then((who) =>
                        message.channel.send(
                            ":wave: " +
                                who.displayName +
                                " do zobaczenia! :heart:"
                        )
                    );
                } else {
                    message.reply("We mordeczko nie kikuj mnie");
                }
            } else {
                message.reply("No i co ty sobie myślisz dzieciaczku");
            }

            break;
        case "ruletka":
            if (!text[1]) {
                message.reply("Hmm?");
                return;
            }
            if (!message.mentions.members.first()) {
                message.reply("Hmm?");
                return;
            }

            if (!message.mentions.members.first().id == "448178987806490624") {
                let who = message.mentions.members.first();
                who.send("mario");
            } else {
                message.reply("We mordeczko nie kikuj mnie");
            }

            break;
    }
});

bot.login(token);
