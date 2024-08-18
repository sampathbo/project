const {cmd , commands} = require('../command')
const fg = require(`api-dylux`)
const yts = require(`yt-search`)

//====song audio===

cmd({
    pattern: "song",
    desc: "Download Songs.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*Give me text or Url!*")
const search = await yts(q)
const data = search.videos[0];
const url = data.url

let desc = `
*♨Sampath-MD Song Downloader♨*

╭──═❮ *Song Downloader* ✨ ❯═─┈•
│✑ *Title:* ${data.title}
│✑ *duration:* ${data.timestamp}
│✑ *Uploaded* ${data.ago}
│✑ *Uploader:* ${data.author.name}
╰────────────────❃ 

*Made By Mr.SaMPaTH*
`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download audio
let down = await fg.yta(url)
let downloadUrl = down.dl_url

//send audio
await conn.sendMessage(from,{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek});


  
}catch(e){
console.log(e)
reply(`${e}`)
}
})

//====Download Video===

cmd({
pattern: "video",
    desc: "Download Videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*Give me text or Url!*")
const search = await yts(q)
const data = search.videos[0];
const url = data.url

let desc = `
*♨Sampath-MD Video Downloader♨*

╭──═❮ *Video Downloader* ✨ ❯═─┈•
│✑ *Title:* ${data.title}
│✑ *duration:* ${data.timestamp}
│✑ *Uploaded* ${data.ago}
│✑ *Uploader:* ${data.author.name}
╰────────────────❃ 

*Made By Mr.SaMPaTH*
`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download video
let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video
await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek});


  
}catch(e){
console.log(e)
reply(`${e}`)
})
