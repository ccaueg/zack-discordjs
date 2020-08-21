const moment = require("moment");
moment.locale("pt-br");

const functions = require("../structures/functions");

module.exports.run = (client, message, args) => {
  let user =
    message.mentions.users.first() ||
    message.guild.members.cache.find(
      x => x.displayName.toLowerCase() === args.join(" ").toLowerCase()
    ) ||
    message.guild.members.cache.find(
      x => x.user.username.toLowerCase() === args.join(" ").toLowerCase()
    ) ||
    message.guild.members.cache.get(args[0]) ||
    message.author;
  user = user.user == undefined ? user : user.user;

  let member =
    message.mentions.members.first() ||
    message.guild.members.cache.find(
      x => x.displayName.toLowerCase() === args.join(" ").toLowerCase()
    ) ||
    message.guild.members.cache.find(
      x => x.user.username.toLowerCase() === args.join(" ").toLowerCase()
    ) ||
    message.guild.members.cache.get(args[0]) ||
    message.member;

  function status(pr) {
    pr = pr.replace(/online/g, "<:lol:740763241004662917>");
    pr = pr.replace(/invisible|offline/g, "<:kk:740762915459563590>");
    pr = pr.replace(/dnd/g, "<:sla:740761946722271243>");
    pr = pr.replace(/idle/g, "<:nsei:740762291938525264>");

    return pr;
  }

  function repl(x) {
    x = x.replace(/HOUSE_BRAVERY/gi, "<:bravery:741028675558047877>");
    x = x.replace(/HOUSE_BALANCE/gi, "<:bravery:741028675558047877>");
    x = x.replace(/HOUSE_BRILLIANCE/g, "<:brilliance:741033912762892451>");
    x = x.replace(/VERIFIED_BOT/g, "");

    return x;
  }

  let perms = functions.Permissions(member.permissions.toArray().join(", "));
  let verif =
    user.bot == false
      ? "<:emoji_5:701186059202985985>"
      : "<:bot:740420363409948737>";
  let st = status(user.presence.status);
  let flags = repl(user.flags.toArray().join(" "));

  let emb = {
    color: 0x0099ff,
    title: verif + "" + st + " " + flags + " " + user.tag + " | Informações",
    thumbnail: {
      url: user.displayAvatarURL({ dynamic: true })
    },
    fields: [
      {
        name: "Tag do Discord",
        value: "`" + user.tag + "`",
        inline: true
      },
      {
        name: "ID do Discord",
        value: "`" + user.id + "`",
        inline: true
      },
      {
        name: "Conta criada em",
        value:
          "`" +
          moment(user.createdAt)
            .locale("pt-br")
            .format("LLL") +
          "`",
        inline: true
      },
      {
        name: "Entrou no servidor em",
        value:
          "`" +
          moment(member.joinedAt)
            .locale("pt-br")
            .format("LLL") +
          "`",
        inline: true
      }
    ],
    timestamp: new Date(),
    footer: {
      text: message.author.tag,
      icon_url: message.author.displayAvatarURL({ dynamic: true })
    }
  };

  let emb2 = {
    color: 0x0099ff,
    title: verif + "" + st + " " + flags + " " + user.tag + " | Informações",
    thumbnail: {
      url: user.displayAvatarURL({ dynamic: true })
    },
    fields: [
      {
        name: "Posição de entrada",
        value:
          message.guild.members.cache
            .filter(m => m.joinedAt !== null)
            .sort((a, b) => a.joinedAt - b.joinedAt)
            .map(m => m.user.id)
            .indexOf(user.id) +
          1 +
          "º",
        inline: true
      },
      {
        name: "Permissões",
        value: "`" + perms + "`",
        inline: false
      },
      {
        name: "Cargos",
        value:
          message.member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(roles => "``" + roles.name + "``")
            .join(" , ") || "Nenhum cargo",
        inline: false
      }
    ],
    timestamp: new Date(),
    footer: {
      text: message.author.tag,
      icon_url: message.author.displayAvatarURL({ dynamic: true })
    }
  };

  message.channel.send({ embed: emb }).then(msg => {
    let r = msg.react(
      "⏩"
    );
    
    let filtro = (reaction, membro) =>
      reaction.emoji.name === "⏩" && membro.id === message.author.id;
    let collector = msg.createReactionCollector(filtro, { time: 100000 });

    collector.on("collect", async cp => {
      msg.edit({ embed: emb2 });
      msg.reactions.removeAll();
      
      await msg.react("⏪");
    });

    let filter = (reaction, membro) =>
      reaction.emoji.name === "⏪" && membro.id === message.author.id;
    let coletor = msg.createReactionCollector(filter, { time: 100000 });

    coletor.on("collect", async cp => {
      msg.edit({ embed: emb });
      msg.reactions.removeAll();
      
      await msg.react("⏩");
    });
  });
};

module.exports.help = {
  name: "userinfo",
  aliases: ["memberinfo"],
  category: "Discord",
  description: "Veja as informações de um usuário no servidor"
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
};