import React, { Component } from "react";
import { Label } from "semantic-ui-react";

class UserScore extends Component {
  render() {
    return (
      <Label as="a" color="blue" image>
        <img src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg" />
        {this.props.username}
        <Label.Detail>0</Label.Detail>
      </Label>
    );
  }
}

export default UserScore;
