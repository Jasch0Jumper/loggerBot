//#region dependencies
//const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const fs = require("fs");
const request = require("request");
const bot = new Discord.Client();
const loginToken = process.env.token;

//bot.registry.registerDefaults();
/*
bot.registry.registerGroup("dateien", "Dateien");
bot.registry.registerCommandsIn(__dirname + "/commands");
*/
//#endregion

//#region variablen

//channelLog ID
var channelÜn ="598119768377262090";
var channelNSAzentrale = "598112254562664478";
var channelJude = "592763266640379914";
var channelBrausesommer = "597749605861556225";
var channelKZ = "592763314614829056";
//var channelLog = "594573719859363840";
// temp delete later
var channelLog = "603581496619433984";
var channelDev = "593890334732320810";
var channelOthers = "594617895246495777";

//var sendToChannel = "594573719859363840"; //name = dev

//ServerID
var clipboard = "482235571281068033";
var ün = "598108634135789578";
var jude = "360445141439479818";
var konzentrationsLager = "591277060018929675";
//usersID
var arian = "360443752323612673";
var arianpc = "499585513976496139";
var calvin = "319546580065583106";
var jasch = "265150849502806019";
var marley = "434335796422508554";
var peter = "426693694922424320";
var sorosh = "480013607220805645";

//channelsIDclipboard
var botPlayground = "<#495499899375321088>";
var clipboardJude = "<#592763266640379914>";
var clipboardÜn = "<#598119768377262090>";
var clipboardKZ = "<#592763314614829056>";
var clipboardDev = "<#593890334732320810>";
var clipboardOthers = "<#594617895246495777>";
var clipboardLogChannels = [botPlayground, clipboardJude, clipboardÜn, clipboardKZ, clipboardDev, clipboardOthers];

/*  EIGENTLICH ÜNNÖTIG
//channelsIDkonzentrationslager
var allgemein = "<#591277060480172041>";
var irrenanstalt = "<#591282060023431176>";
var civ = "<#591737652978516023>";
var regelnImHause = "<#591738599314292746>";
var xd = "<#591741238697394202>";
var aktuelleThemenDebatten = "<#591741319916027904>";
var verschwörungstheorien = "<#591741385124610058>";
var antiamerikanismus = "<#593444545270775819>";
//channelsIDjude
var general = "<#360445141439479819>";
    //ADD OTHER CHANNELS IF OFTEN USED
*/

//#endregion

//#region bot.on();
bot.on("message", function(message){
    if (message.author.bot == false && message.channel.type != "dm")
    {
        var logMessage = "no files";

        if (message.attachments.size > 0)
        {
            //NICHT VON | MIR AUS INTERNET KOPIERT !!!
            message.attachments.forEach(file => {
                var fileNameExtention = "." + file.filename;
                download(file.url);
                
                logMessage = message.attachments.size + " files";

                //#region send to channel
                if (message.channel.guild.id == clipboard)
             {
                clipboardLogChannels.forEach(Channel => {
                     if (message.channel == Channel)
                     {
                        //devloper channel in clipboard for testing
                       bot.channels.get(channelDev).send(new Discord.Attachment(file.url, message.author + ", " + message.createdAt + fileNameExtention));
                    } else {
                        return;
                    } 
               });
            } 
            else if (message.channel.guild.id == konzentrationsLager)
            {
                //log² channel in KZ 
                bot.channels.get(channelLog).send(new Discord.Attachment(file.url, message.author + ", " + message.createdAt + fileNameExtention));
                //KZ channel in clipboard
                bot.channels.get(channelKZ).send(new Discord.Attachment(file.url, message.author + ", " + message.createdAt + fileNameExtention));
            } 
            else if (message.channel.guild.id == jude) 
            {
                //brausesommer channel in Jude
                bot.channels.get(channelBrausesommer).send(new Discord.Attachment(file.url, message.author + ", " + message.createdAt + fileNameExtention));
                //Jude channel in clipboard
                bot.channels.get(channelJude).send(new Discord.Attachment(file.url, message.author + ", " + message.createdAt + fileNameExtention));
            } 
            else if (message.channel.guild.id == ün){
                //nsa-zentrale channel in ün
                bot.channels.get(channelNSAzentrale).send(new Discord.Attachment(file.url, message.author + ", " + message.createdAt + fileNameExtention));
                //ün channel in clipboard
                bot.channels.get(channelÜn).send(new Discord.Attachment(file.url, message.author + ", " + message.createdAt + fileNameExtention));
            }
            else
            {

                //Others channel in clipboard if unspecified server
                bot.channels.get(channelOthers).send(new Discord.Attachment(file.url, message.author + ", " + message.createdAt + fileNameExtention));
            }
            //#endregion
            });
        }
        var report = new Discord.RichEmbed()
            .setColor(0x18ff08)
            .setTimestamp(message.createdAt)
            .setFooter("Send, " + message.attachments.size + " Files")
            .setAuthor(checkUser(message))
            .setDescription(message.content)
            .addField("Channel", message.channel)
            .addField("Message ID", message.id);
        
        //#region send to channel
        if (message.channel.guild.id == clipboard)
        {
            clipboardLogChannels.forEach(Channel => {
                if (message.channel == Channel)
                {
                    //devloper channel in clipboard for testing
                    bot.channels.get(channelDev).send(report);
                } else {
                    return;
                } 
            });
        } 
        else if (message.channel.guild.id == konzentrationsLager)
        {
            //log² channel in KZ 
            bot.channels.get(channelLog).send(report);
            //KZ channel in clipboard
            bot.channels.get(channelKZ).send(report);
        } 
        else if (message.channel.guild.id == jude) 
        {
            //brausesommer channel in Jude
            bot.channels.get(channelBrausesommer).send(report);
            //Jude channel in clipboard
            bot.channels.get(channelJude).send(report);
        } 
        else if (message.channel.guild.id == ün)
        {
            //nsa-zentrale channel in ün
            bot.channels.get(channelNSAzentrale).send(report);
            //ün channel in clipboard
            bot.channels.get(channelÜn).send(report);
        }
        else
        {
            //Others channel in clipboard if unspecified server
            bot.channels.get(channelOthers).send(report);
        }
        //#endregion

        console.log(message.createdAt + ", Send, " + checkUser(message) + ", " + checkServer(message) + ", " + message.channel + ", " + logMessage);
    }
});
bot.on("messageDelete", function(message){
    if (message.author.bot == false && message.channel.type != "dm"){

        var report = new Discord.RichEmbed()
        .setColor(0xb00e0e)
        .setTimestamp(message.createdAt)
        .setFooter("Delete, " + message.attachments.size + " Files")
        .setAuthor(checkUser(message))
        .setDescription(message.content)
        .addField("Channel", message.channel)
        .addField("Message ID", message.id);

    //#region send to channel
        if (message.channel.guild.id == clipboard)
        {
            clipboardLogChannels.forEach(Channel => {
                if (message.channel == Channel)
                {
                    //devloper channel in clipboard for testing
                    bot.channels.get(channelDev).send(report);
                } else {
                    return;
                } 
            });
        } 
        else if (message.channel.guild.id == konzentrationsLager)
        {
            //log² channel in KZ 
            bot.channels.get(channelLog).send(report);
            //KZ channel in clipboard
            bot.channels.get(channelKZ).send(report);
        } 
        else if (message.channel.guild.id == jude) 
        {
            //brausesommer channel in Jude
            bot.channels.get(channelBrausesommer).send(report);
            //Jude channel in clipboard
            bot.channels.get(channelJude).send(report);
        } 
        else if (message.channel.guild.id == ün)
        {
            //nsa-zentrale channel in ün
            bot.channels.get(channelNSAzentrale).send(report);
            //ün channel in clipboard
            bot.channels.get(channelÜn).send(report);
        }
        else
        {
            //Others channel in clipboard if unspecified server
            bot.channels.get(channelOthers).send(report);
        }
    //#endregion

    console.log(message.createdAt + ", Delete, " + checkUser(message) + ", " + checkServer(message) + ", " + message.channel);
    }

});
bot.on("messageUpdate", function(message){
    if (message.author.bot == false && message.channel.type != "dm") {
        if (message.content != ""){
            message.channel.fetchMessage(message.id).then(msg => {
                var editedMessage = msg.content
    
                var report = new Discord.RichEmbed()
                .setColor(0xfcf400)
                .setTimestamp(message.createdAt)
                .setFooter("Edit, " + message.attachments.size + " Files")
                .setAuthor(checkUser(message))
                .setDescription(message.channel)
                .addField("Original Message", message.content)
                .addField("Edit", editedMessage)
                .addField("Message ID", message.id)
    
            //#region send to channel
                if (message.channel.guild.id == clipboard)
                {
                    clipboardLogChannels.forEach(Channel => {
                        if (message.channel == Channel)
                        {
                            //devloper channel in clipboard for testing
                            bot.channels.get(channelDev).send(report);
                        } else {
                            return;
                        } 
                    });
                } 
                else if (message.channel.guild.id == konzentrationsLager)
                {
                    //log² channel in KZ 
                    bot.channels.get(channelLog).send(report);
                    //KZ channel in clipboard
                    bot.channels.get(channelKZ).send(report);
                } 
                else if (message.channel.guild.id == jude) 
                {
                    //brausesommer channel in Jude
                    bot.channels.get(channelBrausesommer).send(report);
                    //Jude channel in clipboard
                    bot.channels.get(channelJude).send(report);
                } 
                else if (message.channel.guild.id == ün)
                {
                    //nsa-zentrale channel in ün
                    bot.channels.get(channelNSAzentrale).send(report);
                    //ün channel in clipboard
                    bot.channels.get(channelÜn).send(report);
                }
                else
                {
                    //Others channel in clipboard if unspecified server
                    bot.channels.get(channelOthers).send(report);
                }
            //#endregion
    
            });
    
            console.log(message.createdAt + ", Edit, " + checkUser(message) + ", " + checkServer(message) + ", " + message.channel);
        } else {
            return;
        }
    }
});


bot.on("message", function (message) {
    if (message.channel.guild.id == konzentrationsLager) 
    {
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
        message.channel.send("https://discord.gg/mNd9GZ3");
        message.channel.send("https://cdn.discordapp.com/attachments/372023604935655434/603586336980467728/spin-9.gif");
    }
});
//#endregion

//#region functions
function checkUser(message)
{
    if (message.author.id == arian){
        return "Arian";
    } else if (message.author.id == arianpc){
        return "Arian PC";
    } else if (message.author.id == calvin){
        return "Calvin";
    } else if (message.author.id == jasch){
        return "Jasch";
    } else if (message.author.id == marley){
        return "Marley";
    } else if (message.author.id == peter){
        return "Peter";
    } else if (message.author.id == sorosh){
        return "Sorosh";
    } else {
        return "unknown User" + message.author;
    }
}
/*
function checkChannel(message)
{
    if (message.channel.guild.id == clipboard)
    {
        if (message.channel == botPlayground){
            return "#bot-playground";
        } else {
            return "channel in clipboard (" + message.channel + ")";
        }
    } else if (message.channel.guild.id == konzentrationsLager)
    {
        if (message.channel == allgemein){
            return "#allgemein";
        } else if (message.channel == irrenanstalt){
            return "#irrenanstalt";
        } else if (message.channel == civ){
            return "#civ";
        } else if (message.channel == regelnImHause){
            return "#regeln-im-hause";
        } else if (message.channel == xd){
            return "#xd";
        } else if (message.channel == aktuelleThemenDebatten){
            return "#aktuelle-debatten-und-themen";
        } else if (message.channel == verschwörungstheorien){
            return "#verschwörungstheorien";
        } else if (message.channel == antiamerikanismus){
            return "#antiamerikanismus";
        } else {
            return "channel in Konzentrationlager (" + message.channel + ")";
        }
    } else if (message.channel.guild.id == jude)
    {
        if (message.channel == general){
            return "#general";
        } else {
            return "channel in jude (" + message.channel + ")"; 
        }
    } else {
        return "unknown server (" + message.channel.guild + ") and channel (" + message.channel +")";
    }
}
*/
function checkServer(message){
    if (message.channel.guild.id == jude){
        return "Jude";
    } else if (message.channel.guild.id == konzentrationsLager){
        return "Das Konzentrationslager";
    } else if (message.channel.guild.id == clipboard){
        return "Clipboard";
    } else if (message.channel.guild.id == ün){
        return "ÜbergangName";
    } else {
        return "unknown Server " + message.channel.guild.id
    }
}
//NICHT VON | MIR AUS INTERNET KOPIERT !!!
function download(url){
    request.get(url)
        .on("error", console.error)
        .pipe(fs.createWriteStream("File"));
}
//#endregion

bot.on("ready", function(){
    console.log("---------------------------");
    console.log("ready to COLLECT your DATA");
    console.log("---------------------------");
});
bot.login(loginToken);
