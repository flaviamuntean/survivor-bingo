import React, { Component } from "react";
import { Label } from "semantic-ui-react";

class UserScore extends Component {
  render() {
    return (
      <Label color="blue" image style={{ borderRadius: "0" }}>
        {/* <img src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg" /> */}
        {this.props.username}
        <Label.Detail style={{ borderRadius: "0" }}>0</Label.Detail>
      </Label>
    );
  }
}

export default UserScore;
