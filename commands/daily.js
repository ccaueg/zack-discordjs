const ms = require('parse-ms');

module.exports.run = async (client, message, args) => {
  let economy = await client.db.get(`eco-${message.guild.id}-${message.author.id}`);
  let data = await client.db.get(`data-${message.guild.id}-${message.author.id}`);
  
  if (data.daily != null && economy.dailyTimeout - (Date.now() - data.daily) > 0) {
    let time = ms(economy.dailyTimeout - (Date.now() - data.daily));
    
    return message.channel.send({
      embed: {
        color: 'RED',
        description:
          '**<@' + message.author + '> - Aguarde ' + time.hours + ' Hora(s), ' + time.minutes + ' Minuto(s) e ' + time.seconds + ' Segundos para resgatar seu daily novamente!**'
      }
    });
  } else {
    data.daily = Date.now();
    economy.total = economy.dailyAmount + economy.bank + economy.wallet;
    economy.wallet += economy.dailyAmount;
    
    await client.db.set(`eco-${message.guild.id}-${message.author.id}`, economy);
    await client.db.set(`data-${message.guild.id}-${message.author.id}`, data);
    
    return message.channel.send({
      embed: {
        color: 'GREEN',
        description:
          '**<@' + message.author + '> - Você coletou sua recompensa diária de ' + economy.dailyAmount + ' Zack Points <:cupcoin:706282411150802995>. Volte novamente amanhã!**'
      }
    });
  };
};

module.exports.help = {
  name: 'daily',
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