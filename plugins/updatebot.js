const { exec } = require('child_process');
const config = require('../config')
const {cmd , commands} = require('../command')
const {sleep} = require('../lib/functions')

cmd({
    pattern: "update",
    desc: "Update the bot by pulling the latest changes from GitHub.",
    category: "system",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, q, pushname }) => {
    try {
        // Notify the user that the update process is starting
        reply("🚀 Starting the update process...");

        // Execute the Git pull command
        exec('git pull', (err, stdout, stderr) => {
            if (err) {
                console.error(`Git pull error: ${err}`);
                return reply(`❌ Failed to update: ${err.message}`);
            }

            // Log the stdout from the git pull command
            console.log(`Git pull stdout: ${stdout}`);
            if (stderr) {
                console.error(`Git pull stderr: ${stderr}`);
            }

            // Notify the user that the update was successful
            reply("✅ Update completed successfully! Restarting bot...");

            // Restart the bot using PM2
            exec('pm2 restart all', (err, stdout, stderr) => {
                if (err) {
                    console.error(`PM2 restart error: ${err}`);
                    return reply(`❌ Failed to restart bot: ${err.message}`);
                }

                // Log the stdout from the PM2 restart command
                console.log(`PM2 restart stdout: ${stdout}`);
                if (stderr) {
                    console.error(`PM2 restart stderr: ${stderr}`);
                }

                reply("♻️ Bot restarted successfully!");
            });
        });
    } catch (err) {
        console.error(err);
        reply('❌ An error occurred during the update process.');
    }
});
