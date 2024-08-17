const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "1AIkRCTb#S_MyKlZPnwySVQi3tqcT5nojfFdQCwColyjkbOeH1yw",
ALIVE_IMG: process.env.ALIVE_IMG || "https://ibb.co/CtD22T8",
ALIVE_MSG: process.env.ALIVE_MSG || "Hey,I'm Sampath-MD.I'm Alive Now!",
};
