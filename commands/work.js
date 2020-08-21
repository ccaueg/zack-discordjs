const ms = require('parse-ms');

module.exports.run = async (client, message, args) => {
  let economy = await client.db.get(`eco-${message.guild.id}-${message.author.id}`);
  let data = await client.db.get(`data-${message.guild.id}-${message.author.id}`);
  
  if (data.work != null && economy.workTimeout - (Date.now() - data.work) > 0) {
    let time = ms(economy.workTimeout - (Date.now() - data.work));
    
    return message.channel.send({
      embed: {
        color: 'RED',
        description:
          '**<@' + message.author + '> - Aguarde ' + time.minutes + ' Minuto(s) e ' + time.seconds + ' Segundos para trabalhar novamente!**'
      }
    });
  } else {
    data.work = Date.now();
    economy.total = economy.earned;
    economy.wallet += economy.earned;
    
    await client.db.set(`eco-${message.guild.id}-${message.author.id}`, economy);
    await client.db.set(`data-${message.guild.id}-${message.author.id}`, data);
    
    return message.channel.send({
      embed: {
        color: 'GREEN',
        description:
          '**<@' + message.author + '> - Você trabalhou e recebeu ' + economy.earned + ' Zack Points <:cupcoin:706282411150802995>!**'
      }
    });
  };
};

module.exports.help = {
  name: 'work',
  aliases: ['trabalhar'],
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
  cooldown: 0
}