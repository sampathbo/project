const { exec } = require('child_process');

cmd({
    pattern: "update",
    desc: "Update the bot to the latest version.",
    category: "admin",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return reply("You don't have permission to update the bot!");

        reply("Updating the bot to the latest version...");

        // Pull the latest changes from the Git repository
        exec('git pull', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error during update: ${stderr}`);
                return reply(`Update failed: ${stderr}`);
            }

            reply(`Bot updated successfully!\n\n${stdout}`);

            // Optionally, restart the bot if necessary
            exec('pm2 restart bot', (restartErr, restartStdout, restartStderr) => {
                if (restartErr) {
                    console.error(`Error restarting the bot: ${restartStderr}`);
                    return reply(`Update successful, but bot restart failed: ${restartStderr}`);
                }

                reply(`Bot restarted successfully!\n\n${restartStdout}`);
            });
        });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

