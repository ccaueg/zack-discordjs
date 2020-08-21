module.exports.run = (client, message, args) => {
  const pingEmbed = {
    color: 0x0099ff,
    description: '**:ping_pong: | <@' + message.author + '> - Pong! ``' + client.ws.ping.toFixed(2) + 'ms``**'
  };
  
  message.channel.send({ embed: pingEmbed });
};

module.exports.help = {
  name: 'ping',
  aliases: ['latency'],
  category: 'Miscelânea',
  description: 'Veja o meu tempo de resposta!'
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