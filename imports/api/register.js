import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Accounts } from "meteor/accounts-base";

export const Register = new Mongo.Collection("register");
Meteor.methods({
  "register.insert"(email, password) {
     Accounts.createUser({
      email: email,
      password: password
  });
  },
});
