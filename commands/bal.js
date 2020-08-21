const functions = require('../structures/functions');

module.exports.run = async (client, message, args) => {
  const economy = await client.db.get(`eco-${message.guild.id}-${message.author.id}`);
      
  message.channel.send({
    embed: {
      color: 'GREEN',
      author: {
        name: 'Saldo de ' + message.author.tag,
        icon_url: message.author.displayAvatarURL({ dynamic: true })
      },
      fields: [
        {
          name: 'Na carteira',
          value: functions.NumberFormat(economy.wallet) + ' Zack Points',
          inline: true
        },
        {
          name: 'Depositados no banco',
          value: functions.NumberFormat(economy.bank) + ' Zack Points',
          inline: true
        },
        {
          name: 'Total',
          value: functions.NumberFormat(economy.total) + ' Zack Points',
          inline: true
        }
      ],
      timestamp: new Date(),
      footer: {
        text: message.author.tag,
        icon_url: message.author.displayAvatarURL({ dynamic: true })
      }
    }
  });
};

module.exports.help = {
  name: 'balance',
  aliases: ['bal', 'saldo', 'atm'],
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