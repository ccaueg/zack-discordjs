module.exports.run = (client, message, args) => {
  let user = message.mentions.users.first() ||
      message.guild.members.cache.find(
        x => x.displayName.toLowerCase() == args.join(' ').toLowerCase()
      ) ||
      message.guild.members.cache.find(
        x => x.user.username.toLowerCase() == args.join(' ')
      ) ||
      client.users.cache.get(args[0]) ||
      message.author;
  user = user.user == undefined ? user : user.user;
  
  message.channel.send({
    embed: {
      author: {
        name: '🖼️ Avatar de ' + user.tag,
        url: user.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 })
      },
      description:
        'Clique [aqui](' + user.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }) + ') para baixar a imagem',
      image: {
        url: user.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 })
      },
      timestamp: new Date(),
      footer: {
        text: user.tag,
        icon_url: user.displayAvatarURL({ dynamic: true })
      }
    }
  });
};

module.exports.help = {
  name: 'avatar',
  category: 'Discord',
  description: 'foda'
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: ['ATTACH_FILES'],
  ownerOnly: false,
  especialOnly: false
};

module.exports.limits = {
  rateLimit: 1,
  cooldown: 5000
};