module.exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null);
  
  if (!user) return message.reply('usuario');
  
  if (client.blacklist.includes(user.id)) {
    client.blacklist.splice(client.blacklist.indexOf(user.id));
    message.reply(user.tag + ' removido da blacklist');
  } else {
    client.blacklist.push(user.id);
    message.reply(user.tag + ' adicionado à blacklist!')
  };
  
  await client.db.set('blacklist', client.blacklist);
};

module.exports.help = {
  name: 'blacklist',
  aliases: ['bl'],
  category: 'Developer',
  description: 'gay'
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: true,
  especialOnly: false
};

module.exports.limits = {
  rateLimit: 1,
  cooldown: 5000
}