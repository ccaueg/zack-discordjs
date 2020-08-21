const { token, prefix } = require('./config');
const { Client, Collection } = require('discord.js');
const { VultrexDB } = require('vultrex.db');

const client = new Client({
  disableEveryone: true,
  disabledEvents: ['TYPING_START']
});

const database = new VultrexDB({
  provider: 'sqlite',
  table: 'main',
  fileName: 'main'
});

database.connect().then(async () => {
  client.commands = new Collection();
  client.aliases = new Collection();
  client.limits = new Map();
  client.prefix = new Object();
  client.prefix['default'] = prefix;
  client.db = database;
  client.blacklist = await database.get('blacklist', []);
  client.background = new Object();
  client.background['default'] = 'https://cdn.glitch.com/0a711521-34ec-4258-9838-0e967c53714b%2Fbackground.jpeg?v=1597637832252';

  const commands = require('./structures/command');
  commands.run(client);

  const events = require('./structures/event');
  events.run(client);

  client.login(token);
});