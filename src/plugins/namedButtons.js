require('dotenv').config({ path: '../../.env' });
const typingAction = require('../utils/typingAcion');

const { REPORT_CHANNEL_ID } = process.env;

module.exports = {
  id: 'namedButtons',
  defaultConfig: {
    buttons: {},
  },

  plugin(bot, pluginConfig) {
    const buttons = pluginConfig.buttons || {};

    bot.on('text', async (msg, props) => {
      if (msg.chat) {
        if (msg.chat.id === Number(REPORT_CHANNEL_ID)) {
          return;
        }
      }
      await typingAction(bot, msg.from.id);

      const { text } = msg;
      Object.keys(buttons).forEach((key) => {
        const {
          label,
          command,
          contains,
          icon,
        } = buttons[key];

        if (label === text || icon === text || text.indexOf(contains) !== -1) {
          return bot.event(command, msg, props);
        }

        return null;
      });
    });
  },
};
