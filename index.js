//#region dependencies
const Discord = require("discord.js");
const fs = require("fs");
const request = require("request");
const bot = new Discord.Client();
const loginToken = process.env.token;
//#endregion

//#region variablen

//#region IDS
//channelLog ID
var channelNwo ="598119768377262090";
var channelNSAzentrale = "598112254562664478";
var channelJude = "592763266640379914";
var channelBrausesommer = "597749605861556225";
var channelDev = "593890334732320810";
var channelOthers = "594617895246495777";

//ServerID
var clipboard = "482235571281068033";
var nwo = "598108634135789578";
var jude = "360445141439479818";
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
var clipboardNwo = "<#598119768377262090>";
//var clipboardKZ = "<#592763314614829056>";
var clipboardDev = "<#593890334732320810>";
var clipboardOthers = "<#594617895246495777>";
var clipboardLogChannels = [botPlayground, clipboardJude, clipboardNwo, clipboardDev, clipboardOthers];
//#endregion

var banned = false;

var bannedWords = 
[
    "idiot",
    "idioot",
    "i d i o o t",
    "i d i o t",
    "idot",
    "i d o t",
    "schwein ist lecker",
    " s c h w e i n i s t l e c k e r",
    "schweinefleisch ist lecker",
    "s c h w e i n e f l e i s c h i s t l e c k e r",
    "The restoopid one"
]
var emotes = 
[
    "emotesTest",
    "testEmote",

    "fakenewsbig",
    "Angela",
    "AngelaBurka",
    "AngelaTechno",
    "Angela2",
    "Angela3",
    "Angela4",
    "AngelaDontKnow",
    "Angela5",
    "Angela6",
    "Angela8",
    "Angela9",
    "AngelaDu",
    "AngelaDepress",
    "fakenewssmall",
    "3DAngela",
    "donald",
    "donaldwow",
    "putingangstar",
    "donald23",
    "donald13",
    "donald3",
    "kimilein",
    "erdo4",
    "erdo3",
    "erdo2",
    "erdo1",
    "HAMI3",
    "HAMI2",
    "HAMI1",
    "rip",
    "selbstmord",
    "strichMannAmHandy",
    "arianBennenDie",
    "images",
    "neuland",
    "hitlerFeminist",
    "fuckyou",
    "marley",
    "mariobose",
    "eulewow",
    "eulefliegend",
    "putintraurig",
    "eule",
    "trollface"
]
var bannedWordsArrays = [];
var maxLastMsg = 30;
var lastMessages = [];
var lastMessagesMessages = [];

//#endregion


//#region bot.on();
bot.on("message", function(message)
{
    //#region log image
    if (message.author.bot == false && message.channel.type != "dm")
    {
        var logMessage = "no files";

        if (message.attachments.size > 0)
        {
            var report = new Discord.RichEmbed()
            .setColor(0x18ff08)
            .setTimestamp(message.createdAt)
            .setFooter("Send, " + message.attachments.size + " Files")
            .setAuthor(checkUser(message))
            .setDescription(message.content)
            .addField("Channel", message.channel)
            .addField("Message ID", message.id);

            sendToChannels(message, report);

            //NICHT VON | MIR AUS INTERNET KOPIERT !!!
            message.attachments.forEach(file => {
                var fileNameExtention = "." + file.filename;
                download(file.url);
                
                logMessage = message.attachments.size + " files";

                sendToChannels(message, new Discord.Attachment(file.url, message.author + ", " + message.createdAt + fileNameExtention));
            });
            
            console.log(message.createdAt + ", Send, " + checkUser(message) + ", " + checkServer(message) + ", " + message.channel + ", " + logMessage);
        } 
    }
    //#endregion

    //#region banned words

    if (lastMessages.length > maxLastMsg)
    {
        lastMessages.splice(0, 1);
        lastMessagesMessages.splice(0, 1);
    }
    lastMessages.push(message.content.toLocaleLowerCase());
    lastMessagesMessages.push(message);

    for (var i = 0; i < bannedWords.length; i++)
    {
        removeEmotes(message.content);

        if (removeEmotes(message.content).toLocaleLowerCase().includes(bannedWords[i]))
        {
            banned = true;
            message.delete()

        }
    }
    
    /*
    for (var i = 0; i < bannedWordsArrays.length; i++)
    {
        var k = 0;
        var matchesId = [];
        for (var j = 0; i < lastMessages.length; j++)
        {
            console.log("lastMsg = " + lastMessages[j]);
            console.log("banned = " + bannedWordsArrays[i][k]);

            if (lastMessages[i] == bannedWordsArrays[i][k])
            {
                matchesId.push(i)
                console.log("match " + lastMessages[i] + " " + bannedWords[i][k]);
            }
            else 
            { return; }

            k++;
        }
    }
    */
   

    //#endregion

});
bot.on("messageDelete", function (message)
{
    if (message.author.bot == false && message.channel.type != "dm")
    {
        if (banned)
        {
            var report = new Discord.RichEmbed()
            .setColor(0x2c57e6)
            .setTimestamp(message.createdAt)
            .setFooter("Ban")
            .setAuthor(checkUser(message))
            .setDescription(message.content)
            .addField("Channel", message.channel)
            .addField("Message ID", message.id);

            sendToChannels(message, report);
            console.log(message.createdAt + ", Ban, " + checkUser(message) + ", " + checkServer(message) + ", " + message.channel);

            banned = false;
        }
        else
        {
            var report = new Discord.RichEmbed()
            .setColor(0xb00e0e)
            .setTimestamp(message.createdAt)
            .setFooter("Delete, " + message.attachments.size + " Files")
            .setAuthor(checkUser(message))
            .setDescription(message.content)
            .addField("Channel", message.channel)
            .addField("Message ID", message.id);
    
            sendToChannels(message, report);
            console.log(message.createdAt + ", Delete, " + checkUser(message) + ", " + checkServer(message) + ", " + message.channel);
        }
    }
});
bot.on("messageUpdate", function(message){
    if (message.author.bot == false && message.channel.type != "dm") 
    {
        if (message.content != "")
        {
            message.channel.fetchMessage(message.id).then(msg => {
                var editedMessage = msg.content
    
                if (message.content == editedMessage) 
                {
                    return;
                } 
                else 
                {
                    var report = new Discord.RichEmbed()
                    .setColor(0xfcf400)
                    .setTimestamp(message.createdAt)
                    .setFooter("Edit, " + message.attachments.size + " Files")
                    .setAuthor(checkUser(message))
                    .setDescription(message.channel)
                    .addField("Original Message", message.content)
                    .addField("Edit", editedMessage)
                    .addField("Message ID", message.id)
    
                    sendToChannels(message, report);
                    console.log(message.createdAt + ", Edit, " + checkUser(message) + ", " + checkServer(message) + ", " + message.channel);
                }
            });
        } else {
            return;
        }
    }
});
//#endregion

//#region functions
function checkUser(message)
{
    if (message.author.id == arian){
        return "Arian";
    } else if (message.author.id == arianpc) {
        return "Arian PC";
    } else if (message.author.id == calvin) {
        return "Calvin";
    } else if (message.author.id == jasch) {
        return "Jasch";
    } else if (message.author.id == marley) {
        return "Marley";
    } else if (message.author.id == peter) {
        return "Peter";
    } else if (message.author.id == sorosh) {
        return "Sorosh";
    } else {
        return "unknown User" + message.author + " (" + message.author.username + ")";
    }
}
function checkServer(message)
{
    if (message.channel.guild.id == jude) {
        return "Jude";
    } else if (message.channel.guild.id == clipboard) {
        return "Clipboard";
    } else if (message.channel.guild.id == nwo) {
        return "NewWorldOrder";
    } else {
        return "unknown Server " + message.channel.guild.id
    }
}
function sendToChannels(message, returnValue)
{
    if (message.channel.guild.id == clipboard)
    {
        clipboardLogChannels.forEach(Channel => {
            if (message.channel == Channel)
            {
                bot.channels.get(channelDev).send(returnValue); //devloper channel in clipboard for testing
            } else {
                return;
            } 
        });
    } 
    else if (message.channel.guild.id == jude) 
    {
        bot.channels.get(channelBrausesommer).send(returnValue); //brausesommer channel in Jude
        bot.channels.get(channelJude).send(returnValue); //Jude channel in clipboard
    } 
    else if (message.channel.guild.id == nwo)
    {
        bot.channels.get(channelNSAzentrale).send(returnValue); //nsa-zentrale channel in nwo
        bot.channels.get(channelNwo).send(returnValue); //ün channel in clipboard
    }
    else
    {
        bot.channels.get(channelOthers).send(returnValue) //Others channel in clipboard if unspecified server
    }
}
function createArrays()
{
    bannedWords.forEach(word => {
        createdArray = word.split("");
        for (var i = 0; i < createdArray.length; i++)
        {
            if (createdArray[i] == " ")
            {
                createdArray.splice(i, 1);
            }
        }
        bannedWordsArrays.push(createdArray);
    });
}
function removeEmotes(input)
{
    if (checkEmotes(input))
    {
        var output = "";
        var splitInput = input.split(":");
    
        emotes.forEach(emote => {
            if (splitInput.includes(emote))
            {
                splitInput.splice(splitInput.indexOf(emote), 1);
            }
        });
        output = splitInput.join(" ");
        return output;
    } 
    else
    {
        return input;
    } 
}
function checkEmotes(input)
{
    output = false;
    emotes.forEach(emote => {
        if (input.includes(emote))
        {
            output = true;
        }
    });
    return output;
}

//NICHT VON | MIR AUS INTERNET KOPIERT !!!
function download(url)
{
    request.get(url)
        .on("error", console.error)
        .pipe(fs.createWriteStream("File"));
}
//#endregion

bot.on("ready", function()
{
    console.log("--------------------------");
    console.log("ready to COLLECT your DATA");
    console.log("--------------------------");

    createArrays();
});
bot.login(loginToken);
