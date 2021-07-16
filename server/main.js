import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Messages } from '../imports/api/messages';

// const insertMsg = (msg, user) =>
//   Messages.insert({
//     text: msg,
//     userId: user._id,
//     createdAt: new Date(),
//   });


const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';


Meteor.startup(() => {
  // if (!Accounts.findUserByUsername(SEED_USERNAME)) {
  //   Accounts.createUser({
  //     username: SEED_USERNAME,
  //     password: SEED_PASSWORD,
  //   });
  // }
  // const user = Accounts.findUserByUsername(SEED_USERNAME);

  // if (Messages.find().count() === 0) {
  //   [
  //     'Messages',
  //    ,
  //   ].forEach(msg => insertMsg(msg, user));
  // }
});