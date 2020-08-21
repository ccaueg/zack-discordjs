const { inspect } = require('util');
const { stripIndents } = require('common-tags');
const { VultrexHaste } = require('vultrex.haste');
const haste = new VultrexHaste({ url: 'https://hasteb.in' })

module.exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send('bota um codigo');
  
  try {
    const start = process.hrtime();
    const difference = process.hrtime(start);
    
    let output = eval(args.join(' '));
    if (typeof output !== 'string') output = inspect(output, { depth: 2 });
    
    return message.channel.send(stripIndents`
      *Executado em ${difference[0] > 0 ? `${difference[0]}s ` : ''}${difference[1] / 1e6}ms*
      \`\`\`js
      ${output.lenght > 1950 ? await haste.post(output) : output}
      \`\`\`
    `)
  } catch (err) {
    return message.channel.send(stripIndents`
      **Erro:**
      \`\`\`${err}\`\`\`
    `)
  };
};

module.exports.help = {
  name: 'eval',
  aliases: ['ev', 'e'],
  category: 'Developer',
  description: 'foda'
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false,
  especialOnly: true
};

module.exports.limits = {
  rateLimit: 1,
  cooldown: 5000
};