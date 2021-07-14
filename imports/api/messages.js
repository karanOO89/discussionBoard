import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


export const Messages = new Mongo.Collection("messages");
Meteor.methods({
  "messages.insert"(textVal,createdAt) {
    check(textVal, String);
    Messages.insert({
      textVal,
      createdAt:STRING(new Date())
    });
  },
});
