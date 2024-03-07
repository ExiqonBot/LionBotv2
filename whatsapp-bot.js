const { WhatsApp } = require('@adiwajshing/baileys');
const { generateId } = require('./generateId');



client.on('qr', qr => {
  console.log('QR Code:', qr);
  // Use a QR code scanner app to scan the QR code and log in to WhatsApp
});

client.on('message_create', async message => {
  if (message.body === '/start') {
    const id = generateId('User');
    await client.sendMessage(message.key.remoteJid, `Your user ID is ${id}`);
  }
});

client.initialize();