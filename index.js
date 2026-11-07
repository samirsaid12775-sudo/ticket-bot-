const { Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const client = new Client({ intents: 3276799 });
client.on('ready', () => console.log('Bot Online'));
client.on('messageCreate', async m => {
 if (m.content === '!setup-tickets') {
  const embed = new EmbedBuilder().setTitle('نظام التكتات').setDescription('اضغط لفتح تكت').setColor(0x5865F2);
  const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('open_ticket').setLabel('فتح تكت 🎫').setStyle(ButtonStyle.Primary));
  m.channel.send({ embeds: [embed], components: [row] });
 }
});
client.on('interactionCreate', async i => {
 if (!i.isButton()) return;
 if (i.customId === 'open_ticket') {
  const ch = await i.guild.channels.create({ name: `ticket-${i.user.username}`, type: ChannelType.GuildText, permissionOverwrites: [{ id: i.guild.id, deny: ['ViewChannel'] }, { id: i.user.id, allow: ['ViewChannel','SendMessages'] }] });
  await i.reply({ content: `تم: ${ch}`, ephemeral: true });
 }
});
client.login(process.env.TOKEN);
