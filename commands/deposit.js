const functions = require('../structures/functions');

module.exports.run = async (client, message, args) => {
  try {
    const economy = await client.db.get(`eco-${message.guild.id}-${message.author.id}`);
  
    if (!args[0]) {
      return message.channel.send({
        embed: {
          color: 'RED',
          description: '**<@' + message.author + '> - Defina uma quantia a ser depositada!**'
        }
      });
    } else if (args[0].includes('-')) {
      return message.channel.send({
        embed: {
          color: 'RED',
          description: '**<@' + message.author + '> - Você não pode depositar quantias negativas!**'
        }
      });
    } else if (args[0] > economy.wallet) {
      return message.channel.send({
        embed: {
          color: 'RED',
          description: '**<@' + message.author + '> - Você não possui esta quantia inserida!**'
        }
      });
    } else if (args[0] == '0') {
      return message.channel.send({
        embed: {
          color: 'RED',
          description: '**<@' + message.author + '> - Você não pode depositar zero Zack Points!**'
        }
      });
    } else if (args[0] == 'all') {
      economy.bank += economy.wallet;
      economy.wallet -= economy.wallet;
    
      await client.db.set(`eco-${message.guild.id}-${message.author.id}`, economy);
    
      return message.channel.send({
        embed: {
          color: 'GREEN',
          description: '**<@' + message.author + '> - Você acaba de depositar todos os seus Zack Points <:cupcoin:706282411150802995> no banco!**'
        }
      });
    } else if (isNaN(args[0]) && !args[0] == 'all') {
      return message.channel.send({
        embed: {
          color: 'RED',
          description:
            '**<@' + message.author + '> - Esta quantia inserida não parece ser um número válido!**'
        }
      });
    } else {
      economy.bank += Number(args[0]);
      economy.wallet -= Number(args[0]);
    
      await client.db.set(`eco-${message.guild.id}-${message.author.id}`, economy);
    
      return message.channel.send({
        embed: {
          color: 'GREEN',
          description:
            '**<@' + message.author + '> - Você depositou ' + functions.NumberFormat(args[0]) + ' Zack Points <:cupcoin:706282411150802995> no banco com sucesso!**'
        }
      });
    };
  } catch (err) {
    console.error(err);
  };
};

module.exports.help = {
  name: 'deposit',
  aliases: ['depositar', 'dep'],
  category: 'Economia',
  description: 'bacana'
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