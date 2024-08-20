const config = require('../config')
const {cmd , commands} = require('../command')
const {sleep} = require('../lib/functions')
const fg = require('api-dylux');
const yts = require('yt-search');

cmd({
    pattern: "song",
    desc: "Download Songs.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, q, pushname }) => {
    try {
        if (!q) return reply("*Give me text or Url!*");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
🌀 *Sampath-MD Song Downloader🌀*

〘 *Song Downloader* ✨ 〙➤──⋅
  ➭ *Title:* ${data.title}
  ➭ *Duration:* ${data.timestamp}
  ➭ *Uploaded:* ${data.ago}
  ➭ *Uploader:* ${data.author.name}
`;

        // Sending song information and giving the user options to download
        reply(desc);

        // Ask user how they want to download the song
        reply('Please choose: \n1. Audio \n2. Document');

        const filter = (m) => m.key.fromMe && m.body.match(/^(1|2)$/);
        const collected = await conn.waitForMessage(from, filter, { time: 30000 });

        if (collected) {
            const choice = collected.body.trim();
            let message;

            if (choice === '1') {
                message = await fg.yta(url);
                await conn.sendMessage(from, { audio: { url: message.dl_link }, mimetype: 'audio/mp4', ptt: false }, { quoted: mek });
            } else if (choice === '2') {
                message = await fg.ytdl(url);
                const docName = `${data.title}.mp3`;
                await conn.sendMessage(from, { document: { url: message.dl_link }, mimetype: 'audio/mp4', fileName: docName }, { quoted: mek });
            } else {
                reply('Invalid option selected.');
            }
        } else {
            reply('You did not respond in time.');
        }
    } catch (err) {
        console.error(err);
        reply('An error occurred while processing your request.');
    }
});
