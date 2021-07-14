const Discord = require("discord.js")
const client = new Discord.Client();
require('discord-buttons')(client)

const disbut = require("discord-buttons");

let hellobutton = new disbut.MessageButton()
    .setLabel("Hello world!")
    .setID("helloworldbutton")
    .setStyle("blurple")

let forwardbutton = new disbut.MessageButton()
    .setLabel("Forward")
    .setID("forwardbutton")
    .setStyle("green")

let backbutton = new disbut.MessageButton()
    .setLabel("Back")
    .setID("backbutton")
    .setStyle("red")

let menu1embed = new Discord.MessageEmbed()
    .setTitle("Menu 1")
    .setColor("BLUE")

let menu2embed = new Discord.MessageEmbed()
    .setTitle("Menu 2")
    .setColor("YELLOW")

let urlbutton = new disbut.MessageButton()
    .setStyle('url')
    .setURL('https://circularsprojects.com') 
    .setLabel('Hello URL!');

let helloworldoption = new disbut.MessageMenuOption()
    .setLabel('Hello world!')
    .setEmoji('🍔')
    .setValue('helloworld')
    .setDescription('feeling lonely without a second option...')

let helloworldselect = new disbut.MessageMenu()
    .setID('helloworldselect')
    .setPlaceholder('Hello Menu!')
    .setMaxValues(1)
    .setMinValues(1)
    .addOption(helloworldoption)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
    
client.on('message', async (msg) => {
    switch (msg.content) {
        case "!fullshowcase":
            msg.delete();
            msg.channel.send("This is a sample button", hellobutton)
            msg.channel.send("This is a sample url button", urlbutton)
            msg.channel.send("Menu 1", {
                buttons: [forwardbutton, backbutton],
                embed: menu1embed
            })
            msg.channel.send("This is a sample menu", helloworldselect)
            break;
        case "!testbutton":
            msg.channel.send("This is a sample message with a button", hellobutton)
            break;
        case "!editbutton":
            msg.channel.send("Menu 1", {
                buttons: [forwardbutton, backbutton],
                embed: menu1embed
            })
            break;
        case "!linkbutton":
            msg.channel.send("This is a sample url button", urlbutton)
            break;
        case "!menu":
            msg.channel.send("This is a sample dropdown menu", helloworldselect)
            break;
    }
})

client.on('clickButton', async (button) => {
    switch (button.id) {
        case "helloworldbutton":
            button.reply.defer();
            button.channel.send("Hello world!")
            break;
        case "forwardbutton":
            button.reply.defer();
            if (button.message.content == "Menu 1") {
                button.message.edit("Menu 2", menu2embed)
            }
            break;
        case "backbutton":
            button.reply.defer();
            if (button.message.content == "Menu 2") {
                button.message.edit("Menu 1", menu1embed)
            }
            break;
    }    
})

client.on('clickMenu', async m => {
    if (m.values[0] == "helloworld") {
        m.reply.defer();
        m.channel.send("Hello world!")
    }
})

client.login("TOKEN")
