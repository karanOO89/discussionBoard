import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import App from "../imports/ui/App";
import  'meteor/accounts-ui'


Meteor.startup(() => {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("react-target")
  );
});
