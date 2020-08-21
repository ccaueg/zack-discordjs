module.exports.run = async (client, message, args) => {
  let member = message.mentions.users.first() ||
      message.guild.members.cache.find(
        x => x.displayName.toLowerCase() == args.join(' ').toLowerCase()
      ) ||
      message.guild.members.cache.find(
        x => x.user.username.toLowerCase() == args.join(' ').toLowerCase()
      ) ||
      message.guild.members.cache.get(args[0]);
  
  let data = await client.db.get(`modlogs-${message.guild.id}-${message.author.id}`);
      
  if (!args[0]) {
    return message.channel.send({
      embed: {
        color: 'RED',
        description: '**<@' + message.author + '> - Insira um usuário!**'
      }
    });
  } else if (!member) {
    return message.channel.send({
      embed: {
        color: 'RED',
        description: '**<@' + message.author + '> - Usuário não encontrado!**'
      }
    });
  } else if (member == message.author.id) {
    return message.channel.send({
      embed: {
        color: 'RED',
        description: '**<@' + message.author + '> - Você não pode expulsar a sí mesmo!**'
      }
    });
  } else if (member == client.user.id) {
    return message.channel.send({
      embed: {
        color: 'RED',
        description: '**<@' + message.author + '> - Você não pode me expulsar!**'
      }
    });
  } else if (member.kickable == false) {
    return message.channel.send({
      embed: {
        color: 'RED',
        description: '**<@' + message.author + '> - Eu não posso expulsar este usuário!**'
      }
    });
  } else {
    try {
      data.kicks += 1;
      await client.db.set(`modlogs-${message.guild.id}-${message.author.id}`, data);
    
      member = member.user == undefined ? member : member.user;
      
      message.channel.send({
        embed: {
          color: 0x0099ff,
          description: '**<@' + message.author + '> - ' + member.tag + ' Expulso(a) com sucesso!**'
        }
      });
    
      return message.guild.member(member).kick(args.slice(1).join(' '));
    } catch (err) {
      console.error(err);
    };
  };
};

module.exports.help = {
  name: 'kick',
  category: 'Moderação',
  aliases: ['kickar', 'expulsar'],
  description: 'oi'
};

module.exports.requirements = {
  userPerms: ['MANAGE_GUILD'],
  clientPerms: ['BAN_MEMBERS'],
  ownerOnly: false,
  especialOnly: false
};

module.exports.limits = {
  rateLimit: 1,
  cooldown: 5000
}