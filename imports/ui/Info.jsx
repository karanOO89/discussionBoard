import React from "react";
import { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Messages } from "../api/messages";
import { Meteor } from "meteor/meteor";

export const Info = () => {
  const [textVal, setTextVal] = useState("mmmm");
  const msgs = useTracker(() => {
    return Messages.find().fetch();
  });
  const clickHandler = (e) => {
    e.preventDefault();
    // console.log(textVal)
    // let createdAt = new Date();

    Meteor.call("messages.insert", textVal,  (err) => {
      if (err) {
        alert(err.message);
      } else {
      }
    });
  };
  console.log(msgs)
  return (
    <div name="chat">
      {msgs.length > 0 ? (
        msgs.map((msg) => {
          return <li key={msg.id}>{msg.createdAt.toString()}:{msg.textVal}</li>;
        })
      ) : (
        <p>No messages.</p>
      )}
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
    </div>
  );
};
