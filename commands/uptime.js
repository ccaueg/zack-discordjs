module.exports.run = (client, message, args) => {
  let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  
  const uptimeEmbed = {
    color: 0x0099ff,
    description:
      '**:satellite: | <@' + message.author + '> - Tempo online: ``' + 
        days.toFixed() + ' Dias, ' + hours.toFixed() + ' Horas, ' + minutes.toFixed() + ' Minutos e ' + seconds.toFixed() + ' Segundos``**'
  };
  
  message.channel.send({ embed: uptimeEmbed });
};

module.exports.help = {
  name: 'uptime',
  category: 'Miscelânea',
  description: 'çjmnnmvb'
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false,
  especialOnly: false
};

module.exports.limits = {
  rateLimit: 1,
  cooldown: 3000
}
