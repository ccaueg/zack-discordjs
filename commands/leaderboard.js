const { MessageEmbed } = require('discord.js');

const functions = require('../structures/functions.js');

module.exports.run = async (client, message, args) => {
  let data = await client.db.getAll(`lvl-${message.guild.id}`);
  data = data.sort((a, b) => b.value.totalXp - a.value.totalXp);
  data = await Promise.all(data.map(async (data, index) => {
    const user = await client.users.fetch(data.key.split('-')[2]).catch(() => null);
    if (user) {
      return {
        name: user.username,
        level: data.value.level,
        xp: data.value.xp,
        rank: index + 1
      }
    }
  }));
  
  if (!data.length) return message.channel.send({
    embed: {
      color: 'RED',
      description: '**<@' + message.author + '>  - Este servidor não possui um leaderboard...**'
    }
  });
  
  const page = functions.pages(data, 10, args[0] || 1);
  if (!page) return message.channel.send({
    embed: {
      color: 'RED',
      description: '**<@' + message.author + '>  - Esta página não existe!**'
    }
  });
    
  const lbEmb = new MessageEmbed()
    .setColor(0x0099ff)
    .setAuthor(message.guild.name + ' | Leaderboard', message.guild.iconURL({ dynamic: true, format: 'png' }))
    .setThumbnail(message.guild.iconURL({ dynamic: true, format: 'png' }))
    .setDescription(page.map(e => `\`#${e.rank}\` | **${e.name}** - Level: ${e.level}, XP: ${e.xp}`))
    .setTimestamp(new Date())
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }));
  
  message.channel.send({ embed: lbEmb });
};

module.exports.help = {
  name: 'leaderboard',
  aliases: ['lb'],
  category: 'Social',
  description: 'poetico'
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
}