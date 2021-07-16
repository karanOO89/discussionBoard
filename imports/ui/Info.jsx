import React from "react";
import { useState, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Messages } from "../api/messages";
import { Meteor } from "meteor/meteor";
import { LoginForm } from "./LoginForm";
import { useHistory } from "react-router-dom";

export const Info = () => {
  const history = useHistory();

  const [textVal, setTextVal] = useState();
  const msgs = useTracker(() => {
    return Messages.find().fetch();
  });
  const user = useTracker(() => Meteor.user());
  const logout = () =>
    Meteor.logout((err) => {
      if (err) {
        alert(err.message);
      } else {
        history.push("/login");
      }
    });

  const clickHandler = (e) => {
    e.preventDefault();
    Meteor.call("messages.insert", textVal, user, (err) => {
      if (err) {
        alert(err.message);
      } else {
        setTextVal("");
      }
    });
  };
  

  return (
    <div name="chat">
      {user ? (
        <Fragment>
          {user.emails[0]["address"]} :
          <button className="user" onClick={logout}>
            Logout
          </button>
          <form id="chat-form">
            <p>
              <textarea
                rows="5"
                cols="50"
                name="text"
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
                placeholder="Type here ..."
              ></textarea>
            </p>
            <p>
              <button
                onClick={(e) => {
                  clickHandler(e);
                }}
              >
                Submit
              </button>
            </p>
          </form>
          {msgs.length > 0 ? (
            msgs.map((msg) => {
              return (
                // <li key={msg.id}>
                <div key={msg.id}>
                  {msg.user}({msg.createdAt.toLocaleString()}) : {msg.textVal}
                </div>
                // </li>
              );
            })
          ) : (
            <p>No messages.</p>
          )}
        </Fragment>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
