const { owners, especials } = require('../config');

const duration = require('humanize-duration');

module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;
  
  /* if(message.author.id === "737645122845409300") { // davi
    message.delete()
  }; */
  
  if (!client.prefix[message.guild.id]) {
    client.prefix[message.guild.id] = await client.db.get(`prefix-${message.guild.id}`, client.prefix['default']);
  };
  
  if (!client.background[message.author.id]) {
    client.background[message.author.id] = await client.db.get(`background-${message.author.id}`, client.background['default']);
  };
  
  let data = await client.db.get(`data-${message.guild.id}-${message.author.id}`, {
    work: null,
    daily: null
  });
  
  await client.db.set(`data-${message.guild.id}-${message.author.id}`, data);
  
  let modlogs = await client.db.get(`modlogs-${message.guild.id}-${message.author.id}`, {
    kicks: 0,
    bans: 0,
    mutes: 0,
    warnings: 0,
  });
  
  await client.db.set(`modlogs-${message.guild.id}-${message.author.id}`, modlogs);
  
  let economy = await client.db.get(`eco-${message.guild.id}-${message.author.id}`, {
    wallet: 0,
    bank: 0,
    dailyAmount: 2000,
    dailyTimeout: 86400000,
    workTimeout: 150000,
    total: 0,
    earned: Math.floor(Math.random() * 300) + 5
  });
  economy.total = economy.bank + economy.wallet;
  
  await client.db.set(`eco-${message.guild.id}-${message.author.id}`, economy);
  
  let LevelInfo = await client.db.get(`lvl-${message.guild.id}-${message.author.id}`, {
    level: 1,
    xp: 0,
    totalXp: 0
  });
  
  let generatedXp = 3;
  LevelInfo.xp += generatedXp;
  LevelInfo.totalXp += generatedXp;
  
  if (LevelInfo.xp >= LevelInfo.level * 40) {
    generatedXp += 2;
    LevelInfo.level += 1;
    LevelInfo.xp = 0;
    // message.reply('agora tu é level ' + LevelInfo.level);
  };
  
  await client.db.set(`lvl-${message.guild.id}-${message.author.id}`, LevelInfo);
  
  const args = message.content.split(/ +/g);
  const command = args.shift().slice(client.prefix[message.guild.id].length).toLowerCase();
  const cmd = client.commands.get(command) || client.aliases.get(command);
  
  if (!message.content.toLowerCase().startsWith(client.prefix[message.guild.id])) return;
  if (client.blacklist.includes(message.author.id)) return message.reply('tu ta na blacklist');
  
  if (!message.channel.permissionsFor(message.guild.me).toArray().includes('SEND_MESSAGES')) return;
  if (!cmd) return;
  
  if (cmd.requirements.ownerOnly && !owners.includes(message.author.id)) {
    return message.channel.send({
      embed: {
        color: 'RED',
        description: '<@' + message.author + '> - Somente meu desenvolvedor pode usar esse comando!'
      }
    });
  };
  
  if (cmd.requirements.especialOnly && !especials.includes(message.author.id)) {
    return message.channel.send({
      embed: {
        color: 'RED',
        description: '<@' + message.author + '> - Somente pessoas especiais podem usar esse comando!'
      }
    })
  };
  
  if (cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms)) {
    return message.channel.send({
      embed: {
        color: 'RED',
        description: '<@' + message.author + '> - Você não possui as permissões necessárias para executar esse comando!'
      }
    });
  };
  
  if (cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms)) {
    return message.channel.send({
      embed: {
        color: 'RED',
        description: '<@' + message.author + ' - Eu não possuo as permissões necessárias para executar esse comando!'
      }
    });
  };
  
  if (cmd.limits) {
    const current = client.limits.get(`${command}-${message.author.id}`);
    if (!current) {
      client.limits.set(`${command}-${message.author.id}`, 1);
    } else {
      if (current >= cmd.limits.rateLimit) return message.channel.send({
        embed: {
          color: 'RED',
          description: '**<@' + message.author + '> - Aguarde ' + duration(cmd.limits.cooldown, { language: 'pt' }) + ' para executar este comando novamente!**'
        } 
      });
      
      client.limits.set(`${command}-${message.author.id}`, current + 1);
    };
    
    setTimeout(() => {
      client.limits.delete(`${command}-${message.author.id}`);
    }, cmd.limits.cooldown);
  };
  
  cmd.run(client, message, args);
};

const missingPerms = (member, perms) => {
  const missingPerms = member.permissions.missing(perms)
    .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);
  
  return missingPerms.lenght > 1 ?
    `${missingPerms.slice(0, -1).join(', ')} e ${missingPerms.slice[-1][0]}` :
    missingPerms[0];
};