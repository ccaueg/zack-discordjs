module.exports.run = async (client, message, args) => {  
  if (!args[0]) {
    return message.channel.send({
      embed: {
        color: 'RED',
        description: '**<@' + message.author + '> - Insira um prefixo!**'
      }
    });
  } else if (args[0].length > 4) {
    return message.channel.send({
      embed: {
        color: 'RED',
        description: '**<@' + message.author + '> - Meu novo prefixo deve conter no máximo 4 caractéres!**'
      }
    });
  } else {
    const prefix = args[0].toLowerCase();
    
    await client.db.set(`prefix-${message.guild.id}`, prefix);
    client.prefix[message.guild.id] = prefix;
  
    return message.channel.send({
      embed: {
        color: 'GREEN',
        description: '**<@' + message.author + '> - Prefixo alterado para ``' + args[0] + '`` com sucesso!**'
      }
    });
  };
};

module.exports.help = {
  name: 'prefix',
  category: 'Moderação',
  aliases: ['setprefix'],
  description: 'oi'
};

module.exports.requirements = {
  userPerms: ['MANAGE_GUILD'],
  clientPerms: [],
  ownerOnly: false,
  especialOnly: false
};

module.exports.limits = {
  rateLimit: 1,
  cooldown: 5000
}