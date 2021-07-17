import React from "react";
import { useState, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Messages } from "../api/messages";
import { Meteor } from "meteor/meteor";
import { useHistory } from "react-router-dom";
import "./Info.scss";
import { LoginForm } from "./LoginForm";

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
        history.push("/");
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
  const userLoggedIn = () => {
    if (user && "emails" in user) {
      return user.emails[0]["address"];
    }
  };

  return (
    <div className="chat">
      {user ? (
        <Fragment>
          <div className="user">
            <p style={{ color: "brown" }}>
              <b>
                <u> LoggedIn as: </u>{" "}
              </b>
            </p>
            <div style={{ color: "darkblue" }}>
              <b> {userLoggedIn()}</b>
            </div>
            <button
              className="user"
              style={{ height: "45px", width: "7.2em", marginLeft: "10px" }}
              onClick={logout}
            >
              Logout
            </button>
          </div>
          <div className="display">
            <div className="displayMsg">
              {msgs.length > 0 ? (
                msgs.map((msg) => {
                  return (
                    <div key={msg.id}>
                      <div style={{ color: "darkblue" }}>
                        <b>
                          {" "}
                          {msg.user} ({msg.createdAt.toLocaleString()}):{" "}
                        </b>
                      </div>
                      {msg.textVal}
                    </div>
                  );
                })
              ) : (
                <p>No messages.</p>
              )}
            </div>
            <form id="chat-form">
              <p>
                <textarea
                  style={{
                    resize: "none",
                  }}
                  rows="15"
                  cols="40"
                  name="text"
                  value={textVal}
                  onChange={(e) => setTextVal(e.target.value)}
                  placeholder="Type here ..."
                ></textarea>
              </p>
              <p>
                <button
                  style={{ height: "75px", width: "35em" }}
                  onClick={(e) => {
                    clickHandler(e);
                  }}
                >
                  Submit
                </button>
              </p>
            </form>
          </div>
        </Fragment>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
