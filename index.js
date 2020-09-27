const Discord = require("discord.js");
const fs = require("fs");
const request = require("request");
const bot = new Discord.Client();
const loginToken = process.env.token;

//channelLog ID
var channelNwo ="598119768377262090";
var channelNSAzentrale = "598112254562664478";
var channelOman = "592763266640379914";
var channelBrausesommer = "597749605861556225";
var channelDev = "593890334732320810";
var channelOthers = "594617895246495777";

//ServerID
var clipboard = "482235571281068033";
var nwo = "598108634135789578";
var jude = "360445141439479818";

bot.on("message", function(message)
{
    if (IsBotOrDm(message)) { return; }
    if (HasNoFiles(message)) { return; }
    
    var logMessage = "no files";

    //NICHT VON | MIR AUS INTERNET KOPIERT !!!
    message.attachments.forEach(file => {
        var fileNameExtention = "." + file.filename;
        download(file.url);
            
        logMessage = message.attachments.size + " files";

        sendToChannels(message, new Discord.Attachment(file.url, message.author + ", " + message.createdAt + fileNameExtention));
    });
    
    ReportMessage(message, "Send", 0x18ff08, "", logMessage);
});
bot.on("messageDelete", function (message)
{
    if (IsBotOrDm(message)) { return; }
    if (IsEmpty(message) && HasNoFiles(message)) { return; }
   
    ReportMessage(message, "Delete", 0xb00e0e, message.content, "");
});
bot.on("messageUpdate", function(message){
    if (IsBotOrDm(message)) { return; }
    if (IsEmpty(message)) { return; }

    message.channel.fetchMessage(message.id).then(msg => {
    var editedMessage = msg.content

    if (message.content == editedMessage) { return; } 

    ReportMessage(message, "Edit", 0xfcf400, "**Original Message:** \n" + message.content + "\n\n **Edit:** \n" + editedMessage, "");

    });
});

function ReportMessage(message, typeOfReport, color, description, logMessage) {
    var report = new Discord.RichEmbed()
        .setColor(color)
        .setTimestamp(message.createdAt)
        .setFooter(typeOfReport + " " + message.attachments.size + " Files")
        .setAuthor(getAuthorUsername(message))
        .setDescription(description)
        .addField("Channel", message.channel)
    
    sendToChannels(message, report);
    console.log(message.createdAt + ", " + typeOfReport + ", " + getAuthorUsername(message) + ", " + getServerName(message) + ", " + message.channel + " " + logMessage);
}

function IsBotOrDm(message) {
    return message.author.bot != false || message.channel.type == "dm";
}
function IsEmpty(message) {
    return message.content == "";
}
function HasNoFiles(message) {
    return message.attachments.size < 1;
}

function getAuthorUsername(message) {
    return message.author.username;
}
function getServerName(message) 
{
    if (message.channel.guild.id == jude) {
        return "Jude";
    } else if (message.channel.guild.id == clipboard) {
        return "Clipboard";
    } else if (message.channel.guild.id == nwo) {
        return "NewWorldOrder";
    } else {
        return "unknown Server: " + message.channel.guild.id
    }
}

function sendToChannels(message, returnValue) 
{
    if (message.channel.guild.id == clipboard)
    {
        bot.channels.get(channelDev).send(returnValue); //nsa-dev channel in clipboard
    } 
    else if (message.channel.guild.id == jude) 
    {
        bot.channels.get(channelBrausesommer).send(returnValue); //brausesommer channel in Oman
        bot.channels.get(channelOman).send(returnValue); //oman channel in clipboard
    } 
    else if (message.channel.guild.id == nwo)
    {
        bot.channels.get(channelNSAzentrale).send(returnValue); //nsa-zentrale channel in nwo
        bot.channels.get(channelNwo).send(returnValue); //new-world-order channel in clipboard
    }
    else
    {
        bot.channels.get(channelOthers).send(returnValue) //other-servers channel in clipboard if unspecified server
    }
}

//NICHT VON | MIR AUS INTERNET KOPIERT !!!
function download(url)
{
    request.get(url)
        .on("error", console.error)
        .pipe(fs.createWriteStream("File"));
}

bot.on("ready", function()
{
    console.log("--------------------------");
    console.log("ready to COLLECT your DATA");
    console.log("--------------------------");
});
bot.login(loginToken);
