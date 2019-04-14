require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const async = require('async');

const userSchema = require('../../schemes/user');

const User = mongoose.model('User', userSchema);

mongoose.connect(process.env.RUNNER_MONGO_DB);

let total = 0;
let processed = 0;

console.log('===START===');

User.find().then((users) => {
  total = users.length;

  async.forEach(users, (user, next) => {
    user.settings.buttons.push({
      index: 19,
      label: '📊 Статистика',
      command: '/myforwardstats',
      state: true,
      order: 7.6,
    });

    user.save().then(() => {
      processed += 1;
      console.log(`${processed}/${total}`);

      next();
    });
  }, () => {
    mongoose.disconnect();
    console.log('===END===');
  });
});
