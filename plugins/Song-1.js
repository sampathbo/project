const { cmd, commands } = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')

cmd({
    pattern: "song",
        desc: "Download songs",
            category: "download",
                filename: __filename
                },
                async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
                    try {
                            if (!q) return reply('*Please Give Me A Song Name Or URL.*')
                                    const search = await yts(q)
                                            const data = search.videos[0];
                                                    const url = data.url

                                                            let desc = `
                                                            🌀 *Sampath-MD Song Downloader🌀*

                                                            〘 *Song Downloader* ✨ 〙➤──⋅
                                                              ➭ *Title:* ${data.title}
                                                                ➭ *Duration:* ${data.timestamp}
                                                                  ➭ *Uploaded:* ${data.ago}
                                                                    ➭ *Uploader:* ${data.author.name}
                                                                            `
                                                                                    await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

                                                                                            // Download Audio
                                                                                                    let down = await fg.yta(url)
                                                                                                            let downloadUrl = down.dl_url

                                                                                                                    // Send Audio Message
                                                                                                                            await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek })
                                                                                                                                    await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: data.title + ".mp3", caption: "Made With Sampath-MD" }, { quoted: mek })

                                                                                                                                        } catch (e) {
                                                                                                                                                console.log(e)
                                                                                                                                                        reply(`${e}`)
                                                                                                                                                            }
                                                                                                                                                            })

                                                                                                                                                            //=====Video-DL======

                                                                                                                                                            cmd({
                                                                                                                                                                pattern: "video",
                                                                                                                                                                    desc: "Download videos",
                                                                                                                                                                        category: "download",
                                                                                                                                                                            filename: __filename
                                                                                                                                                                            },
                                                                                                                                                                            async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
                                                                                                                                                                                try {
                                                                                                                                                                                        if (!q) return reply('*Please Give Me A video Name Or URL.*')
                                                                                                                                                                                                const search = await yts(q)
                                                                                                                                                                                                        const data = search.videos[0];
                                                                                                                                                                                                                const url = data.url

                                                                                                                                                                                                                        let desc = `
                                                                                                                                                                                                                        🌀 *Sampath-MD Video Downloader🌀*

                                                                                                                                                                                                                        〘 *Video Downloader* ✨ 〙➤──⋅
                                                                                                                                                                                                                          ➭ *Title:* ${data.title}
                                                                                                                                                                                                                            ➭ *Duration:* ${data.timestamp}
                                                                                                                                                                                                                              ➭ *Uploaded:* ${data.ago}
                                                                                                                                                                                                                                ➭ *Uploader:* ${data.author.name}
                                                                                                                                                                                                                                        `
                                                                                                                                                                                                                                                await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

                                                                                                                                                                                                                                                        // Download Video
                                                                                                                                                                                                                                                                let down = await fg.ytv(url)
                                                                                                                                                                                                                                                                        let downloadUrl = down.dl_url

                                                                                                                                                                                                                                                                                // Send Video Message
                                                                                                                                                                                                                                                                                        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek })
                                                                                                                                                                                                                                                                                                await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: data.title + ".mp4", caption: "Made With Sampath-MD" }, { quoted: mek })

                                                                                                                                                                                                                                                                                                    } catch (e) {
                                                                                                                                                                                                                                                                                                            console.log(e)
                                                                                                                                                                                                                                                                                                                    reply(`${e}`)
                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                        })
