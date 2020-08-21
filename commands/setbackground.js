const functions = require("../structures/functions");

module.exports.run = async (client, message, args) => {
  let background;

  if (functions.is_url(args.join(" "))) {
    background = args.join(" ");
    
    try {
      const { createCanvas, loadImage } = require("canvas");

      const canvas = new createCanvas(1000, 333);
      const ctx = canvas.getContext("2d");
      let bg = await loadImage(args.join(' '));
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

      await client.db.set(`background-${message.author.id}`, background);

      message.channel.send({
        embed: {
          color: 'GREEN',
          description: '**<@' + message.author + '> - Seu background foi alterado com sucesso!**'
        }
      });
    } catch (e) {      
      message.channel.send({
        embed: {
          color: 'RED',
          description: '**<@' + message.author + '> - Insira um URL válido!**'
        }
      });
    };
  } else if (
    args[0] &&
    !functions.is_url(args.join(" ")) &&
    !message.attachments.first()
  ) {
    message.channel.send({
      embed: {
        color: 'RED',
        description: '**<@' + message.author + '> - Insira um URL válido!**'
      }
    });
  } else if (message.attachments.first()) {
    background = message.attachments.first().url;

    await client.db.set(`background-${message.author.id}`, background);
    message.channel.send({
      embed: {
        color: 'GREEN',
        description: '**<@' + message.author + '> - Seu background foi alterado com sucesso!**'
      }
    });
  } else if (!args[0] && !message.attachments.first()) {
    message.channel.send({
      embed: {
        color: 'RED',
        description: '**<@' + message.author + '> - Insira um URL válido ou uma imagem!**'
      }
    });
  };

  client.background[message.author.id] = background;
};

module.exports.help = {
  name: "background",
  category: 'Social',
  aliases: ["setbackground", "setbg", "bg"],
  description: "oi"
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false,
  especialOnly: false
};

module.exports.limits = {
  rateLimit: 1,
  cooldown: 5000
};
