const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
  if (args[0]) {
    const command = client.commands.get(args[0]) == undefined || null ?
      client.aliases.get(args[0]) :
        client.commands.get(args[0]);
    
    if (!command) {
      return message.channel.send({
        embed: {
          color: 'RED',
          description: '**<@' + message.author + '> - O comando ' + args[0] + ' não existe!**'
        }
      });
    } else {
      return message.channel.send({
        embed: {
          color: 0x0099ff,
          author: {
            name: client.user.tag + ' | Central de ajuda',
            icon_url: client.user.displayAvatarURL({ dynamic: true })
          },
          thumbnail: {
            url: client.user.displayAvatarURL({ dynamic: true })
          },
          fields: [
            {
              name: 'Comando',
              value: '``' + command.help.name + '``',
              inline: true
            },
            {
              name: 'Sinônimos',
              value: command.help.aliases ? '``' + command.help.aliases + '``' : '``Sem sinônimos!``',
              inline: true
            },
            {
              name: 'Descrição',
              value: command.help.description ? '``' + command.help.description + '``' : '``Sem descrição!``',
              inline: true
            },
            {
              name: 'Categoria',
              value: command.help.category ? '``' + command.help.category + '``' : '``Sem categoria!``',
              inline: true
            }
          ],
          timestamp: new Date(),
          footer: {
            text: message.author.tag,
            icon_url: message.author.displayAvatarURL({ dynamic: true }),
          }
        }
      })
    };
  } else {
    const commands = client.commands;
    
    let helpEmbed = new MessageEmbed()
      .setColor(0x0099ff)
      .setAuthor(client.user.tag + ' | Central de ajuda', client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp(new Date())
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
    
    let com = {};
    for (let comm of commands.array()) {
      let category = comm.help.category == undefined || null ? 'Sem categoria' : comm.help.category;
      let name = comm.help.name;
      
      if (!com[category]) {
        com[category] = [];
      };
      com[category].push(name);
    };
    
    for (const [key, value] of Object.entries(com)) {
      let category = key;
      
      let desc = '``' + value.join(', ') + '``';
      
      helpEmbed.addField(
        category + ' - ' + value.length + ' Comandos', desc
      );
    };
    
    return message.channel.send({ embed: helpEmbed });
  };
};

module.exports.help = {
  name: 'help',
  aliases: ['ajuda'],
  category: 'Miscelânea',
  description: 'foda'
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