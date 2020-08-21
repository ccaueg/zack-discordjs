const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment } = require('discord.js');
const { join } = require('path');

module.exports.run = async (client, message, args) => {
  let member = message.mentions.users.first() ||
      message.guild.members.cache.find(
        x => x.displayName.toLowerCase() == args.join(' ').toLowerCase()
      ) ||
      message.guild.members.cache.find(
        x => x.user.username.toLowerCase() == args.join(' ').toLowerCase()
      ) ||
      client.users.cache.get(args[0]) ||
      message.member;
  member = member.user == undefined ? member : member.user;
  
  const data = await client.db.get(`lvl-${message.guild.id}-${member.id}`)
  if (!data) return message.channel.send({
    embed: {
      color: 'RED',
      description: '**<@' + message.author + '>  - Este usuário não possui um ranking...**'
    }
  });

  const canvas = createCanvas(1000, 333);
  const ctx = canvas.getContext('2d');
  
  const backgrounds = 'https://cdn.glitch.com/0a711521-34ec-4258-9838-0e967c53714b%2Fbackground.jpeg?v=1597637832252'
  
  const background = await loadImage(client.background[member.id]);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#ffffff';
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = '#000000';
  ctx.fillRect(180, 216, 770, 65);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeRect(180, 216, 770, 65);
  ctx.stroke();
  
  ctx.fillStyle = '#e67e22';
  ctx.globalAlpha = 0.6;
  ctx.fillRect(180, 216, ((100 / (data.level * 40)) * data.xp) * 7.7, 65);
  ctx.fill();
  ctx.globalAlpha = 1;
  
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${data.xp} / ${data.level * 40} XP`, 600, 260);
  
  ctx.textAlign = 'left';
  ctx.fillText(member.tag, 300, 120);
  
  ctx.font = '50px Arial';
  ctx.fillText('Level:', 300, 180);
  ctx.fillText(data.level, 470, 180);
  
  ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.closePath();
  ctx.clip();
  
  const avatar = await loadImage(member.displayAvatarURL({ format:'png' }));
  ctx.drawImage(avatar, 40, 40, 250, 250);
  
  const attachment = new MessageAttachment(canvas.toBuffer(), 'rank.png');
  
  message.reply({
    content: '**Rank Card de ' + member.tag + ':**',
    files: [attachment]
  }); 
  
  /* const errEmb = {
    color: 'RED',
    description: '**<@' + message.author + '> - O usuário não possui um rank!**'
  };
  
  const data = await client.db.get(`lvl-${message.guild.id}-${member.id}`);
  if (!data) return message.channel.send({ embed: errEmb });
  
  const rankEmb = {
    color: 0x0099ff,
    author: {
      name: member.tag + ' | Rank',
      // icon_url: member.user.displayAvatarURL({ dynamic: true, format: 'png' })
    },
    thumbnail: {
      url: member.displayAvatarURL()
    },
    fields: [
      {
        name: 'Level:',
        value: data.level,
        inline: true
      },
      {
        name: 'XP:',
        value: data.xp,
        inline: true
      }
    ],
    timestamp: new Date(),
    footer: {
      text: message.author.tag,
      icon_url: message.author.displayAvatarURL({ dynamic: true, format: 'png' })
    }
  };
    
  message.channel.send({ embed: rankEmb }); */
};

module.exports.help = {
  name: 'rank',
  aliases: ['rankcard', 'level'],
  category: 'Social',
  description: 'mto foda'
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