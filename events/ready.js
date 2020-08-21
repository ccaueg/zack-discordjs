module.exports = (client) => {
  const Presences = [
    {
      name: client.users.cache.size + ' Usuários | z!help',
      type: 'WATCHING'
    },
    {
      name: client.guilds.cache.size + ' Servidores | z!help',
      type: 'WATCHING'
    },
    {
      name: client.channels.cache.size + ' Canais | z!help',
      type: 'WATCHING'
    }
  ];
  
  setInterval(() => {
    client.user.setActivity(Presences[
      Math.floor(Math.random() * Presences.length)
    ]);
  }, 10000);
  
  console.log('Bot ' + client.user.tag + ' Online com sucesso!');
};