const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

// Song download command with options to download as audio or document
cmd({
    pattern: "song",
    desc: "Download Songs with options to select audio or document.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, sendButtonMessage }) => {
    try {
        if (!q) return reply("*Give me text or Url!*");
        
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
*♨Sampath-MD Song Downloader♨*

╭──═❮ *Song Downloader* ✨ ❯═─┈•
│✑ *Title:* ${data.title}
│✑ *Duration:* ${data.timestamp}
│✑ *Uploaded:* ${data.ago}
│✑ *Uploader:* ${data.author.name}
╰────────────────❃ 

*Made By Mr.SaMPaTH*
`;

        // Send song information with buttons for choosing audio or document
        let buttons = [
            { buttonId: `${command} audio ${url}`, buttonText: { displayText: 'Audio' }, type: 1 },
            { buttonId: `${command} document ${url}`, buttonText: { displayText: 'Document' }, type: 1 }
        ];

        let buttonMessage = {
            contentText: desc,
            footerText: 'Choose the format to download:',
            buttons: buttons,
            headerType: 1
        };

        await conn.sendMessage(from, buttonMessage, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Audio download option
cmd({
    pattern: "song audio",
    desc: "Download and send the song as audio.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*No song URL provided!*");

        const url = q;
        let down = await fg.yta(url);
        let downloadUrl = down.dl_url;

        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Document download option
cmd({
    pattern: "song document",
    desc: "Download and send the song as a document.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*No song URL provided!*");

        const url = q;
        let down = await fg.yta(url);
        let downloadUrl = down.dl_url;

        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: `song.mp3` }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Video download command with options to download as video or document
cmd({
    pattern: "video",
    desc: "Download Videos with options to select video or document.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, sendButtonMessage }) => {
    try {
        if (!q) return reply("*Give me text or Url!*");

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
*♨Sampath-MD Video Downloader♨*

╭──═❮ *Video Downloader* ✨ ❯═─┈•
│✑ *Title:* ${data.title}
│✑ *Duration:* ${data.timestamp}
│✑ *Uploaded:* ${data.ago}
│✑ *Uploader:* ${data.author.name}
╰────────────────❃ 

*Made By Mr.SaMPaTH*
`;

        // Send video information with buttons for choosing video or document
        let buttons = [
            { buttonId: `${command} video ${url}`, buttonText: { displayText: 'Video' }, type: 1 },
            { buttonId: `${command} document ${url}`, buttonText: { displayText: 'Document' }, type: 1 }
        ];

        let buttonMessage = {
            contentText: desc,
            footerText: 'Choose the format to download:',
            buttons: buttons,
            headerType: 1
        };

        await conn.sendMessage(from, buttonMessage, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Video download option
cmd({
    pattern: "video video",
    desc: "Download and send the video as video.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*No video URL provided!*");

        const url = q;
        let down = await fg.ytv(url);
        let downloadUrl = down.dl_url;

        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Document download option for video
cmd({
    pattern: "video document",
    desc: "Download and send the video as a document.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*No video URL provided!*");

        const url = q;
        let down = await fg.ytv(url);
        let downloadUrl = down.dl_url;

        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: `video.mp4` }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
